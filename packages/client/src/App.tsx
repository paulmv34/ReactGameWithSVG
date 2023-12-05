import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { ROUTES } from './routes/Routes'

import './App.css'
import Error from './pages/Error/Error'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'
import Profile from './pages/Profile/Profile'
import Main from './pages/Main/Main'
import Game from './pages/Game/Game'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard'
import Forum from './pages/Forum/Forum'
import TopicForum from './pages/TopicForum/TopicForum'

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
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.GAME} element={<Game />} />
        <Route path={ROUTES.LEADERBOARD} element={<LeaderBoard />} />
        <Route path={ROUTES.FORUM} element={<Forum />} />
        <Route path={ROUTES.TOPIC_FORUM} element={<TopicForum />} />
        <Route path={ROUTES.ERROR_500} element={<Error codeError={500} />} />
        <Route path="*" element={<Error codeError={404} />} />
      </Routes>
      Вот тут будет жить ваше приложение :D
    </div>
  )
}

export default App
