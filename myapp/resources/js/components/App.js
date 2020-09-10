import React , {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from 'react-router-dom'
  import {SignupModal,Top} from './views/index';


  const App = () => {

    const [open, setOpen] = useState(false);
    

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    return (
      <div>
        <Top handleClickOpen={handleClickOpen}/>
        <SignupModal open={open} handleClose={handleClose}/>
      </div>

    )

  }
  export default App

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}