import {createStore, applyMiddleware, compose} from 'redux';
// For integrating redux and firestore in the react app
import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
// Middleware 
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [reduxThunk.withExtraArgument({getFirebase, getFirestore})];
const initialState = {}

const store = createStore(rootReducer, initialState,  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

// compose helps us to combine several store enhancers
export default store;