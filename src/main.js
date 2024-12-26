// src/main.js
import App from './App.jsx'
import React from './utils/react.js'

// 초기 렌더링

const app = document.getElementById('app')
const rootElement = React.renderComponent(App)
app.appendChild(rootElement)

// 상태 변경 시 재렌더링을 위한 리스너 등록
const unsubscribe = React.subscribe(() => {
  const newRootElement = React.renderComponent(App)
  app.innerHTML = ''
  app.appendChild(newRootElement)
})

React.subscribe(() => {})
