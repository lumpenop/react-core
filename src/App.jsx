// src/App.jsx
import React from './utils/react.js'

function App() {
  const [count, increment] = React.useState(0)
  const [count2, increment2] = React.useState(0)
  const [value, setValue] = React.useState('')
  const [list, setList] = React.useState([])

  React.useEffect(() => {
    console.log(count, 'count value')
  }, [value])

  React.useEffect(() => {
    console.log(count, 'count count')
  }, [count])

  const handleAdd = () => {
    if (!value) return
    setList(prevList => [...prevList, { value, check: false }])
    setValue('')
  }

  const handleCheck = index => {
    setList(prevList => prevList.map((item, i) => (i === index ? { ...item, check: !item.check } : item)))
  }

  const handleClick = () => {
    increment(prev => prev + 1)
  }

  return (
    <div class="bg-purple-300 w-full h-screen">
      <h1 class="text-white bg-black">Survey</h1>
      <div class="bg-white bg-black">hi</div>
    </div>
  )
}

export default App
