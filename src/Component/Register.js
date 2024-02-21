import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validator from 'validator'; // Correct import statement
import { startRegisterUser } from "../Actions/userAction";
import { useNavigate, Link } from 'react-router-dom';

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    function runValidations() {
        const userData = {};
        if (username.trim().length === 0) {
            userData.username = 'Username cannot be Empty';
        }
        if (!validator.isEmail(email)) {
            userData.email = 'Invalid email';
        }
        if (password.trim().length === 0) {
            userData.password = 'Password cannot be Empty';
        } else if (password.trim().length < 8 || password.trim().length > 128) {
            userData.password = 'Password must be 8 to 128 characters!';
        }
        return userData;
    }

    function resetForm() {
        setUsername('');
        setEmail('');
        setPassword('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        const userData = runValidations();
        if (Object.keys(userData).length > 0) {
            setErrors(userData);
        } else {
            const usersObj = {
                username,
                email,
                password
            };
            dispatch(startRegisterUser(usersObj, resetForm, navigate));
            setErrors({});
        }
    }

    return (
        <div>
            <h3> Register </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="username" value={username} placeholder="Enter Your User-Name..." onChange={handleChange} />
                    {errors.username && <span >{errors.username}</span>}
                </div>
                <div>
                    <input type="text" name="email" value={email} placeholder="Enter Your E-Mail..." onChange={handleChange} />
                    {errors.email && <span >{errors.email}</span>}
                </div>
                <div>
                    <input type="password" name="password" value={password} placeholder="Enter Your Password..." onChange={handleChange} />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <div>
                    <input type="submit" value='Submit' /><br />
                </div>
            </form> <br />
            <Link to='/login'>Already Registered ? Login Here !</Link>
        </div>
    );
};

export default Register;
