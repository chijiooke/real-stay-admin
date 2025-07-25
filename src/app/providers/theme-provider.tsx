// components/mui-theme-provider.tsx
"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../lib/theme";

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
