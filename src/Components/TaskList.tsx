// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './TaskList.css';

// interface Task {
//   title: string;
//   description: string;
//   isCompleted: boolean;
//   priority: number;
//   dueDate: string;
//   name: string;
//   categoryId: number;
//   user: {
//     name: string;
//     designation?: string;
//     address?: string;
//     password?: string;
//     email?: string;
//   };
//   category: {
//     categoryId: number;
//     name: string;
//   };
// }

// const TaskList: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('https://localhost:7280/api/TaskAPI');
//         setTasks(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching tasks');
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="task-list-container">
//       <h2>All Tasks</h2>
//       <div className="task-list">
//         {tasks.map((task, index) => (
//           <div key={index} className="task-card">
//             <h3>{task.title}</h3>
//             <p><strong>Description:</strong> {task.description}</p>
//             <p><strong>Priority:</strong> {task.priority}</p>
//             <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
//             <p><strong>Assigned To:</strong> {task.name}</p>
//             <p><strong>Category:</strong> {task.categoryId}</p>
//             <p><strong>Status:</strong> {task.isCompleted ? 'Completed' : 'Incomplete'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskList;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskList.css';

interface Task {
  title: string;
  description: string;
  isCompleted: boolean;
  priority: number;
  dueDate: string;
  name: string;
  categoryId: number;
  user: {
    name: string;
    designation?: string;
    address?: string;
    password?: string;
    email?: string;
  };
  category: {
    categoryId: number;
    name: string;
  };
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
  const [priority, setPriority] = useState<number | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://localhost:7280/api/TaskAPI');
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    return (
      (searchTitle === '' || task.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
      (isCompleted === null || task.isCompleted === isCompleted) &&
      (priority === null || task.priority === priority)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="task-list-container">
      <h2>All Tasks</h2>

      {/* Filter Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="filter-input"
        />

        <select
          value={isCompleted === null ? '' : isCompleted ? 'completed' : 'incomplete'}
          onChange={(e) => {
            const value = e.target.value;
            setIsCompleted(value === '' ? null : value === 'completed');
          }}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <select
          value={priority === null ? '' : priority}
          onChange={(e) => {
            const value = e.target.value;
            setPriority(value === '' ? null : parseInt(value, 10));
          }}
          className="filter-select"
        >
          <option value="">All Priorities</option>
          <option value="1">Priority 1</option>
          <option value="2">Priority 2</option>
          <option value="3">Priority 3</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.map((task, index) => (
          <div key={index} className="task-card">
            <h3>{task.title}</h3>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            <p><strong>Assigned To:</strong> {task.name}</p>
            <p><strong>Category:</strong> {task.categoryId}</p>
            <p><strong>Status:</strong> {task.isCompleted ? 'Completed' : 'Incomplete'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;






