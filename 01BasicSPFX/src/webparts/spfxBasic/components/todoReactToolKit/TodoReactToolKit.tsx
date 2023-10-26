import * as React from 'react';
import styles from './TodoReactToolKit.module.scss';
import AddTodo from './component/AddTodo/AddTodo';
import Todos from './component/Todos/Todos';
import {Provider} from 'react-redux';
import {store} from './app/Store';

export default function ToDoReactToolKit(){

    return(
        <Provider store={store}>
                <div className={styles.main}>
                    <div className={styles.container}>
                        <AddTodo />     
                        <Todos />    
                    </div>
                </div>
        </Provider>
    );
}