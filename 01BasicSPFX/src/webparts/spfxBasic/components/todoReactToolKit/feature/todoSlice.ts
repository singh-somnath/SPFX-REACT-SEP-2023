import { createSlice,nanoid } from "@reduxjs/toolkit";

/*const initialState ={
    todoList: [ {id:"1", text:"Hello World"}]
}*/

export interface item {
    id:string,
    text:string
}

export interface stateType {
    todoItem : item,
    todoList : item[]

}

const initialState : stateType = {

    todoItem:undefined,
    todoList:[]
};

const todoSlice = createSlice({
    name:"todo",
    initialState : initialState,
    reducers:{
        addTodo : (state,action)=>{

            const todo = {
                id:nanoid(),
                text:action.payload
            };

            state.todoList.push(todo);

        },
        removeTodo : (state,action) => {
            state.todoList = state.todoList.filter((todo) => todo.id !== action.payload);

        },
        updateTodo : (state,action) => {
             state.todoList.map((todo) => todo.id === action.payload.id ? todo.text = action.payload.text : todo);
             state.todoItem = undefined;

        },
        selectedItem : (state,action) => {
            state.todoItem = action.payload
        }
    }
});

//export const selectToDoList = (state) => state.todo;

export default todoSlice.reducer;
export const { addTodo, removeTodo, updateTodo,selectedItem} =  todoSlice.actions;