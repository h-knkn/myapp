import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from 'react-router-dom'

  import Top from './views/Top.js'
  import Modal from './ModalToolBar.js'

  const App = () => {
    return (
     
        <Top/>

    )

  }
  export default App

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}