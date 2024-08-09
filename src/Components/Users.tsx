

// import React, { useState } from 'react';
// import axios from 'axios';
// import Dashboard from './Dashboard';

// const Login: React.FC = () => {
//   const [Name, setUsername] = useState('');
//   const [Password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false); // State to manage admin status

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get(`https://localhost:7280/api/UsersAPI/${Name}`);
//       console.log(response.data); // Log the API response data for debugging

//       if (response.data.password === Password) {
//         if (response.data.designation && response.data.designation.toLowerCase() === 'admin') { // Ensure role check is case-insensitive
//           setMessage('Logged in successfully!');
//           setIsAdmin(true); // Set admin status to true
//         } else {
//           setMessage('You do not have admin privileges.');
//         }
//       } else {
//         setMessage('Invalid username or password');
//       }
//     } catch (error) {
//       setMessage('Invalid username or password');
//     }
//   };

//   return (
//     <div className="wrapper">
//       {!isAdmin ? (
//         <>
//           <div className="logo">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Alternate_Task_Manager_icon.png" alt="Task Manager Logo" />
//           </div>
//           <div className="text-center mt-4 name">
//             Login
//           </div>
//           <form className="p-3 mt-3" onSubmit={handleLogin}>
//             <div className="form-field d-flex align-items-center">
//               <span className="far fa-user"></span>
//               <input 
//                 type="text" 
//                 placeholder="Name" 
//                 value={Name} 
//                 onChange={(e) => setUsername(e.target.value)} 
//               />
//             </div>
//             <div className="form-field d-flex align-items-center">
//               <span className="fas fa-key"></span>
//               <input 
//                 type="password" 
//                 placeholder="Password" 
//                 value={Password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//               />
//             </div>
//             <button type="submit" className="buttonlogin">Login</button>
//           </form>
//           <div className="text-center fs-6">
//             <a href="#">Forget password?</a> or <a href="#">Sign up</a>
//           </div>
//           {message && <div className="message">{message}</div>}
//         </>
//       ) : (
//         <Dashboard /> // Show Dashboard if the user is an admin
//       )}
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import Dashboard from './Dashboard';
// import UserTasks from './UserTasks'; // Make sure to import UserTasks

// interface Task {
//   taskId: number;
//   title: string;
//   description: string;
//   isCompleted: boolean;
//   priority: number;
//   dueDate: string;
//   name: string;
//   categoryId: number;
//   user: {
//     name: string;
//     designation: string;
//     address: string;
//     password: string;
//     email: string;
//   };
//   category: {
//     categoryId: number;
//     name: string;
//   };
// }

// const Login: React.FC = () => {
//   const [Name, setUsername] = useState('');
//   const [Password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false); // State to manage admin status
//   const [isUser, setIsUser] = useState(false); // State to manage user status
//   const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks for the user

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const userResponse = await axios.get(`https://localhost:7280/api/UsersAPI/${Name}`);
//       console.log('User data:', userResponse.data);

//       if (userResponse.data.password === Password) {
//         if (userResponse.data.designation && userResponse.data.designation.toLowerCase() === 'admin') {
//           setMessage('Logged in successfully!');
//           setIsAdmin(true); // Set admin status to true

//         } else {
//           setMessage('Logged in successfully!');
//           setIsUser(true); // Set user status to true

//           // Fetch tasks for the user
//           const taskResponse = await axios.get(`https://localhost:7280/api/TaskAPI/user/${Name}`);
//           console.log('Tasks data:', taskResponse.data);
//           setTasks(taskResponse.data);
//         }
//       } else {
//         setMessage('Invalid username or password');
//       }
//     } catch (error) {
//       setMessage('Invalid username or password');
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <div className="wrapper">
//       {!isAdmin && !isUser ? (
//         <>
//           <div className="logo">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Alternate_Task_Manager_icon.png" alt="Task Manager Logo" />
//           </div>
//           <div className="text-center mt-4 name">
//             Login
//           </div>
//           <form className="p-3 mt-3" onSubmit={handleLogin}>
//             <div className="form-field d-flex align-items-center">
//               <span className="far fa-user"></span>
//               <input 
//                 type="text" 
//                 placeholder="Name" 
//                 value={Name} 
//                 onChange={(e) => setUsername(e.target.value)} 
//               />
//             </div>
//             <div className="form-field d-flex align-items-center">
//               <span className="fas fa-key"></span>
//               <input 
//                 type="password" 
//                 placeholder="Password" 
//                 value={Password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//               />
//             </div>
//             <button type="submit" className="buttonlogin">Login</button>
//           </form>
//           <div className="text-center fs-6">
//             <a href="#">Forget password?</a> or <a href="#">Sign up</a>
//           </div>
//           {message && <div className="message">{message}</div>}
//         </>
//       ) : isAdmin ? (
//         <Dashboard />
//       ) : (
//         <UserTasks tasks={tasks} />
//       )}
//     </div>
//   );
// };

// export default Login;

//new


import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import UserTasks from './UserTasks'; // Make sure to import UserTasks

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

const Login: React.FC = () => {
  const [Name, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to manage admin status
  const [isUser, setIsUser] = useState(false); // State to manage user status
  const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks for the user

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const userResponse = await axios.get(`https://localhost:7280/api/UsersAPI/${Name}`);
        console.log('User data:', userResponse.data);

        if (userResponse.data.password === Password) {
          if (userResponse.data.designation && userResponse.data.designation.toLowerCase() === 'admin') {
              setMessage('Logged in successfully!');
              setIsAdmin(true); 
              localStorage.setItem('authToken', 'admin-auth-token'); // Store token for admin
          } else {
              setMessage('Logged in successfully!');
              setIsUser(true);
              localStorage.setItem('authToken', 'user-auth-token'); // Store token for user
      
              const taskResponse = await axios.get(`https://localhost:7280/api/TaskAPI/user/${Name}`);
              setTasks(taskResponse.data);
          }
      }
       else {
            setMessage('Invalid username or password');
        }
    } catch (error) {
        setMessage('Invalid username or password');
        console.error('Login error:', error);
    }
};


  return (
    <div className="wrapper">
      {!isAdmin && !isUser ? (
        <>
          <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Alternate_Task_Manager_icon.png" alt="Task Manager Logo" />
          </div>
          <div className="text-center mt-4 name">
            Login
          </div>
          <form className="p-3 mt-3" onSubmit={handleLogin}>
            <div className="form-field d-flex align-items-center">
              <span className="far fa-user"></span>
              <input 
                type="text" 
                placeholder="Name" 
                value={Name} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className="form-field d-flex align-items-center">
              <span className="fas fa-key"></span>
              <input 
                type="password" 
                placeholder="Password" 
                value={Password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className="buttonlogin">Login</button>
          </form>
          <div className="text-center fs-6">
            <a href="#">Forget password?</a> or <a href="#">Sign up</a>
          </div>
          {message && <div className="message">{message}</div>}
        </>
      ) : isAdmin ? (
        <Dashboard />
      ) : (
        <UserTasks tasks={tasks} />
      )}
    </div>
  );
};

export default Login;