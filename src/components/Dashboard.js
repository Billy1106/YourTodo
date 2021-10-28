import React, {useState,useEffect,useContext} from 'react';
import { AuthContext } from "../providers/AuthProvider";
import dig from "object-dig"
import * as Api from "../service/api"
import ToDoList from './ToDoList';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles'; 
import Button from '@mui/material/Button';

const useStyles = makeStyles(()=>({
    root:{
        textAlign:"center",
        marginTop:40,
    },
    form:{
        width:"100%",
        maxWidth:360,
        margin:"auto",
        marginButtom:40,
        display:"flex",
        alignItems:"baseline",
        justifyContent:"center",
    },
    input:{
        marginRight:30
    }
    
}));

const Dashboard = ()=>{
    const currentUser = useContext(AuthContext);
    const [inputName,setInputName] = useState("");
    const [todos,setTodos] = useState([]);
    const classes = useStyles();
    useEffect(()=>{
        //const todos = Api.initGet(currentUser.currentUser.uid)
        //setTodos(todos)はできないなぜなら非同期通信だから
        doFetch();

    },[currentUser])
  
    const doFetch = async() => {
        if (dig(currentUser,'currentUser','uid')){
            //console.log(currentUser.currentUser.uid)
            const data = await Api.initGet(currentUser.currentUser.uid)
            setTodos(data);
        }
    }

    const formRender = () =>{
        let dom;
        if(dig(currentUser,'currentUser','uid')){
            dom = <form className={classes.form}>
                <TextField className={classes.input}id="standard-basic" label="E.g Jogging" variant="standard"  value = {inputName} onChange={(event)=> setInputName(event.currentTarget.value)}/>
                <Button variant="contained" color="primary" 
                    disabled={inputName.length>0?false:true} size="small" type="button" onKeyDown={()=>keyPress()} onClick={()=>post()}>Add</Button>
            </form>
        }
        return dom;
    }

    const keyPress = (e) => {
        console.log(e.keyCode);
        if(e.keyCode === 13){
           post();
        }
     }
    const post = async ()=>{
        await Api.addTodo(inputName,currentUser.currentUser.uid);
        await setInputName("");
        doFetch();
    }
    return(
        <div className={classes.root}>
            {formRender()}
            <ToDoList todos={todos} fetch = {doFetch}/>
        </div>
    )
};


export default Dashboard;
