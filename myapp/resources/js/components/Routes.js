import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import UserPage from './views/User/UserPage';
import {
     MainPage

} from "./views";


const Routes = () => {
    return(
        <Router>
        <Switch>
          <Route path="/" exact component={MainPage}/>
        
          <Route path="/userprofile" exact component={UserPage}/>
 
           {/* <PrivateRoute path='/userprofile' exact component={UserPage}/> */}
        </Switch>
        </Router>
    )
}

export default Routes

