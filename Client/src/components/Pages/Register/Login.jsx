import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../../api/axios';
import './index.css';

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMessage('');
    }, [user, pass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !pass) {
            setErrMessage('Please enter a username and password.');
            errRef.current.focus();
            return;
        }
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user: user, pwd: pass }),
                { 
                    headers: { 
                        'Content-Type': 'application/json',
                        withCredentials: true 
                    } 
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const email = response?.data?.email;
            setAuth({ user, email, pass, roles, accessToken });
            setUser('');
            setPass('');
            navigate(from, { replace: true });
            // navigate('/home', { replace : true });
        } catch (err) {
            if(!err?.response) {
                setErrMessage('No server response. Please try again later.');
            } else if(err.response?.status === 400) {
                setErrMessage('Missing username or password.');
            } else if(err.response?.status === 401) {
                setErrMessage('Invalid username or password.');
            } else {
                setErrMessage('Log in failed. Please try again later.');
            }
            errRef.current.focus();
        }
    }

    return (
        <section style={{maxWidth: '480px'}}>
            <p ref={errRef} className={errMessage? "errmessage" : "offscreen"}>{errMessage}</p>
            <h1 style={{color:'white'}}>Log In</h1>
            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="username" style={{color:'white'}}>Username:</label>
                <input type="text" id="username" name="username"  value={user} ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} />
                <label htmlFor="password" style={{color:'white'}}>Password:</label>
                <input type="password" id="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <button className='button'>Log In</button>
            </form>
            <p style={{color:'white'}}>
                Don't have an account?  
                <span className='line'> 
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
    );
}

export default Login;
