// src/App.jsx
import createTree from './utils/createTree.js'

function App() {
  const jsxString = `
    <div id="app">
      <h1>Hello, React Clone!</h1>
    </div>
  `
  return createTree(jsxString)
}

export default App
