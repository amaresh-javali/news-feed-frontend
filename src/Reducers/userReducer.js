const initialState = {
    data: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_USER_SUCCESS': {
            return {
                ...state,
                data: action.payload // Assuming `action.payload` contains the registered user data
            };
        }
        case 'ADD_USER': {
            return {...state, data: action.payload};
        }
        case "REMOVE_USER":{
            return {...state, data: {}}
        }
        default:
            return state; // Add a default case to return the current state
    }
};

export default userReducer;