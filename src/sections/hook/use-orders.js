import { useCallback } from 'react'
// redux
import { useDispatch, useSelector } from 'src/redux/store'
import {
  initOrders,
  resetOrders,
  addToOrders
} from 'src/redux/slice/order'

// ----------------------------------------------------------------------

export default function useOrders() {
  const dispatch = useDispatch()

  const allOrders = useSelector((state) => {
    if(!state.orders.orders[0]){
      dispatch(initOrders())
    }
    return state.orders.orders
  })

  const onInitOrders = useCallback(
    () => {
      dispatch(initOrders())
    },
    [dispatch]
  )

  const onResetOrders = useCallback(
    () => {
      dispatch(resetOrders())
    },
    [dispatch]
  )

  const onAddOrder = useCallback(
    (order) => {
      dispatch(addToOrders(order))
    },
    [dispatch]
  )

  return {
    allOrders,
    //
    onInitOrders,
    onResetOrders,
    onAddOrder
  }
}
