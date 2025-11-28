"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("./users.service");
const users_dto_1 = require("./dto/users.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getProfile(req) {
        return this.usersService.getProfile(req.user.id);
    }
    async updateProfile(req, dto) {
        return this.usersService.updateProfile(req.user.id, dto);
    }
    async addAddress(req, dto) {
        return this.usersService.addAddress(req.user.id, dto);
    }
    async updateAddress(req, id, dto) {
        return this.usersService.updateAddress(req.user.id, id, dto);
    }
    async deleteAddress(req, id) {
        return this.usersService.deleteAddress(req.user.id, id);
    }
    async exportData(req) {
        return this.usersService.exportUserData(req.user.id);
    }
    async deleteAccount(req, dto) {
        return this.usersService.deleteAccount(req.user.id, dto);
    }
    async findAll(req, page, limit, search) {
        if (req.user.role !== 'ADMIN') {
            return { error: 'Accès non autorisé' };
        }
        return this.usersService.findAll(page, limit, search);
    }
    async findOne(req, id) {
        if (req.user.role !== 'ADMIN') {
            return { error: 'Accès non autorisé' };
        }
        return this.usersService.findOne(id);
    }
    async toggleStatus(req, id, isActive) {
        if (req.user.role !== 'ADMIN') {
            return { error: 'Accès non autorisé' };
        }
        return this.usersService.toggleUserStatus(id, isActive);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir son profil' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil utilisateur' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour son profil' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil mis à jour' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('addresses'),
    (0, swagger_1.ApiOperation)({ summary: 'Ajouter une adresse' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Adresse ajoutée' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.AddAddressDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addAddress", null);
__decorate([
    (0, common_1.Put)('addresses/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier une adresse' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Adresse modifiée' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, users_dto_1.AddAddressDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Delete)('addresses/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une adresse' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Adresse supprimée' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteAddress", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, swagger_1.ApiOperation)({ summary: 'Exporter ses données (RGPD)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Données exportées' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "exportData", null);
__decorate([
    (0, common_1.Delete)('account'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer son compte (RGPD)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Compte supprimé' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.DeleteAccountDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des utilisateurs (Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des utilisateurs' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détails d\'un utilisateur (Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Détails utilisateur' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Activer/Désactiver un utilisateur (Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statut modifié' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "toggleStatus", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map