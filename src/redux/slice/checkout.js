import sum from 'lodash/sum'
import uniqBy from 'lodash/uniqBy'
import {createSlice} from '@reduxjs/toolkit'

// ----------------------------------------------------------------------

const initialState = {
  activeStep: 0,
  cart: [],
  subTotal: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: null,
  totalItems: 0,
}

const slice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    getCart(state, action) {
      const cart = action.payload

      const totalItems = sum(cart.map((product) => product.quantity))

      const subTotal = sum(cart.map((product) => product.price * product.quantity))

      state.cart = cart
      state.discount = state.discount || 0
      state.shipping = state.shipping || 0
      state.billing = state.billing || null
      state.subTotal = subTotal
      state.total = subTotal - state.discount
      state.totalItems = totalItems
    },

    addToCart(state, action) {
      const newProduct = action.payload
      const newLine = {
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        stock: newProduct.available,
        quantity: 0,
        selected: true,
        priceTotal: `${newProduct.price}`
      }

      if (!state.cart.length)
        state.cart = [newLine]
      else {
        state.cart = state.cart.map((product) => {
          const existProduct = product.id === newProduct.id

          if (existProduct) {
            return {
              ...product,
              selected: true,
            }
          }

          return {...product, selected: false}
        })
      }

      state.cart = uniqBy([...state.cart, newLine], 'id')
      state.totalItems = sum(state.cart.map((product) => product.quantity))
      state.subTotal = sum(state.cart.map((product) => parseFloat(product.priceTotal)))
    },

    deleteCart(state, action) {
      state.cart = state.cart.filter((product) => product.id !== action.payload)
    },

    resetCart(state) {
      state.cart = []
      state.billing = null
      state.activeStep = 0
      state.total = 0
      state.subTotal = 0
      state.discount = 0
      state.shipping = 0
      state.totalItems = 0
    },

    backStep(state) {
      state.activeStep -= 1
    },

    nextStep(state) {
      state.activeStep += 1
    },

    gotoStep(state, action) {
      state.activeStep = action.payload
    },

    updateQuantity(state, action) {
      const quantity = action.payload
      state.cart = state.cart.map((product) => {
        if (product.selected) {
          const priceTotal = `${(quantity*product.price).toFixed(2)}`
          return {
            ...product,
            quantity,
            priceTotal
          }
        }
        return product
      })
      state.subTotal = sum(state.cart.map((product) => parseFloat(product.priceTotal)))
    },

    increaseQuantity(state, action) {
      const productId = action.payload;

      state.cart = state.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          }
        }
        return product
      })
    },

    decreaseQuantity(state, action) {
      const productId = action.payload

      state.cart = state.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          }
        }
        return product;
      })
    },

    createBilling(state, action) {
      state.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload

      state.discount = discount
      state.total = state.subTotal - discount
    },

    applyShipping(state, action) {
      const shipping = action.payload

      state.shipping = shipping
      state.total = state.subTotal - state.discount + shipping
    },
  },
})

// Reducer
export default slice.reducer

// Actions
export const {
  getCart,
  addToCart,
  resetCart,
  gotoStep,
  backStep,
  nextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
} = slice.actions
