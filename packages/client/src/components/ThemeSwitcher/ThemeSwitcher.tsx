import styles from './ThemeSwitcher.module.scss'
import clsx from 'clsx'
import ThemeSystem from '@/assets/images/theme-system.svg?react'
import ThemeLight from '@/assets/images/theme-light.svg?react'
import ThemeDark from '@/assets/images/theme-dark.svg?react'
import { useEffect, FC } from 'react'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchTheme, getThemeLocal, setTheme, setThemeLocal } from '@/features/theme/themeSlice'
import { Themes } from '@/types/types'
import { useAuth } from '@/hooks/useAuth'
import { ThemeList } from '@/components/ThemeSwitcher/types'

const themes: ThemeList = [
  {
    name: 'system',
    icon: ThemeSystem,
  },
  {
    name: 'light',
    icon: ThemeLight,
  },
  {
    name: 'dark',
    icon: ThemeDark,
  },
]

const ThemeSwitcher: FC = () => {
  const userId = useAppSelector((state) => state.user.user?.id) || 0
  const themeState = useAppSelector((state) => state.theme)

  const dispatch = useAppDispatch()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchTheme({ userId }))
    } else {
      dispatch(getThemeLocal())
    }
  }, [isLoggedIn])

  useEffect(() => {
    document.documentElement.dataset.theme = themeState.theme
  }, [themeState])

  const onSetTheme = (newTheme: Themes) => {
    if (isLoggedIn) {
      dispatch(setTheme({ userId: userId, theme: newTheme }))
    } else {
      dispatch(setThemeLocal({ theme: newTheme }))
    }
  }

  return (
    <div className={styles.switcherContainer}>
      {themes?.length > 0 &&
        themes.map((theme) => (
          <button
            className={clsx(styles.switcherItem, { [styles.switcherItemActive]: theme.name === themeState.theme })}
            onClick={() => onSetTheme(theme.name)}
            key={theme.name}>
            <theme.icon className={styles.switcherIcon} />
          </button>
        ))}
    </div>
  )
}

export default ThemeSwitcher
