import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { Component } from 'react';



const UserPage = () => {

  const [name, setName] = useState("");

  const ToProfile = () => {
    return axios
        .get('api/user', {
           headers: {Authorization:`Bearer${localStorage.access_token}`}
          })
        .then(res => {
          localStorage.setItem('access_token', res.access_token)
          console.log(res.data);
          return props.handleClose() 
        })
        .catch(err => {
          console.log(err)
        })
  }

  // componentDidMount = () => {
  //   ToProfile().then(res =>{
  //     setName({name:res.user.name})
  //   });
  // }

  // useEffect(() => {
  //   ToProfile().then(res =>{
  //     setName({name:res.data.name})
  //   });
  // },[name]);


  return (
  <div>こんにちは{name}さん</div> 
    
  );

  
  }
  
  
  export default UserPage