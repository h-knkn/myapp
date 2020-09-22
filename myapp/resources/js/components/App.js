import React , {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from 'react-router-dom'
  import Routes from './Routes';
  import history from './createBrowserHistory';
  

  const App = () => {
    return (
      <div>
        <Router>
        <Switch>
        <Routes />
        </Switch>
        </Router>
      </div>
    )
  }
  export default App

  if (document.getElementById('app')) {
      ReactDOM.render(<App />, document.getElementById('app'));
  }