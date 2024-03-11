import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#3d405b',
    },
    secondary: {
      main: '#f2cc8f',
    },
    tertiary: {
      main: '#babf95',
    },
    error: {
      main: '#c71f37',
    },
    success: {
      main: '#81b29a',
    },
    accent: {
      main: '#4361ee',
      contrastText: '#ffffff',
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;