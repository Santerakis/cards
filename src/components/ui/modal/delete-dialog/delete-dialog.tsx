import { FC, ReactNode } from 'react'

import { Button, Typography } from '@/components'
import { Modal } from '@/components/ui/modal'

type DeleteDialogProps = {
  title: string
  bodyMessage: string
  buttonTitle: string
  children?: ReactNode
  onClick: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
export const DeleteDialog: FC<DeleteDialogProps> = ({
  children,
  title,
  buttonTitle,
  bodyMessage,
  isOpen,
  setIsOpen,
  onClick,
}) => {
  const clickHandler = () => {
    onClick()
    setIsOpen(false)
  }

  return (
    <div>
      <Modal.Root onOpenChange={setIsOpen} trigger={children} isOpen={isOpen} title={title}>
        <Modal.Body>{bodyMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant={'primary'} onClick={clickHandler}>
            <Typography variant={'subtitle2'}>{buttonTitle}</Typography>
          </Button>
          <Button variant={'secondary'} onClick={() => setIsOpen(false)}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </div>
  )
}
