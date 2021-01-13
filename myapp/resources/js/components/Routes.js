import React from "react";
import Auth from './Auth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import UserPage from './views/User/Home/UserPage';
import MyBaby from './views/User/MyBaby/MyBaby';
import FirstMemory from './views/User/FirstMemory/FirstMemory';
import ShareInfo from './views/User/ShareInfo/ShareInfo';
import Calendar from './views/User/Calendar/Calendar';
import {
     MainPage

} from "./views";



const Routes = () => {
    return(
     
        <Switch>
          <Route path="/" exact component={MainPage}/>
        
        <Auth>
          <Route path="/userprofile" exact component={UserPage}/>
          <Route path="/babyprofile" exact component={MyBaby}/>
          <Route path="/firstmemory" exact component={FirstMemory}/>
          <Route path="/share" exact component={ShareInfo}/>
          <Route path="/calendar" exact component={Calendar}/>
        </Auth>
        
        </Switch>
    
    )
}

export default Routes

