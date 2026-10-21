import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { processApi } from "@/features/processing/process.api";
import { persistReducer, persistStore } from "redux-persist";
import snackbarReducer from "@/shared/ui/snackbar.slice";
import authReducer from "@/features/auth/auth.slice";
import { usersApi } from "@/features/users/users.api";
import { authApi } from "@/features/auth/auth.api";

const storage = createWebStorage("local");

const rootReducer = combineReducers({
	auth: authReducer,
	snackbar: snackbarReducer,
	[authApi.reducerPath]: authApi.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
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
			usersApi.middleware,
			processApi.middleware,
		),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
