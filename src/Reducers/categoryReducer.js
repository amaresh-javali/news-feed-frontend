const initialState = {
    cat: [] // Assuming categories is an array of strings
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORY': {
            return {
                ...state,
                cat: action.payload
            }
        }
        case 'ADD_CATEGORY': {
            return {
                ...state,
                cat:[...state.cat, action.payload]
            };
        }
        case 'DELETE_CATEGORY' : {
            const deleteCategories = state.cat.filter(category => category._id !== action.payload);
            
            return {
                ...state,
                cat:deleteCategories
            }
        }
        default: {
            return state;
        }
    }
};

export default categoryReducer;