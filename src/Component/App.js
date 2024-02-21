import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Navigation from './Navigation';
// import { addUser } from '../Actions/usersAction';
import { addUser } from '../Actions/userAction';
import News from './Feed/News';

const App = () => {
    const [isLog, setIsLog] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    setIsLog(true);

                    const temp = await axios.get('http://localhost:3030/api/user/account', { headers: { 'authorization': token } });
                    const tempResult = temp.data;

                    dispatch(addUser(tempResult));
                }
            } catch (err) {
                alert(err.message);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLog(false);
    };

    return (
        <div >
            <div >
            </div>
            <Navigation isLog={isLog} handleLogout={handleLogout} />
        </div>
    );
};

export default App;
