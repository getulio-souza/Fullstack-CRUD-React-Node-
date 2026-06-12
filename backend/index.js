const express = require('express')
const bodyParser = require('body-parser')

//auth
const authRoutes = require('./routes/auth')

require('dotenv').config()

console.log(process.env.DB_DATABASE);
console.log(process.env.DB_USERNAME);

const app = express();

//auth
app.use('/api', authRoutes)

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.json({'msg': 'this is home page'})
})

app.listen(process.env.PORT, async () => {
  console.log(`server started at port ${process.env.PORT}`)
})

