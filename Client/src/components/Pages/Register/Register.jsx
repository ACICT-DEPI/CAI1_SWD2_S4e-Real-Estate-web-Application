import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';
import './index.css';

// username should be 4-24 characters long and start with a letter (case-insensitive)
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// password should be at least 8-24 characters long and contain at least one uppercase letter, one lowercase letter, and one number
const PASS_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
// email should be in the form of user@domain
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = '/register';


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pass, setPass] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [matchPass, setMatchPass] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMessage, setErrMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidUser(result);
    }, [user]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PASS_REGEX.test(pass);
        console.log(result);
        console.log(pass);
        setValidPass(result);
        const match = pass === matchPass;
        setValidMatch(match);
    }, [pass, matchPass]);

    useEffect(() => {
        setErrMessage('');
    }, [user, email, pass, matchPass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validUser || !validEmail || !validPass || !validMatch) {
            setErrMessage('Please check the form for errors.');
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify({ user: user, email: email, pwd: pass }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true
                    }
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
            // clear form
            setUser('');
            setEmail('');
            setPass('');
            setMatchPass('');
        } catch (error) {
            if(!error?.response) {
                setErrMessage('No response from server. Please try again later.');
            } else if(error.response.status === 409) {
                setErrMessage('Username already exists. Please try another one.');
            } else {    
                setErrMessage('An error occurred. Please try again later.');
            }
            errRef.current.focus();
        }
    }

  return (
    <>
    {success ? (
        <section style={{maxWidth: '480px'}}>
            <h1 style={{color:'white'}}>Account created successfully!</h1>
            <p className='button'>
                <Link to="/login">Log In</Link>
            </p>
        </section>
    ) : (
    <section style={{maxWidth: '480px'}}>
        <p ref={errRef} className={errMessage? "errmessage" : "offscreen"}>{errMessage}</p>
        <h1 style={{color:'white'}}>Sign Up</h1>
        <form onSubmit={handleSubmit} className='form'>
            <label htmlFor="username" style={{color:'white'}}>
                Username:
                <span className={validUser ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validUser || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} required aria-invalid={validUser ? "false" : "true"} aria-describedby="uidnote" onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} />
            <p id="uidnote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Username should be 4-24 characters long <br /> 
                and starts with a letter (case-insensitive). <br />
                Letters, numbers, underscore and hyphen allowed.
            </p>

            <label htmlFor="email" style={{color:'white'}}>
                Email:
                <span className={validEmail ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} required aria-invalid={validEmail ? "false" : "true"} aria-describedby="emailnote" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />
            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Invalid email format.
            </p>

            <label htmlFor="password" style={{color:'white'}}>
                Password:
                <span className={validPass ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPass || !pass ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input type="password" id="password" onChange={(e) => setPass(e.target.value)} required aria-invalid={validPass ? "false" : "true"} aria-describedby="passnote" onFocus={() => setPassFocus(true)} onBlur={() => setPassFocus(false)} />
            <p id="passnote" className={passFocus && !validPass ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Password should be 8-24 characters long <br />
                and contain at least one uppercase letter, <br />
                one lowercase letter, and one number.
            </p>

            <label htmlFor="confirm_pass" style={{color:'white'}}>
                Confirm Password:
                <span className={validMatch && matchPass ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPass ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input type="password" id="confirm_pass" onChange={(e) => setMatchPass(e.target.value)} required aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)} />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Passwords must match.
            </p>
            <button className='button' disabled={!validUser || !validPass || !validMatch ? true : false}>
                Sign Up
            </button>
        </form>
        <p style={{color:'white'}}>
            Already have an account? 
            <span className='line'> 
                <Link to="/login"> Log In</Link>
            </span>
        </p>
    </section>
    )}
    </>
  )
}

export default Register;