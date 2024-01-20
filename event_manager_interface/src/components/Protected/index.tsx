import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthenticationContext } from '../../contexts/Authentication/AuthenticationContext'
// import { AuthenticationContext } from '../../contexts/Authentication/AuthenticationContext'

export const ProtectedRoutes = () => {
  const { userSessionId } = useContext(AuthenticationContext)

  return userSessionId ? <Outlet /> : <Navigate to="/login" />
}
