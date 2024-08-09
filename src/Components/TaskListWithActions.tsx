// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './TaskListWithActions.css';
// import { useNavigate } from 'react-router-dom';

// interface Task {
//   taskId: number;
//   title: string;
//   description: string;
//   isCompleted: boolean;
//   priority: number;
//   dueDate: string;
//   name: string;
//   user: {
//     name: string;
//     designation?: string;
//     address?: string;
//     password?: string;
//     email?: string;
//   } | null;
// }

// const TaskListWithActions: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('https://localhost:7280/api/TaskAPI');
//         console.log('Fetched tasks:', response.data); // Log fetched tasks
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleDelete = async (taskId: number) => {
//     console.log(`Deleting task with id: ${taskId}`);
//     try {
//       const response = await axios.delete(`https://localhost:7280/api/TaskAPI/${taskId}`);
//       console.log('Delete response:', response);
//       if (response.status === 200) {
//         setTasks(tasks.filter(task => task.taskId !== taskId));
//       }
//     } catch (error) {
//       console.error('Error deleting task', error);
//     }
//   };

//   const handleEdit = (taskId: number) => {
//     console.log(`Editing task with id: ${taskId}`);
//     navigate(`/edit-task/${taskId}`);
//   };

//   return (
//     <div className="task-list">
//       <h2>Task List</h2>
//       <ul>
//         {tasks.map(task => (
//           <li key={task.taskId} className="task-item">
//             <div className="task-details">
//               <span className="task-title">{task.title}</span>
//               <span>{task.description}</span>
//               <span>{task.dueDate}</span>
//               <span>{task.priority}</span>
//               <span>{task.isCompleted ? 'Completed' : 'Not Completed'}</span>
//               <span>{task.user?.name}</span>
//             </div>
//             <div className="task-actions">
//               <button className="edit-btn" onClick={() => handleEdit(task.taskId)}>Edit</button>
//               <button className="delete-btn" onClick={() => handleDelete(task.taskId)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskListWithActions;


// TaskListWithActions.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskListWithActions.css';
import { useNavigate } from 'react-router-dom';

interface Task {
  taskId: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: number;
  dueDate: string;
  name: string;
  user: {
    name: string;
    designation?: string;
    address?: string;
    password?: string;
    email?: string;
  } | null;
  category: {
    categoryId: number;
    name: string;
  } | null;
}

const TaskListWithActions: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://localhost:7280/api/TaskAPI');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId: number) => {
    try {
      const response = await axios.delete(`https://localhost:7280/api/TaskAPI/${taskId}`);
      if (response.status === 200) {
        setTasks(tasks.filter(task => task.taskId !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleEdit = (taskId: number) => {
    navigate(`/edit-task/${taskId}`);
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.taskId} className="task-item">
            <div className="task-details">
              <span className="task-title">{task.title}</span>
              <span>{task.description}</span>
              <span>{task.dueDate}</span>
              <span>{task.priority}</span>
              <span>{task.isCompleted ? 'Completed' : 'Not Completed'}</span>
              <span>{task.user?.name}</span>
              <span>{task.category?.name}</span>
            </div>
            <div className="task-actions">
              <button className="edit-btn" onClick={() => handleEdit(task.taskId)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(task.taskId)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListWithActions;

