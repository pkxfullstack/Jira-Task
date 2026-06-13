import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SignupRequest, SignupResponse } from "./auth.types";
import { API_CONFIG } from "@/config/api.config";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        systemRole: string;
    };
}

export const authApi = createApi({
    reducerPath: "authApi",

    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.BASE_URL,
    }),

    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
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
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
} = authApi;