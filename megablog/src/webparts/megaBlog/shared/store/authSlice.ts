import {createSlice} from '@reduxjs/toolkit';
import { IUserSession } from '../interface/IUserDetail';


export interface IStateType {
    status:boolean;
    sessionData : IUserSession | null
}

const initialState : IStateType = {
    status:false,
    sessionData : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{
         logIn : (state,action) =>{
            state.status = true;
            state.sessionData = action.payload;

         },
         logOut : (state,action) =>{
            state.status = false;
            state.sessionData = null;

         }
    }

})

export const reducers = authSlice.reducer;
export const {logIn,logOut} = authSlice.actions;