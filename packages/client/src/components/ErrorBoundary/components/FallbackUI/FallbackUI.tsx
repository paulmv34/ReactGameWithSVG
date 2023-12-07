import React from 'react'
import styles from './FallbackUI.module.scss'

const FallbackUI = () => {
  return (
    <section className={styles.section}>
      <div className="wrapper">
        <h2 className={styles.title}>
          Упс, <br />у нас что-то сломалось!
        </h2>
        <p className={styles.text}>Мы обязательно в скором времени всё починим </p>
        <span className={styles.emoji}>&#x1F6E0;️</span>
      </div>
    </section>
  )
}

export default FallbackUI
