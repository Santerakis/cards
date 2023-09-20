import { ChangeEvent, FC } from 'react'

import * as SliderRDX from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

import { Typography } from '@/components'

export type SliderPropsType = {
  value: [number, number]
  minValue: number
  maxValue: number
  step?: number
  max?: number
  min?: number
  label?: string
  className?: string
  onValueCommit: (values: [number, number]) => void
  onChange: (values: [number, number]) => void
}

export const Slider: FC<SliderPropsType> = props => {
  const {
    maxValue,
    minValue,
    onValueCommit,
    label,
    onChange,
    className,
    value,
    step = 1,
    min = 0,
    max = 100,
  } = props
  const classNames = {
    container: clsx(s.container, className),
    wrapper: clsx(s.wrapper),
    values: clsx(s.values),
    root: clsx(s.root),
    track: clsx(s.track),
    range: clsx(s.range),
    thumb: clsx(s.thumb),
  }

  return (
    <div className={classNames.container}>
      {label && <Typography variant={'body2'}>{label}</Typography>}
      <div className={classNames.wrapper}>
        {/*<div className={classNames.values}>{minValue}</div>*/}
        <input
          type="text"
          className={classNames.values}
          value={minValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChange([+event.currentTarget.value, maxValue])
            onValueCommit([+event.currentTarget.value, maxValue])
          }}
        />
        <SliderRDX.Root
          value={value}
          className={classNames.root}
          defaultValue={[minValue, maxValue]}
          min={min}
          max={max}
          step={step}
          onValueCommit={onValueCommit}
          onValueChange={onChange}
        >
          <SliderRDX.Track className={classNames.track}>
            <SliderRDX.Range className={classNames.range} />
          </SliderRDX.Track>
          <SliderRDX.Thumb className={classNames.thumb} />
          <SliderRDX.Thumb className={classNames.thumb} />
        </SliderRDX.Root>
        {/*<div className={classNames.values}>{maxValue}</div>*/}
        <input
          type="text"
          className={classNames.values}
          value={maxValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChange([minValue, +event.currentTarget.value])
            onValueCommit([minValue, +event.currentTarget.value])
          }}
        />
      </div>
    </div>
  )
}
