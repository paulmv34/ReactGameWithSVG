import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage/ErrorPage'

import { ROUTES } from './routes/Routes'

import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import MainPage from './pages/MainPage/MainPage'
import GamePage from './pages/GamePage/GamePage'
import LeaderBoardPage from './pages/LeaderBoardPage/LeaderBoardPage'
import ForumPage from './pages/ForumPage/ForumPage'
import TopicForumPage from './pages/TopicForumPage/TopicForumPage'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.GAME} element={<GamePage />} />
        <Route path={ROUTES.LEADERBOARD} element={<LeaderBoardPage />} />
        <Route path={ROUTES.FORUM} element={<ForumPage />} />
        <Route path={ROUTES.TOPIC_FORUM} element={<TopicForumPage />} />
        <Route
          path={ROUTES.ERROR_500}
          element={<ErrorPage codeError={500} />}
        />
        <Route path="*" element={<ErrorPage codeError={404} />} />
      </Routes>
      Вот тут будет жить ваше приложение :D
    </div>
  )
}

export default App
