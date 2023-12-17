import { ROUTES } from '@/types/types'
import styles from './SignInForm.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// Components
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import CustomLink from '@/components/CustomLink/CustomLink'

import AuthService from '@/services/auth.service'
import { SignInFormProps } from '@/modules/SignInForm/types'
import { validators } from '@/utils/validate'

const SignInForm = ({ onAuth }: SignInFormProps) => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: Yup.object().shape({
      login: validators.login(),
      password: validators.password(),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true)
      try {
        await AuthService.login(values)
        resetForm({})
        onAuth()
      } catch (err) {
        console.log('Authorization failed', err)
      } finally {
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
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.login}
          errorText={formik.touched.login && formik.errors.login ? formik.errors.login : ''}
          error={formik.touched.login && !!formik.errors.login}
        />
        <Input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
          label="Пароль"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          errorText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
          error={formik.touched.password && !!formik.errors.password}
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
