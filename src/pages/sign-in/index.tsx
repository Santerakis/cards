import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Page } from '@/components'
import { LoginForm } from '@/components/auth'
import { useGetMeQuery, useSignInMutation } from '@/services/auth/auth.api.ts'
import { ArgsSignInType } from '@/services/auth/auth.api.types.ts'

export const SignIn = () => {
  const [signIn] = useSignInMutation()
  const navigate = useNavigate()
  const { data: me } = useGetMeQuery()
  const onSubmit = (data: ArgsSignInType) => {
    signIn(data)
      .unwrap()
      .then(() => {
        toast.success('you are sign in successfully')
      })
      .catch(error => {
        toast.error(error.data.message)
      })
  }

  if (me) navigate('/')

  return (
    <Page>
      <LoginForm onSubmit={onSubmit} />
    </Page>
  )
}
