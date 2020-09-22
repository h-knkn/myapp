import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import {
     MainPage,
     UserPage

} from "./views";





const Routes = () => {
    return(
        <Router>
        <Switch>
        {/* <Redirect exact from="/" to="/" /> */}
          <Route path="/" exact component={MainPage}/>     
          <Route path="/userprofile" exact component={UserPage}/>     

        </Switch>
        </Router>
    )
}

export default Routes

