// import React, { useState } from 'react';
// import './CreateTask.css';

// interface Task {
//   title: string;
//   description: string;
//   isCompleted: boolean;
// }

// const CreateTask: React.FC = () => {
//   const [task, setTask] = useState<Task>({
//     title: '',
//     description: '',
//     isCompleted: false,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       const { checked } = e.target as HTMLInputElement;
//       setTask(prevTask => ({
//         ...prevTask,
//         [name]: checked,
//       }));
//     } else {
//       setTask(prevTask => ({
//         ...prevTask,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://localhost:7280/api/TaskAPI', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(task),
//       });

//       if (response.ok) {
//         alert('Task created successfully!');
//         setTask({ title: '', description: '', isCompleted: false });
//       } else {
//         const responseData = await response.json();
//         alert(`Failed to create task: ${responseData.message}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       if (error instanceof Error) {
//         alert(`Error creating task: ${error.message}`);
//       } else {
//         alert('Error creating task');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="task-form">
//       <div className="form-group">
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={task.title}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           name="description"
//           value={task.description}
//           onChange={handleChange}
//           required
//         ></textarea>
//       </div>
//       <div className="form-group">
//         <label htmlFor="isCompleted">Completed:</label>
//         <input
//           type="checkbox"
//           id="isCompleted"
//           name="isCompleted"
//           checked={task.isCompleted}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit" className="submit-button">Create Task</button>
//     </form>
//   );
// };

// export default CreateTask;









// src/components/AddTaskForm.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Task, User, Category } from '../models/task';

// interface CreateTaskProps {
//   token: string;
// }

// const AddTaskForm: React.FC <CreateTaskProps> = ({ token }) => {
//     const [task, setTask] = useState<Task>({
//         title: '',
//         description: '',
//         isCompleted: false,
//         priority: 0,
//         dueDate: '',
//         name: '',
//         categoryId: 0,
//         user: {
//             name: '',
//             designation: '',
//             address: '',
//             password: '',
//             email: '',
//         },
//         category: {
//             categoryId: 0,
//             name: '',
//         },
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         const [parent, child] = name.split('.');

//         if (child) {
//             setTask(prevState => ({
//                 ...prevState,
//                 [parent]: {
//                     ...prevState[parent as keyof Task] as User | Category,
//                     [child]: value
//                 }
//             }));
//         } else {
//             setTask({ ...task, [name]: value });
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('https://localhost:7280/api/TaskAPI', task);
//             console.log('Task added successfully:', response.data);
//         } catch (error) {
//             console.error('Error adding task:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Title:</label>
//                 <input type="text" name="title" value={task.title} onChange={handleChange} required />
//             </div>
//             <div>
//                 <label>Description:</label>
//                 <textarea name="description" value={task.description} onChange={handleChange}></textarea>
//             </div>
//             <div>
//                 <label>Is Completed:</label>
//                 <input type="checkbox" name="isCompleted" checked={task.isCompleted} onChange={(e) => setTask({ ...task, isCompleted: e.target.checked })} />
//             </div>
//             <div>
//                 <label>Priority:</label>
//                 <input type="number" name="priority" value={task.priority} onChange={handleChange} required />
//             </div>
//             <div>
//                 <label>Due Date:</label>
//                 <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
//             </div>
//             <div>
//                 <label>Name:</label>
//                 <input type="text" name="name" value={task.name} onChange={handleChange} required />
//             </div>
//             <div>
//                 <label>Category ID:</label>
//                 <input type="number" name="categoryId" value={task.categoryId} onChange={handleChange} required />
//             </div>
//             <h3>User Details</h3>
//             <div>
//                 <label>User Name:</label>
//                 <input type="text" name="user.name" value={task.user.name} onChange={handleChange} required />
//             </div>
//             <div>
//                 <label>Designation:</label>
//                 <input type="text" name="user.designation" value={task.user.designation} onChange={handleChange} />
//             </div>
//             <div>
//                 <label>Address:</label>
//                 <input type="text" name="user.address" value={task.user.address} onChange={handleChange} />
//             </div>
//             <div>
//                 <label>Password:</label>
//                 <input type="password" name="user.password" value={task.user.password} onChange={handleChange} />
//             </div>
//             <div>
//                 <label>Email:</label>
//                 <input type="email" name="user.email" value={task.user.email} onChange={handleChange} />
//             </div>
//             <h3>Category Details</h3>
//             <div>
//                 <label>Category Name:</label>
//                 <input type="text" name="category.name" value={task.category.name} onChange={handleChange} required />
//             </div>
//             <div>
//                 <label>Category ID:</label>
//                 <input type="number" name="category.categoryId" value={task.category.categoryId} onChange={handleChange} required />
//             </div>
//             <button type="submit">Add Task</button>
//         </form>
//     );
// };

// export default AddTaskForm;





// import React, { useState } from 'react';
// import axios from 'axios';
// import './CreateTask.css';

// interface CreateTaskProps {
//   token: string;
// }

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

