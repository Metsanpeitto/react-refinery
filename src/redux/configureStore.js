import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reservationsReducer from './reducers/reservations/reservations';
import authReducer from './reducers/auth/auth';

const reducer = combineReducers({
  reservationsReducer,
  authReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
