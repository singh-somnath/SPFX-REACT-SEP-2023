import { IBlogDetail } from '../interface/IBlogDetail';
import {IRequestParameters,IFileRequestParams} from '../interface/IRequestParameters';
import ContextUtil from '../utility/ContextUtil';

export async function getBlogs(blogId:number = -1){
    const contextUtil = ContextUtil.getInstance();
    try{

        const request:IRequestParameters = {
            title :"MegaBlogArticle",
            selectOptions:"Id,Title,BlogTitle,BlogContent,BlogStatus,UserEmail,File/ServerRelativeUrl,File/Name",
            expandOptions:"File"
        };
        if(blogId != -1)
            request.itemId = blogId;

        const items : IBlogDetail[] | IBlogDetail = await contextUtil.getListItem(request);
        return items;

    }catch(error){
        throw error;
    }
}

export async function uploadFeatureImage(file:any,fileName:string){
    const contextUtil = ContextUtil.getInstance();
    let result:any;
    try{

        const request:IFileRequestParams = {          
            fileContent : file,
            fileName : fileName,
            fileSize : file?.size
        };

        result = contextUtil.uploadFileByServerRelativeUrl(request); 
      

    }catch(error){
        throw error;
    }
    return result;
}

export async function updateFileMetaData(data:IBlogDetail,itemId:number){
    const contextUtil = ContextUtil.getInstance();
    let result:any;
    try{

        const request:IRequestParameters = {
          title : "MegaBlogArticle",
          itemId:itemId,
          inputContent:data
        };

        result = await contextUtil.updateListItem(request); 
      

    }catch(error){
        throw error;
    }
    return result;
}