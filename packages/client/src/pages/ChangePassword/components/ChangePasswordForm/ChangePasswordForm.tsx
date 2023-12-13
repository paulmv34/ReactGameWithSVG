import { FC } from 'react'

import styles from './ChangePasswordForm.module.scss'
import Title from '../../../../components/Title/Title'
import { useFormik } from 'formik'
import { Button } from '@mui/material'
import { IChangePassword } from '../../types/ChangePasswordTypes'
import Input from '@/components/Input/Input'

const ChangePasswordForm: FC = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
    },
    onSubmit: (values: IChangePassword, { resetForm, setSubmitting }) => {
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
    <div className={styles.profileInfoContainer}>
      <Title title="Смена пароля" />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Input
          className={styles.input}
          id="oldPassword"
          name="oldPassword"
          type="password"
          placeholder="Пароль"
          label="Пароль"
          onChange={formik.handleChange}
          value={formik.values.oldPassword}
          required
        />
        <Input
          className={styles.input}
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Новый пароль"
          label="Новый пароль"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          required
        />
        <Input
          className={styles.input}
          id="newPasswordRepeat"
          name="newPasswordRepeat"
          type="text"
          placeholder="Подтвержение пароля"
          label="Подтвержение пароля"
          onChange={formik.handleChange}
          value={formik.values.newPasswordRepeat}
          required
        />
        <Button variant="contained" fullWidth className={styles.button} type="submit" disabled={formik.isSubmitting}>
          Сохранить
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordForm
