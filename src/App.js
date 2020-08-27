import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';

import './App.css';
import Switch from 'react-bootstrap/esm/Switch';
import Nav from './Components/nav';

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
