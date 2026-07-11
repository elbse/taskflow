import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import apiClient from './api/client';
import DispatchHeader from './components/DispatchHeader';
import AdminBoard from './components/AdminBoard';
import EmployeeBoard from './components/EmployeeBoard';

function App() {
  const [mode, setMode] = useState('admin');
  const [employeeId, setEmployeeId] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    apiClient.get('/users')
      .then((response) => {
        setEmployees(response.data);
        if (response.data.length > 0) {
          setEmployeeId(response.data[0].id);
        }
      })
      .catch((error) => console.error('Failed to fetch employees:', error));
  }, []);

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

        {mode === 'admin' ? (
          <AdminBoard employees={employees} />
        ) : (
          <EmployeeBoard employeeId={employeeId} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;