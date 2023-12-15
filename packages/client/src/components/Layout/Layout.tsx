import { Outlet } from 'react-router'
import styles from './Layout.module.scss'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
