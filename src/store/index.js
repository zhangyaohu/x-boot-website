import { createStore, combineReducers } from 'redux'
import reducers from './reducers/index.js'

let reducer = combineReducers(reducers)
export default function configureStore(initialState={}) {
	const store = createStore(reducer, initialState);
	return store;
}