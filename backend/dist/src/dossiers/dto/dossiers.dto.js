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
exports.DossierFilterDto = exports.SubmitToAntsDto = exports.UpdateDossierStatusDto = exports.UpdateDossierDto = exports.CreateDossierDto = exports.OwnerDto = exports.VehicleDto = exports.TransactionType = exports.FuelType = exports.DossierStatus = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var DossierStatus;
(function (DossierStatus) {
    DossierStatus["DRAFT"] = "DRAFT";
    DossierStatus["SUBMITTED"] = "SUBMITTED";
    DossierStatus["DOCUMENTS_PENDING"] = "DOCUMENTS_PENDING";
    DossierStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    DossierStatus["APPROVED"] = "APPROVED";
    DossierStatus["REJECTED"] = "REJECTED";
    DossierStatus["ANTS_SUBMITTED"] = "ANTS_SUBMITTED";
    DossierStatus["COMPLETED"] = "COMPLETED";
})(DossierStatus || (exports.DossierStatus = DossierStatus = {}));
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
class VehicleDto {
    registrationNumber;
    vin;
    brand;
    model;
    version;
    firstRegistrationDate;
    purchaseDate;
    fiscalPower;
    co2Emissions;
    fuelType;
    mileage;
    isNew;
}
exports.VehicleDto = VehicleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'AB-123-CD' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'VF1RFA00000000000' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleDto.prototype, "vin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Renault' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], VehicleDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Clio' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], VehicleDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1.5 dCi 90' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2020-01-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], VehicleDto.prototype, "firstRegistrationDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2023-06-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], VehicleDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], VehicleDto.prototype, "fiscalPower", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Number)
], VehicleDto.prototype, "co2Emissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: FuelType }),
    (0, class_validator_1.IsEnum)(FuelType),
    __metadata("design:type", String)
], VehicleDto.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], VehicleDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VehicleDto.prototype, "isNew", void 0);
class OwnerDto {
    firstName;
    lastName;
    birthDate;
    birthPlace;
    address;
    postalCode;
    city;
}
exports.OwnerDto = OwnerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jean' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], OwnerDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dupont' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], OwnerDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1980-05-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], OwnerDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Paris' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OwnerDto.prototype, "birthPlace", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12 rue de la Paix' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], OwnerDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '75001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], OwnerDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Paris' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], OwnerDto.prototype, "city", void 0);
class CreateDossierDto {
    transactionType;
    vehicle;
    owner;
    departmentCode;
}
exports.CreateDossierDto = CreateDossierDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: TransactionType }),
    (0, class_validator_1.IsEnum)(TransactionType),
    __metadata("design:type", String)
], CreateDossierDto.prototype, "transactionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: VehicleDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => VehicleDto),
    __metadata("design:type", VehicleDto)
], CreateDossierDto.prototype, "vehicle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: OwnerDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OwnerDto),
    __metadata("design:type", OwnerDto)
], CreateDossierDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '75', description: 'Code département' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDossierDto.prototype, "departmentCode", void 0);
class UpdateDossierDto {
    status;
    vehicle;
    owner;
    internalNotes;
}
exports.UpdateDossierDto = UpdateDossierDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: DossierStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(DossierStatus),
    __metadata("design:type", String)
], UpdateDossierDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: VehicleDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => VehicleDto),
    __metadata("design:type", Object)
], UpdateDossierDto.prototype, "vehicle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: OwnerDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OwnerDto),
    __metadata("design:type", Object)
], UpdateDossierDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDossierDto.prototype, "internalNotes", void 0);
class UpdateDossierStatusDto {
    status;
    comment;
    rejectionReason;
}
exports.UpdateDossierStatusDto = UpdateDossierStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DossierStatus }),
    (0, class_validator_1.IsEnum)(DossierStatus),
    __metadata("design:type", String)
], UpdateDossierStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDossierStatusDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDossierStatusDto.prototype, "rejectionReason", void 0);
class SubmitToAntsDto {
    dossierId;
    antsReference;
}
exports.SubmitToAntsDto = SubmitToAntsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitToAntsDto.prototype, "dossierId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitToAntsDto.prototype, "antsReference", void 0);
class DossierFilterDto {
    status;
    transactionType;
    search;
    page;
    limit;
}
exports.DossierFilterDto = DossierFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: DossierStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(DossierStatus),
    __metadata("design:type", String)
], DossierFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: TransactionType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TransactionType),
    __metadata("design:type", String)
], DossierFilterDto.prototype, "transactionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DossierFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DossierFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DossierFilterDto.prototype, "limit", void 0);
//# sourceMappingURL=dossiers.dto.js.map