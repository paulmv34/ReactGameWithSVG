import styles from './Footer.module.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        NO HANDLEBARS TEAM, 2023 {currentYear !== 2023 ? `- ${new Date().getFullYear()}` : null}
      </p>
    </footer>
  )
}

export default Footer
