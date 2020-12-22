import ReactDOM from 'react-dom'
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from 'react-router-dom'
  import Routes from './Routes';
  import { Provider } from 'react-redux';
  import * as History from 'history';
  import createStore  from "../../../redux/store/store";
  import { ConnectedRouter, routerMiddleware } from 'connected-react-router';

  
  const history = History.createBrowserHistory();
  export const store = createStore();
  
  const App = () => {
    return (
      <div>
        <Provider store={store}>
        <Router>
        <Switch>
        <Routes/>
        </Switch>
        </Router>
        </Provider>
      </div>
    )
  }
  export default App

  if (document.getElementById('app')) {
      ReactDOM.render(<App />, document.getElementById('app'));
  }