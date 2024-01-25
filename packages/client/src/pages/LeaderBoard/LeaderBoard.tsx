import { FC, useEffect } from 'react'
import LeaderTable from '../../modules/LeaderTable/LeaderTable'
import styles from './LeaderBoard.module.scss'
import { ROUTES } from '@/types/types'
import BackLink from '@/components/BackLink/BackLink'
import clsx from 'clsx'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchByTeam } from '@/features/leaderboard/leaderboardSlice'
import { TEAM_NAME } from '@/api/types'
import { useAppSelector } from '@/hooks/useAppSelector'

const LeaderBoard: FC = () => {
  const records = useAppSelector((state) => state.leaderboard.records)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchByTeam({
        payload: {
          cursor: 0,
          limit: 10,
          ratingFieldName: 'score',
        },
        teamName: TEAM_NAME,
      })
    )
  }, [])

  return (
    <section className={clsx('page', styles.page)}>
      <div className="wrapper wrapper-backlink">
        <h2 className={styles.title}>Рейтинг игроков</h2>
        <BackLink to={ROUTES.MAIN} />
        <LeaderTable records={records} />
      </div>
    </section>
  )
}

export default LeaderBoard
