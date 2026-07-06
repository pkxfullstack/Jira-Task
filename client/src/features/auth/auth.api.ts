import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@/config/api.config";
import type { SignupRequest, SignupResponse, User } from "./auth.types";

export interface LoginRequest {
	email: string;
	password: string;
}

export interface AuthResponse {
	success: boolean;
	user: User;
}

interface LogoutResponse {
	success: boolean;
	message: string;
}

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: API_CONFIG.BASE_URL,
		credentials: "include",
	}),
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, LoginRequest>({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
		}),
		signup: builder.mutation<SignupResponse, SignupRequest>({
			query: (body) => ({
				url: "/auth/signup",
				method: "POST",
				body,
			}),
		}),
		getMe: builder.query<AuthResponse, void>({
			query: () => "/auth/me",
		}),
		logout: builder.mutation<LogoutResponse, void>({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useGetMeQuery,
	useLogoutMutation,
} = authApi;
