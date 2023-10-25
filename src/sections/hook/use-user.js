import { useCallback } from 'react'
// redux
import { useDispatch, useSelector } from 'src/redux/store'
import {
  initUser,
  resetUser,
  deleteToUsers,
  addToUsers,
  updateCurrentUser
} from 'src/redux/slice/user'

// ----------------------------------------------------------------------

console.log('use user start')

export default function useUser() {
  const dispatch = useDispatch()

  const allUsers = useSelector((state) => {
    const sessionUser = sessionStorage.getItem('currentUser')
    if(sessionUser && state.user.currentUser?.email !== JSON.parse(sessionUser)?.email){
      dispatch(initUser())
    }
    return state.user.users
  })

  const currentUser = useSelector((state) => {
    const sessionUser = sessionStorage.getItem('currentUser')
    if(sessionUser && state.user.currentUser?.email !== JSON.parse(sessionUser)?.email){
      dispatch(initUser())
    }
    return state.user.currentUser
  })

  const onInitUser = useCallback(
    () => {
      const sessionUser = sessionStorage.getItem('currentUser')
      if(sessionUser) dispatch(initUser())
    },
    [dispatch]
  )

  const onResetUser = useCallback(
    () => {
      dispatch(resetUser())
    },
    [dispatch]
  )

  const onAddToUsers = useCallback(
    (user) => {
      dispatch(addToUsers(user))
    },
    [dispatch]
  )

  const onUpdateCurrentUser = useCallback(
    (user) => {
      dispatch(updateCurrentUser(user))
    },
    [dispatch]
  )

  const onDeleteToUsers = useCallback(
    (id) => {
      dispatch(deleteToUsers(id))
    },
    [dispatch]
  )

  return {
    allUsers,
    currentUser,
    //
    onInitUser,
    onResetUser,
    onAddToUsers,
    onUpdateCurrentUser,
    onDeleteToUsers
  }
}

console.log('use user end')
