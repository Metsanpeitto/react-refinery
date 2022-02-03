import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import datesReducer from './reducers/dates/dates';

const reducer = combineReducers({
  datesReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
