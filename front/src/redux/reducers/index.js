import { combineReducers } from 'redux';
import authReducer from './auth';
import postReducer from './post';
import wishReducer from './wishList';

const createRootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  wish: wishReducer,
})

export default createRootReducer;