import { axiosService } from '../axiosService'
import { LeaderboardData, LeaderboardNewRecord, LeaderboardResponseItem } from '@/types/types'
import { BASE_URL } from '@/api/types'

class LeaderboardAPI {
  private readonly baseEndpoint = '/leaderboard'

  add(data: LeaderboardNewRecord) {
    return axiosService.post(`${BASE_URL}${this.baseEndpoint}`, data)
  }

  getTeamLeaderboard(data: LeaderboardData, teamName: string) {
    return axiosService.post<Promise<LeaderboardResponseItem[]>>(`${BASE_URL}${this.baseEndpoint}/${teamName}`, data)
  }
}

export default new LeaderboardAPI()
