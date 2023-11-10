export class IBlogDetail{
    Id?:number;
    Title:string;
    BlogTitle:string;
    BlogContent:string;
    BlogStatus:string;
    UserEmail:string;
    File?:IFileInfo

}

interface IFileInfo{
    ServerRelativeUrl:string;
    Name:string;
}

export interface IBlogFeatureImage{  
    size:number;
    fileContent:any;
    name:string;
}