import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'

export const RootLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  )
}

export default RootLayout
