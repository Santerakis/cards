import { FC } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

type Props = {
  label: string
  id: string
  value: string
}

export const RadioGroupItem: FC<Props> = ({ label, id, value }) => {
  return (
    <div className={s.container}>
      <RadioGroup.Item className={s.item} value={value} id={id}>
        <RadioGroup.Indicator className={s.indicator} />
      </RadioGroup.Item>
      <label className={s.label} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
