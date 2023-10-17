const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Painting1Blue!',
  database: 'FlowerLover',
})

app.post('/signup', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  db.query(
    'INSERT INTO users(username, password) VALUES (?, ?)',
    [username, password],
    (err) => {
      if (err) {
        console.log(err)
      } else {
        res.send({ username: username })
      }
    }
  )
})

app.listen(8080, () => {
  console.log('server 8080')
})
