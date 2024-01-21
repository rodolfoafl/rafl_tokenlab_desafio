import { useCookies } from 'react-cookie'
import { createContext } from 'react'

interface AuthenticationContextType {
  userSessionId: string | null
  userName: string | null
  setUserName: (value: string) => void
  logout: () => void
}

export const AuthenticationContext = createContext(
  {} as AuthenticationContextType,
)

export const AuthenticationContextProvider = ({ children }: any) => {
  const setStoredUserName = (value: string) => {
    localStorage.setItem('userName', value)
  }

  const [cookie, setCookie, removeCookie] = useCookies(['userSessionId'])
  const userSessionId = cookie.userSessionId

  const logout = () => {
    localStorage.removeItem('userName')
    removeCookie('userSessionId')
  }

  return (
    <AuthenticationContext.Provider
      value={{
        userSessionId,
        userName: localStorage.getItem('userName'),
        setUserName: setStoredUserName,
        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
