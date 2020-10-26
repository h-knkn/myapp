import React , {useState, useEffect} from 'react';
import {SignupModal,Top, LoginModal, UserPage} from './index';
  
  

  const MainPage = () => {

    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    
    // const handleClickOpen = () => {
    //   setOpenLogin(true);
    //   setOpenSignup(true);
    // };
  
    // const handleClose = () => {
    //   setOpenLogin(false);
    //   setOpenSignup(false);
    // };


    return (
      <div>
        <Top onClickSignup={() => setOpenSignup(true)}/>
        <SignupModal open={openSignup} handleClose={() => setOpenSignup(false)}  onClickLogin={() => setOpenLogin(true)} />
        <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} />
      </div>
    )

  }
  
  export default MainPage