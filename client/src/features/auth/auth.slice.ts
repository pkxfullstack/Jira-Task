import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./auth.types";

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (state, action: PayloadAction<User>) => {
			console.log("loginSuccess action.payload:", action.payload);
			state.user = action.payload;
			state.isAuthenticated = true;
		},

		updateUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},

		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
});

export const { loginSuccess, updateUser, logout } = authSlice.actions;

export default authSlice.reducer;