// const AddTaskForm: React.FC<CreateTaskProps> = ({ token }) => {
//   const [task, setTask] = useState<Task>({
//     title: '',
//     description: '',
//     isCompleted: false,
//     priority: 0,
//     dueDate: '',
//     name: '',
//     categoryId: 0,
//     user: {
//       name: '',
//       designation: '',
//       address: '',
//       password: '',
//       email: '',
//     },
//     category: {
//       categoryId: 0,
//       name: '',
//     },
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     const [parent, child] = name.split('.');

//     if (child) {
//       setTask((prevState) => ({
//         ...prevState,
//         [parent]: {
//           ...(prevState[parent as keyof Task] as object),
//           [child]: value,
//         },
//       }));
//     } else {
//       setTask({ ...task, [name]: value });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://localhost:7280/api/TaskAPI', task);
//       console.log('Task added successfully:', response.data);
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit} className="task-form">
//         <h2>Add Task</h2>
//         <div className="form-group">
//           <label htmlFor="title">Title:</label>
//           <input type="text" id="title" name="title" value={task.title} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea id="description" name="description" value={task.description} onChange={handleChange}></textarea>
//         </div>
//         <div className="form-group checkbox-group">
//           <input type="checkbox" id="isCompleted" name="isCompleted" checked={task.isCompleted} onChange={(e) => setTask({ ...task, isCompleted: e.target.checked })} />
//           <label htmlFor="isCompleted">Is Completed</label>
//         </div>
//         <div className="form-group">
//           <label htmlFor="priority">Priority:</label>
//           <input type="number" id="priority" name="priority" value={task.priority} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="dueDate">Due Date:</label>
//           <input type="date" id="dueDate" name="dueDate" value={task.dueDate} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input type="text" id="name" name="name" value={task.name} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="categoryId">Category ID:</label>
//           <input type="number" id="categoryId" name="categoryId" value={task.categoryId} onChange={handleChange} required />
//         </div>
//         <h3>User Details</h3>
//         <div className="form-group">
//           <label htmlFor="userName">User Name:</label>
//           <input type="text" id="userName" name="user.name" value={task.user.name} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="designation">Designation:</label>
//           <input type="text" id="designation" name="user.designation" value={task.user.designation} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="address">Address:</label>
//           <input type="text" id="address" name="user.address" value={task.user.address} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" name="user.password" value={task.user.password} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input type="email" id="email" name="user.email" value={task.user.email} onChange={handleChange} />
//         </div>
//         <h3>Category Details</h3>
//         <div className="form-group">
//           <label htmlFor="categoryName">Category Name:</label>
//           <input type="text" id="categoryName" name="category.name" value={task.category.name} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="categoryCategoryId">Category ID:</label>
//           <input type="number" id="categoryCategoryId" name="category.categoryId" value={task.category.categoryId} onChange={handleChange} required />
//         </div>
//         <button type="submit" className="submit-button">Add Task</button>
//       </form>
//     </div>
//   );
// };

// export default AddTaskForm;
//good


import React, { useState } from 'react';
import axios from 'axios';
import './CreateTask.css';

interface CreateTaskProps {
  token: string;
}

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

const AddTaskForm: React.FC<CreateTaskProps> = ({ token }) => {
  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    isCompleted: false,
    priority: 0,
    dueDate: '',
    name: '',
    categoryId: 0,
    user: {
      name: '',
      designation: '',
      address: '',
      password: '',
      email: '',
    },
    category: {
      categoryId: 0,
      name: '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');

    if (child) {
      setTask((prevState) => ({
        ...prevState,
        [parent]: {
          ...(prevState[parent as keyof Task] as object),
          [child]: value,
        },
      }));
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7280/api/TaskAPI', task);
      console.log('Task added successfully:', response.data);
      alert("Task added successfully")
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Add Task</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={task.title} onChange={handleChange} required />
      </div>
      <div className="form-group des">
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={task.description} onChange={handleChange}></textarea>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="isCompleted" name="isCompleted" checked={task.isCompleted} onChange={(e) => setTask({ ...task, isCompleted: e.target.checked })} />
        <label htmlFor="isCompleted">Is Completed</label>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <input type="number" id="priority" name="priority" value={task.priority} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input type="date" id="dueDate" name="dueDate" value={task.dueDate} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="name">User Name:</label>
          <input type="text" id="name" name="name" value={task.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Category ID:</label>
          <input type="number" id="categoryId" name="categoryId" value={task.categoryId} onChange={handleChange} required />
        </div>
      </div>
        <h3>User Details</h3>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input type="text" id="userName" name="user.name" value={task.user.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="designation">Designation:</label>
          <input type="text" id="designation" name="user.designation" value={task.user.designation} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="user.address" value={task.user.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="user.password" value={task.user.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="user.email" value={task.user.email} onChange={handleChange} />
        </div>
        <h3>Category Details</h3>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input type="text" id="categoryName" name="category.name" value={task.category.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="categoryCategoryId">Category ID:</label>
          <input type="number" id="categoryCategoryId" name="category.categoryId" value={task.category.categoryId} onChange={handleChange} required />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
