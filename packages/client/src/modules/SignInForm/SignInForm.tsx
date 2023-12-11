import { ROUTES } from '@/types/types'
import styles from './SignInForm.module.scss'

// Components
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import CustomLink from '@/components/CustomLink/CustomLink'

const SignInForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.fields}>
        <Input
          className={styles.input}
          id="login"
          name="login"
          type="text"
          placeholder="Введите логин"
          label="Логин"
          required
        />
        <Input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
          label="Пароль"
          required
        />
      </div>
      <Button className={styles['submit-button']} type="submit" text="Войти" />
      <CustomLink to={ROUTES.REGISTRATION}>Регистрация</CustomLink>
      <div className={styles['yandex-sign-in']}>
        <p>Можно войти с помощью</p>
        <Button type="button" text="Яндекс ID" />
      </div>
    </form>
  )
}

export default SignInForm
