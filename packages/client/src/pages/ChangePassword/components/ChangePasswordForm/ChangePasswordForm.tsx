import { FC } from 'react'

import styles from './ChangePasswordForm.module.scss'
import Title from '../../../../components/Title/Title'
import { Form, Formik, FormikHelpers } from 'formik'
import { Button } from '@mui/material'
import { IChangePassword } from '../../types/ChangePasswordTypes'
import CustomInput from '../../../../components/CustomInput/CustomInput'

const ChangePasswordForm: FC = () => {
  const submitForm = (values: IChangePassword, { setSubmitting }: FormikHelpers<IChangePassword>) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 500)
  }

  return (
    <div className={styles.profileInfoContainer}>
      <Title title="Смена пароля" />
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          newPasswordRepeat: '',
        }}
        onSubmit={submitForm}>
        <Form className={styles.formProfile}>
          <CustomInput name={'oldPassword'} placeholder="Пароль" />
          <CustomInput name={'newPassword'} placeholder="Новый пароль" />
          <CustomInput name={'newPasswordRepeat'} placeholder="Подтвержение пароля" />
          <Button variant="contained" fullWidth className={styles.button} type="submit">
            Сохранить
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default ChangePasswordForm
