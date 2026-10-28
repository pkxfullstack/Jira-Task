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

export type ApiError = {
	success: boolean;
	message: string;
	errors?: Record<string, string>;
};
