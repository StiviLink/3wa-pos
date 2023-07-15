import { createContext } from 'react'
// config
import { PATH_AFTER_LOGIN } from 'src/config-global'

// ----------------------------------------------------------------------

const context = {
    login: (email:String, password:String) => email === 'demo@minimals.cc' && password === 'demo1234' ?
        PATH_AFTER_LOGIN : ''
}

export const AuthContext = createContext(context)
