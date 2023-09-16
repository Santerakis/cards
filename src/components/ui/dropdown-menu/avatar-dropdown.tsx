import { FC } from 'react'

import * as DropdownMenuRDX from '@radix-ui/react-dropdown-menu'

import s from './dropdown-menu.module.scss'

import { LogoutIcon, ProfileIcon } from '@/assets'
import { Avatar, DropdownMenu, Typography } from '@/components'
import { MenuItem } from '@/components/ui/dropdown-menu/menu-item/menu-item.tsx'

type AvtarDropdownPropsType = {
  userName?: string
  userEmail?: string
  avatar?: string
  onSignOut: () => void
}

export const AvatarDropdown: FC<AvtarDropdownPropsType> = props => {
  const { avatar, userName, userEmail, onSignOut } = props
  const separator = <DropdownMenuRDX.Separator className={s.separator} />

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <DropdownMenu
        trigger={
          <button className={s.icon_button}>
            {<Avatar src={avatar} userName={userName} showLabel />}
          </button>
        }
      >
        <MenuItem>
          <Avatar src={avatar} menuItem={s.menu_item} userName={userName} />
          <div style={{ flexDirection: 'column' }}>
            <Typography variant={'caption'}>
              <div>{userName}</div>
              <div>{userEmail}</div>
            </Typography>
          </div>
        </MenuItem>
        {separator}
        <MenuItem as={'a'} href={'/profile'} selectable={true}>
          <ProfileIcon />
          <Typography variant={'caption'}>My Profile</Typography>
        </MenuItem>
        {separator}
        <MenuItem onSelect={onSignOut} selectable={true}>
          <LogoutIcon />
          <Typography variant={'caption'}>Sign Out</Typography>
        </MenuItem>
      </DropdownMenu>
    </div>
  )
}
