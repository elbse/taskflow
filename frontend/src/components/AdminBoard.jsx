import { useState, useEffect } from 'react';
import apiClient from '../api/client';
import TicketCard from './TicketCard';

export default function AdminBoard(){
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        apiClient.get('/tasks')
            .then((response)=> setTasks(response.data))
            .catch((error)=> console.error('Failed to fetch tasks:', error));

        apiClient.get('/users')
            .then((response)=> setEmployees(response.data))
            .catch((error)=> console.error('Failed to fetch employees:', error));

    
    }, []);

    const pendingTasks = tasks.filter((task) => task.status === 'pending');
    const inProgressTasks = tasks.filter((task) => task.status === 'in_progress');
    const completedTasks = tasks.filter((task) => task.status === 'completed');
    
    return (
        <div>
            <div>
                <h3>Pending Tasks ({pendingTasks.length})</h3>
                {pendingTasks.map((task)=>(
                    <TicketCard key={task.id} task={task} />
                ))}
            </div>
            <div>
                <h3>Progress Task ({inProgressTasks.length})</h3>
                {inProgressTasks.map((task)=>(
                    <TicketCard key={task.id} task={task} />
                ))}
            </div>
            <div>
                <h3>Completed Task ({completedTasks.length})</h3>
                {completedTasks.map((task)=>(
                    <TicketCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}
