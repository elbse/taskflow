import { useEffect, useState } from 'react';
import apiClient from './api/client';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    apiClient.get('/users')
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error('API error:', error));
  }, []);

  return (
    <div>
      <h1>Employee List Test</h1>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>{emp.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;