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
        'INSERT INTO users(username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err) => {
          if (err) {
            res.status(418).send('Could not registrate user')
          } else {
            // Query to get the last inserted user_id
            db.query(
              'SELECT user_id, username FROM users WHERE user_id = LAST_INSERT_ID()',
              (err, result) => {
                if (err) {
                  res.status(418).send('Could not retrieve user data')
                } else {
                  res.send({
                    user_id: result[0].user_id,
                    username: result[0].username,
                  })
                }
              }
            )
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
            res.send({
              user_id: result[0].user_id,
              username: result[0].username,
            })
          }
          if (!match) {
            res.status(418).send('Pass dont match')
          }
        })
      }
    }
  )
})

app.get('/find-friends', (req, res) => {
  const username = req.query.user
  db.query(
    'SELECT u.username FROM users u WHERE u.user_id NOT IN (SELECT f.friend FROM friends f WHERE user = (SELECT u.user_id FROM users u WHERE username = ? )) AND username != ?',
    [username, username],
    (err, result) => {
      if (err) {
        res.status(418).send('An error')
      }
      if (result) {
        res.send(result)
      }
    }
  )
})
app.get('/your-friends', (req, res) => {
  const username = req.query.user
  db.query(
    'SELECT u.username FROM users u WHERE u.user_id IN (SELECT f.friend FROM friends f WHERE user = (SELECT u.user_id FROM users u WHERE username = ? )) AND username != ?',
    [username, username],
    (err, result) => {
      if (err) {
        res.status(418).send('An error')
      }
      if (result) {
        res.send(result)
      }
    }
  )
})

app.post(`/:id/add-friend`, (req, res) => {
  const user = req.params.id
  const friend = req.body.username
  console.log({ user })
  console.log({ friend })

  db.query(
    'INSERT INTO friends (user, friend) VALUE ((SELECT user_id FROM users WHERE username = ?), (SELECT user_id FROM users WHERE username = ?))',
    [user, friend],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(418).send('Error')
      }
      if (result) {
        res.send({ added: true })
      }
    }
  )
})
app.post(`/:id/add-post`, (req, res) => {
  const post_auther = req.params.id
  const post = req.body.post

  db.query(
    'INSERT INTO friends (user, friend) VALUE ((SELECT user_id FROM users WHERE username = ?), (SELECT user_id FROM users WHERE username = ?))',
    [user, friend],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(418).send('Error')
      }
      if (result) {
        res.send({ added: true })
      }
    }
  )
})

app.listen(8080, () => {
  console.log('server 8080')
})
