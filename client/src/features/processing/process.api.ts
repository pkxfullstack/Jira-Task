import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse, LogsData } from './process.type.js';
import { API_CONFIG } from "@/config/api.config";

export const processApi = createApi({
    reducerPath: "processApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.BASE_URL,
    }),
    endpoints: (builder) => ({
        getLogs: builder.query<LogsData[], { page: number; limit: number }>({
            query: ({ page, limit }) => `/process/issues/logs/list?page=${page}&limit=${limit}`,
            transformResponse: (response: ApiResponse<LogsData[]>) => response.data,
        }),
    }),
});

export const { useGetLogsQuery } = processApi;