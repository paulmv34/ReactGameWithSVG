import { axiosYandexService as axiosService } from '../axiosService'
import { LeaderboardData, LeaderboardNewRecordExtended, LeaderboardResponseItem } from '@/types/types'

class LeaderboardAPI {
  private readonly baseEndpoint = '/leaderboard'

  add(data: LeaderboardNewRecordExtended) {
    return axiosService.post(`${this.baseEndpoint}`, data)
  }

  getTeamLeaderboard(data: LeaderboardData, teamName: string) {
    return axiosService.post<Promise<LeaderboardResponseItem[]>>(`${this.baseEndpoint}/${teamName}`, data)
  }
}

export default new LeaderboardAPI()
