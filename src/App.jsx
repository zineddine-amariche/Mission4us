import React, { useEffect, useMemo } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import MainRoutes from "./Routes/Routes";
import { themeSettings } from "./themeUi";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

import "./styles.css";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
      <ThemeProvider theme={theme}>
      <Toaster />

        <CssBaseline />
        <MainRoutes />
      </ThemeProvider>
  );
}

export default App;
