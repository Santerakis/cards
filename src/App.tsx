import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from '@/components'
import { Cards, CheckEmailPage, Decks, PageNotFound, Profile, SignIn, SignUp } from '@/pages'
import { ForgotPasswordPage } from '@/pages/forgot-password'
import { Learn } from '@/pages/learn'
import { UpdatePasswordPage } from '@/pages/update-password'
import { ProtectedRoutes } from '@/protected-routes.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            index: true,
            element: <Decks />,
          },
          {
            path: 'cards/:id',
            element: <Cards />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'learn/:id',
            element: <Learn />,
          },
        ],
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },

      {
        path: 'forgot_password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password/:token',
        element: <UpdatePasswordPage />,
      },

      {
        path: 'check-email',
        element: <CheckEmailPage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
