import React from './utils/react.js'

const List = ({ list }) => {
  const [check, setCheck] = React.useState(false)
  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>
          {item.value}
          <input type="checkbox" checked={check} onChange={() => setCheck(!check)} />
        </li>
      ))}
    </ul>
  )
}

export default List
