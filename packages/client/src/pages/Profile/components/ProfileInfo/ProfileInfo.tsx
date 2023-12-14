import { FC } from 'react'
import Title from '../../../../components/Title/Title'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'

import styles from './ProfileInfo.module.scss'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/types/types'
import Input from '@/components/Input/Input'
import { TUserData } from './types'
import { userApi } from '@/api/userApi'

const ProfileInfo: FC = () => {
  const formik = useFormik({
    initialValues: {
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      login: '',
      email: '',
    },
    onSubmit: (values: TUserData, { resetForm, setSubmitting }) => {
      setSubmitting(true)
      userApi.changeUserProfileData(values)
      setTimeout(() => {
        setSubmitting(false)
        resetForm({})
      }, 3000)
    },
  })

  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.headerProfile}>
        <Title title="Профиль" />
        <Avatar variant="square" />
      </div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Input
          className={styles.input}
          id="login"
          name="login"
          type="text"
          placeholder="Логин"
          label="Логин"
          onChange={formik.handleChange}
          value={formik.values.login}
          required={false}
        />
        <Input
          className={styles.input}
          id="first_name"
          name="first_name"
          type="text"
          placeholder="Имя"
          label="Имя"
          onChange={formik.handleChange}
          value={formik.values.first_name}
          required={false}
        />
        <Input
          className={styles.input}
          id="second_name"
          name="second_name"
          type="text"
          placeholder="Фамилия"
          label="Фамилия"
          onChange={formik.handleChange}
          value={formik.values.second_name}
          required={false}
        />
        <Input
          className={styles.input}
          id="display_name"
          name="display_name"
          type="text"
          placeholder="Имя в системе"
          label="Имя в системе"
          onChange={formik.handleChange}
          value={formik.values.display_name}
          required={false}
        />
        <Input
          className={styles.input}
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          label="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required={false}
        />
        <Input
          className={styles.input}
          id="phone"
          name="phone"
          type="text"
          placeholder="Телефон"
          label="Телефон"
          onChange={formik.handleChange}
          value={formik.values.phone}
          required={false}
        />
        <Button
          variant="contained"
          fullWidth
          className={styles.button}
          type="submit"
          disabled={formik.isSubmitting}>
          Сохранить
        </Button>
      </form>
      <Link to={ROUTES.PROFILE_PASSWORD}>
        <Button
          variant="contained"
          fullWidth
          className={styles.button}
          type="submit">
          Изменить пароль
        </Button>
      </Link>
      <Link to={ROUTES.PROFILE_AVATAR}>
        <Button
          variant="contained"
          fullWidth
          className={styles.button}
          type="submit">
          Изменить аватар
        </Button>
      </Link>
    </div>
  )
}

export default ProfileInfo
