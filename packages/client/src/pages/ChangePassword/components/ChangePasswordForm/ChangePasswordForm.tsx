import { FC } from 'react'

import styles from './ChangePasswordForm.module.scss'
import Title from '../../../../components/Title/Title'
import { useFormik } from 'formik'
import { Button } from '@mui/material'
import { IChangePassword } from '../../types/ChangePasswordTypes'
import Input from '@/components/Input/Input'
import { userApi } from '@/api/userApi'
import { changePasswordValidationSchema } from '@/utils/validationSchema'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/types/types'

const ChangePasswordForm: FC = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: changePasswordValidationSchema,
    onSubmit: (values: IChangePassword, { resetForm, setSubmitting }) => {
      setSubmitting(true)
      userApi
        .changeUserPasswordData(values)
        .then(() => {
          resetForm({})
          navigate(ROUTES.PROFILE)
        })
        .catch((err) => {
          console.log('Password changing failed', err)
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.headerForm}>
        <Title title="Смена пароля" />
      </div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className="fields-group">
          <Input
            className={styles.input}
            id="oldPassword"
            name="oldPassword"
            type="password"
            placeholder="Пароль"
            label="Пароль"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.oldPassword}
            errorText={formik.touched.oldPassword && formik.errors.oldPassword ? formik.errors.oldPassword : ''}
            error={formik.touched.oldPassword && !!formik.errors.oldPassword}
          />
          <Input
            className={styles.input}
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Новый пароль"
            label="Новый пароль"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            errorText={formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : ''}
            error={formik.touched.newPassword && !!formik.errors.newPassword}
          />
          <Input
            className={styles.input}
            id="repeatNewPassword"
            name="repeatNewPassword"
            type="password"
            placeholder="Подтвержение пароля"
            label="Подтвержение пароля"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.repeatNewPassword}
            errorText={
              formik.touched.repeatNewPassword && formik.errors.repeatNewPassword ? formik.errors.repeatNewPassword : ''
            }
            error={formik.touched.repeatNewPassword && !!formik.errors.repeatNewPassword}
          />
          <Button variant="contained" fullWidth className={styles.button} type="submit" disabled={formik.isSubmitting}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChangePasswordForm
