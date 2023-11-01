import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const [post, setPost] = useState(null)
  const [, setError] = useState(null)
  const user_id = useSelector((state) => state.auth.user.user_id)

  const [posts, setPosts] = useState({})

  useEffect(() => {
    axios
      .get('http://localhost:8080/all_posts')
      .then((res) => {
        setPosts(res.data)
        setError(null)
        console.log('hej', res.data)
      })
      .catch((err) => setError('Could not fetch'))
  }, [])

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
      .catch((err) => setError('Could not add post'))
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder='What Flower do you want to talk about today?'
        />
        <button type='submit'>Post</button>
      </form>
      <p>Posts</p>
      {posts.length > 0 &&
        posts.map((postObj) => {
          return (
            <div key={postObj.post_id}>
              <p>{postObj.post}</p>
              <p>{postObj.created_at}</p>
            </div>
          )
        })}
    </div>
  )
}

export default Home
