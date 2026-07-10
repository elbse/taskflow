import { createTheme } from '@mui/material/styles';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/jetbrains-mono/800.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F2EEE3',
      paper: '#EAE4D4',
    },
    primary: {
      main: '#B23A2E',
      contrastText: '#F2EEE3',
    },
    text: {
      primary: '#211D18',
      secondary: '#6b6558',
    },
    divider: '#d8d0bd',
  },
  typography: {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: '1px' },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1.5px solid #211D18',
          boxShadow: '4px 4px 0 rgba(33,29,24,0.12)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: '1.5px solid #211D18',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          border: '2px solid currentColor',
          borderRadius: 3,
          fontWeight: 800,
          letterSpacing: '1.5px',
          fontSize: '10.5px',
        },
      },
    },
  },
});

export default theme;