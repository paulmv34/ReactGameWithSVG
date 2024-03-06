import { END_POINTS_URL, TUserData, TUserPassword } from './types'
import { axiosYandexService as axiosService } from './axiosService'
import { handleError } from '@/utils/handleError'

export const userApi = {
  changeUserProfileData(data: TUserData) {
    return axiosService
      .put<TUserData>(END_POINTS_URL.CHANGE_USER_PROFILE, data)
      .then((data) => data)
      .catch((err) => {
        handleError(err)
        throw err
      })
  },
  changeUserPasswordData(data: TUserPassword) {
    return axiosService
      .put<TUserData>(END_POINTS_URL.CHANGE_USER_PASSWORD, data)
      .then((data) => data)
      .catch((err) => {
        handleError(err)
        throw err
      })
  },
  setNewAvatarData(data: FormData) {
    return axiosService
      .put<TUserData>(END_POINTS_URL.CHANGE_USER_PROFILE_AVATAR, data)
      .then((data) => data)
      .catch((err) => {
        handleError(err)
        throw err
      })
  },
}
