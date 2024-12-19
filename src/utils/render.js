// 출력 결과물, 완전히 같진 않아도 괜찮아요.
// {
//   "type": "div",
//   "props": {
//     "id": "app",
//     "children": {
//       "type": "h1",
//       "props": {
//         "children": "Hello, React Clone!"
//       }
//     }
//   }
// }

const render = tree => {
  const rootElement = document.createElement(tree.type)

  const { children, ...elementProps } = tree.props
  Object.keys(elementProps).forEach(key => {
    rootElement.setAttribute(key, elementProps[key])
  })
  if (children) {
    if (typeof children[0] === 'string') {
      rootElement.appendChild(document.createTextNode(children[0]))
    } else {
      children.map(child => rootElement.appendChild(render(child)))
    }
  }
  return rootElement
}

export default render
