import { processApi } from "@/features/processing/process.api";
import snackbarReducer from "@/shared/ui/snackbar.slice";
import authReducer from "@/features/auth/auth.slice";
import { authApi } from "@/features/auth/auth.api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackbarReducer,
        [authApi.reducerPath]: authApi.reducer,
        [processApi.reducerPath]: processApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            processApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;