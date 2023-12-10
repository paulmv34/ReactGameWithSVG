import styles from './Footer.module.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className="wrapper">
        <p className={styles.copyright}>
          NO HANDLEBARS TEAM, 2023 {currentYear !== 2023 ? `- ${new Date().getFullYear()}` : null}
        </p>
      </div>
    </footer>
  )
}

export default Footer
