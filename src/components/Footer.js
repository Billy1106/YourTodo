import React from "react";
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles'; 
const useStyles = makeStyles(()=>({
    root:{
        width:"100%",
        height:56,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        color:"#FFF",
        backgroundColor:"#3f51b5",
        position:"fixed",
        bottom:0,
    }
}));

const Footer =()=>{
    const classes = useStyles();
    return(
        <Box className = {classes.root}>copyright:Billy</Box>
    )
}
export default Footer;