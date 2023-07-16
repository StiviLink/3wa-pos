import { useEffect, useReducer, useCallback, useMemo } from 'react'
import { Auth } from '@aws-amplify/auth'
// config
import { AMPLIFY_API } from '../../config-global'
//
import { AuthContext } from './auth-context'

// ----------------------------------------------------------------------
const Types = {
  INITIAL : 'INITIAL',
  LOGOUT : 'LOGOUT'
}

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state
}

// ----------------------------------------------------------------------

Auth.configure(AMPLIFY_API)

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const initialize = useCallback(async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()

      if (currentUser) {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...currentUser,
              id: currentUser.attributes.sub,
              displayName: `${currentUser.attributes.given_name} ${currentUser.attributes.family_name}`,
              role: 'admin',
            },
          },
        })
      }
      else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
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
  }, [])

  useEffect(() => {
    initialize().then(r => console.log(r))
  }, [initialize])

  // LOGIN
  const login = useCallback(async (email, password) => {
    const currentUser = await Auth.signIn(email, password);

    dispatch({
      type: Types.INITIAL,
      payload: {
        user: {
          ...currentUser,
          id: currentUser.attributes.sub,
          displayName: `${currentUser.attributes.given_name} ${currentUser.attributes.family_name}`,
          role: 'admin',
        },
      },
    });
  }, [])

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
  );

  // CONFIRM REGISTER
  const confirmRegister = useCallback(async (email, code) => {
    await Auth.confirmSignUp(email, code);
  }, [])

  // RESEND CODE REGISTER
  const resendCodeRegister = useCallback(async (email) => {
    await Auth.resendSignUp(email);
  }, [])

  // LOGOUT
  const logout = useCallback(async () => {
    await Auth.signOut();
    dispatch({
      type: Types.LOGOUT,
    });
  }, [])

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    await Auth.forgotPassword(email);
  }, [])

  // NEW PASSWORD
  const newPassword = useCallback(async (email, code, password) => {
    await Auth.forgotPasswordSubmit(email, code, password);
  }, [])

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'amplify',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      newPassword,
      forgotPassword,
      confirmRegister,
      resendCodeRegister,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      register,
      newPassword,
      forgotPassword,
      confirmRegister,
      resendCodeRegister,
    ]
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
