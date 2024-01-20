import { useContext, useState } from 'react'

import LoginForm from './login'
import RegisterForm from './register'
import { AuthenticationContext } from '../../contexts/Authentication/AuthenticationContext'
import { Navigate } from 'react-router-dom'

export default function Authentication() {
  const { userSessionId } = useContext(AuthenticationContext)
  const [isRegisterFormEnabled, setIsRegisterFormEnabled] = useState(false)

  if (userSessionId) {
    return <Navigate to="/home" replace={true} />
  }

  const enableRegisterForm = (value: boolean) => {
    setIsRegisterFormEnabled(value)
  }

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-zinc-600">
      <div className="bg-white rounded-xl relative overflow-hidden w-[320px] sm:w-[368px] min-h-[480px]">
        {isRegisterFormEnabled ? (
          <RegisterForm enableRegisterForm={enableRegisterForm} />
        ) : (
          <LoginForm enableRegisterForm={enableRegisterForm} />
        )}
      </div>
    </div>
  )
}
