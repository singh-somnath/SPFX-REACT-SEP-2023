import * as React from 'react';
import {UserContextProvider} from './context/UserContext';
import Login from './components/Login';
import Profile from './components/Profile';

export default function MiniContext(props:any){
    return(
        <UserContextProvider>
            <div>
                <h1>Context API</h1>
                <Login />               
                <Profile />
            </div>
        </UserContextProvider>
    );
}