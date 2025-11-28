import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, RefreshTokenDto, ChangePasswordDto } from './dto/auth.dto';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface AuthResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    };
    tokens: AuthTokens;
}
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<AuthTokens>;
    logout(userId: string, refreshToken?: string): Promise<void>;
    changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void>;
    validateUser(payload: JwtPayload): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        companyName: string | null;
        siretNumber: string | null;
        id: string;
        passwordHash: string;
        isEmailVerified: boolean;
        isActive: boolean;
        lastLoginAt: Date | null;
        rgpdConsentAt: Date | null;
        rgpdConsentVersion: string | null;
        dataRetentionExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    private generateTokens;
}
