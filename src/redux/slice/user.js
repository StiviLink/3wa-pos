import {createSlice} from '@reduxjs/toolkit'
import {getAllUsers, getUserByEmail} from "src/api/user"

// ----------------------------------------------------------------------

const sessionUser = sessionStorage.getItem('currentUser'),
    currentUser = sessionUser ? await getUserByEmail(JSON.parse(sessionUser)?.email) : {}

const initialState = {users:[], currentUser: {}},
    users = currentUser?.role==='Admin' ? await getAllUsers() : []

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: (state) => {
      state.users = users
      state.currentUser = currentUser
    },
    resetUser: (state) => {
      state.users = []
      state.currentUser = {}
    },
    addToUsers: (state, action) => {
      state.users.push(action.payload)
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    deleteToUsers: (state, action) => {
      state.users = state.users.filter(x => x.id === action.payload)
    }
  }
})

// Reducer
export default slice.reducer

// Actions
export const {
  initUser,
  resetUser,
  addToUsers,
  updateCurrentUser,
  deleteToUsers
} = slice.actions
