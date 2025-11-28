export declare class UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    companyName?: string;
    siretNumber?: string;
}
export declare class AddAddressDto {
    street: string;
    complement?: string;
    postalCode: string;
    city: string;
    country?: string;
    isDefault?: boolean;
}
export declare class RgpdExportRequestDto {
    email?: string;
}
export declare class DeleteAccountDto {
    password: string;
    reason?: string;
}
