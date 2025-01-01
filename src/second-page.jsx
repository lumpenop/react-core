import Button from './components/button.jsx'
import ClearButton from './components/clear-button.jsx'
import Header from './components/header.jsx'
import Layout from './components/layout.jsx'
import SectionLayout from './components/section-layout.jsx'
import React from './utils/react.js'
function SecondPage({
  setPage,
  onSubmit,
  select,
  setSelect,
  text,
  setText,
  password,
  setPassword,
  handleClear,
  passwordConfirm,
  setPasswordConfirm,
}) {
  const checkPassword = () => {
    if (!password || !passwordConfirm) return false
    return password === passwordConfirm
  }
  return (
    <Layout>
      <Header />
      <SectionLayout>
        <h2>
          select <span class="text-red-400">*</span>
        </h2>
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
        <h2>
          textarea <span class="text-red-400">*</span>
        </h2>
        <textarea value={text} onChange={e => setText(e.target.value)} />
      </SectionLayout>

      <SectionLayout>
        <h2>
          password <span class="text-red-400">*</span>
        </h2>
        <div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" />
          <input
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호 확인"
          />
          {!password || !passwordConfirm ? (
            <p class="text-red-400">비밀번호를 입력해주세요.</p>
          ) : password !== passwordConfirm ? (
            <p class="text-red-400">비밀번호가 일치하지 않습니다.</p>
          ) : (
            <p class="text-green-400">비밀번호 일치</p>
          )}
        </div>
      </SectionLayout>

      <div class="flex justify-between w-4/5">
        <div class="flex gap-4">
          <Button onClick={() => setPage(prev => prev - 1)} text="이전" disabled={false} />
          <Button onClick={onSubmit} text="제출" disabled={!select || !text || !checkPassword()} />
        </div>
        <ClearButton handleClear={handleClear} />
      </div>
    </Layout>
  )
}

export default SecondPage
