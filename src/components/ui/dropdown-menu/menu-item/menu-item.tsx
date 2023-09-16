import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './menu-item.module.scss'

type MenuItemPropsType<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
  separator?: boolean
  onSelect?: () => void
  selectable?: boolean
} & ComponentPropsWithoutRef<T>
export const MenuItem = <T extends ElementType = 'div'>({
  as,
  children,
  separator = true,
  onSelect,
  selectable = false,
  ...rest
}: MenuItemPropsType<T>) => {
  const onSelectHandler = (e: Event) => {
    onSelect && onSelect()
    e.preventDefault()
  }
  const TagName = as || 'div'
  const classNames = {
    menuItem: clsx(s.menuItem, selectable && s.interactive),
    item: clsx(s.item),
    separator: s.separator,
  }

  return (
    <DropdownMenu.Item onSelect={onSelectHandler} className={classNames.menuItem}>
      <TagName className={classNames.item} {...rest}>
        {children}
      </TagName>
    </DropdownMenu.Item>
  )
}
