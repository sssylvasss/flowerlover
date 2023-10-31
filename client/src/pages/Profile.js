import { useSelector } from 'react-redux'

export const Profile = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <div>
      <h3>Profile</h3>
      {user ? (
        <>
          <h4>Hi {user.username}</h4>
        </>
      ) : null}
    </div>
  )
}

export default Profile
