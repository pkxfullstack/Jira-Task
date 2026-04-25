import { processApi } from "@/features/processing/process.api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [processApi.reducerPath]: processApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(processApi.middleware),
});