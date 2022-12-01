import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './auth';
import postReducer from './post';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  post: postReducer
})

export default createRootReducer;