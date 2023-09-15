import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

type ButtonProps<T> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'outlined' | 'link'
  fullWidth?: boolean
} & ComponentPropsWithoutRef<'button'>

const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref: ForwardedRef<any>
) => {
  const {
    variant = 'primary',
    fullWidth,
    as: Component = 'button',
    disabled,
    className,
    ...rest
  } = props

  const cNames = {
    root: clsx(
      variant === 'primary' && s.primary,
      variant === 'secondary' && s.secondary,
      variant === 'outlined' && s.outlined,
      variant === 'link' && s.link,
      disabled && s.disabledLink,
      fullWidth && s.fullWidth,
      className
    ),
  }

  return <Component ref={ref} disabled={disabled} className={cNames.root} {...rest} />
}

export default forwardRef(Button)
