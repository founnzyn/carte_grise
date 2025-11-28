import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto, ChangePasswordDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("./auth.service").AuthResponse>;
    login(loginDto: LoginDto): Promise<import("./auth.service").AuthResponse>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<import("./auth.service").AuthTokens>;
    logout(req: {
        user: {
            id: string;
        };
    }): Promise<{
        message: string;
    }>;
    changePassword(req: {
        user: {
            id: string;
        };
    }, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
