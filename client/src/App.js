import React, {useEffect} from 'react';
import Main from './pages/Main';
import Articles from './pages/Articles';
import {Login, Signup} from './pages/Auth';
import {ToastContainer} from 'react-toastify';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import store from './redux/store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebaseConfig from './config/firebaseConfig';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/authActions';

import AuthRoute from './AuthRoute';

// Initialize firebase instance 
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true   // store user details in firestore database
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,  // To use firestore with firebase
}

export default function App(){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [])

  return(
    <>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <AuthRoute exact path="/login" component={Login} type="guest"/>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/articles" component={Articles} />
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
      <ToastContainer />
    </>
  )
}