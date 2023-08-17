import {createSlice} from '@reduxjs/toolkit'
import {getAllOrders} from "../../api/order"

// ----------------------------------------------------------------------

const initialState = {orders:[]}, orders = await getAllOrders()

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    initOrders: (state) => {
      state.orders = orders
    },
    resetOrders: (state) => {
      state.orders = []
    },
    addToOrders: (state, action) => {
      state.orders.push(action.payload)
    }
  }
})

// Reducer
export default slice.reducer

// Actions
export const {
  initOrders,
  resetOrders,
  addToOrders
} = slice.actions
