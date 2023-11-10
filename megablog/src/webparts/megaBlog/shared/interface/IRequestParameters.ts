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
}

export interface IFileRequestParams{ 
    fileSize?:number;
    fileContent?:any;
    fileName?:string;
}