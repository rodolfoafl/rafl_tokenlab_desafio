import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authentication from './pages/Auth/index.tsx'
import { ErrorPage } from './pages/Error/index.tsx'
import { ProtectedRoutes } from './components/Protected/index.tsx'
import { AuthenticationContextProvider } from './contexts/Authentication/AuthenticationContext.tsx'

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
        path: '/home',
        element: <App />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <RouterProvider router={router} />
    </AuthenticationContextProvider>
  </React.StrictMode>,
)
