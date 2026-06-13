export interface User {
    id: string;
    name: string;
    email: string;
    profileImageUrl?: string;
    systemRole: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface SignupResponse {
    message: string;
    success: boolean;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: Record<string, string>;
}

export type ApiError = {
    success: boolean;
    message: string;
    errors?: Record<string, string>;
};