import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "@/App.tsx";
import { theme } from "@/theme/theme";
import AppSnackbar from "./shared/components/AppSnackbar";
import { persistor, store } from "./store/store";

// import '@/index.css'

// Remove auth data saved by the previous redux-persist implementation.
localStorage.removeItem("persist:root");
const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found");
}

createRoot(root).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
				<AppSnackbar />
			</ThemeProvider>
		</PersistGate>
	</Provider>,
);
