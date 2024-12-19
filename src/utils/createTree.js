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

  // 자식 요소들을 배열로 변환
  const childNodes = Array.from(rootElement.childNodes)

  // 텍스트 노드와 요소 노드를 모두 포함하는 자식들
  const children = childNodes
    .map(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim()
      }
      return node.outerHTML
    })
    .filter(child => child !== '')

  return { type, props, children }
}

const createTree = JSXElementString => {
  const JSXCode = JSXElementString.trim()
  console.log(JSXCode)
  if (!checkHasTag(JSXCode)) return JSXCode
  const { type, props, children } = getElementProperties(JSXCode)

  // 자식이 여러개인 경우 배열로 처리
  if (Array.isArray(children)) {
    const childrenTrees = children.map(child => createTree(child))
    return createElement(type, props, childrenTrees)
  }

  return createElement(type, props, createTree(children))
}

export default createTree
