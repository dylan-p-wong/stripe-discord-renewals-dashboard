import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import NavBar from './components/NavBar';
import UserDashboard from './components/UserDashboard';
import FlashMessage from './components/FlashMessage';
import Home from './components/Home';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_GpHRH6SW1VzRZWIv6JJXjPjC00k57yMQ5g');

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
        <NavBar />
        <div className="main">
        <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/dashboard'>
              <UserDashboard stripe={stripePromise}/>
            </Route>
          </Switch>
        </div>
        </Router>
        <FlashMessage/>
      </div>
    </Provider>
  );
}

export default App;
