// src/App.jsx
import List from './List.jsx'
import React from './utils/react.js'

function App() {
  const [count, increment] = React.useState(0)
  const [count2, increment2] = React.useState(0)
  const [value, setValue] = React.useState('')
  const [list, setList] = React.useState([])

  const handleAdd = () => {
    if (!value) return
    setList(prevList => [...prevList, { value, check: false }])
    setValue('')
  }

  const handleCheck = index => {
    setList(prevList => prevList.map((item, i) => (i === index ? { ...item, check: !item.check } : item)))
  }

  const handleClick = () => {
    console.log(count, 'handleClick count')
    increment(prev => prev + 1)
  }

  return (
    <div prop="prop">
      <div>
        <h1>Hello, React Clone! {count}</h1>
        <button type="button" onClick={handleClick}>
          증가
        </button>
      </div>
      <div>
        <h1>Hello, React Clone! {count2}</h1>
        <button type="button" onClick={() => increment2(prev => prev + 1)}>
          증가
        </button>
      </div>
      <div>
        <input autoFocus={false} type="text" value={value} onChange={e => setValue(e.target.value)} />
        <button type="button" onClick={handleAdd}>
          확인
        </button>
      </div>
      <div>
        <ul>
          {list.map((item, index) => {
            return (
              <li key={index}>
                {item.value}
                <input type="checkbox" checked={item.check} onChange={() => handleCheck(index)} />
              </li>
            )
          })}
        </ul>
        <List list={list} />
      </div>
    </div>
  )
}

export default App
