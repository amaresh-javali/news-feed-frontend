import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../Actions/userAction';
import Home from './Feed/NewsFeed';
import Register from './Register';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import News from './Feed/News';
import Category from './Category';

const Navigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLog, setIsLog] = useState(false);

    const user = useSelector((state) => {
        return state.users.data;
    });

    useEffect(() => {
        // Check if the user is logged in on page load
        const token = localStorage.getItem('token');
        setIsLog(!!token); // Set isLog based on the presence of the token
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLog(false); // Update isLog state to false
        dispatch(removeUser());
        alert('Successfully Logged-Out!');
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div>
            <ul className='nav' style={{ backgroundColor: 'yellow' }}>
                {localStorage.getItem('token') ? (
                    <>
                        <li className='nav-item'><Link to='/' className='nav-link' style={{ color: 'brown' }}>Home</Link></li>
                        {/* <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" /> */}

                        <li className='nav-item'><Link to='/account' className='nav-link' style={{ color: 'brown' }}>Account</Link></li>
                        {/* <li><Link to='/newsfeed'>NewsFeed</Link></li> */}
                        <li>
                            <Link
                                to='/login'
                                style={{ color: 'brown' }}
                                onClick={handleLogout}
                                className='nav-link'>
                                Logout
                            </Link>
                        </li>
                        {isLog && user.role === 'admin' ?
                            <li className='nav-item'><Link to='/category' className='nav-link' style={{ color: 'brown' }}>Category</Link></li>
                            :
                            null
                        }
                    </>
                ) : (
                    <>
                        <li><Link to='/login' className='nav-link' style={{ color: 'brown' }}>Log-In</Link></li>
                        <li><Link to='/register' className='nav-link' style={{ color: 'brown' }}>Register</Link></li>
                    </>
                )}
            </ul>
            <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/newsfeed' element={<News />} exact={true} /> */}
                <Route path='/category' element={<Category />} />
                <Route path='/login' element={<Login setIsLog={setIsLog} />} />
                <Route path='/register' element={<Register />} />
                {isLog && <Route path='/account' element={<Account user={user} />} />}
            </Routes>
        </div>
    );
};

const Account = ({ user }) => {
    return (
        <div>
            <h2>Account Details</h2>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            {/* Add other user details here */}


        </div>
    );
};

export default Navigation;
