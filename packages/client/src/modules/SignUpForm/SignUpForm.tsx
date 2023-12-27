import { ROUTES } from '@/types/types'
import styles from './SignUpForm.module.scss'
import { useFormik } from 'formik'

// Components
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import CustomLink from '@/components/CustomLink/CustomLink'
import { SignUpFormProps } from '@/modules/SignUpForm/types'
import { signUpValidationSchema } from '@/utils/validationSchema'
import { useAuth } from '@/hooks/useAuth'

const SignUpForm = ({ onRegister }: SignUpFormProps) => {
  const { signUp } = useAuth()
  const formik = useFormik({
    initialValues: {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true)
      try {
        await signUp(values)
        resetForm({})
        onRegister()
      } catch (error) {
        console.error('Signing up failed:', error)
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
          id="first_name"
          name="first_name"
          type="text"
          label="Имя"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.first_name}
          errorText={formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : ''}
          error={formik.touched.first_name && !!formik.errors.first_name}
        />
        <Input
          className={styles.input}
          id="second_name"
          name="second_name"
          type="text"
          label="Фамилия"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.second_name}
          errorText={formik.touched.second_name && formik.errors.second_name ? formik.errors.second_name : ''}
          error={formik.touched.second_name && !!formik.errors.second_name}
        />
        <Input
          className={styles.input}
          id="login"
          name="login"
          type="text"
          label="Логин"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.login}
          errorText={formik.touched.login && formik.errors.login ? formik.errors.login : ''}
          error={formik.touched.login && !!formik.errors.login}
        />
        <Input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          label="E-mail"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          errorText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
          error={formik.touched.email && !!formik.errors.email}
        />
        <Input
          className={styles.input}
          id="phone"
          name="phone"
          type="tel"
          label="Телефон"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          errorText={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
          error={formik.touched.phone && !!formik.errors.phone}
        />
        <Input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          label="Пароль"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          errorText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
          error={formik.touched.password && !!formik.errors.password}
        />
        <Input
          className={styles.input}
          id="confirm_password"
          name="confirm_password"
          type="password"
          label="Подтвердить пароль"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.confirm_password}
          errorText={
            formik.touched.confirm_password && formik.errors.confirm_password ? formik.errors.confirm_password : ''
          }
          error={formik.touched.confirm_password && !!formik.errors.confirm_password}
        />
      </div>
      <Button
        className={styles['submit-button']}
        type="submit"
        text="Зарегистрироваться"
        disabled={formik.isSubmitting}
      />
      <CustomLink className={styles.link} to={ROUTES.LOGIN}>
        Вход
      </CustomLink>
    </form>
  )
}

export default SignUpForm
