import {createSlice} from '@reduxjs/toolkit'
import {getAllProducts} from "../../api/product"

// ----------------------------------------------------------------------

const initialState = {products:[]}, products = await getAllProducts()

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    initProducts: (state) => {
      state.products = products
    },
    resetProducts: (state) => {
      state.products = []
    }
  },
})

// Reducer
export default slice.reducer

// Actions
export const {
  initProducts,
  resetProducts
} = slice.actions
