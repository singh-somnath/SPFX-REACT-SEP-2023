import * as React from 'react';
import { useState, useContext } from 'react';


function UserContextProvider({children}){
     const [user,setUser] = useState(null);

     const addUser = (user_Name) =>{
        setUser(user_Name);
     }
    
    return(
        <UserContext.Provider value={{user,addUser}}>
            {children}
        </UserContext.Provider>
    )
}

const UserContext = React.createContext(undefined);

const useUserContext = () => useContext(UserContext);

export {useUserContext,UserContextProvider};