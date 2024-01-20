import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ROUTES } from './types/types'

import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// Pages
import Error from './pages/Error/Error'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import Profile from './pages/Profile/Profile'
import Main from './pages/Main/Main'
import About from './pages/About/About'
import Game from './pages/Game/Game'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard'
import Forum from './pages/Forum/Forum'
import TopicForum from './pages/TopicForum/TopicForum'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ChangeAvatar from './pages/ChangeAvatar/ChangeAvatar'
import GameStart from '@/pages/GameStart/GameStart'

import { fetchUser } from '@/features/user/userSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'

function App() {
  const dispatch = useAppDispatch()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response
      console.log(data)
    }

    const getUser = async () => {
      dispatch(fetchUser())
    }

    fetchServerData()
    getUser()
    setHydrated(true)
  }, [])

  if (!hydrated) {
    // Возвращает null при первом рендеринге, поэтому клиент и сервер совпадают
    return null
  }

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route path={ROUTES.LOGIN} element={<SignIn />} />
          <Route path={ROUTES.REGISTRATION} element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.MAIN} element={<Main />} />
            <Route path={ROUTES.GAME_START} element={<GameStart />} />
            <Route path={ROUTES.LEADERBOARD} element={<LeaderBoard />} />
            <Route path={ROUTES.FORUM} element={<Forum />} />
            <Route path={ROUTES.TOPIC_FORUM} element={<TopicForum />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.PROFILE_PASSWORD} element={<ChangePassword />} />
            <Route path={ROUTES.PROFILE_AVATAR} element={<ChangeAvatar />} />
          </Route>
          <Route path="*" element={<Error codeError={404} />} />
          <Route path={ROUTES.ERROR_500} element={<Error codeError={500} />} />
        </Route>
        <Route path={ROUTES.GAME} element={<Game />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
