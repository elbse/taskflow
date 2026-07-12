import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import apiClient from './api/client';
import DispatchHeader from './components/Header';
import AdminBoard from './components/AdminBoard';
import EmployeeBoard from './components/EmployeeBoard';
import CreateTaskDrawer from './components/CreateTaskDrawer';
import CreateEmployeeDrawer from './components/CreateEmployeeDrawer';

function App() {
  const [mode, setMode] = useState('admin');
  const [employeeId, setEmployeeId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [employeeDrawerOpen, setEmployeeDrawerOpen] = useState(true);

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
          onNewTask={() => setDrawerOpen(true)}
          onNewEmployee={() => setEmployeeDrawerOpen(true)}
        />

        {mode === 'admin' ? (
          <AdminBoard refreshKey={refreshKey} />
        ) : (
          <EmployeeBoard employeeId={employeeId} />
        )}
      </Box>
      <CreateTaskDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        employees={employees}
        onTaskCreated={() => setRefreshKey((k) => k + 1)}
      />
      <CreateEmployeeDrawer
        open={employeeDrawerOpen}
        onClose={() => setEmployeeDrawerOpen(false)}
        onEmployeeCreated={(newEmployee) => {
          setEmployees((prev) => [...prev, newEmployee]);
        }}
      />
      </ThemeProvider>

  );
}

export default App;