// src/main.js
import App from './App.jsx';

const appElement = App();

console.log(JSON.stringify(appElement, null, 2));

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