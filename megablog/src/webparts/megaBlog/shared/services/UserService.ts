import {IRequestParameters} from '../interface/IRequestParameters';
import { IUserDetail,IUserSession } from '../interface/IUserDetail';
import ContextUtil from '../utility/ContextUtil';
import { getGUID} from "@pnp/core";

export async function createUser(data : IUserDetail){
    const contextUtil = ContextUtil.getInstance();
    let result : any ;
    try{

        const request:IRequestParameters = {
            title :"MegaBlogUsers",
            inputContent:data
        };
       
        result = await contextUtil.createListItem(request);        

    }catch(error){
        throw error;
    }
    return result;
}

export async function validateUser(email:string,password:string){
    const contextUtil = ContextUtil.getInstance();
    let result : IUserDetail[] ;
    try{

        const request:IRequestParameters = {
            title :"MegaBlogUsers",
            filterOptions:`((UserEmail eq '${email}') and (UserPassword eq '${password}'))`,
            selectOptions:"Id,Title,UserEmail",
            maxCount:1
        };
       
        result = await contextUtil.getListItem(request);        

    }catch(error){
        throw error;
    }
    return result;
}

export async function createUSerSession(data:IUserDetail){
    const contextUtil = ContextUtil.getInstance();
    let result : any ;
    try{
        const sessionData : IUserSession = {
            UserEmail:data.UserEmail,
            Title:data.Title,
            SessionString:getGUID()
        }

        const request:IRequestParameters = {
            title :"MegaBlogUserSession",
            inputContent:sessionData
        };
       
        result = await contextUtil.createListItem(request);    
        
        if(result)
         return sessionData ;

    }catch(error){
        throw error;
    }   
}
export async function getUSerSession(email:string){
    const contextUtil = ContextUtil.getInstance();
    let result : IUserSession[] ;
    try{  

        const request:IRequestParameters = {
            title :"MegaBlogUserSession",
            filterOptions:`UserEmail eq '${email}'`,
            selectOptions:"Id,Title,UserEmail,SessionString",
            orderBy:"Created",
            maxCount:1
        };
       
        result = await contextUtil.getListItem(request); 
        return result[0];       

    }catch(error){
        throw error;
    }
    
}
export async function removeUSerSession(email : string){
    const contextUtil = ContextUtil.getInstance();
    let result : any ;
    try{
        const request:IRequestParameters = {
            title :"MegaBlogUserSession",
            filterOptions:`UserEmail eq '${email}'`,
            maxCount:1
        };
        const item :IUserSession[] = await contextUtil.getListItem(request);

        const newRequest:IRequestParameters = {
            title :"MegaBlogUserSession",
            itemId : item[0].Id
        };
        result = await contextUtil.deleteListItem(newRequest);    
        return result;   

    }catch(error){
        throw error;
    }
   
}