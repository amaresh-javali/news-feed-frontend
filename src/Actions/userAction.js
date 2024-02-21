import axios from 'axios'
// import { Navigate } from 'react-router-dom'
export const startRegisterUser = (usersObj, resetForm, navigate) => {
    return async (dispatch) => {
        try {
            const user = await axios.post(`http://localhost:3030/api/user/register`, usersObj)
            const result = user.data
            if (result.hasOwnProperty('username')) {
                resetForm();
                alert('Successfully registered')
                navigate('/login');
            }
        } catch (err) {
            alert(err.message)
        }
    }
}
export const registerUserSuccess = (userData) => ({
    type:' REGISTER_USER_SUCCESS',
    payload: userData
});


export const startAddUser = (inputObj, resetForm, navigate) => {
    return (async (dispatch) => {
        try {
            const temp = await axios.post(`http://localhost:3030/api/user/login`, inputObj);
            const result = temp.data;

            if (result.hasOwnProperty('token')) {
                localStorage.setItem('token', result.token);
                resetForm();
                navigate('/');
            }
            else {
                alert(result.error);
            }
        }
        catch (err) {
            console.log('Error:', err); 
            alert(err.error);
            console.log(err.message)
        }
    })
};

export const addUser = (userData) => ({
    type: 'ADD_USER',
    payload: userData
});

//remove user after logging out from the store.
export const removeUser = ()=>
{
    return{
        type: "REMOVE_USER", 
    }
};



