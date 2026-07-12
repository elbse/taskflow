import { useState } from 'react';
import apiClient from '../api/client';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EmployeeAvatar from './EmployeeAvatar';

export default function CreateTaskDrawer({ open, onClose, employees, onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const toggleUser = (userId) => {
    setSelectedUserIds((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

  const newTask = {
      title,
      description,
      user_ids: selectedUserIds,
  };

    apiClient.post('/tasks', newTask)
      .then((response) => {
        onTaskCreated(response.data);
        onClose();
        setTitle('');
        setDescription('');
        setSelectedUserIds([]);
      })
      .catch((error) => console.error('Failed to create task:', error));
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 380, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid', borderColor: 'text.primary', pb: 1.5, mb: 2.5 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: '1.5px' }}>
            NEW WORK ORDER
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', color: 'text.secondary', textTransform: 'uppercase', mb: 0.75 }}>
          Title
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Rebuild expense-report PDF export"
          sx={{ mb: 2 }}
        />

        <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', color: 'text.secondary', textTransform: 'uppercase', mb: 0.75 }}>
          Description
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What needs to happen, and any notes for the crew..."
          sx={{ mb: 2 }}
        />

        <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', color: 'text.secondary', textTransform: 'uppercase', mb: 0.75 }}>
          Assign employees ({selectedUserIds.length} selected)
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
          {employees.map((emp) => (
            <Box
              key={emp.id}
              onClick={() => toggleUser(emp.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                py: 1,
                borderBottom: '1px dashed',
                borderColor: 'divider',
                cursor: 'pointer',
                backgroundColor: selectedUserIds.includes(emp.id) ? 'rgba(178,58,46,0.08)' : 'transparent',
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  border: '1.5px solid',
                  borderColor: 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                  color: 'primary.main',
                  flexShrink: 0,
                }}
              >
                {selectedUserIds.includes(emp.id) ? '×' : ''}
              </Box>
              <EmployeeAvatar user={emp} size={22} />
              <Typography sx={{ fontSize: 12 }}>{emp.name}</Typography>
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ py: 1.5, fontSize: 12 }}
        >
          FILE WORK ORDER →
        </Button>
      </Box>
    </Drawer>
  );
}