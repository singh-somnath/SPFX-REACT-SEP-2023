import * as React from 'react';
import styles from  "./AddTodo.module.scss";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, stateType,updateTodo, item } from '../../feature/todoSlice'; 


export default function AddTodo(){  

    const selectedItem: item = useSelector((state:stateType) => state.todoItem);
    const listItem = useSelector((state:stateType) => state.todoList);
 
    const [input,setInput]  = useState("");
    useEffect(()=>{
            if(selectedItem)
                setInput(selectedItem.text);
    },[selectedItem]);
  
     const dispatch = useDispatch();
    
    const addTodoHandler = (e) => {
        e.preventDefault();
        dispatch(addTodo(input));
        //
        setInput("");
    } 

    const updateTodoHandler = (e) => {
        e.preventDefault();
        dispatch(updateTodo({text:input,id:selectedItem.id}));
        setInput("");
    } 
   

    return(
          <div className={styles.toDoForm}>
                    <input type="text" className={styles.toDoText} value={input} onChange={(e) => setInput(e.target.value)}/>
                    {
                        !selectedItem ?
                        <button className={styles.toDoAdd} onClick={addTodoHandler}>Add</button>
                        :
                        <button className={styles.toDoAdd} onClick={updateTodoHandler}>Update</button>
                    }
         </div>
    );
}