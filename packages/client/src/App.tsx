import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import { ROUTES } from './types/types'

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
    <>
      <Routes>
        <Route
          path="/"
          element={
            <section>
              <h2>Здесь что-то будет или переместим с /main сюда</h2>
            </section>
          }
        />
        <Route path={'/'} element={<Layout />}>
          <Route path={ROUTES.LOGIN} element={<SignIn />} />
          <Route path={ROUTES.REGISTRATION} element={<SignUp />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.LEADERBOARD} element={<LeaderBoard />} />
          <Route path={ROUTES.FORUM} element={<Forum />} />
          <Route path={ROUTES.TOPIC_FORUM} element={<TopicForum />} />
        </Route>
        <Route path={ROUTES.GAME} element={<Game />} />
        <Route path="*" element={<Error codeError={404} />} />
        <Route path={ROUTES.ERROR_500} element={<Error codeError={500} />} />
      </Routes>
    </>
  )
}

export default App
