type userType = {
    userId:string
    userEmail:string
    role:string
}

export type UserType = {  
    user:userType,
    token:string
}| undefined;
export type CookieType = {
    name:string
    value:string
}| undefined;