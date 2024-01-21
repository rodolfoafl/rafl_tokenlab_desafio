import { useContext } from 'react'
import { AuthenticationContext } from '../../contexts/Authentication/AuthenticationContext'
import { useNavigate } from 'react-router-dom'
import EventList from '../../components/Events/event-list'
import EventCreate from '../../components/Events/event-create-edit'

export default function Home() {
  const { logout } = useContext(AuthenticationContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    navigate('/login')
  }

  return (
    // <div className="bg-zinc-100 antialiased w-full h-screen flex justify-center items-center">
    <div className="flex justify-center items-center h-[100vh] bg-zinc-600">
      <div className="w-[90vw] h-[90vh] bg-white rounded-3xl flex flex-col py-4 px-6 gap-6">
        <div className="w-full flex items-center justify-between">
          <span>
            {/* bem-vindo <strong>{firstName}</strong> */}
            Bem-vindo! Gerencie seus eventos
          </span>
          <button
            type="button"
            className="rounded-3xl border-2 border-solid border-zinc-500
              bg-transparent text-zinc-900 text-xs font-bold py-2 px-4 tracking-wider 
              uppercase hover:bg-zinc-100  hover:duration-200 
              disabled:opacity-50
              active:scale-95 focus:outline-none"
            onClick={handleLogout}
          >
            sair
          </button>
        </div>

        <div className="flex h-full gap-6 w-full">
          <div className="w-1/3 flex flex-col items-center p-4 gap-4">
            <EventCreate />
          </div>

          <EventList />
        </div>
      </div>
    </div>
  )
}
