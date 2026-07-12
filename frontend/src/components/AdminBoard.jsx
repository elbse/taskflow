import { useState, useEffect } from 'react';
import apiClient from '../api/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TicketCard from './TicketCard';

export default function AdminBoard({refreshKey}){
    const [tasks, setTasks] = useState([]);
   
    useEffect(() => {
        apiClient.get('/tasks')
            .then((response)=> setTasks(response.data))
            .catch((error)=> console.error('Failed to fetch tasks:', error));

    }, [refreshKey]);

    const pendingTasks = tasks.filter((task) => task.status === 'pending');
    const inProgressTasks = tasks.filter((task) => task.status === 'in_progress');
    const completedTasks = tasks.filter((task) => task.status === 'completed');

    const handleDelete = (taskId) => {
    apiClient.delete(`/tasks/${taskId}`)
        .then(() => {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        })
        .catch((error) => console.error('Failed to delete task:', error));
    };
    
    return (
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '1.5px', mb: 1.75, borderBottom: '2px solid', borderColor: '#9E6B1F', pb: 1, color: '#9E6B1F' }}>
                PENDING ({pendingTasks.length})
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {pendingTasks.map((task) => (
                <TicketCard key={task.id} task={task} />
                ))}
            </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '1.5px', mb: 1.75, borderBottom: '2px solid', borderColor: '#2B4C7E', pb: 1, color: '#2B4C7E' }}>
                IN PROGRESS ({inProgressTasks.length})
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {inProgressTasks.map((task) => (
                <TicketCard key={task.id} task={task} />
                ))}
            </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '1.5px', mb: 1.75, borderBottom: '2px solid', borderColor: '#3F6B4F', pb: 1, color: '#3F6B4F' }}>
                COMPLETED ({completedTasks.length})
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {completedTasks.map((task) => (
                <TicketCard key={task.id} task={task} onDelete={handleDelete} />
                ))}
            </Box>
            </Box>
        </Box>
        );
}
