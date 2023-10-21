import { createContext,useContext } from 'react';

const toDoContext = createContext({
    todoList :[{
        id:Date.now(),
        todo:"todo tittle",
        complete : false
    }],
    addToDo : (todo) =>{},
    editToDo : (id,todo) =>{},
    deleteToDo : (id) =>{},
    toggleToDoComplete : (id) => {}
});

const ToDoContextProvider = toDoContext.Provider;

const useToDoContext = () => useContext(toDoContext);

export {ToDoContextProvider,useToDoContext};
