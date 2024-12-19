import createElement from './createElement.js'

const parser = new DOMParser()
const regex = /<(\w+)[^<>]*>[\s\S]*<\/\1>/

const checkHasTag = JSXElementString => {
  const hasTag = regex.test(JSXElementString)
  if (!hasTag) return false
  return true
}

const getElementProperties = JSXElementString => {
  const xml = parser.parseFromString(JSXElementString, 'application/xml')
  const rootElement = xml.documentElement
  const type = rootElement.tagName
  const props = {}
  Array.from(rootElement.attributes).forEach(attr => {
    props[attr.name] = attr.value
  })
  const children = rootElement.innerHTML
  return { type, props, children }
}

const createTree = JSXElementString => {
  const JSXCode = JSXElementString.trim()
  if (!checkHasTag(JSXCode)) return JSXCode
  const { type, props, children } = getElementProperties(JSXCode)
  return createElement(type, props, createTree(children))
}

export default createTree
