import {UserProps} from "./types"
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'

export const currentUser = (sessionUser:string) => {
    console.log('sessionUser', sessionUser)
    if(sessionUser==='demo@minimals.cc'){
        return {
            id: uuidv4(),
            email: 'demo@minimals.cc',
            firstname: 'Stivi',
            lastname: 'Linkid',
            role: 'admin'

        } as UserProps
    }
}
export const signIn = (email:string, password:string) => {
    console.log(`signIn email : ${email} && password : ${password}`)
    console.log(`signIn email === 'demo@minimals.cc' && password === 'demo1234'`,
        email === 'demo@minimals.cc' && password === 'demo1234')
    if(email === 'demo@minimals.cc' && password === 'demo1234'){
        return {
            id: uuidv4(),
            email: 'demo@minimals.cc',
            firstname: 'Stivi',
            lastname: 'Linkid',
            role: 'admin'

        } as UserProps
    }
}
