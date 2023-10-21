import * as React from 'react';
import { useContext } from 'react';
import {useUserContext} from '../context/UserContext';

export default function Profile(){

    const {user} =useUserContext();
    console.log("User - ", user);
    return(
        <div>
            {
                !user ? <div>Please Login</div> : <div>Welcome { user}</div>
            }

        </div>
    )
}