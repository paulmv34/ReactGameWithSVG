import { FC } from 'react'
import LeaderTable from '../../modules/LeaderTable/LeaderTable'
import styles from './LeaderBoard.module.scss'
import { ROUTES, ScoreData } from '@/types/types'
import { Link } from 'react-router-dom'
import ArrowBack from '@/components/ArrowBack/ArrowBack'
import clsx from 'clsx'

const mockData: ScoreData[] = [
  {
    nickname: 'PavelFromVite',
    score: 10000,
    levels: 12,
    date: new Date().toLocaleDateString(),
  },
  {
    nickname: 'DastanFromWebpack',
    score: 8000,
    levels: 10,
    date: new Date().toLocaleDateString(),
  },
]

const LeaderBoard: FC = () => {
  return (
    <section className={clsx('page', styles.page)}>
      <div className="wrapper">
        <h2 className={styles.title}>Рейтинг игроков</h2>
        <div className={styles.container}>
          <Link className={styles.link} to={ROUTES.MAIN}>
            <ArrowBack />
          </Link>
          <LeaderTable data={mockData} />
        </div>
      </div>
    </section>
  )
}

export default LeaderBoard
