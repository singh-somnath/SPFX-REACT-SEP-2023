export interface IRequestParameters {
    title : string;
    listId ?: string;
    itemId ?:number;
    selectOptions?:string;
    filterOptions?:string;
    orderBy?:string;
    expandOptions?:string;
    inputContent?:any;
    maxCount?:number;
    FileLeafRef?:string;
}

export interface IFileRequestParams{ 
    fileSize?:number;
    fileContent?:any;
    fileName?:string;
}

export interface IPostMultiLookupType{
    results : number[];
}

export interface IPostHyperlinkType {
    "_metadata" : {type : "SP.FieldUrlValue"};
    Description : string;
    Url : string;
}

export interface IPostImageType{
    fileName : string;
    serverUrl : string;
    serverRelativeUrl : string;
}

export interface IFileInfo{
    ServerRelativeUrl:string;
    Name:string;
}

export interface ILookUpType {
    Title : string;
    ID : number;
    id : number;
}