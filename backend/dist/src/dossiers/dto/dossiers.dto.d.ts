export declare enum DossierStatus {
    DRAFT = "DRAFT",
    SUBMITTED = "SUBMITTED",
    DOCUMENTS_PENDING = "DOCUMENTS_PENDING",
    UNDER_REVIEW = "UNDER_REVIEW",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    ANTS_SUBMITTED = "ANTS_SUBMITTED",
    COMPLETED = "COMPLETED"
}
export declare enum FuelType {
    ESSENCE = "ESSENCE",
    DIESEL = "DIESEL",
    HYBRIDE = "HYBRIDE",
    ELECTRIQUE = "ELECTRIQUE",
    GPL = "GPL",
    HYDROGENE = "HYDROGENE",
    AUTRE = "AUTRE"
}
export declare enum TransactionType {
    ACHAT_NEUF = "ACHAT_NEUF",
    ACHAT_OCCASION = "ACHAT_OCCASION",
    CHANGEMENT_ADRESSE = "CHANGEMENT_ADRESSE",
    DUPLICATA = "DUPLICATA",
    CESSION = "CESSION",
    HERITAGE = "HERITAGE"
}
export declare class VehicleDto {
    registrationNumber?: string;
    vin?: string;
    brand: string;
    model: string;
    version?: string;
    firstRegistrationDate?: string;
    purchaseDate?: string;
    fiscalPower: number;
    co2Emissions?: number;
    fuelType: FuelType;
    mileage?: number;
    isNew?: boolean;
}
export declare class OwnerDto {
    firstName: string;
    lastName: string;
    birthDate?: string;
    birthPlace?: string;
    address: string;
    postalCode: string;
    city: string;
}
export declare class CreateDossierDto {
    transactionType: TransactionType;
    vehicle: VehicleDto;
    owner: OwnerDto;
    departmentCode: string;
}
export declare class UpdateDossierDto {
    status?: DossierStatus;
    vehicle?: Partial<VehicleDto>;
    owner?: Partial<OwnerDto>;
    internalNotes?: string;
}
export declare class UpdateDossierStatusDto {
    status: DossierStatus;
    comment?: string;
    rejectionReason?: string;
}
export declare class SubmitToAntsDto {
    dossierId: string;
    antsReference?: string;
}
export declare class DossierFilterDto {
    status?: DossierStatus;
    transactionType?: TransactionType;
    search?: string;
    page?: number;
    limit?: number;
}
