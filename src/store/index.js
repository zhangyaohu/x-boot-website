import { createStore, combineReducers } from 'redux'
import reducers from './reducers/index.js';
import userReducers from './reducers/userReducers'

let reducer = combineReducers(reducers,userReducers)
export default function configureStore(initialState={}) {
	const store = createStore(reducer, initialState);
	return store;
}