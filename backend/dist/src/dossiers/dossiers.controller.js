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
exports.DossiersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const dossiers_service_1 = require("./dossiers.service");
const dossiers_dto_1 = require("./dto/dossiers.dto");
let DossiersController = class DossiersController {
    dossiersService;
    constructor(dossiersService) {
        this.dossiersService = dossiersService;
    }
    async create(req, dto) {
        return this.dossiersService.create(req.user.id, dto);
    }
    async findAll(req, filters) {
        return this.dossiersService.findAll(req.user.id, req.user.role, filters);
    }
    async findOne(req, id) {
        return this.dossiersService.findOne(id, req.user.id, req.user.role);
    }
    async update(req, id, dto) {
        return this.dossiersService.update(id, req.user.id, req.user.role, dto);
    }
    async updateStatus(req, id, dto) {
        return this.dossiersService.updateStatus(id, req.user.id, req.user.role, dto);
    }
    async submitDossier(req, id) {
        return this.dossiersService.submitDossier(id, req.user.id);
    }
    async submitToAnts(req, id, dto) {
        return this.dossiersService.submitToAnts(id, req.user.id, req.user.role, dto.antsReference);
    }
    async delete(req, id) {
        return this.dossiersService.delete(id, req.user.id, req.user.role);
    }
};
exports.DossiersController = DossiersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau dossier de carte grise' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Dossier créé avec succès' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dossiers_dto_1.CreateDossierDto]),
    __metadata("design:returntype", Promise)
], DossiersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des dossiers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des dossiers' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dossiers_dto_1.DossierFilterDto]),
    __metadata("design:returntype", Promise)
], DossiersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détails d\'un dossier' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Détails du dossier' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Dossier non trouvé' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DossiersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier un dossier' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dossier modifié' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Modification non autorisée' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dossiers_dto_1.UpdateDossierDto]),
    __metadata("design:returntype", Promise)
], DossiersController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Changer le statut d\'un dossier (Admin/Pro)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statut mis à jour' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dossiers_dto_1.UpdateDossierStatusDto]),
    __metadata("design:returntype", Promise)
], DossiersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, swagger_1.ApiOperation)({ summary: 'Soumettre un dossier' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dossier soumis' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DossiersController.prototype, "submitDossier", null);
__decorate([
    (0, common_1.Post)(':id/ants'),
    (0, swagger_1.ApiOperation)({ summary: 'Soumettre à l\'ANTS (workflow interne)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dossier soumis à l\'ANTS' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dossiers_dto_1.SubmitToAntsDto]),
    __metadata("design:returntype", Promise)
], DossiersController.prototype, "submitToAnts", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un dossier (brouillon uniquement)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dossier supprimé' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DossiersController.prototype, "delete", null);
exports.DossiersController = DossiersController = __decorate([
    (0, swagger_1.ApiTags)('Dossiers'),
    (0, common_1.Controller)('dossiers'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [dossiers_service_1.DossiersService])
], DossiersController);
//# sourceMappingURL=dossiers.controller.js.map