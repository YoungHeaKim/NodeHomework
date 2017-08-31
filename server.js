const express = require('express') // express를 연결해준다.
const app = express() // app에 express를 실행하는 코드를 만든다.
const morgan = require('morgan') // HTTP 로그를 남겨주는 것
// 로그인 실행
var basicAuth = require('express-basic-auth')
// 초기 데이터 작업
const randomstring = require('randomstring')
// form 만듬
const bodyParser = require('body-parser')


// URL을 추가할 때마다 이곳에 객체를 만들어 줄 것이다.
const data = [
  {longUrl: 'http://googl.com', // <- item.longUrl
  id: randomstring.generate(6) // 임의수 6자리인데 item.id
}]
// 짧은 URL -> 'http://localhost:3000/58DX37'
// 302 응답

// express가 ejs를 템플릿 엔진으로 사용 가능하게 셋팅
app.set('view engine', 'ejs')
// static 라우트를 추가한다.
app.use('/static', express.static('public'))
app.use(morgan('tiny'))

// 로그인 관련
const authMiddleware = basicAuth({
   users: { 'admin': 'admin' },
   challenge: true,
   realm: 'Imb4T3st4pp'
})

// 
bodyParserMiddleware = bodyParser.urlencoded({ extended: false})

// Route를 설정
app.get('/', authMiddleware, (req, res) => {
  res.render('index.ejs', {data})
})

// 짧은 URL redirection
app.get('/:id', (req, res) => {
  // req.params는 위에서 보이는 주소뒤에 id 6글자를 불러와 id라는 변수에 저장해준다.
  const id = req.params.id
  // data에서의 id와 위에서 주소뒤에 6자리의 id를 같으면 matched에 넣어준다.
  const matched = data.find(item => item.id === id)
  if(matched){
    // 같을 때에는 301 에러를 만들어 내서 더이상 사이트의 정보를 수집하지 않고 바로 longUrl에 있는 주소로 이동하게 된다.
    res.redirect(301, matched.longUrl)
  } else {
    res.status(404)
    res.send('404 Not Found')
  }
})

// form부분을 만들때 로그인 한사람만 사용할 수 있는게 아니라 새로운 사람도 짧은 URL을 사용할 수 있어야하고 관리자도 사용할 수 있어야하기 때문에 두개 다 추가해준다.
app.post('/', authMiddleware, bodyParserMiddleware, (req, res) => {
  const longUrl = req.body.longUrl
  let id; // id가 바껴야 하기 때문에 let을 써준다.  
  while (true) {
    const candidate = randomstring.generate(6)
    const matched = data.find(item => item.id === candidate)
    if(!matched) {
      id = candidate
      break
    }
  }
  data.push({id, longUrl})
  res.redirect('/')
})

// 서버연결시켜줌
app.listen(5000, () => {
  console.log('listening')
})
