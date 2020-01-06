import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers/index.js';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';


let reducer = combineReducers(reducers)
export default function configureStore(initialState={}) {
	const store = createStore(reducer, initialState,applyMiddleware(thunk, promiseMiddleware));
	return store;
}