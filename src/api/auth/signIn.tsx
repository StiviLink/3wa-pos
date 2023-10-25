import {UserProps} from "./types"
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
//api
import {getUserByEmail, updateUser} from "src/api/user"
import {verifyPassword} from "../../hooks/use-bcrypt"

export const currentUser = async (sessionUser:UserProps) => {
    if(sessionUser){
        const user = await getUserByEmail(sessionUser.email??"")
        if(user.email===sessionUser.email && user.idConnexion===sessionUser.idConnexion){
            return {
                id: user.id,
                idConnexion: user.idConnexion,
                email: user.email,
                role: user.role
            }
        }
    }
    return null
}
export const signIn = async (email:string, password:string) => {
    const user = await getUserByEmail(email)
    if(user?.id && verifyPassword(password, user.password)){
        const idConnexion = uuidv4()
        console.info(`update user`, await updateUser({...user, idUser: user.id, idConnexion}))
        return {
            id: user.id,
            idConnexion,
            email: user.email,
            role: user.role

        }
    }
    return null
}
