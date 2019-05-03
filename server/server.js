//requirements
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

const starwars_controller = require('./starwars.js')

//middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json())

//routes
app.post('/', async function (req, res) {
  let numPassengers = req.body.capacity;
  let matches = await starwars_controller.findMatchingPilotsAndShips(numPassengers)
  res.send(JSON.stringify(matches))
})

//init server connection
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});