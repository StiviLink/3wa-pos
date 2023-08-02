import { useCallback } from 'react'
// redux
import { useDispatch, useSelector } from 'src/redux/store'
import {
  addToCart,
  deleteCart
} from '../../redux/slice/checkout'

// ----------------------------------------------------------------------

export default function useCheckout() {
  const dispatch = useDispatch()

  const checkout = useSelector((state) => state.checkout)

  const onDeleteCart = useCallback(
    (productId) => {
      dispatch(deleteCart(productId))
    },
    [dispatch]
  )

  const onAddCart = useCallback(
    (newProduct) => {
      dispatch(addToCart(newProduct));
    },
    [dispatch]
  )

  return {
    checkout,
    //
    onAddCart,
    onDeleteCart
  };
}
