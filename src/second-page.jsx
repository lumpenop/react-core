import Button from './components/button.jsx'
import ClearButton from './components/clear-button.jsx'
import Header from './components/header.jsx'
import Layout from './components/layout.jsx'
import SectionLayout from './components/section-layout.jsx'
import React from './utils/react.js'
function SecondPage({ setPage, onSubmit, select, setSelect, text, setText, handleClear }) {
  return (
    <Layout>
      <Header />
      <SectionLayout>
        select
        <div>
          <select name="select" id="select" value={select} onChange={e => setSelect(e.target.value)}>
            <option value="">선택</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <p>선택된 값: {select}</p>
        </div>
      </SectionLayout>

      <SectionLayout>
        <p>textarea</p>
        <textarea value={text} onChange={e => setText(e.target.value)} />
      </SectionLayout>
      <div>
        <div class="flex gap-4">
          <Button onClick={() => setPage(prev => prev - 1)} text="이전" />
          <Button onClick={onSubmit} text="제출" />
        </div>
        <ClearButton handleClear={handleClear} />
      </div>
    </Layout>
  )
}

export default SecondPage
