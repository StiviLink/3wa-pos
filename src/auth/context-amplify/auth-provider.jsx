import {useEffect, useReducer, useCallback, useMemo} from 'react'
//auth
import { AuthContext } from './auth-context'
import auth from "../../api/auth"
//Session Storage
import {useSessionStorage} from "../../hooks/use-session-storage"

// ----------------------------------------------------------------------
console.log('auth provider start')
export function AuthProvider({ children }) {
  const Types = {
    INITIAL : 'INITIAL',
    LOGOUT : 'LOGOUT'
  }

  const initialState = {
    user: null,
    loading: true,
  }

  const reducer = (state, action) => {
    if (action.type === Types.INITIAL) {
      return {
        loading: false,
        user: action.payload.user,
      }
    }
    if (action.type === Types.LOGOUT) {
      return {
        ...state,
        user: null,
      }
    }
    return state
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [sessionUser, setSessionUser, removeCurrentUser] = useSessionStorage('currentUser', null)

  const initialize = useCallback(async () => {
    try {
      if (sessionUser) {
        const currentUser = await auth.currentUser(sessionUser)
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...currentUser,
              id: currentUser.id,
              idConnexion: currentUser.idConnexion,
              role: currentUser.role,
            }
          }
        })
      }
      else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null
          }
        })
      }
    }
    catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      })
    }
  }, [sessionUser])

  useEffect(() => {
    initialize().then()
  }, [initialize])

  // LOGIN
  const login = useCallback(async (email, password) => {
    setSessionUser(await auth.signIn(email, password))
    const currentUser = await auth.currentUser(sessionUser)

    if(currentUser){
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: {
            ...currentUser,
            id: currentUser.id,
            idConnexion: currentUser.idConnexion,
            role: currentUser.role
          }
        }
      })
      await initialize()
    }
    else {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null
        }
      })
    }
    return currentUser
  }, [])

  // LOGOUT
  const logout = useCallback(async () => {
    //await auth.signOut()
    removeCurrentUser()
    dispatch({
      type: Types.LOGOUT
    })
    await initialize()
  }, [])
/*
  // REGISTER
  const register = useCallback(
    async (email, password, firstName, lastName) => {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          given_name: firstName,
          family_name: lastName,
        },
      });
    },
    []
  )

  // CONFIRM REGISTER
  const confirmRegister = useCallback(async (email, code) => {
    await Auth.confirmSignUp(email, code);
  }, [])

  // RESEND CODE REGISTER
  const resendCodeRegister = useCallback(async (email) => {
    await Auth.resendSignUp(email);
  }, [])

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    await Auth.forgotPassword(email);
  }, [])

  // NEW PASSWORD
  const newPassword = useCallback(async (email, code, password) => {
    await Auth.forgotPasswordSubmit(email, code, password);
  }, [])
*/
  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated'

  const status = state.loading ? 'loading' : checkAuthenticated

  const memorizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'simple',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      //register,
      //newPassword,
      //forgotPassword,
      //confirmRegister,
      //resendCodeRegister,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      //register,
      //newPassword,
      //forgotPassword,
      //confirmRegister,
      //resendCodeRegister,
    ]
  )

  return <AuthContext.Provider value={memorizedValue}>{children}</AuthContext.Provider>
}