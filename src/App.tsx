// import React from 'react';
// import './App.css';
// import Login from './Components/Users';
// import CreateTask from './Components/CreateTask';
// import TaskList from './Components/TaskList';
// import TaskListWithActions from './Components/TaskListWithActions';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import EditTask from './Components/EditTask'; // Ensure this file exists and is correctly defined

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<TaskListWithActions />} />
//         <Route path="/edit-task/:id" element={<EditTask />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// App.tsx
// App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import TaskListWithActions from './Components/TaskListWithActions';
// import EditTask from './Components/EditTask';
// import UserCreates from './Components/UserCreates'
// const App: React.FC = () => {
//   return (
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<TaskListWithActions />} />
//     //     <Route path="/edit-task/:taskId" element={<EditTask />} />
//     //   </Routes>
//     // </Router>
//     <>
//     <UserCreates/>
//     </>
//   );
// };

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from './Components/Dashboard';
// import CreateTask from './Components/CreateTask'; // Ensure CreateTask is correctly imported
// import CreateUser from './Components/UserCreates';
// import TaskListWithActions from './Components/TaskListWithActions';
// import TaskList from './Components/TaskList';

// const App: React.FC = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/create-task" element={<CreateTask token={localStorage.getItem('authToken') || ''} />} />
//                 <Route path="/create-user" element={<CreateUser />} />
//                 <Route path="/task-list-with-actions" element={<TaskListWithActions />} />
//                 <Route path="/task-list" element={<TaskList />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Dashboard from './Components/Dashboard';
// import CreateTask from './Components/CreateTask';
// import CreateUser from './Components/UserCreates';
// import TaskListWithActions from './Components/TaskListWithActions';
// import TaskList from './Components/TaskList';
// import Login from './Components/Users'; // Ensure Login is correctly imported

// const App: React.FC = () => {
//     const authToken = localStorage.getItem('authToken');

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/login" element={<Login />} />
//                 {authToken ? (
//                     <>
//                         <Route path="/" element={<Dashboard />} />
//                         <Route path="/create-task" element={<CreateTask token={authToken} />} />
//                         <Route path="/create-user" element={<CreateUser />} />
//                         <Route path="/task-list-with-actions" element={<TaskListWithActions />} />
//                         <Route path="/task-list" element={<TaskList />} />
//                     </>
//                 ) : (
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 )}
//             </Routes>
//         </Router>
//     );
// };

// export default App;

//good



import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import CreateTask from './Components/CreateTask';
import CreateUser from './Components/UserCreates';
import TaskListWithActions from './Components/TaskListWithActions';
import TaskList from './Components/TaskList';
import Login from './Components/Users';

const App: React.FC = () => {
    const authToken = localStorage.getItem('authToken');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                {authToken ? (
                    <>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/create-task" element={<CreateTask token={authToken} />} />
                        <Route path="/create-user" element={<CreateUser />} />
                        <Route path="/task-list-with-actions" element={<TaskListWithActions />} />
                        <Route path="/task-list" element={<TaskList />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </Router>
    );
};

export default App;
