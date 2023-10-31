import { useSelector } from 'react-redux'

export const Profile = () => {
  const user = useSelector((state) => state.auth.user)
  const username = user.result[0].username

  return (
    <div>
      <h3>Profile</h3>
      {user ? (
        <>
          <h4>Hi {username}</h4>
        </>
      ) : null}
    </div>
  )
}

export default Profile
