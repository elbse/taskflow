import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import DispatchHeader from './components/DispatchHeader';
import StatusChip from './components/StatusChip';
import EmployeeAvatar from './components/EmployeeAvatar';

const dummyEmployees = [
  { id: 2, name: 'Employee User' },
  { id: 3, name: 'Test Person' },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4 }}>
        <DispatchHeader
          mode="admin"
          onModeChange={() => {}}
          employees={dummyEmployees}
          employeeId={dummyEmployees[0].id}
          onEmployeeChange={() => {}}
          onNewTask={() => alert('new task clicked')}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <StatusChip status="pending" />
          <StatusChip status="in_progress" />
          <StatusChip status="completed" />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
          {dummyEmployees.map((emp) => (
            <EmployeeAvatar key={emp.id} user={emp} />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;