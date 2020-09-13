import React , {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from 'react-router-dom'
  import {SignupModal,Top, LoginModal} from './views/index';


  const App = () => {

    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    
    const handleClickOpen = () => {
      setOpenLogin(true);
      setOpenSignup(true);
    };
  
    const handleClose = () => {
      setOpenLogin(false);
      setOpenSignup(false);
    };


    return (
      <div>
        <Top onClickSignup={() => setOpenSignup(true)}/>
        <SignupModal open={openSignup} handleClose={() => setOpenSignup(false)}  onClickLogin={() => setOpenLogin(true)}/>
        <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} />
      </div>
    )

  }
  export default App

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}