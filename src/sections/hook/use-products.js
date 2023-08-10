import { useCallback } from 'react'
// redux
import { useDispatch, useSelector } from 'src/redux/store'
import {
  initProducts,
  resetProducts
} from 'src/redux/slice/product'

// ----------------------------------------------------------------------

export default function useProducts() {
  const dispatch = useDispatch()

  const allProducts = useSelector((state) => {
    if(!state.products.products[0]){
      dispatch(initProducts())
    }
    return state.products.products
  })

  const onInitProducts = useCallback(
    () => {
      dispatch(initProducts())
    },
    [dispatch]
  )

  const onResetProducts = useCallback(
    () => {
      dispatch(resetProducts())
    },
    [dispatch]
  )

  return {
    allProducts,
    //
    onInitProducts,
    onResetProducts
  }
}
