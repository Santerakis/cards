import { FC, ReactNode } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, ControlledCheckbox, ControlledTextField, Modal } from '@/components'
import { ControlledFileInput } from '@/components/ui/controlled/file-input-preview/controlled-file-input.tsx'
import { deckSchema } from '@/components/ui/modal/create-deck/create-deck-schema.ts'

type EditPackModalProps = {
  trigger: ReactNode
  isPrivate: boolean
  packName: string
  onSubmit: (data: Form) => void
  isOpenEditDeck: boolean
  setIsOpenEditDeck: (value: boolean) => void
  cover: string
}

type Form = z.infer<typeof deckSchema>
export const EditDeckModal: FC<EditPackModalProps> = ({
  onSubmit,
  packName,
  isPrivate,
  trigger,
  isOpenEditDeck,
  setIsOpenEditDeck,
  cover,
}) => {
  const { handleSubmit, control } = useForm<Form>({
    resolver: zodResolver(deckSchema),
    mode: 'onSubmit',
    values: { isPrivate, name: packName, cover },
  })
  const onSubmitForm = handleSubmit(data => {
    onSubmit({ name: data.name, isPrivate: data.isPrivate, cover: data.cover })
    setIsOpenEditDeck(false)
  })

  return (
    <Modal.Root
      isOpen={isOpenEditDeck}
      onOpenChange={setIsOpenEditDeck}
      trigger={trigger}
      title={'Edit Pack'}
    >
      <form onSubmit={onSubmitForm}>
        <Modal.Body>
          <ControlledFileInput
            variant={'large'}
            cover={cover}
            name={'cover'}
            withPreview
            control={control}
          >
            {onClick => (
              <Button type={'button'} variant={'secondary'} onClick={onClick}>
                Change cover
              </Button>
            )}
          </ControlledFileInput>
          <ControlledTextField
            title={'Name Pack'}
            inputType={'text'}
            control={control}
            name={'name'}
          />
          <ControlledCheckbox control={control} left label={'Private Pack'} name={'isPrivate'} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant={'primary'} type={'submit'}>
            Save Changes
          </Button>
          <Button variant={'secondary'} onClick={() => setIsOpenEditDeck(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Root>
  )
}
