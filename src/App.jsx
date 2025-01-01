// src/App.jsx
import Button from './components/button.jsx'
import Checkbox from './components/checkbox.jsx'
import Header from './components/header.jsx'
import Layout from './components/layout.jsx'
import Radio from './components/radio.jsx'
import SecondPage from './second-page.jsx'
import SuccessPage from './success-page.jsx'
import React from './utils/react.js'

function App() {
  const [page, setPage] = React.useState(0)
  const [radio, setRadio] = React.useState('')
  const [checked, setChecked] = React.useState(
    new Map([
      ['checkbox1', false],
      ['checkbox2', false],
      ['checkbox3', false],
    ])
  )
  const [select, setSelect] = React.useState('')
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    const data = window.localStorage.getItem('data')
    if (data) {
      const parsedData = JSON.parse(data)
      console.log(parsedData, 'parsedData')
      setRadio(() => parsedData.radio)
      setChecked(new Map(parsedData.checked))
      setSelect(parsedData.select)
      setText(parsedData.text)
    }
  }, [])

  const onSubmit = () => {
    window.localStorage.setItem('data', JSON.stringify({ radio, checked: Array.from(checked.entries()), select, text }))
    setPage(2)
  }

  if (page === 1)
    return (
      <SecondPage
        setPage={setPage}
        onSubmit={onSubmit}
        select={select}
        setSelect={setSelect}
        text={text}
        setText={setText}
      />
    )
  if (page === 2) return <SuccessPage setPage={setPage} />

  console.log(radio, 'radio')
  return (
    <Layout>
      <Header />
      <Radio value={radio} setRadio={setRadio} />
      <Checkbox checked={checked} setChecked={setChecked} />
      <Button onClick={() => setPage(page + 1)} text="다음" />
    </Layout>
  )
}

export default App
