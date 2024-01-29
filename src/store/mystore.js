import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/Root';
import { applyMiddleware, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk';

const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;