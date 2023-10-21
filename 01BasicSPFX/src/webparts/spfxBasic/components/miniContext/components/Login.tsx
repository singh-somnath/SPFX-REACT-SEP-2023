import * as React from 'react';
import { useState,useContext } from 'react';
import {useUserContext} from '../context/UserContext';



export default function Login(){
    const[userName,setUSerName] = useState("");
    const[password,setPassword] = useState("");

    const { addUser } = useUserContext();

    const handleClick = (e) =>{
        e.preventDefault();
        addUser(userName);
    }
    return(
       <div>
            <div>
                <input type="text" className="" value={userName} onChange={(e)=>setUSerName(e.target.value)} />
                <input type="text" className="" value={password} onChange={(e)=>setPassword(e.target.value)}/>

            </div>
            <div>
                <button onClick={(e) => handleClick(e)}>Submit</button>
            </div>
       </div>
    );
}