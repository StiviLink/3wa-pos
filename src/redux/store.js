import {configureStore} from '@reduxjs/toolkit';
import {Provider, useDispatch as useAppDispatch, useSelector as useAppSelector,} from 'react-redux';
import {FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import {rootReducer} from './root-reducer';

// ----------------------------------------------------------------------

const App = () => {
    return useDispatch()
}
export const AppWrapper = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    })
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export const useSelector = useAppSelector

export const useDispatch = () => useAppDispatch()
