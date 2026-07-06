import type { LoginInput } from "./auth.validation.js";
import type { RegisterData } from "./auth.types.js";
declare class AuthService {
    register(data: RegisterData): Promise<any>;
    login(data: LoginInput): Promise<{
        token: string;
        user: any;
    }>;
    getMe(user: RegisterData): Promise<RegisterData>;
}
export default AuthService;
//# sourceMappingURL=auth.service.d.ts.map