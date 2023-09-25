import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './personal-info.module.scss'

import { LogoutIcon, PencilIcon } from '@/assets'
import { Avatar, Button, Typography } from '@/components'
import { profile } from '@/components/personal-info/schema.ts'
import { Card } from '@/components/ui/card'
import { ControlledFileInput } from '@/components/ui/controlled/file-input-preview/controlled-file-input.tsx'
import { EditableText, useEditableText } from '@/components/ui/editeble-text'
import { useGetMeQuery, useUpdateMeMutation } from '@/services/auth'

export type PersonalInfoPropsType = {
  userName?: string
  userEmail?: string
  onLogout: () => void
  onSaveChanges: (value: string | undefined) => void
}
type Form = z.infer<typeof profile>

export const PersonalInfo: FC<PersonalInfoPropsType> = props => {
  const { userName, userEmail, onLogout, onSaveChanges } = props
  const { activateEditMode, setEditMode, editMode } = useEditableText('')
  const [updateAvatar] = useUpdateMeMutation()
  const { data: me } = useGetMeQuery()
  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(profile),
    mode: 'onChange',
  })

  const onChangeHandler = handleSubmit((data: Form) => {
    const form = new FormData()

    form.append('avatar', data.avatar ?? '')
    form.append('name', me?.name ?? '')
    updateAvatar(form)
  })

  return (
    <Card className={`${s.card} ${editMode && s.editMode}`}>
      <Typography variant="large" as={'h1'} className={s.title}>
        Personal Information
      </Typography>
      <Avatar src={me?.avatar} size={'6rem'} />
      {!editMode ? (
        <>
          <div className={s.edit_avatar}>
            <form onChange={onChangeHandler} style={{ height: '16px' }}>
              <ControlledFileInput control={control} withPreview={false} name={'avatar'}>
                {onClick => <PencilIcon onClick={onClick} style={{ cursor: 'pointer' }} />}
              </ControlledFileInput>
            </form>
          </div>
          <div className={s.userName_container}>
            <Typography as={'h1'} variant={'h1'}>
              {userName}
            </Typography>
            <PencilIcon onClick={activateEditMode} style={{ cursor: 'pointer' }} />
          </div>
          <Typography variant="body2" className={s.email}>
            {userEmail}
          </Typography>

          <Button variant={'secondary'} className={s.btn} onClick={onLogout}>
            <LogoutIcon />
            <Typography variant={'subtitle2'}>Logout</Typography>
          </Button>
        </>
      ) : (
        <EditableText
          callback={setEditMode}
          text={userName}
          onSaveChanges={value => {
            onSaveChanges(value)
          }}
        />
      )}
    </Card>
  )
}
