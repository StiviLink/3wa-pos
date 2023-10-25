import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
//
import { store, persistor } from './store'

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export default function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
