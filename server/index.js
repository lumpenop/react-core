import cors from 'cors'
import express from 'express'
const app = express()
const port = 3001

app.use(cors())

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Hello, World!')
})
app.use(express.json()) // JSON 파싱을 위한 미들웨어 추가

app.post('/', (req, res) => {
  console.log(req.body) // req.body로 접근해야 함
  res.send('Hello, World!')
})

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
