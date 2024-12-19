// src/main.js
import App from './App.jsx'
import render from './utils/render.js'
const appElement = App()

console.log(JSON.stringify(appElement, null, 2))

const rootElement = render(appElement)

console.log(rootElement)

const app = document.getElementById('app')
app.appendChild(rootElement)

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
