import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import DispatchHeader from './components/DispatchHeader';
import AdminBoard from './components/AdminBoard';
import EmployeeBoard from './components/EmployeeBoard';

function App() {
  const [mode, setMode] = useState('admin');
  const [employeeId, setEmployeeId] = useState(null);
  const [employees, setEmployees] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4 }}>
        <DispatchHeader
          mode={mode}
          onModeChange={setMode}
          employees={employees}
          employeeId={employeeId}
          onEmployeeChange={setEmployeeId}
          onNewTask={() => {}}
        />

        {mode === 'admin' ? <AdminBoard /> : <EmployeeBoard employeeId={employeeId} />}
      </Box>
    </ThemeProvider>
  );
}

export default App;