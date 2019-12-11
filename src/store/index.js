import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers/index.js';
import userReducers from './reducers/userReducers';
import departmentReducers from './reducers/departmentReducers';
import thunk from 'redux-thunk'


let reducer = combineReducers(reducers,userReducers, departmentReducers)
export default function configureStore(initialState={}) {
	const store = createStore(reducer, initialState,applyMiddleware(thunk));
	return store;
}