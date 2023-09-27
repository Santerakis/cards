import { useLocation } from 'react-router-dom'

import { CheckEmail, Page } from '@/components'

export const CheckEmailPage = () => {
  const location = useLocation()

  return (
    <Page>
      <CheckEmail email={location.state} />
    </Page>
  )
}
