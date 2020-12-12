import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import NavBar from './components/NavBar';
import UserDashboard from './components/UserDashboard';
import FlashMessage from './components/FlashMessage';
import Home from './components/Home';
import {loadStripe} from '@stripe/stripe-js';
import config from './config.json';

const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);

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
