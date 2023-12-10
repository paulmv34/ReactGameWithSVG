import { FC } from 'react'
import LeaderTable from '../../modules/LeaderTable/LeaderTable'
import styles from './LeaderBoard.module.scss'
import { ROUTES, ScoreData } from '@/types/types'
import BackLink from '@/components/BackLink/BackLink'
import clsx from 'clsx'

const mockData: ScoreData[] = [
  {
    nickname: 'PavelFromVite',
    score: 10000,
    levels: 12,
    date: new Date().toLocaleDateString(),
  },
  {
    nickname: 'DastanFromWebpack123',
    score: 8000,
    levels: 10,
    date: new Date().toLocaleDateString(),
  },
]

const LeaderBoard: FC = () => {
  return (
    <section className={clsx('page', styles.page)}>
      <div className="wrapper wrapper-backlink">
        <h2 className={styles.title}>Рейтинг игроков</h2>
        <BackLink to={ROUTES.MAIN} />
        <LeaderTable data={mockData} />
      </div>
    </section>
  )
}

export default LeaderBoard
