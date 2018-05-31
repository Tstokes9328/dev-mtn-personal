import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import users from './users';
import events from './events';

const middleware = applyMiddleware(promiseMiddleware());
const rootReducer = combineReducers({events: events, users: users})
export default createStore(rootReducer, middleware);