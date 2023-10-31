import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import App from './App'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import RootLayout from './layouts/RootLayouts'
import Error from './components/Error'
import Profile from './pages/Profile'

import configureStore from './store/store'
import { Provider } from 'react-redux'
import FindFriends from './pages/FindFriends'
import Friends from './pages/Friends'
import Home from './pages/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<App />} />
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='*' element={<Error />} />
      <Route path='/find-friends' element={<FindFriends />} />
      <Route path='/your-friends' element={<Friends />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
