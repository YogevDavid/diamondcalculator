import React, { useEffect, useState, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from 'react-router-dom';
import './App.css';

import Index from './components/layout/Index';
import Routes from './components/routing/Routes';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/auth';
import Header from './components/layout/header/Header';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(async () => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <HashRouter>
        <Router>
          <div className="container">
            <Header />
            <Switch>
              <Route exact path="/" component={Index} />
              <Route component={Routes} />
            </Switch>
          </div>
        </Router>
      </HashRouter>
    </Provider>
  );
}

export default App;
