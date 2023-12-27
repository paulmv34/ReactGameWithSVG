import React from 'react'
import { Outlet } from 'react-router'

import { ProtectedRouteProps } from '@/components/ProtectedRoute/types'

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { isLoggedIn } = useAuth()
  // const location = useLocation()
  // if (!isLoggedIn) {
  //   return <Navigate to={ROUTES.LOGIN} replace state={{ path: location.pathname }} />
  // }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
