import React from 'react';
import './UserTasks.css';

interface Task {
  taskId: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: number;
  dueDate: string;
  name: string;
  categoryId: number;
  user: {
    name: string;
    designation: string;
    address: string;
    password: string;
    email: string;
  };
  category: {
    categoryId: number;
    name: string;
  };
}

interface UserTasksProps {
  tasks: Task[];
}

const UserTasks: React.FC<UserTasksProps> = ({ tasks }) => {
  console.log('Rendered tasks:', tasks); // Log the tasks being rendered

  return (
    <div className="user-tasks-container">
      <h1 className="user-tasks-title">Your Tasks</h1>
      <ul className="user-tasks-list">
        {tasks.map(task => (
          <li key={task.taskId} className="user-task-item">
            <div className="task-header">
              <h2 className="task-title">{task.title}</h2>
              <p className={`task-priority priority-${task.priority}`}>Priority: {task.priority}</p>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-footer">
              <p className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p className="task-assignee">Assigned to: {task.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTasks;
