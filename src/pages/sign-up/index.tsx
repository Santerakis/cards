import { useNavigate } from 'react-router-dom'

import { Page } from '@/components'
import { RegistrationForm } from '@/components/auth'
import { useSignUpMutation } from '@/services/auth/auth.api.ts'
import { ArgsSignUpType } from '@/services/auth/auth.api.types.ts'

export const SignUp = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()

  const onSubmitForm = async (data: ArgsSignUpType) => {
    try {
      await signUp(data).unwrap()
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page>
      <RegistrationForm onSubmit={onSubmitForm} />
    </Page>
  )
}
