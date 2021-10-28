import React, {useContext}from "react";
import {signInWithGoogle, logOut} from '../service/firebase';
import { AuthContext } from "../providers/AuthProvider";
import dig from "object-dig"
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles'; 
import Button from '@mui/material/Button';

const useStyles = makeStyles(()=>({
    toolbar:{
        justifyContent: 'space-between'
    },
    button:{
        color: '#FFF'
    }
}));

const Header = ()=>{
    const currentUser = useContext(AuthContext);
    console.log(currentUser);
    const classes = useStyles();
    const buttonRender = () =>{
        let buttonDom;
        if(dig(currentUser,'currentUser','uid')){
            buttonDom = <Button className ={classes.button} color="inherit" onClick={logOut}>Sign out</Button>
        }else{
            buttonDom = <Button className ={classes.button} color="inherit" onClick={signInWithGoogle}>Sign in</Button>
        }
        return buttonDom;
    }
    
    return(
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
            <Typography variant="h6">
            YourToDo
            </Typography>
            {buttonRender()}
            
            </Toolbar>
        </AppBar>
    )
}
export default Header;