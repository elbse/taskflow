import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import AdminBoard from './components/AdminBoard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4 }}>
        <AdminBoard />
      </Box>
    </ThemeProvider>
  );
}

export default App;