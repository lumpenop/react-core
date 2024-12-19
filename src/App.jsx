// src/App.jsx
import createTree from './utils/createTree.js'

function App() {
  const jsxString = `
    <div prop="prop">
      <div>
        <h1>Hello, React Clone!</h1>
        <p>hi</p>
      </div>
    </div>
  `
  return createTree(jsxString)
}

export default App
