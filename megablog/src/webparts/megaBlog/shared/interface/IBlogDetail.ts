import { IFileInfo, ILookUpType } from "./IRequestParameters";

export interface IBlogDetail{
    Id?:number;
    BlogTitle:string;
    BlogSlug:string;
    BlogContent:string;
    BlogStatus:string;
    UserEmail?:string;
    File?:IFileInfo;
    FileLeafRef?:string;
    BlogDate?:string;
    BlogPerson?:ILookUpType;   
}

export interface IBlogDetailPostItem{   
    BlogTitle:string;
    BlogSlug:string;
    BlogContent:string;
    BlogStatus:string;
    UserEmail:string;   
    FileLeafRef:string;
    BlogDate?:string;
    BlogPersonId?:number;   
}


export interface IBlogFeatureImage{  
    size:number;
    fileContent:any;
    name:string;
}

