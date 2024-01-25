import { FC, useEffect } from 'react'
import clsx from 'clsx'
import LeaderTable from '../../modules/LeaderTable/LeaderTable'
import styles from './LeaderBoard.module.scss'
import { ROUTES } from '@/types/types'
import { TEAM_NAME } from '@/api/types'
import { fetchByTeam } from '@/features/leaderboard/leaderboardSlice'

import BackLink from '@/components/BackLink/BackLink'
import Loader from '@/components/Loader/Loader'

import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'

const LeaderBoard: FC = () => {
  const { isLoading, records } = useAppSelector((state) => state.leaderboard)
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
        {isLoading && <Loader />}
        {records.length > 0 && <LeaderTable records={records} />}
      </div>
    </section>
  )
}

export default LeaderBoard
