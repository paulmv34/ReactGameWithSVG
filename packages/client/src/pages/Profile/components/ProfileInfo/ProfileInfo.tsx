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
import { profileValidationSchema } from '@/utils/validationSchema'

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
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: profileValidationSchema,
    onSubmit: (values: TUserData, { resetForm, setSubmitting }) => {
      setSubmitting(true)
      userApi
        .changeUserProfileData(values)
        .catch((err) => {
          console.log('Profile updating failed', err)
        })
        .finally(() => {
          setSubmitting(false)
          resetForm({})
        })
    },
  })

  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.headerProfile}>
        <Title title="Профиль" />
        <Avatar variant="square" className={styles.avatar} />
      </div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className="fields-group">
          <Input
            className={styles.input}
            id="login"
            name="login"
            type="text"
            placeholder="Логин"
            label="Логин"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.login}
            errorText={formik.touched.login && formik.errors.login ? formik.errors.login : ''}
            error={formik.touched.login && !!formik.errors.login}
          />
          <Input
            className={styles.input}
            id="first_name"
            name="first_name"
            type="text"
            placeholder="Имя"
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
            placeholder="Фамилия"
            label="Фамилия"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.second_name}
            errorText={formik.touched.second_name && formik.errors.second_name ? formik.errors.second_name : ''}
            error={formik.touched.second_name && !!formik.errors.second_name}
          />
          <Input
            className={styles.input}
            id="display_name"
            name="display_name"
            type="text"
            placeholder="Имя в системе"
            label="Имя в системе"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.display_name}
            errorText={formik.touched.display_name && formik.errors.display_name ? formik.errors.display_name : ''}
            error={formik.touched.display_name && !!formik.errors.display_name}
          />
          <Input
            className={styles.input}
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            label="Email"
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
            type="text"
            placeholder="Телефон"
            label="Телефон"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            errorText={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
            error={formik.touched.phone && !!formik.errors.phone}
          />
          <Button variant="contained" fullWidth className={styles.button} type="submit" disabled={formik.isSubmitting}>
            Сохранить
          </Button>
        </div>
      </form>
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
