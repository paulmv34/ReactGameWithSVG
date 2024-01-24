import { handleError } from '@/utils/handleError'
import LeaderboardAPI from '@/api/Leaderboard/LeaderboardAPI'
import { LeaderboardData, LeaderboardNewRecord } from '@/types/types'

class LeaderboardService {
  async addUser(data: LeaderboardNewRecord) {
    try {
      await LeaderboardAPI.add(data)
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  async fetchAllData(data: LeaderboardData) {
    try {
      await LeaderboardAPI.getAll(data)
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  async fetchTeamLeaderboard(data: LeaderboardData, teamName: string) {
    try {
      await LeaderboardAPI.getTeamLeaderboard(data, teamName)
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export default new LeaderboardService()
