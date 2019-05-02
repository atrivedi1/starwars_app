const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')));

app.post('/', function (req, res) {
  res.send(JSON.stringify('successful request my dude!'))
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});