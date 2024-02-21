import axios from 'axios';


export const getCategory = () => {
    return async (dispatch) => {
        try {
            const result = await axios.get('http://localhost:3030/api/getAll', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            dispatch(getCat(result.data))

        } catch (e) {
            console.log(e.message)
        }
    }
}

export const getCat = (data) => {
    return {
        type: 'GET_CATEGORY',
        payload: data
    }
}



export const addCategory = (categoryValue) => {
    return async (dispatch) => {
        try {
            const newCat = await axios.post('http://localhost:3030/api/addCategory', categoryValue, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            dispatch(addCat(newCat.data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteCategory = (categoryId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3030/api/deleteCategory/${categoryId}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            dispatch(removeCategory(categoryId)); 
        } catch (error) {
            console.error('Error deleting category:', error.message);
        }
    };
};

export const addCat = (catData) => {
    return {
        type: 'ADD_CATEGORY',
        payload: catData
    }
}

export const removeCategory = (categoryId) => {
    return {
        type: 'DELETE_CATEGORY',
        payload: categoryId
    };
};