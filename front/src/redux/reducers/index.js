import { combineReducers } from 'redux';
import authReducer from './auth';
import postReducer from './post';


const createRootReducer = combineReducers({
  auth: authReducer,
  post: postReducer
})

export default createRootReducer;