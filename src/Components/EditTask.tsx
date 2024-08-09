



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// interface User {
//     name: string;
//     designation: string;
//     address: string;
//     password: string;
//     email: string;
// }

// interface Category {
//     categoryId: number;
//     name: string;
// }

// interface Task {
//     taskId: number;
//     title: string;
//     description: string;
//     isCompleted: boolean;
//     priority: number;
//     dueDate: string;
//     name: string;
//     categoryId: number;
//     user: User;
//     category: Category;
// }

// const EditTask: React.FC = () => {
//     const { taskId } = useParams<{ taskId: string }>();
//     const [task, setTask] = useState<Task | null>({
//         taskId: 0,
//         title: "",
//         description: "",
//         isCompleted: false,
//         priority: 0,
//         dueDate: "",
//         name: "",
//         categoryId: 0,
//         user: {
//             name: "",
//             designation: "",
//             address: "",
//             password: "",
//             email: ""
//         },
//         category: {
//             categoryId: 0,
//             name: ""
//         }
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchTask = async () => {
//             try {
//                 // Fetch task data
//                 const response = await axios.get(`https://localhost:7280/api/TaskAPI/${taskId}`);
//                 const fetchedTask = response.data;
                
//                 // Fetch user data if user name is available
//                 const userResponse = await axios.get(`https://localhost:7280/api/UsersAPI/${fetchedTask.name}`);
//                 const fetchedUser = userResponse.data;
    
//                 setTask({
//                     ...fetchedTask,
//                     user: fetchedUser || { name: "", designation: "", address: "", password: "", email: "" },
//                     category: fetchedTask.category || { categoryId: 0, name: "" }
//                 });
//             } catch (error) {
//                 console.error('Error fetching task or user data', error);
//             }
//         };
    
//         fetchTask();
//     }, [taskId]);
    
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         if (task) {
//             setTask(prevTask => {
//                 if (!prevTask) return prevTask;

//                 const newValue = type === 'checkbox' ? checked : value;

//                 return { ...prevTask, [name]: newValue };
//             });
//         }
//     };

//     const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (task) {
//             setTask(prevTask => prevTask ? {
//                 ...prevTask,
//                 user: { ...prevTask.user, [name]: value }
//             } : prevTask);
//         }
//     };

//     const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (task) {
//             setTask(prevTask => prevTask ? {
//                 ...prevTask,
//                 category: { ...prevTask.category, [name]: value }
//             } : prevTask);
//         }
//     };

//     const isValidTask = (task: Task | null): boolean => {
//         if (!task) return false;
//         return typeof task.taskId === 'number' &&
//             typeof task.title === 'string' &&
//             typeof task.description === 'string' &&
//             typeof task.isCompleted === 'boolean' &&
//             typeof task.priority === 'number' &&
//             typeof task.dueDate === 'string' &&
//             typeof task.name === 'string' &&
//             typeof task.categoryId === 'number' &&
//             task.user !== null &&
//             typeof task.user.name === 'string' &&
//             typeof task.user.designation === 'string' &&
//             typeof task.user.address === 'string' &&
//             typeof task.user.password === 'string' &&
//             typeof task.user.email === 'string' &&
//             task.category !== null &&
//             typeof task.category.categoryId === 'number' &&
//             typeof task.category.name === 'string';
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!task) return;

//         console.log("Task data before validation:", task);

//         if (!isValidTask(task)) {
//             console.error('Task data is invalid:', task);
//             return;
//         }

//         // Log the task data before sending
//         console.log("Task data being sent:", task);

//         try {
//             const response = await axios.put(`https://localhost:7280/api/TaskAPI/${task.taskId}`, task);
//             if (response.status === 200) {
//                 navigate('/');
//             }
//         } catch (error) {
//             console.error('Error updating task', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Title</label>
//                 <input
//                     type="text"
//                     name="title"
//                     value={task?.title || ""}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label>Description</label>
//                 <input
//                     type="text"
//                     name="description"
//                     value={task?.description || ""}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label>Is Completed</label>
//                 <input
//                     type="checkbox"
//                     name="isCompleted"
//                     checked={task?.isCompleted || false}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label>Priority</label>
//                 <input
//                     type="number"
//                     name="priority"
//                     value={task?.priority || 0}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label>Due Date</label>
//                 <input
//                     type="datetime-local"
//                     name="dueDate"
//                     value={task?.dueDate || ""}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label>Name</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={task?.name || ""}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label>Category</label>
//                 <input
//                     type="text"
//                     name="categoryName"
//                     value={task?.categoryId || ""}
//                     onChange={handleCategoryInputChange}
//                 />
//             </div>
//             <div>
//                 <label>User Name</label>
//                 <input
//                     type="text"
//                     name="userName"
//                     value={task?.user?.name || ""}
//                     onChange={handleUserInputChange}
//                 />
//             </div>
//             <div>
//                 <label>User Designation</label>
//                 <input
//                     type="text"
//                     name="designation"
//                     value={task?.user?.designation || ""}
//                     onChange={handleUserInputChange}
//                 />
//             </div>
//             <div>
//                 <label>User Address</label>
//                 <input
//                     type="text"
//                     name="address"
//                     value={task?.user?.address || ""}
//                     onChange={handleUserInputChange}
//                 />
//             </div>
//             <div>
//                 <label>User Password</label>
//                 <input
//                     type="password"
//                     name="password"
//                     value={task?.user?.password || ""}
//                     onChange={handleUserInputChange}
//                 />
//             </div>
//             <div>
//                 <label>User Email</label>
//                 <input
//                     type="email"
//                     name="email"
//                     value={task?.user?.email || ""}
//                     onChange={handleUserInputChange}
//                 />
//             </div>
//             <button type="submit">Update Task</button>
//         </form>
//     );
// };

// export default EditTask;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import './EditTask.css'; // Import the custom CSS file

// interface User {
//     name: string;
//     designation: string;
//     address: string;
//     password: string;
//     email: string;
// }

// interface Category {
//     categoryId: number;
//     name: string;
// }

// interface Task {
//     taskId: number;
//     title: string;
//     description: string;
//     isCompleted: boolean;
//     priority: number;
//     dueDate: string;
//     name: string;
//     categoryId: number;
//     user: User;
//     category: Category;
// }

// const EditTask: React.FC = () => {
//     const { taskId } = useParams<{ taskId: string }>();
//     const [task, setTask] = useState<Task | null>({
//         taskId: 0,
//         title: "",
//         description: "",
//         isCompleted: false,
//         priority: 0,
//         dueDate: "",
//         name: "",
//         categoryId: 0,
//         user: {
//             name: "",
//             designation: "",
//             address: "",
//             password: "",
//             email: ""
//         },
//         category: {
//             categoryId: 0,
//             name: ""
//         }
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchTask = async () => {
//             try {
//                 const response = await axios.get(`https://localhost:7280/api/TaskAPI/${taskId}`);
//                 const fetchedTask = response.data;
//                 const userResponse = await axios.get(`https://localhost:7280/api/UsersAPI/${fetchedTask.name}`);
//                 const fetchedUser = userResponse.data;
    
//                 setTask({
//                     ...fetchedTask,
//                     user: fetchedUser || { name: "", designation: "", address: "", password: "", email: "" },
//                     category: fetchedTask.category || { categoryId: 0, name: "" }
//                 });
//             } catch (error) {
//                 console.error('Error fetching task or user data', error);
//             }
//         };
    
//         fetchTask();
//     }, [taskId]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         if (task) {
//             setTask(prevTask => {
//                 if (!prevTask) return prevTask;

//                 const newValue = type === 'checkbox' ? checked : value;

//                 return { ...prevTask, [name]: newValue };
//             });
//         }
//     };

//     const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (task) {
//             setTask(prevTask => prevTask ? {
//                 ...prevTask,
//                 user: { ...prevTask.user, [name]: value }
//             } : prevTask);
//         }
//     };

//     const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (task) {
//             setTask(prevTask => prevTask ? {
//                 ...prevTask,
//                 category: { ...prevTask.category, [name]: value }
//             } : prevTask);
//         }
//     };

//     const isValidTask = (task: Task | null): boolean => {
//         if (!task) return false;
//         return typeof task.taskId === 'number' &&
//             typeof task.title === 'string' &&
//             typeof task.description === 'string' &&
//             typeof task.isCompleted === 'boolean' &&
//             typeof task.priority === 'number' &&
//             typeof task.dueDate === 'string' &&
//             typeof task.name === 'string' &&
//             typeof task.categoryId === 'number' &&
//             task.user !== null &&
//             typeof task.user.name === 'string' &&
//             typeof task.user.designation === 'string' &&
//             typeof task.user.address === 'string' &&
//             typeof task.user.password === 'string' &&
//             typeof task.user.email === 'string' &&
//             task.category !== null &&
//             typeof task.category.categoryId === 'number' &&
//             typeof task.category.name === 'string';
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!task) return;

//         console.log("Task data before validation:", task);

//         if (!isValidTask(task)) {
//             console.error('Task data is invalid:', task);
//             return;
//         }

//         console.log("Task data being sent:", task);

//         try {
//             const response = await axios.put(`https://localhost:7280/api/TaskAPI/${task.taskId}`, task);
//             if (response.status === 200) {
//                 navigate('/');
//             }
//         } catch (error) {
//             console.error('Error updating task', error);
//         }
//     };

//     return (
//         <div className="edit-task-container">
//             <h2>Edit Task</h2>
//             <form onSubmit={handleSubmit} className="edit-task-form">
//                 <div className="form-group">
//                     <label>Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={task?.title || ""}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Description</label>
//                     <input
//                         type="text"
//                         name="description"
//                         value={task?.description || ""}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Is Completed</label>
//                     <input
//                         type="checkbox"
//                         name="isCompleted"
//                         checked={task?.isCompleted || false}
//                         onChange={handleInputChange}
//                         className="form-check-input"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Priority</label>
//                     <input
//                         type="number"
//                         name="priority"
//                         value={task?.priority || 0}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Due Date</label>
//                     <input
//                         type="datetime-local"
//                         name="dueDate"
//                         value={task?.dueDate || ""}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={task?.name || ""}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Category Id</label>
//                     <input
//                         type="text"
//                         name="categoryName"
//                         value={task?.categoryId || ""}
//                         onChange={handleCategoryInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>User Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={task?.user?.name || ""}
//                         onChange={handleUserInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>User Designation</label>
//                     <input
//                         type="text"
//                         name="designation"
//                         value={task?.user?.designation || ""}
//                         onChange={handleUserInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>User Address</label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={task?.user?.address || ""}
//                         onChange={handleUserInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>User Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={task?.user?.password || ""}
//                         onChange={handleUserInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>User Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={task?.user?.email || ""}
//                         onChange={handleUserInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <button type="submit" className="btn-submit">Update Task</button>
//             </form>
//         </div>
//     );
// };

// export default EditTask;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import './EditTask.css'; // Import the custom CSS file

// interface User {
//     name: string;
//     designation: string;
//     address: string;
//     password: string;
//     email: string;
// }

// interface Category {
//     categoryId: number;
//     name: string;
// }

// interface Task {
//     taskId: number;
//     title: string;
//     description: string;
//     isCompleted: boolean;
//     priority: number;
//     dueDate: string;
//     name: string;
//     categoryId: number;
//     user: User;
//     category: Category;
// }

// const EditTask: React.FC = () => {
//     const { taskId } = useParams<{ taskId: string }>();
//     const [task, setTask] = useState<Task | null>({
//         taskId: 0,
//         title: "",
//         description: "",
//         isCompleted: false,
//         priority: 0,
//         dueDate: "",
//         name: "",
//         categoryId: 0,
//         user: {
//             name: "",
//             designation: "",
//             address: "",
//             password: "",
//             email: ""
//         },
//         category: {
//             categoryId: 0,
//             name: ""
//         }
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchTask = async () => {
//             try {
//                 const response = await axios.get(`https://localhost:7280/api/TaskAPI/${taskId}`);
//                 const fetchedTask = response.data;
//                 const userResponse = await axios.get(`https://localhost:7280/api/UsersAPI/${fetchedTask.name}`);
//                 const fetchedUser = userResponse.data;
    
//                 setTask({
//                     ...fetchedTask,
//                     user: fetchedUser || { name: "", designation: "", address: "", password: "", email: "" },
//                     category: fetchedTask.category || { categoryId: 0, name: "" }
//                 });
//             } catch (error) {
//                 console.error('Error fetching task or user data', error);
//             }
//         };
    
//         fetchTask();
//     }, [taskId]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         if (task) {
//             setTask(prevTask => {
//                 if (!prevTask) return prevTask;

//                 const newValue = type === 'checkbox' ? checked : value;

//                 return { ...prevTask, [name]: newValue };
//             });
//         }
//     };

//     const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (task) {
//             setTask(prevTask => prevTask ? {
//                 ...prevTask,
//                 user: { ...prevTask.user, [name]: value }
//             } : prevTask);
//         }
//     };

//     const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (task) {
//             setTask(prevTask => prevTask ? {
//                 ...prevTask,
//                 category: { ...prevTask.category, [name]: value }
//             } : prevTask);
//         }
//     };

//     const isValidTask = (task: Task | null): boolean => {
//         if (!task) return false;
//         return typeof task.taskId === 'number' &&
//             typeof task.title === 'string' &&
//             typeof task.description === 'string' &&
//             typeof task.isCompleted === 'boolean' &&
//             typeof task.priority === 'number' &&
//             typeof task.dueDate === 'string' &&
//             typeof task.name === 'string' &&
//             typeof task.categoryId === 'number' &&
//             task.user !== null &&
//             typeof task.user.name === 'string' &&
//             typeof task.user.designation === 'string' &&
//             typeof task.user.address === 'string' &&
//             typeof task.user.password === 'string' &&
//             typeof task.user.email === 'string' &&
//             task.category !== null &&
//             typeof task.category.categoryId === 'number' &&
//             typeof task.category.name === 'string';
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!task) return;

//         console.log("Task data before validation:", task);

//         if (!isValidTask(task)) {
//             console.error('Task data is invalid:', task);
//             return;
//         }

//         console.log("Task data being sent:", task);

//         try {
//             const response = await axios.put(`https://localhost:7280/api/TaskAPI/${task.taskId}`, task);
//             if (response.status === 200) {
//                 navigate('/');
//             }
//         } catch (error) {
//             console.error('Error updating task', error);
//         }
//     };

//     return (
//         <div className="edit-task-container">
//             <h2>Edit Task</h2>
//             <form onSubmit={handleSubmit} className="edit-task-form">
//                 <div className="form-group">
//                     <label>Task ID</label>
//                     <input
//                         type="text"
//                         name="taskId"
//                         value={task?.taskId.toString() || ""}
//                         className="form-control"
//                         disabled
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={task?.title || ""}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Description</label>
//                     <input
//                         type="text"
//                         name="description"
//                         value={task?.description || ""}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Is Completed</label>
//                     <input
//                         type="checkbox"
//                         name="isCompleted"
//                         checked={task?.isCompleted || false}
//                         onChange={handleInputChange}
//                         className="form-check-input"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Priority</label>
//                     <input
//                         type="number"
//                         name="priority"
//                         value={task?.priority || 0}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Due Date</label>
//                     <input
//                         type="datetime-local"
//                         name="dueDate"
//                         value={task?.dueDate || ""}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={task?.name || ""}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Category Id</label>
//                     <input
//                         type="text"
//                         name="categoryId"
//                         value={task?.categoryId.toString() || ""}
//                         onChange={handleCategoryInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>User Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={task?.user?.name || ""}
//                         onChange={handleUserInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>User Designation</label>
//                     <input
//                         type="text"
//                         name="designation"
//                         value={task?.user?.designation || ""}
//                         onChange={handleUserInputChange}
//                         className="form-control"
//                         disabled
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>User Address</label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={task?.user?.address || ""}
//                         onChange={handleUserInputChange}
//                         className="form-control"
//                         disabled
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>User Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={task?.user?.password || ""}
//                         onChange={handleUserInputChange}
//                         className="form-control"
//                         disabled
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>User Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={task?.user?.email || ""}
//                         onChange={handleUserInputChange}
//                         className="form-control"
//                         disabled
//                     />
//                 </div>
//                 <button type="submit" className="btn-submit">Update Task</button>
//             </form>
//         </div>
//     );
// };

// export default EditTask;
//good

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditTask.css'; // Import the custom CSS file

interface User {
    name: string;
    designation: string;
    address: string;
    password: string;
    email: string;
}

interface Category {
    categoryId: number;
    name: string;
}

interface Task {
    taskId: number;
    title: string;
    description: string;
    isCompleted: boolean;
    priority: number;
    dueDate: string;
    name: string;
    categoryId: number;
    user: User;
    category: Category;
}

const EditTask: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const [task, setTask] = useState<Task | null>({
        taskId: 0,
        title: "",
        description: "",
        isCompleted: false,
        priority: 0,
        dueDate: "",
        name: "",
        categoryId: 0,
        user: {
            name: "",
            designation: "",
            address: "",
            password: "",
            email: ""
        },
        category: {
            categoryId: 0,
            name: ""
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`https://localhost:7280/api/TaskAPI/${taskId}`);
                const fetchedTask = response.data;
                const userResponse = await axios.get(`https://localhost:7280/api/UsersAPI/${fetchedTask.name}`);
                const fetchedUser = userResponse.data;

                const formattedDueDate = fetchedTask.dueDate ? fetchedTask.dueDate.slice(0, 16) : '';

                setTask({
                    ...fetchedTask,
                    dueDate: formattedDueDate,
                    user: fetchedUser || { name: "", designation: "", address: "", password: "", email: "" },
                    category: fetchedTask.category || { categoryId: 0, name: "" }
                });
            } catch (error) {
                console.error('Error fetching task or user data', error);
            }
        };

        fetchTask();
    }, [taskId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (task) {
            setTask(prevTask => {
                if (!prevTask) return prevTask;

                const newValue = type === 'checkbox' ? checked : value;

                return { ...prevTask, [name]: newValue };
            });
        }
    };

    const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (task) {
            setTask(prevTask => prevTask ? {
                ...prevTask,
                user: { ...prevTask.user, [name]: value }
            } : prevTask);
        }
    };

    const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (task) {
            setTask(prevTask => prevTask ? {
                ...prevTask,
                category: { ...prevTask.category, [name]: value }
            } : prevTask);
        }
    };

    const isValidTask = (task: Task | null): boolean => {
        if (!task) return false;
        return typeof task.taskId === 'number' &&
            typeof task.title === 'string' &&
            typeof task.description === 'string' &&
            typeof task.isCompleted === 'boolean' &&
            typeof task.priority === 'number' &&
            typeof task.dueDate === 'string' &&
            typeof task.name === 'string' &&
            typeof task.categoryId === 'number' &&
            task.user !== null &&
            typeof task.user.name === 'string' &&
            typeof task.user.designation === 'string' &&
            typeof task.user.address === 'string' &&
            typeof task.user.password === 'string' &&
            typeof task.user.email === 'string' &&
            task.category !== null &&
            typeof task.category.categoryId === 'number' &&
            typeof task.category.name === 'string';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!task) return;

        console.log("Task data before validation:", task);

        if (!isValidTask(task)) {
            console.error('Task data is invalid:', task);
            return;
        }

        console.log("Task data being sent:", task);

        try {
            const response = await axios.put(`https://localhost:7280/api/TaskAPI/${task.taskId}`, task);
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    return (
        <div className="edit-task-container">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit} className="edit-task-form">
                <div className="form-group">
                    <label>Task ID</label>
                    <input
                        type="text"
                        name="taskId"
                        value={task?.taskId.toString() || ""}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task?.title || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={task?.description || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Is Completed</label>
                    <input
                        type="checkbox"
                        name="isCompleted"
                        checked={task?.isCompleted || false}
                        onChange={handleInputChange}
                        className="form-check-input"
                    />
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <input
                        type="number"
                        name="priority"
                        value={task?.priority || 0}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        type="datetime-local"
                        name="dueDate"
                        value={task?.dueDate || ""}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>User name</label>
                    <input
                        type="text"
                        name="name"
                        value={task?.name || ""}
                        onChange={handleInputChange}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Category Id</label>
                    <input
                        type="text"
                        name="categoryId"
                        value={task?.categoryId.toString() || ""}
                        onChange={handleCategoryInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>User Name</label>
                    <input
                        type="text"
                        name="name"
                        value={task?.user?.name || ""}
                        onChange={handleUserInputChange}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>User Designation</label>
                    <input
                        type="text"
                        name="designation"
                        value={task?.user?.designation || ""}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>User Address</label>
                    <input
                        type="text"
                        name="address"
                        value={task?.user?.address || ""}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>User Password</label>
                    <input
                        type="password"
                        name="password"
                        value={task?.user?.password || ""}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>User Email</label>
                    <input
                        type="email"
                        name="email"
                        value={task?.user?.email || ""}
                        className="form-control"
                        disabled
                    />
                </div>
                <button type="submit" className="btn-submit">Update Task</button>
            </form>
        </div>
    );
};

export default EditTask;
