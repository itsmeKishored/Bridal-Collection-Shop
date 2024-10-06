import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            const { message, role } = response.data;
            console.log(response)
            if (response.data.status === "success") {
                role === "admin" ? navigate('/admin') : navigate('/home');
            } else {
                toast.error(message || "An unexpected error occurred.");
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='on'
                            name="email"
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='on'
                            name="password"
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='login-button'>
                        Login
                    </button>
                </form>
                <p className='register-link'>Don't Have an account?</p>
                <Link to='/register' className='register-button'>
                    Register
                </Link>
            </div>
            <ToastContainer />
        </div>
    );
}
export default Login;
