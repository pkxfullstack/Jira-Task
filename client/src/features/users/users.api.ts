import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../processing/process.type";
import { API_CONFIG } from "@/config/api.config";
import type { userData } from "./users.type";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.BASE_URL,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getUser: builder.query<userData[], { page: number; limit: number }>({
            query: ({ page, limit }) =>
                `/users?page=${page}&limit=${limit}`,
            transformResponse: (response: ApiResponse<userData[]>) => response.data,
        }),
    }),
})

export const { useGetUserQuery } = usersApi;