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
export declare class CalculateTaxDto {
    departmentCode: string;
    fiscalPower: number;
    fuelType: FuelType;
    co2Emissions?: number;
    transactionType: TransactionType;
    isNew?: boolean;
    firstRegistrationDate?: string;
}
export declare class TaxCalculationResult {
    regionalTax: number;
    managementFee: number;
    deliveryFee: number;
    ecoMalus: number;
    totalAmount: number;
    details: {
        departmentName: string;
        ratePerHp: number;
        exonerationApplied: boolean;
        exonerationRate?: number;
        vehicleAge?: number;
        ageReduction?: number;
    };
}
