const express = require('express') // express를 연결해준다.
const app = express() // app에 express를 실행하는 코드를 만든다.

app.get('/', (req, res) => {
  res.send('hello wold')
})

app.listen(5000, () => {
  console.log('listening')
})
