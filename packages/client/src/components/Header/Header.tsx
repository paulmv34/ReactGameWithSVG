import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="wrapper">
        <h1 className={styles.title}>Танчики</h1>
      </div>
    </header>
  )
}

export default Header
