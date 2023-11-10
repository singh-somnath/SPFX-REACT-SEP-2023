import { IUserDetail, IUserSession } from "../interface/IUserDetail";
import {createUser,createUSerSession,removeUSerSession,validateUser} from "./UserService";

class AuthService{

    public async signUp(userEmail:string,userPassword:string,userTitle:string){
        const data : IUserDetail = {
            Title : userTitle,
            UserEmail : userEmail,
            UserPassword : userPassword
        }

        try{
           const userData = await createUser(data)
           console.log("User Created");
           if(userData)
              return await  this.logIn(userEmail,userPassword);
            
        }catch(error){
            console.log("Error in user creation.");
            throw error;
        }
    }

    public async logIn(userEmail:string,userPassword:string){
        try{
             const validUSer : IUserDetail[] = await validateUser(userEmail,userPassword);

             if(validUSer){               
                const session = await createUSerSession(validUSer[0]);
                localStorage.setItem("BlogUserSession",JSON.stringify(session));
                return session;
             }

        }catch(error){
            console.log("Error in user creation.");
            throw error;
        }  

    }

    public async logOut(userEmail:string){
        try{                           
                const session = await removeUSerSession(userEmail);
                localStorage.removeItem("BlogUserSession");
                if(session)
                    return true;          
                

        }catch(error){
            console.log("Error in user creation.");
            throw error;
        }  
        return false;

    }

    public async getCurrentUser() : Promise<IUserSession | null>{
        let currentUSer : IUserSession  ;
        try{
             const userSession = localStorage.getItem("BlogUserSession");
           
             if(userSession){
                    currentUSer = JSON.parse(userSession);
                     return currentUSer;
             }   
             
              return null;
            
        }catch(error)
        {
            console.log("Error - Not able to get current user.");
            throw error;
        }
       
        
    }
}

export const authService = new AuthService();