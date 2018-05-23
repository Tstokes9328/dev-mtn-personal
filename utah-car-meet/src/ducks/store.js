import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import users from './users';

const middleware = applyMiddleware(promiseMiddleware());
export default createStore(users, middleware);