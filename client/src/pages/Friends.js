import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Friends = () => {
  const user = useSelector((state) => state.auth.user.username)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:8080/your-friends', { params: { user } })
      .then((res) => {
        let usernames = []
        res.data.forEach((user) => usernames.push(user.username))
        setUsers(usernames)
        setError(null)
      })
      .catch((err) => setError('Could not fetch any FlowerLovers'))
  }, [user])

  return (
    <div>
      <h1>Find felow FlowerLovers</h1>
      <Link to='/find-friends'>Find flowerLovers</Link>
      <hr />
      <ul>
        {users.map((username, i) => {
          return <li key={i}>{username}</li>
        })}
        {error ? <p>{error}</p> : null}
      </ul>
    </div>
  )
}

export default Friends
