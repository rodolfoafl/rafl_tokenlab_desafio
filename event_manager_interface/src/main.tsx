import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authentication from './pages/Auth/index.tsx'
import { ErrorPage } from './pages/Error/index.tsx'
import { ProtectedRoutes } from './components/Protected/index.tsx'
import { AuthenticationContextProvider } from './contexts/Authentication/AuthenticationContext.tsx'
import Home from './pages/Home/index.tsx'
import { EventsProvider } from './contexts/Events/EventsContext.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Authentication />,
  },
  {
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>,
)
