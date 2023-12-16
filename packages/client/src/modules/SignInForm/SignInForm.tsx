import { ROUTES } from '@/types/types'
import styles from './SignInForm.module.scss'
import { useFormik } from 'formik'

// Components
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import CustomLink from '@/components/CustomLink/CustomLink'

import AuthService from '@/services/auth.service'
import { SignInFormProps } from '@/modules/SignInForm/types'

const SignInForm = ({ onAuth }: SignInFormProps) => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true)
      try {
        await AuthService.login(values)
        onAuth()
      } catch (err) {
        console.log('Authorization failed', err)
      } finally {
        resetForm({})
        setSubmitting(false)
      }
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
