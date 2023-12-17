import React from 'react'
import store from '@/store/store'
import { Navigate, Outlet, useLocation } from 'react-router'

import { ROUTES } from '@/types/types'

import { ProtectedRouteProps } from '@/components/ProtectedRoute/types'

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = store.getState()
  const location = useLocation()
  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ path: location.pathname }} />
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
