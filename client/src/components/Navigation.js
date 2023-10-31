import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'

export default function Navigation() {
  const loggedIn = useSelector((state) => state.auth?.isLoggedIn)
  const dispatch = useDispatch()
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '2px solid',
        width: '100vw',
        height: '50px',
      }}
    >
      <Link to='/'>
        <span>Click</span>
      </Link>

      {loggedIn ? (
        <ul
          style={{
            display: 'flex',
          }}
        >
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/find-friends'>Friends</Link>
          </li>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/' onClick={() => dispatch(logout())}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul
          style={{
            display: 'flex',
          }}
        >
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='/signin'>Sign In</Link>
          </li>
        </ul>
      )}
    </nav>
  )
}
