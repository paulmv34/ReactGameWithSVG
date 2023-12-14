import { END_POINTS_URL, TUserData, TUserPassword } from './types'
import { axiosService } from './axiosService'

export const userApi = {
  changeUserProfileData(data: TUserData) {
    return axiosService
      .put<TUserData>(END_POINTS_URL.CHANGE_USER_PROFILE, data)
      .then((data) => data)
      .catch((err) => console.log(err))
  },
  changeUserPasswordData(data: TUserPassword) {
    return axiosService
      .put<TUserData>(END_POINTS_URL.CHANGE_USER_PASSWORD, data)
      .then((data) => data)
      .catch((err) => console.log(err))
  },
  setNewAvatarData(data: FormData) {
    return axiosService
      .put<TUserData>(END_POINTS_URL.CHANGE_USER_PROFILE_AVATAR, data)
      .then((data) => data)
      .catch((err) => console.log(err))
  },
}
