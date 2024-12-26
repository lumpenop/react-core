import createElement from './createElement'

export const jsx = (type, props) => {
  const { children, ...rest } = props
  return createElement(type, { ...rest }, children)
}

export const jsxs = (type, props) => {
  const { children, ...rest } = props

  return createElement(type, { ...rest }, children)
}
