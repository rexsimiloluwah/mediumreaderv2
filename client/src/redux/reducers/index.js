import {combineReducers} from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import errorReducer from './errorReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
    auth: authReducer,
    article: articleReducer,
    error: errorReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})