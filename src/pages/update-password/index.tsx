import { useNavigate, useParams } from 'react-router-dom'

import { CreateNewPassword, Page } from '@/components'
import { useResetPasswordMutation } from '@/services/auth/auth.api.ts'

type Params = {
  token: string
}
export const UpdatePasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()
  const { token } = useParams<Params>()
  const navigate = useNavigate()
  const onSubmitForm = async (password: string) => {
    if (token) {
      await resetPassword({ password, token })
      navigate('/')
    }
  }

  return (
    <Page>
      <CreateNewPassword onSubmit={onSubmitForm} />
    </Page>
  )
}
