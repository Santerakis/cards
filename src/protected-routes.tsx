import { FC, PropsWithChildren } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useGetMeQuery } from '@/services/auth/auth.api.ts'

type Props = PropsWithChildren
export const ProtectedRoutes: FC<Props> = () => {
  const { data, isLoading } = useGetMeQuery()

  if (isLoading) return <div>Loading...</div>

  return data ? <Outlet /> : <Navigate to="/sign-in" />
}
