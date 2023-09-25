import { Outlet } from 'react-router-dom'

import { Header } from '@/components/layout/header'
import { useGetMeQuery, useSignOutMutation } from '@/services/auth/auth.api.ts'

export const Layout = () => {
  const { data } = useGetMeQuery()
  const [signOut] = useSignOutMutation()

  return (
    <div>
      <Header userData={data} onSignOut={signOut} />
      <Outlet />
    </div>
  )
}
