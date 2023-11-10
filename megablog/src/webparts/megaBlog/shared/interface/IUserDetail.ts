export interface IUserDetail{
    Id?:number;
    Title:string;
    UserEmail:string;
    UserPassword?:string;
}

export interface IUserSession{
    Id?:number;
    Title:string;
    UserEmail:string;
    SessionString : string;
}