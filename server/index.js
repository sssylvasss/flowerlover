const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
// require('dotenv').config()

// const mySqlKey = process.env.MYSQL

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

const saltRounds = 10

app.post('/signup', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      res.status(418).send('Could not hash pass')
    } else {
      db.query(
        'INSERT INTO users(username, password ) VALUES (?, ?)',
        [username, hashedPassword],
        (err) => {
          if (err) {
            res.status(418).send('Could not registrate user')
          } else {
            res.send({ username: username })
          }
        }
      )
    }
  })
})

app.post('/signin', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, result) => {
      if (err) {
        res.status(418).send(err.message)
      } else if (result.lenght < 1) {
        res.status(418).send('Username dosent match')
      } else {
        bcrypt.compare(password, result[0].password, (err, match) => {
          if (match) {
            res.send({ username })
          }
          if (!match) {
            res.status(418).send('Pass dont match')
          }
        })
      }
    }
  )
})
app.listen(8080, () => {
  console.log('server 8080')
})
