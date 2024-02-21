import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startAddUser } from '../Actions/userAction';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function runValidations() {
        const temp = {};

        if (email.trim().length === 0) {
            temp.email = 'E-Mail cannot be Empty !';
        }

        if (password.trim().length === 0) {
            temp.password = 'Password cannot be Empty !';
        }

        return temp;
    }

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    function handleChange(event) {
        if (event.target.name === 'email') {
            setEmail(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const temp = runValidations();

        if (Object.keys(temp).length > 0) {
            setErrors(temp);
        } else {
            const inputObj = {
                email,
                password
            };
            dispatch(startAddUser(inputObj, resetForm, navigate));
            setErrors({});
        }
    }

    return (
        <div className="mb-3">
            <h3>Login Here!</h3>
            <form onSubmit={handleSubmit}>
                <div >
                {/* <label for="exampleInputEmail1" class="form-label">Email address</label><br/> */}
                    <input type='text' name='email' value={email} placeholder='Enter E-Mail...' onChange={handleChange} />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>} <br/>
                </div>
                <div >
                    <input type='password' name='password' value={password} placeholder='Enter your password...' onChange={handleChange} />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <div >
                    <input type='submit' value='login' className='btn btn-success' />
                </div>
            </form>
            <p>Haven't Registered? <Link to='/register'>Register Here!</Link></p>
        </div>
    );
};

export default Login;
