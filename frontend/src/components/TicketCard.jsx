import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StatusChip from './StatusChip';
import EmployeeAvatar from './EmployeeAvatar';

export default function TicketCard({ task, onAdvance }) {
  const assignedUsers = task.users ?? [];

  const nextStatus =
    task.status === 'pending' ? 'in_progress' :
    task.status === 'in_progress' ? 'completed' :
    null;

  const buttonLabel = task.status === 'pending' ? 'Start' : 'Complete';

  return (
    <Paper sx={{ p: 2.25, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography sx={{ fontSize: 10, color: 'text.secondary', letterSpacing: '1px', fontWeight: 600 }}>
          TASK
        </Typography>
        <Typography sx={{ fontSize: 10, color: 'text.secondary', letterSpacing: '1px', fontWeight: 600 }}>
          #{task.id}
        </Typography>
      </Box>

      <Typography sx={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.35, mb: 1 }}>
        {task.title}
      </Typography>

      <Typography sx={{ fontSize: 11.5, color: 'text.secondary', lineHeight: 1.55, mb: 1.75 }}>
        {task.description}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.75 }}>
        <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>Assigned to</Typography>
        <Box sx={{ display: 'flex' }}>
          {assignedUsers.length === 0 ? (
            <Typography sx={{ fontSize: 11, fontStyle: 'italic', color: 'text.secondary' }}>
              — unassigned —
            </Typography>
          ) : (
            assignedUsers.map((user, i) => (
              <Box key={user.id} sx={{ ml: i === 0 ? 0 : -0.75 }}>
                <EmployeeAvatar user={user} />
              </Box>
            ))
          )}
        </Box>
      </Box>

      <Box sx={{ borderTop: '1px dashed', borderColor: 'divider', pt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StatusChip status={task.status} />
        {onAdvance && nextStatus && (
          <Button size="small" variant="contained" onClick={() => onAdvance(task.id, nextStatus)}>
            {buttonLabel}
          </Button>
        )}
      </Box>
    </Paper>
  );
}