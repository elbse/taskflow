import { useState, useEffect } from 'react';
import apiClient from '../api/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TicketCard from './TicketCard';

export default function EmployeeBoard({ employeeId }) {

    const [tasks, setTasks] = useState([]);

    const handleAdvance = (taskId, newStatus)=> {
        apiClient.patch(`/tasks/${taskId}/status`, { status: newStatus })
        .then((response)=>{
            setTasks((prevTasks) => 
                prevTasks.map((task) => task.id === taskId ? response.data : task));
        })
        .catch((error)=> console.error('Failed to update task status:', error));
    }

    useEffect(() => {

        if(!employeeId) return;

        apiClient.get(`/my-tasks/${employeeId}`)
            .then((response) => setTasks(response.data))
            .catch((error) => console.error('Failed to fetch tasks:', error));
    }, [employeeId]);

    return (
    <Box>
      <Typography sx={{ fontSize: 19, fontWeight: 800, mb: 0.5 }}>
        My Work
      </Typography>
      <Typography sx={{ fontSize: 11, color: 'text.secondary', mb: 3 }}>
        {tasks.length} open ticket{tasks.length === 1 ? '' : 's'}
      </Typography>

     <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
        {tasks.map((task) => (
            <TicketCard key={task.id} task={task} onAdvance={handleAdvance} />
        ))}
        {tasks.length === 0 && (
            <Typography sx={{ fontSize: 12, fontStyle: 'italic', color: 'text.secondary' }}>
            Nothing assigned to you right now.
            </Typography>
        )}
    </Box>
    </Box>
  );
}