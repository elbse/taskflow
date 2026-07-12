import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export default function DispatchHeader({
  mode,
  onModeChange,
  employees,
  employeeId,
  onEmployeeChange,
  onNewTask,
  onNewEmployee,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid',
        borderColor: 'text.primary',
        pb: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            border: '2px solid',
            borderColor: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 15,
            transform: 'rotate(-3deg)',
          }}
        >
          TW
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 21 }}>Dispatch Desk</Typography>
          <Typography sx={{ fontSize: 11, color: 'text.secondary', letterSpacing: '1.5px' }}>
            TEAM TASK & WORKLOAD MANAGER
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {mode === 'employee' && (
          <Select
            size="small"
            value={employeeId ?? ''}
            onChange={(e) => onEmployeeChange(Number(e.target.value))}
          >
            {employees.map((emp) => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.name}
              </MenuItem>
            ))}
          </Select>
        )}

        {mode === 'admin' && (
          <>
            <Button variant="outlined" onClick={onNewEmployee}>
              + Add employee
            </Button>
            <Button variant="contained" onClick={onNewTask}>
              + Create task
            </Button>
          </>
        )}

        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(e, newMode) => newMode && onModeChange(newMode)}
          size="small"
        >
          <ToggleButton value="admin">Admin</ToggleButton>
          <ToggleButton value="employee">Employee</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}