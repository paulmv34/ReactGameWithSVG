import { FC, useRef } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import styles from './ChangeAvatarForm.module.scss'
import Title from '../../../../components/Title/Title'
import { userApi } from '@/api/userApi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { avatarFormValidationSchema } from '@/utils/validationSchema'
import { IChangeAvatar } from '@/pages/ChangeAvatar/types/ChangeAvatarTypes'
import clsx from 'clsx'
import { ROUTES } from '@/types/types'

const ChangeAvatarForm: FC = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.files && event.currentTarget.files.length ? event.currentTarget.files[0] : ''
    formik.setFieldValue('avatar', value, true)
  }
  const formik = useFormik({
    initialValues: {
      avatar: undefined,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: avatarFormValidationSchema,
    onSubmit: (values: IChangeAvatar, { setSubmitting }) => {
      if (!values.avatar) {
        return
      }
      setSubmitting(true)
      const formData = new FormData()
      formData.append('avatar', values.avatar)
      userApi
        .setNewAvatarData(formData)
        .then(() => {
          resetFileInput()
          navigate(ROUTES.PROFILE)
        })
        .catch((err) => {
          console.log('Avatar changing failed', err)
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.headerForm}>
        <Title title="Смена аватара" />
      </div>
      <div>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className="fields-group">
            <div
              className={clsx(styles.inputAvatar, {
                [styles.inputAvatar]: formik.touched.avatar && formik.errors.avatar,
              })}>
              <Button variant="contained" htmlFor="avatar" component="label" className={styles.buttonFile}>
                Загрузить
              </Button>
              <input
                type="file"
                id="avatar"
                name="avatar"
                ref={fileInputRef}
                className={styles.fieldFile}
                onChange={onFileInputChange}
              />
              <span className={styles.error}>{formik.errors.avatar}</span>
            </div>
            <Button
              variant="contained"
              fullWidth
              className={styles.button}
              type="submit"
              disabled={formik.isSubmitting}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangeAvatarForm
