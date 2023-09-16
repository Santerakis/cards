import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import mask from '@/assets/images/mask.png'
import s from '@/components/ui/controlled/file-input-preview/file-input-preview.module.scss'
import { useCreateBlob } from '@/helpers/hooks/useBlob.ts'

type Props<T extends FieldValues> = {
  withPreview: boolean
  variant?: 'small' | 'large' | 'medium'
  children: (onClick: () => void) => JSX.Element
  cover?: any
} & Omit<UseControllerProps<T>, 'rules' | 'defaultValues' | 'onChange' | 'value' | 'type'>

export const ControlledFileInput = <T extends FieldValues>({
  control,
  name,
  withPreview,
  variant,
  children,
  cover,
  ...rest
}: Props<T>) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const refToOpen = useRef<HTMLInputElement | null>(null)
  const {
    field: { onChange, value, ref, ...field },
  } = useController({ name, control })
  const cNames = {
    size: clsx(`${s[variant ?? '']}`),
    input: clsx(s.fileInput),
    image: clsx(),
  }

  const { blob } = useCreateBlob(cover ?? mask)
  const myFile = new File([blob ?? ''], 'cover.png', { type: 'image/png' })

  useEffect(() => {
    setSelectedFile(myFile)
    onChange(myFile as any)
  }, [blob])
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)

      return
    }

    setSelectedFile(e.target.files[0])

    onChange(e?.target?.files[0] as any)
  }
  const onClick = () => {
    if (refToOpen) {
      refToOpen.current?.click()
    }
  }

  return (
    <>
      {withPreview && (
        <div
          className={cNames.size}
          style={{
            backgroundImage: `url(${selectedFile ? URL.createObjectURL(selectedFile) : 'mask'})`,
          }}
        />
      )}
      <input
        className={cNames.input}
        type="file"
        ref={e => {
          ref(e)
          refToOpen.current = e
        }}
        {...rest}
        onChange={onSelectFile}
        {...field}
      />

      {children(onClick)}
    </>
  )
}
