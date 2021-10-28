import React,{useState} from 'react'
import * as Api from "../service/api"
import {Checkbox,ListItem,ListItemText,IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles, } from '@mui/styles';

const useStyles = makeStyles(()=>({
    root:{
        maxWidth:360,
        margin: 'auto',

    },
    ul:{
        paddingLeft:0,
        listStyle: 'none',
    },
    list:{
        justifyContent:'space-between',
    },

}))

const checkedHandle = async (props,id) =>{
    await Api.toggleComplete(id);
    props.fetch();
}

const ToDoList = (props) =>{
    const classes = useStyles();
    const deleteHandle = (id) =>{
        Api.todoDelete(id);
        props.fetch();
    }

    const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));
    const handleChange = (newValue) => {
        setValue(newValue);
      };

    const todoList = props.todos.map((todo)=>{
        return(
            <ListItem
                key={todo.id}
                secondaryAction=
                {
                    <IconButton edge="end" aria-label="delete" onClick={()=>deleteHandle(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
            <Checkbox onChange={()=>checkedHandle(props,todo.id)} checked={todo.isCompleted} />
            {todo.isCompleted?<del> <ListItemText  primary={todo.content}/></del>:<ListItemText  primary={todo.content}/>}
            </ListItem>
        )
    })
    return(
        <div className={classes.root}>
            <h2>YourToDo</h2>
            
            <ul>{todoList}</ul>
            
        </div>
    )
}
export default ToDoList