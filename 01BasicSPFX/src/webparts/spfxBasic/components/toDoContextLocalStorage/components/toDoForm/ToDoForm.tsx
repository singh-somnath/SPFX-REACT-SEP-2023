import * as React from 'react';
import styles from  "./ToDoForm.module.scss";
import { useState } from 'react';
import { useToDoContext } from '../../context/useToDoItemContext';

export default function ToDoForm(){
    const [todoMsg,setTodoMsg] = useState("");

    const {addToDo} = useToDoContext();

    return(
          <div className={styles.toDoForm}>
                    <input type="text" className={styles.toDoText} value={todoMsg} onChange={(e)=> setTodoMsg(e.target.value)} />
                    <button className={styles.toDoAdd} onClick={() => {addToDo(todoMsg); setTodoMsg("");} }>Add</button>
         </div>
    );
}