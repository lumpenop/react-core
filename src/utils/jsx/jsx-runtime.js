import createElement from './createElement'

export const jsx = (type, props) => {
  const { children, ...rest } = props
  const childrenArray = Array.isArray(children) ? children : [children]
  return createElement(type, { ...rest }, childrenArray)
}

export const jsxs = (type, props) => {
  const { children, ...rest } = props
  const childrenArray = Array.isArray(children) ? children : [children]
  return createElement(type, { ...rest }, childrenArray)
}
