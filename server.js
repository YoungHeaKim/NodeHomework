const express = require('express') // express를 연결해준다.
const app = express() // app에 express를 실행하는 코드를 만든다.
const morgan = require('morgan') // HTTP 로그를 남겨주는 것

// 로그인 실행
var basicAuth = require('express-basic-auth')


// express가 ejs를 템플릿 엔진으로 사용 가능하게 셋팅
app.set('view engine', 'ejs')
// static 라우트를 추가한다.
app.use('/static', express.static('public'))
app.use(morgan('tiny'))

app.use(basicAuth({
   users: { 'admin': 'admin' },
   challenge: true,
   realm: 'Imb4T3st4pp'
}))

// Route를 설정
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// 서버연결시켜줌
app.listen(5000, () => {
  console.log('listening')
})
