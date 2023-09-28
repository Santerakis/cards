import { Page, PersonalInfo } from '@/components'
import { useGetMeQuery, useSignOutMutation, useUpdateMeMutation } from '@/services/auth'

export const Profile = () => {
  const { data: me } = useGetMeQuery()
  const [signOut] = useSignOutMutation()
  const [updateMe] = useUpdateMeMutation()

  const onSaveChanges = (value: string | undefined) => {
    if (me) {
      const form = new FormData()

      form.append('name', value ? value : '')
      form.append('email', me.email)
      updateMe(form)
    }
  }

  return (
    <Page>
      <PersonalInfo
        userName={me?.name}
        userEmail={me?.email}
        onLogout={signOut}
        onSaveChanges={onSaveChanges}
      />
    </Page>
  )
}
