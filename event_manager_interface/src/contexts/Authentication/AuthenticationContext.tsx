import { useCookies } from 'react-cookie'
import { createContext } from 'react'

interface AuthenticationContextType {
  userSessionId: string | null
}

export const AuthenticationContext = createContext(
  {} as AuthenticationContextType,
)

export const AuthenticationContextProvider = ({ children }: any) => {
  const [cookies] = useCookies(['userSessionId'])

  const userSessionId = cookies.userSessionId

  return (
    <AuthenticationContext.Provider
      value={{
        userSessionId,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
