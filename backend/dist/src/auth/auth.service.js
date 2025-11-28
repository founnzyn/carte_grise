"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcryptjs"));
const uuid_1 = require("uuid");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(registerDto) {
        const { email, password, firstName, lastName, phone, role, companyName, siretNumber, rgpdConsent } = registerDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Un compte avec cet email existe déjà');
        }
        if (!rgpdConsent) {
            throw new common_1.BadRequestException('Vous devez accepter la politique de confidentialité');
        }
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await this.prisma.user.create({
            data: {
                email: email.toLowerCase(),
                passwordHash,
                firstName,
                lastName,
                phone,
                role: role || 'CLIENT',
                companyName,
                siretNumber,
                rgpdConsentAt: new Date(),
                rgpdConsentVersion: '1.0',
                dataRetentionExpiry: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000),
            },
        });
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            tokens,
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({
            where: { email: email.toLowerCase(), deletedAt: null },
        });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('Identifiants invalides');
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Identifiants invalides');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            tokens,
        };
    }
    async refreshTokens(refreshTokenDto) {
        const { refreshToken } = refreshTokenDto;
        const storedToken = await this.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true },
        });
        if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Token de rafraîchissement invalide ou expiré');
        }
        await this.prisma.refreshToken.update({
            where: { id: storedToken.id },
            data: { revokedAt: new Date() },
        });
        return this.generateTokens(storedToken.user.id, storedToken.user.email, storedToken.user.role);
    }
    async logout(userId, refreshToken) {
        if (refreshToken) {
            await this.prisma.refreshToken.updateMany({
                where: { userId, token: refreshToken },
                data: { revokedAt: new Date() },
            });
        }
        else {
            await this.prisma.refreshToken.updateMany({
                where: { userId, revokedAt: null },
                data: { revokedAt: new Date() },
            });
        }
    }
    async changePassword(userId, changePasswordDto) {
        const { currentPassword, newPassword } = changePasswordDto;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Utilisateur non trouvé');
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Mot de passe actuel incorrect');
        }
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(newPassword, salt);
        await this.prisma.user.update({
            where: { id: userId },
            data: { passwordHash },
        });
        await this.logout(userId);
    }
    async validateUser(payload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub, deletedAt: null },
        });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('Utilisateur non autorisé');
        }
        return user;
    }
    async generateTokens(userId, email, role) {
        const payload = { sub: userId, email, role };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: 900,
        });
        const refreshToken = (0, uuid_1.v4)();
        const refreshExpiresIn = 7 * 24 * 60 * 60 * 1000;
        await this.prisma.refreshToken.create({
            data: {
                userId,
                token: refreshToken,
                expiresAt: new Date(Date.now() + refreshExpiresIn),
            },
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map