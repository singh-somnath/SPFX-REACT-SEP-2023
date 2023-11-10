import { WebPartContext } from "@microsoft/sp-webpart-base";
import {SPFI, spfi,SPFx} from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import  "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import {IRequestParameters,IFileRequestParams} from '../interface/IRequestParameters';

export default class ContextUtil{
    private _sp : SPFI;
    private _context : WebPartContext;
    private static _instance : ContextUtil;

    private constructor(context:WebPartContext){
        this._context = context;
        this._sp = spfi().using(SPFx(this._context));
    }

    public static initializeInstance(context:WebPartContext){
         this._instance =  new ContextUtil(context);
    }

    public static getInstance():ContextUtil{
        if(this._instance == null)
                 throw new Error("WebPart Context is not initialized.");
        
        return this._instance;       
    }

    public async getListItem(requestParams : IRequestParameters):Promise<any[]>{
        let request:any;
        let response:any[];
        
        if(requestParams.title && !requestParams.listId){
            request = this._sp.web.lists.getByTitle(requestParams.title).items;
        }
        if(!requestParams.title && requestParams.listId){
            request = this._sp.web.lists.getById(requestParams.listId).items;
        }
        if(requestParams.itemId)
        {
            request = request.getById(requestParams.itemId);
        }
        if(requestParams.selectOptions)
        {
            request = request.select(requestParams.selectOptions);
        }
        if(requestParams.expandOptions)
        {
            request = request.expand(requestParams.expandOptions);
        }
        if(requestParams.filterOptions)
        {
            request = request.filter(requestParams.filterOptions);
        }
        if(requestParams.orderBy)
        {
            request = request.orderBy(requestParams.orderBy,false);
        }
        if(requestParams.maxCount)
        {
            request = request.top(requestParams.maxCount);
        }        

        try{
            response = await request.getAll();
        }catch(error){
            console.log(error);
            throw error;
        }

        return response;

    }

    public async createListItem(requestParams : IRequestParameters){
        let request:any;
        let response:any;

        if(requestParams.title && !requestParams.listId){
            request = this._sp.web.lists.getByTitle(requestParams.title).items;
        }
        if(!requestParams.title && requestParams.listId){
            request = this._sp.web.lists.getById(requestParams.listId).items;
        }

        if(requestParams.inputContent){
            request = request.add(requestParams.inputContent);
        }

        try{
            response = await request;
        }catch(error){
            console.log(error);
            throw error;
        }
        return response;

    }

    public async updateListItem(requestParams : IRequestParameters){
        let request:any;
        let response:any;

        if(requestParams.title && !requestParams.listId){
            request = this._sp.web.lists.getByTitle(requestParams.title).items;
        }
        if(!requestParams.title && requestParams.listId){
            request = this._sp.web.lists.getById(requestParams.listId).items;
        }
        if(requestParams.itemId){
            request = request.getById(requestParams.itemId)
        }

        if(requestParams.inputContent){
            request = request.update(requestParams.inputContent);
        }

        try{
            response = await request;
        }catch(error){
            console.log(error);
            throw error;
        }
        return response;        
    }

    public async deleteListItem(requestParams : IRequestParameters){
        let request:any;
        let response:any;

        if(requestParams.title && !requestParams.listId){
            request = this._sp.web.lists.getByTitle(requestParams.title).items;
        }
        if(!requestParams.title && requestParams.listId){
            request = this._sp.web.lists.getById(requestParams.listId).items;
        }
        if(requestParams.itemId){
            request = request.getById(requestParams.itemId)
        }
       
        try{
            response = await request.delete();
        }catch(error){
            console.log(error);
            throw error;
        }

        return response;        
    }

    public async uploadFileByServerRelativeUrl(requestParams:IFileRequestParams){
        let request:any;
        let response:any;

        request = this._sp.web.getFolderByServerRelativePath("MegaBlogArticle").files;        

        if(requestParams.fileSize && requestParams.fileSize < 10485760){
            request = request.addUsingPath(requestParams.fileName,requestParams.fileContent,true);

        }else{
            request = request.addChunked(requestParams.fileName,requestParams.fileContent,(data:any)=>{console.log(data)},true)
        }

        try{
            const file = await request;
            response = await file.file.getItem();
        }catch(error){
            console.log(error);
            throw error;
        }
        return response;
    }
}