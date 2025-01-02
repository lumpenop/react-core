// src/App.jsx
import Button from './components/button.jsx'
import Checkbox from './components/checkbox.jsx'
import ClearButton from './components/clear-button.jsx'
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
  const [password, setPassword] = React.useState('')
  const [passwordConfirm, setPasswordConfirm] = React.useState('')

  React.useEffect(() => {
    const data = window.localStorage.getItem('data')
    if (data) {
      const parsedData = JSON.parse(data)
      setRadio(() => parsedData.radio)
      setChecked(new Map(parsedData.checked))
      setSelect(parsedData.select)
      setText(parsedData.text)
      setPassword(parsedData.password)
      setPasswordConfirm(parsedData.passwordConfirm)
    }
  }, [])

  const onSubmit = () => {
    window.localStorage.setItem(
      'data',
      JSON.stringify({ radio, checked: Array.from(checked.entries()), select, text, password, passwordConfirm })
    )

    fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { radio, checked: Array.from(checked.entries()), select, text, password, passwordConfirm },
      }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data)
        setPage(2)
      })
      .catch(error => console.error('Error:', error))
  }

  const handleClear = () => {
    window.localStorage.removeItem('data')
    setRadio('')
    setChecked(
      new Map([
        ['checkbox1', false],
        ['checkbox2', false],
        ['checkbox3', false],
      ])
    )
    setSelect('')
    setText('')
    setPassword('')
    setPasswordConfirm('')
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
        password={password}
        setPassword={setPassword}
        passwordConfirm={passwordConfirm}
        setPasswordConfirm={setPasswordConfirm}
        handleClear={handleClear}
      />
    )
  if (page === 2) return <SuccessPage setPage={setPage} />

  return (
    <Layout>
      <Header />
      <Radio value={radio} setRadio={setRadio} />
      <Checkbox checked={checked} setChecked={setChecked} />
      <div class="flex justify-between w-4/5">
        <Button
          onClick={() => setPage(page + 1)}
          text="다음"
          disabled={!radio || Array.from(checked.values()).every(value => value === false)}
        />
        <ClearButton handleClear={handleClear} />
      </div>
    </Layout>
  )
}

export default App
