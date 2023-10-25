import './style.css'
import {useAuthContext} from "src/auth/hooks/use-auth-context"
import {useSearchParams, useRouter} from "src/routes/hook"
import React, {useEffect, useState} from "react"
import Alert from "@mui/material/Alert"
// config
import { PATH_AFTER_LOGIN } from 'src/config-global'
//hook
import useUser from "src/sections/hook/use-user"
import useProducts from "src/sections/hook/use-products"
import useOrders from "src/sections/hook/use-orders"
import {getUserToActivate, updateUser} from "../../../api/user"

const LoginView = () => {
    const { login } = useAuthContext()
    const {onInitUser, onResetUser} = useUser()
    const {onResetProducts} = useProducts()
    const {onResetOrders} = useOrders()

    useEffect(() => {
        onResetUser()
        onResetProducts()
        onResetOrders()
    },[])

    const router = useRouter()

    const searchParams = useSearchParams()

    const [errorMsg, setErrorMsg] = useState('')

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const returnTo = searchParams.get('returnTo'),
        activate = searchParams.get('activate')

    useEffect(() => {
        if(activate) {
            getUserToActivate(activate).then(res => {
                if(res) {
                    res.isVerified = true
                    res.status = 'active'
                    res.idUser = res.id
                    updateUser(res).then(() => {
                        setEmail(res.email)
                        setPassword('password')
                    })
                }
            })
        }
    }, [])
    const onSubmit =  async () => {
        try {
            const failed = document.getElementById("failed")
            if(failed) {
                if(!email.match('@.*.[.]..*$')) {
                    failed.style.display = 'inline'
                    failed.innerText = 'Please, enter a valid email'
                }
                else {
                    failed.style.display = 'none'
                    const logged = await login?.(email, password)
                    console.info('logged', logged)
                    if(logged) {
                        onInitUser()
                        router.replace(returnTo??PATH_AFTER_LOGIN)
                    }
                    else {
                        failed.innerText = 'Bad credentials'
                        failed.style.display = 'inline'
                    }
                }
            }
        }
        catch (error:any) {
            console.error(error)
            setErrorMsg(typeof error === 'string' ? error : error.message)
        }
    }

    return (
        <>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <form>
                <h1>Login</h1>
                <div className="auth-notice">
                    <div className="failed" id="failed"></div>
                </div>
                <fieldset>
                    <div className="divGroup">
                        <div className="divLabel"><label htmlFor="email">Email</label></div>
                        <input className="inputText" type="email" name="email" value={email}
                               onChange={e => setEmail(e.target.value)}
                               placeholder="votre adresse email" required/>
                    </div>
                    <div className="divGroup">
                        <div className="divLabel"><label htmlFor="password">Password</label></div>
                        <input className="inputText" type="password" name="password" value={password}
                               onChange={e => setPassword(e.target.value)} required/>
                    </div>
                    <div className="divGroup">
                        <input className="inputSubmit" type="button" value="Valid" onClick={() => onSubmit().then}/>
                    </div>
                </fieldset>
            </form>
        </>
    )
}
export default LoginView
