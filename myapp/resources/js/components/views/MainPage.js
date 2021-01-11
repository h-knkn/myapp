import React, {useState} from 'react';
import {SignupModal, Top, LoginModal, ResetModal} from './index';

  const MainPage = () => {

    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const [openResetPassword, setopenResetPassword] = useState(false);

    const [email , setEmail] = useState("");

    return (
      <div>
        <Top onClickSignup={() => setOpenSignup(true)}/>
        <SignupModal open={openSignup} handleClose={() => setOpenSignup(false)} onClickLogin={() => { setOpenLogin(true); setOpenSignup(false);}}/>
        <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} onClickReset={() => { setopenResetPassword(true); setOpenLogin(false); setEmail("")}}/>
        <ResetModal open={openResetPassword} handleClose={() => setopenResetPassword(false)} email={email} setEmail={setEmail}/>
      </div>
    )
  }
  
  export default MainPage