import * as React from 'react';
import styles from  "./ToDoContextLocalStorage.module.scss";

import ToDoForm from './components/toDoForm/ToDoForm';
import ToDoItem from './components/toDoItem/ToDoItem';
import { ToDoContextProvider } from './context/useToDoItemContext';
import { useEffect, useState } from 'react';


export default function ToDoContextLocalStorage(){

    const[todoList,setTodoList] = useState([]);

    useEffect(()=>{
        const todos = JSON.parse(localStorage.getItem("todo"));
        (todos && todos.length > 0) && setTodoList(todos);
    },[]);

    
    useEffect(()=>{
        localStorage.setItem("todo",JSON.stringify(todoList));
    },[todoList]);

    const addToDo = (todoMsg) =>  {
        setTodoList((prev)=> [{id:Date.now(), todo:todoMsg,complete:false},...prev]);
        
    }


    const deleteToDo = (id) =>{
        setTodoList((prevTodoList)=>{
            return prevTodoList.filter((prevTodo) => prevTodo.id !== id)
        });
    }

    const editToDo = (id,todo) =>{
        setTodoList((prevTodoList)=>{
              return  prevTodoList.map((prevTodo)=>{
                       return prevTodo.id === id ? todo : prevTodo;
                });
        });
    }

    const toggleToDoComplete = (id) =>{
        setTodoList((prevTodoList)=>{
            return  prevTodoList.map((prevTodo)=>{
                      return  prevTodo.id === id ? {...prevTodo, complete : !prevTodo.complete} : prevTodo;
              });
         });
    }
        
    return(
        <ToDoContextProvider value={{todoList,addToDo,deleteToDo,editToDo,toggleToDoComplete}}>
            <div className={styles.main}>
                <div className={styles.container}>
                    <ToDoForm />
                    <div className={styles.toDoItems}>
                    {                       
                        todoList.map((todoItem) =>{
                            console.log(todoItem);
                             return <ToDoItem item={todoItem} key={todoItem.id}/> 
                        })
                    }
                    </div>
                </div>
            </div>
        </ToDoContextProvider>
    )
}
