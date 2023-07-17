import { useState, useEffect } from 'react'
// utils
import {sessionStorageAvailable} from "../utils/session-available"

// ----------------------------------------------------------------------

export function useSessionStorage<ValueType>(key: string, defaultValue: ValueType) {
  const storageAvailable = sessionStorageAvailable()

  const [value, setValue] = useState(() => {
    const storedValue = storageAvailable ? sessionStorage.getItem(key) : null

    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  })

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.storageArea === sessionStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
      }
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInSessionStorage = (newValue: ValueType) => {
    setValue((currentValue: ValueType) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue

      if (storageAvailable)
        sessionStorage.setItem(key, JSON.stringify(result))

      return result
    })
  }

  const removeFromSessionStorage = () => sessionStorage.removeItem(key)

  return [value, setValueInSessionStorage, removeFromSessionStorage]
}
