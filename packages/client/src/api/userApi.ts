import { END_POINTS_URL, TUserData, TUserPassword } from './types'
import { axiosService } from './axiosService'

export const userApi = {
  changeUserProfileData(data: TUserData) {
    return axiosService.put<TUserData>(END_POINTS_URL.CHANGE_USER_PROFILE, data)
  },
  changeUserPasswordData(data: TUserPassword) {
    return axiosService.put<TUserData>(END_POINTS_URL.CHANGE_USER_PASSWORD, data)
  },
  setNewAvatarData(data: FormData) {
    return axiosService.put<TUserData>(END_POINTS_URL.CHANGE_USER_PROFILE_AVATAR, data)
  },
}
