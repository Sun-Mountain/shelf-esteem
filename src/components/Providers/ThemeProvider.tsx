'use client';

import { FC, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from '@lib/theme';

import { ProviderProps } from '@components/Providers/Provider';

const ThemeProvider: FC<ProviderProps> = ({children}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider