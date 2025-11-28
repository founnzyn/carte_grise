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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxCalculationResult = exports.CalculateTaxDto = exports.TransactionType = exports.FuelType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var FuelType;
(function (FuelType) {
    FuelType["ESSENCE"] = "ESSENCE";
    FuelType["DIESEL"] = "DIESEL";
    FuelType["HYBRIDE"] = "HYBRIDE";
    FuelType["ELECTRIQUE"] = "ELECTRIQUE";
    FuelType["GPL"] = "GPL";
    FuelType["HYDROGENE"] = "HYDROGENE";
    FuelType["AUTRE"] = "AUTRE";
})(FuelType || (exports.FuelType = FuelType = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["ACHAT_NEUF"] = "ACHAT_NEUF";
    TransactionType["ACHAT_OCCASION"] = "ACHAT_OCCASION";
    TransactionType["CHANGEMENT_ADRESSE"] = "CHANGEMENT_ADRESSE";
    TransactionType["DUPLICATA"] = "DUPLICATA";
    TransactionType["CESSION"] = "CESSION";
    TransactionType["HERITAGE"] = "HERITAGE";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
class CalculateTaxDto {
    departmentCode;
    fiscalPower;
    fuelType;
    co2Emissions;
    transactionType;
    isNew;
    firstRegistrationDate;
}
exports.CalculateTaxDto = CalculateTaxDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '75', description: 'Code du département' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CalculateTaxDto.prototype, "departmentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7, description: 'Puissance fiscale du véhicule' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CalculateTaxDto.prototype, "fiscalPower", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: FuelType }),
    (0, class_validator_1.IsEnum)(FuelType),
    __metadata("design:type", String)
], CalculateTaxDto.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120, description: 'Émissions CO2 en g/km' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Number)
], CalculateTaxDto.prototype, "co2Emissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: TransactionType }),
    (0, class_validator_1.IsEnum)(TransactionType),
    __metadata("design:type", String)
], CalculateTaxDto.prototype, "transactionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Véhicule neuf' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CalculateTaxDto.prototype, "isNew", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2020-01-15', description: 'Date de première immatriculation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CalculateTaxDto.prototype, "firstRegistrationDate", void 0);
class TaxCalculationResult {
    regionalTax;
    managementFee;
    deliveryFee;
    ecoMalus;
    totalAmount;
    details;
}
exports.TaxCalculationResult = TaxCalculationResult;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Taxe régionale' }),
    __metadata("design:type", Number)
], TaxCalculationResult.prototype, "regionalTax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Frais de gestion' }),
    __metadata("design:type", Number)
], TaxCalculationResult.prototype, "managementFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Frais d\'acheminement' }),
    __metadata("design:type", Number)
], TaxCalculationResult.prototype, "deliveryFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Malus écologique' }),
    __metadata("design:type", Number)
], TaxCalculationResult.prototype, "ecoMalus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Montant total' }),
    __metadata("design:type", Number)
], TaxCalculationResult.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Détails du calcul' }),
    __metadata("design:type", Object)
], TaxCalculationResult.prototype, "details", void 0);
//# sourceMappingURL=tax-calculator.dto.js.map