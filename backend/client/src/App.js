import React from 'react';
import Main from './pages/Main';
import Articles from './pages/Articles';
import {Login, Signup} from './pages/Auth';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default function App(){
  return(
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/articles" component={Articles} />
        </Switch>
      </Router>

    </>
  )
}