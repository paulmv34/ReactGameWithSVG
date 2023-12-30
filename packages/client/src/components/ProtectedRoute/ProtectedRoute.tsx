import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

import { ProtectedRouteProps } from '@/components/ProtectedRoute/types'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/types/types'

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  // Если пользователь не авторизован и пытается получить доступ к защищённой странице, то мы перенаправляем его на страницу авторизации
  if (isLoggedIn === false) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ path: location.pathname }} />
  }
  // значение null нужно для того, чтобы не получилось редиректа на страницу авторизации для УЖЕ авторизованного пользователя
  else if (isLoggedIn === null) {
    return null
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
