import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers/index.js';
import userReducers from './reducers/userReducers';
import thunk from 'redux-thunk'


let reducer = combineReducers(reducers,userReducers)
export default function configureStore(initialState={}) {
	const store = createStore(reducer, initialState,applyMiddleware(thunk));
	return store;
}