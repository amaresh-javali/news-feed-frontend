import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from 'redux-thunk';

import userReducer from "../Reducers/userReducer";
import categoryReducer from "../Reducers/categoryReducer";

const rootReducer = combineReducers({
  users: userReducer,
  category: categoryReducer,
});

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return { store };
};

export default configureStore;