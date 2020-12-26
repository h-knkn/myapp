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
  export const store = createStore(history);
  
  const App = () => {
    return (
      <div>
        <Provider store={store}>
        <ConnectedRouter history={history}>
       
        <Switch>
        <Routes/>
        </Switch>
     
        </ConnectedRouter>
        </Provider>
      </div>
    )
  }
  export default App

  if (document.getElementById('app')) {
      ReactDOM.render(<App />, document.getElementById('app'));
  }