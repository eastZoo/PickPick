import { combineReducers } from 'redux';
import authReducer from './auth';


const createRootReducer = combineReducers({
  auth: authReducer,
})

export default createRootReducer;