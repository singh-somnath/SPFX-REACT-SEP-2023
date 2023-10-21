import * as React from 'react';
import styles from  "./ToDoItem.module.scss";
import IconPencil from '../../icon/IconPencil';
import IconFloppyDisk from '../../icon/IconFloppyDisk';
import IconCross from '../../icon/IconCross';
import { useState } from 'react';
import { useToDoContext } from '../../context/useToDoItemContext';

export default function ToDoItem({item}){
    const[todoTitle,setTodoTitle] = useState(item.todo);
    const[todoComplete] = useState(item.complete);
    const[isEditable,setIsEditable] = useState(false);

    const {editToDo,deleteToDo,toggleToDoComplete} = useToDoContext();

    return(
        <div className={styles.toDoItem}>
            <input type="checkbox" className="toDoCheck" value={todoComplete} onChange={() => {toggleToDoComplete(item.id)}}  />
            <input type="text" className="toDoItemText" value={todoTitle} onChange={(e)=>setTodoTitle(e.target.value)} readOnly={!isEditable}/>
            <div className="toDoItemEdit">
                    {!isEditable?
                        <div className="toDoEdit" onClick={() => setIsEditable((prev)=>!prev)}>
                            <IconPencil width="16" height="16" color="red"/>
                        </div>
                    :
                        <div className="toDoUpdate" onClick={() => {editToDo(item.id,{...item,todo:todoTitle,complete:todoComplete});  setIsEditable((prev)=>!prev)}}>
                            <IconFloppyDisk width="16" height="16" color="red"/>
                        </div>
                }
            </div>
            <div className="toDoItemDelete" onClick={()=> deleteToDo(item.id)}>
                <IconCross width="16" height="16" color="red"/>
            </div>
    </div>
    );
}