import { ROUTES } from '@/types/types'
import styles from './SignInForm.module.scss'

// Components
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import CustomLink from '@/components/CustomLink/CustomLink'
import { useFormik } from 'formik'

const SignInForm = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true)
      console.log(values)
      console.log('Some kind of asynchronous operation running')
      setTimeout(() => {
        setSubmitting(false)
        resetForm({})
      }, 3000)
    },
  })
  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className="fields-group">
        <Input
          className={styles.input}
          id="login"
          name="login"
          type="text"
          placeholder="Введите логин"
          label="Логин"
          onChange={formik.handleChange}
          value={formik.values.login}
          required
        />
        <Input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
          label="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
      </div>
      <Button className={styles['submit-button']} type="submit" text="Войти" disabled={formik.isSubmitting} />
      <CustomLink className={styles.link} to={ROUTES.REGISTRATION}>
        Регистрация
      </CustomLink>
      <div className={styles['yandex-sign-in']}>
        <p>Можно войти с помощью</p>
        <Button className={styles.button} type="button" text="Яндекс ID" />
      </div>
    </form>
  )
}

export default SignInForm
