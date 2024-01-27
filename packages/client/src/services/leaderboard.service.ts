import { handleError } from '@/utils/handleError'
import LeaderboardAPI from '@/api/Leaderboard/LeaderboardAPI'
import { LeaderboardData, LeaderboardNewRecordExtended, LeaderboardResponseItem } from '@/types/types'
import { AxiosResponse } from 'axios'

class LeaderboardService {
  async addUser(data: LeaderboardNewRecordExtended): Promise<void> {
    try {
      await LeaderboardAPI.add(data)
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  async fetchTeamLeaderboard(data: LeaderboardData, teamName: string): Promise<LeaderboardResponseItem[]> {
    try {
      const response: AxiosResponse<Promise<LeaderboardResponseItem[]>> = await LeaderboardAPI.getTeamLeaderboard(
        data,
        teamName
      )
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export default new LeaderboardService()
