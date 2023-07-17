import './style.css'
import {useAuthContext} from "../../../auth/hooks/use-auth-context"
import {useSearchParams, useRouter} from "../../../routes/hook"
import {useState} from "react";
import Alert from "@mui/material/Alert"
// config
import { PATH_AFTER_LOGIN } from 'src/config-global'

const LoginView = () => {
    const { login } = useAuthContext()

    const router = useRouter()

    const searchParams = useSearchParams()

    const [errorMsg, setErrorMsg] = useState('')

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const returnTo = searchParams.get('returnTo')

    const onSubmit =  () => {
        try {
            login?.(email, password)
            router.push(returnTo || PATH_AFTER_LOGIN)
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
                <h1>Authentification</h1>
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
                        <input className="inputSubmit" type="button" value="Valider" onClick={onSubmit}/>
                    </div>
                </fieldset>
            </form>
        </>
    )
}
export default LoginView
