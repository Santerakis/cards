import { FC, ReactNode, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ChangeCoverIcon } from '@/assets'
import { Button, ControlledFileInput, ControlledTextField, Select, Typography } from '@/components'
import { Modal } from '@/components/ui/modal'
import { cardSchema } from '@/components/ui/modal/add-new-card/add-new-card.ts'

type AddNewPackModalPropsType = {
  children: ReactNode
  onSubmit: (data: CardForm) => void
}
export type CardForm = z.infer<typeof cardSchema>
export const AddNewCard: FC<AddNewPackModalPropsType> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [type, setType] = useState<string>('Text')

  const { children, onSubmit } = props
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CardForm>({
    resolver: zodResolver(cardSchema),
    mode: 'onSubmit',
  })

  const onSubmitForm = handleSubmit(data => {
    onSubmit({
      question: data.question,
      answer: data.answer,
      answerImg: data.answerImg,
      questionImg: data.questionImg,
    })
    setIsOpen(false)
    reset()
  })

  const questionType =
    type === 'Text' ? (
      <>
        <ControlledTextField
          style={{ marginBottom: '1.5rem' }}
          name={'question'}
          control={control}
          title={'Question'}
          inputType={'text'}
        />
        <ControlledTextField
          style={{ marginBottom: '1.5rem' }}
          name={'answer'}
          control={control}
          title={'Answer'}
          inputType={'text'}
        />
      </>
    ) : (
      <>
        <ControlledFileInput control={control} name={'questionImg'} withPreview variant={'large'}>
          {onClick => (
            <Button onClick={onClick} variant={'secondary'} type={'button'}>
              <ChangeCoverIcon />
              Change Cover
            </Button>
          )}
        </ControlledFileInput>
        {errors.questionImg && <p>{`${errors.questionImg.message}`}</p>}
        <ControlledFileInput control={control} name={'answerImg'} withPreview variant={'large'}>
          {onClick => (
            <Button onClick={onClick} variant={'secondary'} type={'button'}>
              <ChangeCoverIcon />
              Change Cover
            </Button>
          )}
        </ControlledFileInput>
        {errors.answerImg && <p>{`${errors.answerImg.message}`}</p>}
      </>
    )

  return (
    <Modal.Root title={'Add New Card'} trigger={children} onOpenChange={setIsOpen} isOpen={isOpen}>
      <form onSubmit={onSubmitForm}>
        <Modal.Body>
          <Select
            items={['Text', 'Picture']}
            label={'Choose a question format Picture'}
            value={type}
            placeholder={type}
            onChange={value => setType(value)}
            fullWidth
          />
          {questionType}
        </Modal.Body>
        <Modal.Footer>
          <Button variant={'primary'} type={'submit'}>
            <Typography variant={'subtitle2'}>Add New Card</Typography>
          </Button>
          <Button variant={'secondary'} onClick={() => setIsOpen(false)}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Root>
  )
}
