// ----------------------------------------------------------------------

export function sessionStorageAvailable() {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__'
    window.sessionStorage.setItem(key, key)
    window.sessionStorage.removeItem(key)
    return true
  }
  catch (error) {
    return false
  }
}

export function sessionStorageGetItem(key: string, defaultValue?: string) {
  const storageAvailable = sessionStorageAvailable()

  return storageAvailable ? sessionStorage.getItem(key) || defaultValue : undefined
}
