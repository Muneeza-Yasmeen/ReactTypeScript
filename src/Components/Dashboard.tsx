import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Custom CSS for styling

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-links">
                <Link to="/create-task" className="dashboard-link">Create Task</Link>
                <Link to="/create-user" className="dashboard-link">Create User</Link>
                <Link to="/task-list-with-actions" className="dashboard-link">Task List with Actions</Link>
                <Link to="/task-list" className="dashboard-link">Task List</Link>
            </div>
        </div>
    );
};

export default Dashboard;
