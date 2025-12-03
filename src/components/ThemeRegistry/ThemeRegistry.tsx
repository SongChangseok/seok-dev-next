// src/components/ThemeRegistry/ThemeRegistry.tsx
"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { createTheme } from "@mui/material/styles";

// 커스텀 테마 설정 (기존 Tailwind 색상과 유사하게 설정)
const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // blue-600
    },
    secondary: {
      main: "#0891b2", // cyan-600
    },
    background: {
      default: "#f8fafc", // slate-50
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "-apple-system", "sans-serif"',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // 대문자 자동 변환 방지
          borderRadius: "12px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
