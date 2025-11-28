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
exports.TaxCalculatorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tax_calculator_service_1 = require("./tax-calculator.service");
const tax_calculator_dto_1 = require("./dto/tax-calculator.dto");
let TaxCalculatorController = class TaxCalculatorController {
    taxCalculatorService;
    constructor(taxCalculatorService) {
        this.taxCalculatorService = taxCalculatorService;
    }
    async calculateTax(dto) {
        return this.taxCalculatorService.calculateTax(dto);
    }
    async getDepartments() {
        return this.taxCalculatorService.getDepartments();
    }
    async getEcoMalusThresholds() {
        return this.taxCalculatorService.getEcoMalusThresholds();
    }
};
exports.TaxCalculatorController = TaxCalculatorController;
__decorate([
    (0, common_1.Post)('calculate'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculer le coût de la carte grise' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Calcul effectué', type: tax_calculator_dto_1.TaxCalculationResult }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tax_calculator_dto_1.CalculateTaxDto]),
    __metadata("design:returntype", Promise)
], TaxCalculatorController.prototype, "calculateTax", null);
__decorate([
    (0, common_1.Get)('departments'),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des départements avec leurs taux' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des départements' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaxCalculatorController.prototype, "getDepartments", null);
__decorate([
    (0, common_1.Get)('eco-malus'),
    (0, swagger_1.ApiOperation)({ summary: 'Barème du malus écologique' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Barème du malus' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaxCalculatorController.prototype, "getEcoMalusThresholds", null);
exports.TaxCalculatorController = TaxCalculatorController = __decorate([
    (0, swagger_1.ApiTags)('Tax Calculator'),
    (0, common_1.Controller)('tax-calculator'),
    __metadata("design:paramtypes", [tax_calculator_service_1.TaxCalculatorService])
], TaxCalculatorController);
//# sourceMappingURL=tax-calculator.controller.js.map