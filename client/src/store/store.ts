import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { authApi } from "@/features/auth/auth.api";
import authReducer from "@/features/auth/auth.slice";
import { processApi } from "@/features/processing/process.api";
import snackbarReducer from "@/shared/ui/snackbar.slice";

const storage = createWebStorage("local");

const rootReducer = combineReducers({
	auth: authReducer,
	snackbar: snackbarReducer,
	[authApi.reducerPath]: authApi.reducer,
	[processApi.reducerPath]: processApi.reducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"], // only auth persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			authApi.middleware,
			processApi.middleware,
		),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
