import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ForgotPassword, Page } from '@/components'
import { recoveryEmail } from '@/helpers/templates/emails/recoveryEmail.ts'
import { useRecoverPasswordMutation } from '@/services/auth/auth.api.ts'

export const ForgotPasswordPage = () => {
  const [passwordRecovery] = useRecoverPasswordMutation()
  const html = recoveryEmail()
  const navigate = useNavigate()
  const onSubmit = (email: string) => {
    passwordRecovery({ html, email })
      .unwrap()
      .then(() => {
        navigate('/check-email', { state: email })
      })
      .catch(error => {
        toast.error(error.data.message)
      })
  }

  return (
    <Page>
      <ForgotPassword onSubmit={onSubmit} />
    </Page>
  )
}
