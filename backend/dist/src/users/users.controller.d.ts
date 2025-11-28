import { UsersService } from './users.service';
import { UpdateProfileDto, AddAddressDto, DeleteAccountDto } from './dto/users.dto';
interface AuthenticatedRequest {
    user: {
        id: string;
        role: string;
    };
}
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: AuthenticatedRequest): Promise<{
        addresses: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            street: string;
            complement: string | null;
            postalCode: string;
            city: string;
            country: string;
            isDefault: boolean;
        }[];
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        companyName: string | null;
        siretNumber: string | null;
        id: string;
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
    updateProfile(req: AuthenticatedRequest, dto: UpdateProfileDto): Promise<{
        addresses: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            street: string;
            complement: string | null;
            postalCode: string;
            city: string;
            country: string;
            isDefault: boolean;
        }[];
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        companyName: string | null;
        siretNumber: string | null;
        id: string;
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
    addAddress(req: AuthenticatedRequest, dto: AddAddressDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        street: string;
        complement: string | null;
        postalCode: string;
        city: string;
        country: string;
        isDefault: boolean;
    }>;
    updateAddress(req: AuthenticatedRequest, id: string, dto: AddAddressDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        street: string;
        complement: string | null;
        postalCode: string;
        city: string;
        country: string;
        isDefault: boolean;
    }>;
    deleteAddress(req: AuthenticatedRequest, id: string): Promise<{
        message: string;
    }>;
    exportData(req: AuthenticatedRequest): Promise<{
        exportDate: string;
        userData: {
            dossiers: ({
                vehicle: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    registrationNumber: string | null;
                    vin: string | null;
                    brand: string;
                    model: string;
                    version: string | null;
                    firstRegistrationDate: Date | null;
                    purchaseDate: Date | null;
                    fiscalPower: number;
                    co2Emissions: number | null;
                    fuelType: import("@prisma/client").$Enums.FuelType;
                    mileage: number | null;
                    isNew: boolean;
                };
                documents: {
                    type: string;
                    id: string;
                    createdAt: Date;
                    fileName: string;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                reference: string;
                vehicleId: string;
                transactionType: import("@prisma/client").$Enums.TransactionType;
                status: import("@prisma/client").$Enums.DossierStatus;
                ownerFirstName: string;
                ownerLastName: string;
                ownerBirthDate: Date | null;
                ownerBirthPlace: string | null;
                ownerAddress: string;
                ownerPostalCode: string;
                ownerCity: string;
                regionalTax: number;
                managementFee: number;
                deliveryFee: number;
                ecoMalus: number;
                totalAmount: number;
                isPaid: boolean;
                paymentDate: Date | null;
                paymentReference: string | null;
                antsReference: string | null;
                antsSubmittedAt: Date | null;
                antsStatus: string | null;
                deliveryMethod: string | null;
                trackingNumber: string | null;
                deliveredAt: Date | null;
                internalNotes: string | null;
                rejectionReason: string | null;
            })[];
            notifications: {
                type: string;
                title: string;
                message: string;
                id: string;
                createdAt: Date;
                userId: string;
                isRead: boolean;
                readAt: Date | null;
                metadata: import("@prisma/client/runtime/client").JsonValue | null;
            }[];
            addresses: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                street: string;
                complement: string | null;
                postalCode: string;
                city: string;
                country: string;
                isDefault: boolean;
            }[];
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            companyName: string | null;
            siretNumber: string | null;
            id: string;
            isEmailVerified: boolean;
            isActive: boolean;
            lastLoginAt: Date | null;
            rgpdConsentAt: Date | null;
            rgpdConsentVersion: string | null;
            dataRetentionExpiry: Date | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    deleteAccount(req: AuthenticatedRequest, dto: DeleteAccountDto): Promise<{
        message: string;
    }>;
    findAll(req: AuthenticatedRequest, page?: number, limit?: number, search?: string): Promise<{
        data: {
            email: string;
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.UserRole;
            companyName: string | null;
            id: string;
            isEmailVerified: boolean;
            isActive: boolean;
            lastLoginAt: Date | null;
            createdAt: Date;
            _count: {
                dossiers: number;
            };
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    } | {
        error: string;
    }>;
    findOne(req: AuthenticatedRequest, id: string): Promise<{
        addresses: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            street: string;
            complement: string | null;
            postalCode: string;
            city: string;
            country: string;
            isDefault: boolean;
        }[];
        _count: {
            dossiers: number;
            notifications: number;
        };
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        companyName: string | null;
        siretNumber: string | null;
        id: string;
        isEmailVerified: boolean;
        isActive: boolean;
        lastLoginAt: Date | null;
        rgpdConsentAt: Date | null;
        rgpdConsentVersion: string | null;
        dataRetentionExpiry: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    } | {
        error: string;
    }>;
    toggleStatus(req: AuthenticatedRequest, id: string, isActive: boolean): Promise<{
        email: string;
        id: string;
        isActive: boolean;
    } | {
        error: string;
    }>;
}
export {};
