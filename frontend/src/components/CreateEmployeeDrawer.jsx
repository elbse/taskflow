import { useState } from 'react';
import apiClient from '../api/client';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function CreateEmployeeDrawer({ open, onClose, onEmployeeCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) return;

    const newEmployee = { name, email, password };

    apiClient.post('/users', newEmployee)
      .then((response) => {
        onEmployeeCreated(response.data);
        onClose();
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch((error) => console.error('Failed to create employee:', error));
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 380, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid', borderColor: 'text.primary', pb: 1.5, mb: 2.5 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: '1.5px' }}>
            NEW CREW MEMBER
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', color: 'text.secondary', textTransform: 'uppercase', mb: 0.75 }}>
          Name
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Dante Cruz"
          sx={{ mb: 2 }}
        />

        <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', color: 'text.secondary', textTransform: 'uppercase', mb: 0.75 }}>
          Email
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. dante@company.com"
          sx={{ mb: 2 }}
        />

        <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', color: 'text.secondary', textTransform: 'uppercase', mb: 0.75 }}>
          Password
        </Typography>
        <TextField
          fullWidth
          size="small"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ py: 1.5, fontSize: 12 }}
        >
          ADD TO CREW →
        </Button>
      </Box>
    </Drawer>
  );
}