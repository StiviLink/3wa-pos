import sum from 'lodash/sum'
import uniqBy from 'lodash/uniqBy'
import {createSlice} from '@reduxjs/toolkit'

// ----------------------------------------------------------------------

const initialState = {
  cart: [],
  subTotal: 0,
  total: 0,
  totalItems: 0,
  paymentMethod: {name: '', icon: '', selected: false},
  money: []
}

const slice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {

    addToCart(state, action) {
      const newProduct = action.payload
      const newLine = {
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        stock: newProduct.available,
        quantity: 0,
        selected: true,
        priceTotal: `0`
      }

      state.cart = state.cart.filter(x => x.quantity>0)

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

    addToMoney(state, action) {
      const newMoney = {
        name:action.payload,
        quantity: 1,
        selected: true
      }

      if (!state.money.length)
        state.money = [newMoney]
      else {
        state.money = state.money.map((money) => {
          const existMoney = money.name === newMoney.name

          if (existMoney) {
            return {
              ...money,
              quantity: money.quantity+1,
              selected: true
            }
          }

          return {...money, selected: false}
        })
      }

      state.money = uniqBy([...state.money, newMoney], 'name')
      state.total = sum(state.money.map((money) => (money.name.endsWith('€') ? parseInt(money.name) :
          parseInt(money.name) / 100)*money.quantity))
    },

    deleteMoney(state, action) {
      state.money = state.money.filter((money) => money.name !== action.payload)
      state.total = sum(state.money.map((money) => (money.name.endsWith('€') ? parseInt(money.name) :
          parseInt(money.name) / 100)*money.quantity))
    },

    validateProduct(state) {
      state.cart = state.cart.map((product) => {
        if (product.selected) {
          return product.quantity>0 ? {
            ...product,
            selected: false
          } : undefined
        }
        return product
      }).filter(x => x)
      state.subTotal = sum(state.cart.map((product) => parseFloat(product.priceTotal)))
      state.totalItems = sum(state.cart.map((product) => product.quantity))
    },

    validatePaymentMethod(state, action) {
      state.paymentMethod = action.payload
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
    }
  },
})

// Reducer
export default slice.reducer

// Actions
export const {
  validatePaymentMethod,
  addToCart,
  resetCart,
  addToMoney,
  deleteMoney,
  deleteCart,
  validateProduct,
  updateQuantity
} = slice.actions
