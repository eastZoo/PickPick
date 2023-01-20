import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import wishReducer from './wishReducer';

const createRootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  wish: wishReducer,
})

export default createRootReducer;