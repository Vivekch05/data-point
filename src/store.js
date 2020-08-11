import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/Index';

const middleware=[thunk];
const initState= {};

const store = createStore(rootReducer,initState,applyMiddleware(...middleware));
export default store;