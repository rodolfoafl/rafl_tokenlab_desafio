import { useCookies } from 'react-cookie'
import { createContext, useState } from 'react'

interface AuthenticationContextType {
  userSessionId: string | null
  userName: string
  setUserName: (value: string) => void
  logout: () => void
}

export const AuthenticationContext = createContext(
  {} as AuthenticationContextType,
)

export const AuthenticationContextProvider = ({ children }: any) => {
  const [userName, setUserName] = useState('')

  const [cookie, setCookie, removeCookie] = useCookies(['userSessionId'])
  const userSessionId = cookie.userSessionId

  const logout = () => {
    removeCookie('userSessionId')
  }

  return (
    <AuthenticationContext.Provider
      value={{
        userSessionId,
        userName,
        setUserName,
        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
