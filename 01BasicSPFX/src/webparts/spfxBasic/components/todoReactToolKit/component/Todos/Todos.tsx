import * as React from 'react';
import styles from  "./Todos.module.scss";
import IconPencil from '../../icon/IconPencil';
import IconFloppyDisk from '../../icon/IconFloppyDisk';
import IconCross from '../../icon/IconCross';

import { useSelector, useDispatch } from 'react-redux';
import {removeTodo,selectedItem, stateType} from '../../feature/todoSlice'
import { useEffect } from 'react';

//import { selectToDoList } from '../../feature/todoSlice';



export default function Todos(){
    let _todoList = useSelector((state:stateType) => state.todoList);
    const dispatch = useDispatch();
 


    return(
        <div className={styles.toDoItems}>
              {
                _todoList.map((item) => (
                    <div className={styles.toDoItem}>   
                        <div className={styles.toDoItemText}> {item.text} </div>                   
                        <div className="toDoItemEdit">                            
                                    <div className="toDoEdit" onClick={() => {dispatch(selectedItem(item))}} >
                                        <IconPencil width="16" height="16" color="red"/>
                                    </div> 
                        </div>
                        <div className="toDoItemDelete" onClick={() => { dispatch(removeTodo(item.id))}}>
                            <IconCross width="16" height="16" color="red"/>
                        </div>
                     </div>
    

                ))
              }
        </div>
                
        
    );
}