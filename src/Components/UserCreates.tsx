// import React, { useState } from 'react';
// import axios from 'axios';
// import './UserCreates.css'; // Import the custom CSS file

// interface User {
//     name: string;
//     designation: string;
//     address: string;
//     password: string;
//     email: string;
// }

// const CreateUser: React.FC = () => {
//     const [user, setUser] = useState<User>({
//         name: '',
//         designation: '',
//         address: '',
//         password: '',
//         email: ''
//     });

//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<string | null>(null);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setUser({ ...user, [name]: value });
//     };

//     const validateUser = (user: User): boolean => {
//         if (!user.name || !user.designation || !user.address || !user.password || !user.email) {
//             setError('All fields are required.');
//             return false;
//         }
//         if (!/\S+@\S+\.\S+/.test(user.email)) {
//             setError('Invalid email address.');
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess(null);

//         if (!validateUser(user)) {
//             return;
//         }

//         try {
//             const response = await axios.post('https://localhost:7280/api/UsersAPI', user);
//             if (response.status === 201) {
//                 setSuccess('User created successfully!');
//                 alert('User created successfully!')
//                 setUser({
//                     name: '',
//                     designation: '',
//                     address: '',
//                     password: '',
//                     email: ''
//                 });
//             }
//         } catch (error) {
//             setError('Error creating user. Please try again.');
//             console.error('Error creating user', error);
//         }
//     };

//     return (
//         <div className="create-user-container">
//             <h2>Create New User</h2>
//             <form onSubmit={handleSubmit} className="create-user-form">
//                 {error && <div className="error-message">{error}</div>}
//                 {success && <div className="success-message">{success}</div>}
//                 <div className="form-group">
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={user.name}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Designation</label>
//                     <input
//                         type="text"
//                         name="designation"
//                         value={user.designation}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Address</label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={user.address}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={user.password}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={user.email}
//                         onChange={handleInputChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <button type="submit" className="btn-submit">Create User</button>
//             </form>
//         </div>
//     );
// };

// export default CreateUser;


import React, { useState } from 'react';
import axios from 'axios';
import './UserCreates.css';

interface User {
    name: string;
    designation: string;
    address: string;
    password: string;
    email: string;
}

const CreateUser: React.FC = () => {
    const [user, setUser] = useState<User>({
        name: '',
        designation: '',
        address: '',
        password: '',
        email: ''
    });
    const [message, setMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7280/api/UsersAPI', user);
            if (response.status === 200) {
                setMessage('User created successfully');
                setUser({
                    name: '',
                    designation: '',
                    address: '',
                    password: '',
                    email: ''
                });
              
            } else {
                setMessage('Failed to create user');
            }
        } catch (error) {
            setMessage('Error creating user');
        }
    };

    return (
        <div className="create-user-container">
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit} className="create-user-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Designation</label>
                    <input
                        type="text"
                        name="designation"
                        value={user.designation}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn-submit">Create User</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default CreateUser;

