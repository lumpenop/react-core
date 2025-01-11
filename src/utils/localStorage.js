export const localStorage = key => {
  const getItem = () => {
    return window.localStorage.getItem(key)
  }

  const setItem = value => {
    return window.localStorage.setItem(key, value)
  }

  const removeItem = () => {
    return window.localStorage.removeItem(key)
  }

  return { getItem, setItem }
}
