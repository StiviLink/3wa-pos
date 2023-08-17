import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// slices
import checkoutReducer from './slice/checkout'
import productsReducer from './slice/product'
import ordersReducer from './slice/order'
import userReducer from './slice/user'

// ----------------------------------------------------------------------

const checkoutPersistConfig = {
  key: 'checkout',
  storage,
  keyPrefix: 'redux-',
}

const productsPersistConfig = {
  key: 'products',
  storage,
  keyPrefix: 'redux-',
}

const ordersPersistConfig = {
  key: 'orders',
  storage,
  keyPrefix: 'redux-',
}

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
}

export const rootReducer = combineReducers({
  checkout: persistReducer(checkoutPersistConfig, checkoutReducer),
  products: persistReducer(productsPersistConfig, productsReducer),
  orders: persistReducer(ordersPersistConfig, ordersReducer),
  user: persistReducer(userPersistConfig, userReducer)
})
