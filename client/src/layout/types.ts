export type Theme = 'light' | 'dark'
export type Navigator = '/' & String
export type User = {
    firstName? : string,
    lastName? : string,
    email: string,
    password : string,
    confirmPassword? : string
}

export enum Routes{
    HOME = '/',
    AUTH = '/auth',
    ADMIN_AUTH = '/admin/auth',
    APP = '/app',
    DASHBOARD = '',
    COURSE = 'course',
    PROFILE = 'profile',
    ERROR = '/error'
}


export type Course = {
    id ?: string,
    title : string,
    description? : string,
    price : number,
    imageUrl? : string,
    creatorId?: string 
}
// title: String,
//     description: String,
//     price: Number,
//     imageUrl: String,
//     creatorId: {
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Admin' 
//     }