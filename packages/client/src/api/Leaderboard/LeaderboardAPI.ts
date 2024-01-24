import { axiosService } from '../axiosService'
import { LeaderboardData, LeaderboardItem, LeaderboardNewRecord } from '@/types/types'
import { LEADERBOARD_URl } from '@/api/types'

class LeaderboardAPI {
  private readonly baseEndpoint = '/leaderboard'

  add(data: LeaderboardNewRecord) {
    return axiosService.post(`${LEADERBOARD_URl}${this.baseEndpoint}`, data)
  }

  getAll(data: LeaderboardData) {
    return axiosService.post(`${LEADERBOARD_URl}${this.baseEndpoint}/all`, data)
  }

  getTeamLeaderboard(data: LeaderboardData, teamName: string) {
    return axiosService.post<Promise<LeaderboardItem>>(`${LEADERBOARD_URl}${this.baseEndpoint}/${teamName}`, data)
  }
}

export default new LeaderboardAPI()
