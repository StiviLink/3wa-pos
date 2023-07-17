import { createContext } from 'react'
import {UserProps} from "../../api/auth/types"

// ----------------------------------------------------------------------

type ContextProps = {
    currentUser ?: UserProps
    login : any
    authenticated : boolean
    method : string
}

const context = {} as ContextProps

export const AuthContext = createContext(context)
