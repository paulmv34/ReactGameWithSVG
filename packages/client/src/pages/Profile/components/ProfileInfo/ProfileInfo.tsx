import { FC } from 'react'
import Title from '../../../../components/Title/Title'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Formik, Form, FormikHelpers } from 'formik'

import styles from './ProfileInfo.module.scss'
import { IProfile } from './types'
import CustomInput from '../../../../components/CustomInput/CustomInput'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../../routes/Routes'

const ProfileInfo: FC = () => {
  const submitForm = (values: IProfile, { setSubmitting }: FormikHelpers<IProfile>) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 500)
  }

  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.headerProfile}>
        <Title title="Профиль" />
        <Avatar variant="square" />
      </div>
      <Formik
        initialValues={{
          login: 'Дщпшт',
          email: '',
          phone: '',
        }}
        onSubmit={submitForm}>
        <Form className={styles.formProfile}>
          <CustomInput name={'login'} placeholder="Логин" />
          <CustomInput name={'email'} placeholder="Email" />
          <CustomInput name={'phone'} placeholder="Телефон" />
          <Button variant="contained" fullWidth className={styles.button} type="submit">
            Сохранить
          </Button>
        </Form>
      </Formik>
      <Link to={ROUTES.PROFILE_PASSWORD}>
        <Button variant="contained" fullWidth className={styles.button} type="submit">
          Изменить пароль
        </Button>
      </Link>
      <Link to={ROUTES.PROFILE_AVATAR}>
        <Button variant="contained" fullWidth className={styles.button} type="submit">
          Изменить аватар
        </Button>
      </Link>
    </div>
  )
}

export default ProfileInfo
