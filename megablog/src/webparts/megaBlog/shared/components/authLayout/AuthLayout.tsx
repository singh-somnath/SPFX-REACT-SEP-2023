import * as React from 'react';
import {ReactNode, useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {IStateType} from "../../store/authSlice";
import {useNavigate} from 'react-router-dom';

import {authService} from '../../services/AuthService';
import {getUSerSession} from '../../services/UserService';
import { IUserSession } from '../../interface/IUserDetail';
import {useDispatch} from 'react-redux';
import { logIn } from '../../store/authSlice';

interface IAuthLayoutType{
    children:ReactNode;
    authentication : boolean;
}

function AuthLayout({children,authentication=true}:IAuthLayoutType){

    const [loader,setLoader] = useState(true);
    const [isSessionChecked,setIsSessionChecked] = useState(false);
    const  authStatus = useSelector((state:IStateType)=>state.status);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    useEffect(()=>{
        
        const sessionCheck = async() =>{
            const currentUser = await authService.getCurrentUser();
            if(currentUser)
            {
                const currentUserSession : IUserSession = await getUSerSession(currentUser?.UserEmail);
                if(currentUserSession)
                {
                    if(currentUser.SessionString.toLowerCase() === currentUserSession.SessionString.toLowerCase())
                                      dispatch(logIn(currentUserSession));   
                }
                             
            }
            setIsSessionChecked(true);
        }

        sessionCheck();

    },[dispatch,navigate,isSessionChecked])

    useEffect(()=>{
        if(isSessionChecked){
            console.log("auth status",authStatus);
            if(authentication && authStatus!= authentication)
                navigate("/login");
            else if(!authentication && authStatus != authentication)
                navigate("/");

            setLoader(false);
        }

    },[isSessionChecked,authStatus,navigate,authentication]);
   
    return loader ? <h1>Loading...</h1>:<>{children}</> ;
}

export default AuthLayout;