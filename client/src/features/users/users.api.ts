import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse } from "../processing/process.type";
import type { userData } from "./users.type";

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: API_CONFIG.BASE_URL,
		credentials: "include",
	}),
	endpoints: (builder) => ({
		getUser: builder.query<userData[], { page: number; limit: number }>({
			query: ({ page, limit }) => `/users?page=${page}&limit=${limit}`,
			transformResponse: (response: ApiResponse<userData[]>) => response.data,
		}),
		createUser: builder.mutation<ApiResponse<userData>, Partial<userData>>({
			query: (body) => ({
				url: "/users",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useGetUserQuery, useCreateUserMutation } = usersApi;
