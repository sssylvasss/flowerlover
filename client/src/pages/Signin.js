import { useState } from 'react'
import axios from 'axios'

function Signin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8080/signup', {
        username: username,
        password: password,
      })
      .then((data) => {
        setUsername('')
        setPassword('')
      })
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h3>Sign in</h3>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          vamue={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          vamue={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <button type='button'>Cancel</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signin
