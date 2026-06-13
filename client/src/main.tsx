import AppSnackbar from "./shared/components/AppSnackbar";
import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from 'react-dom/client'
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { theme } from "@/theme/theme";
import App from '@/App.tsx'
// import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <AppSnackbar />
    </ThemeProvider>
  </Provider>
)
