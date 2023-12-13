import React from 'react'
import { useFormik } from 'formik'
import styles from './SignUpForm.module.scss'
import { ROUTES } from '@/types/types'

// Components
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import CustomLink from '@/components/CustomLink/CustomLink'

const SignUpForm = () => {
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
          id="first_name"
          name="first_name"
          type="text"
          label="Имя"
          onChange={formik.handleChange}
          value={formik.values.first_name}
          required
        />
        <Input
          className={styles.input}
          id="second_name"
          name="second_name"
          type="text"
          label="Фамилия"
          onChange={formik.handleChange}
          value={formik.values.second_name}
          required
        />
        <Input
          className={styles.input}
          id="login"
          name="login"
          type="text"
          label="Логин"
          onChange={formik.handleChange}
          value={formik.values.login}
          required
        />
        <Input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          label="E-mail"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />
        <Input
          className={styles.input}
          id="phone"
          name="phone"
          type="tel"
          label="Телефон"
          onChange={formik.handleChange}
          value={formik.values.phone}
          required
        />
        <Input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          label="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
        <Input
          className={styles.input}
          id="confirm_password"
          name="confirm_password"
          type="password"
          label="Подтвердить пароль"
          onChange={formik.handleChange}
          value={formik.values.confirm_password}
          required
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
