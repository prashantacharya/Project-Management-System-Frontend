import React from 'react';
import { Route } from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Nav from './Components/nav';

import './App.css';

import AppDataProvider from './Context/AppData';
import Project from './Pages/Project';

function App() {
  return (
    <div>
      <AppDataProvider>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/project/:id">
            <Project />
          </Route>
        </Switch>
      </AppDataProvider>
    </div>
  );
}

export default App;
