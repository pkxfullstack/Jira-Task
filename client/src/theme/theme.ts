// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#0D47A1",
		},
		secondary: {
			main: "#FF6F00",
		},
		success: {
			main: "#2E7D32",
		},
	},
	typography: {
		fontFamily: "Roboto, sans-serif",
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "uppercase",
					borderRadius: "8px",
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: "12px",
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "#1976d2",
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "#1976d2",
					},
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: {
					borderRadius: "12px",
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					"&.Mui-error": {
						color: "#d32f2f",
						marginLeft: 0,
						marginRight: 0,
					},
				},
			},
		},
	},
});
