export declare enum UserRole {
    CLIENT = "CLIENT",
    PROFESSIONAL = "PROFESSIONAL",
    ADMIN = "ADMIN"
}
export declare class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role?: UserRole;
    companyName?: string;
    siretNumber?: string;
    rgpdConsent: boolean;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    newPassword: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
