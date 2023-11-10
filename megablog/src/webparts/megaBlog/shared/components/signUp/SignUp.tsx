import * as React from 'react';
import {useForm} from 'react-hook-form';
import {authService} from '../../services/AuthService';
import { useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { logIn } from '../../store/authSlice';


function Login(){
    const[loading,SetLoading] = useState(false);
    const[error,SetError] = useState(null);
    const {register,handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = async (data:any) =>{
            SetLoading(true);
            SetError(null);
            try{
                 const {userTitle,userEmail,userPassword} = data;
                 const userData = await authService.signUp(userEmail,userPassword,userTitle);
                 if(userData)
                        dispatch(logIn(userData));
                 navigate("/");

            }catch(error){
                SetError(error);
            }
            SetLoading(false);
            SetError(null);

    }

    return(
        <div className=''>
            <form onSubmit={handleSubmit(handleSignUp)}>
                {error ? <div className=''>error</div> : null}       
                <div>
                    <Input 
                        type="text" 
                        className="" 
                        label="Title :" 
                        {...register("userTitle",{
                        required:true
                    })} />
                </div>    
                <div>
                    <Input 
                        type="text" 
                        className="" 
                        label="Email :" 
                        {...register("userEmail",{
                        required:true
                    })} />
                </div>
                <div>
                <Input 
                        type="password" 
                        className="" 
                        label="Password :" 
                        {...register("userPassword",{
                        required:true
                    })} />
                </div>
                <div>
                    <Button type="submit" className='' disabled={loading}>Login</Button>
                </div>
            </form>
        </div>
    )
}

export default Login;