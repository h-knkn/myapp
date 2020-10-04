import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";



const UserPage = (props) => {

  
  const [userData, setUserData] = useState([]);
  

  useEffect(() => {
    axios
    .get('api/user', {
               headers: {Authorization:`Bearer${localStorage.access_token}`}
              })
            .then(res => {
              console.log(res);
              console.log(res.data);
              setUserData(res.data);
            })
            .catch(err => {
              console.log(err)
            })
  }, []);



  return (
  <div>
    <div>こんにちは{userData.name}さん</div> 
    <div>あなたのメールアドレスは{userData.email}です</div> 
  </div>
    
  );

  
}
  
  
  export default UserPage