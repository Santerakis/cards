import { FC } from 'react'

import { clsx } from 'clsx'
import { Link } from 'react-router-dom'

import s from './header.module.scss'

import { Logo } from '@/assets'
import { AvatarDropdown, Button } from '@/components'
import { useGetMeQuery } from '@/services/auth'
import { UserType } from '@/services/auth/auth.api.types.ts'

export type Props = {
  userData?: UserType | null
  onSignOut: () => void
}
export const Header: FC<Props> = ({ onSignOut, userData }) => {
  const { data: me } = useGetMeQuery()
  const cNames = {
    header: clsx(s.header),
    container: clsx(s.container, 'container'),
  }

  return (
    <header className={cNames.header}>
      <div className={cNames.container}>
        <Link to={'/'}>
          <Logo />
        </Link>
        {!userData && (
          <Button as={'a'} href={'/sign-in'}>
            Sign In
          </Button>
        )}
        {userData && (
          <AvatarDropdown
            avatar={me?.avatar}
            onSignOut={onSignOut}
            userEmail={userData.email}
            userName={userData.name}
          />
        )}
      </div>
    </header>
  )
}
