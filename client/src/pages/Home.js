import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const [post, setPost] = useState('')
  const [error, setError] = useState(null)
  const user_id = useSelector((state) => state.auth.user.user_id)
  const [posts, setPosts] = useState([
    {
      id: 1,
      post: ' Flower1',
      userName: 'avly',
    },
    {
      id: 2,
      post: ' Flower2',
      userName: '2avly',
    },
    {
      id: 3,
      post: ' Flower3',
      userName: '3avly',
    },
  ])

  //   const submitHandler = (e) => {
  //     e.preventDefault()

  const submitHandler = (e, i) => {
    e.preventDefault()
    axios
      .post(`http://localhost:8080/${user_id}/add-post`, { post })
      .then((res) => {
        setError(null)
        if (res.data.added) {
          setPosts([...posts, i])
        }
      })
      .catch((err) => setError('Could not  add new FlowerLover'))
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <textarea
          value={post}
          onChaneg={(e) => setPost(e.target.value)}
          placeholder='What Flower do you want to talk about today?'
        />
        <button type='submit'>Post</button>
      </form>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <p>{post.userName}</p>
              <p>{post.post}</p>
            </div>
          )
        })}
    </div>
  )
}

export default Home
