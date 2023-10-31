import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const FindFriends = () => {
  const user = useSelector((state) => state.auth.user.username)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [added, setAdded] = useState([])

  console.log('uuuser', user)

  useEffect(() => {
    axios
      .get('http://localhost:8080/find-friends', { params: { user } })
      .then((res) => {
        let usernames = []
        res.data.forEach((user) => usernames.push(user.username))
        setUsers(usernames)
        setError(null)
      })
      .catch((err) => setError('Could not fetch any FlowerLovers'))
  }, [user])

  const addFriend = (username, i) => {
    axios
      .post(`http://localhost:8080/${user}/add-friend`, { username })
      .then((res) => {
        setError(null)
        if (res.data.added) {
          setAdded([...added, i])
        }
      })
      .catch((err) => setError('Could not  add new FlowerLover'))
  }

  return (
    <div>
      <h1>Find felow FlowerLovers</h1>
      <Link to='/your-friends'>Your friends</Link>
      <hr />
      <ul>
        {users.map((username, i) => {
          if (added.includes(i)) {
            return <li>Added</li>
          } else {
            return (
              <li onClick={() => addFriend(username, i)} key={i}>
                {username}
              </li>
            )
          }
        })}
        {error ? <p>{error}</p> : null}
      </ul>
    </div>
  )
}

export default FindFriends
