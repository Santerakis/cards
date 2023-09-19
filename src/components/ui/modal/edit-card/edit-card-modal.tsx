import { FC, ReactNode, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, ControlledFileInput, ControlledTextField, Select, Typography } from '@/components'
import { Modal } from '@/components/ui/modal'
import { cardSchema } from '@/components/ui/modal/add-new-card/add-new-card.ts'

export type EditCardModalPropsType = {
  children?: ReactNode
  question: string
  answer: string
  onSubmit?: (data: Form) => void
  isOpen?: boolean
  setIsOpen?: (isOpen: boolean) => void
  questionImg?: string
  answerImg?: string
}
type Form = z.infer<typeof cardSchema>

export const EditCardModal: FC<EditCardModalPropsType> = props => {
  const { children, onSubmit, question, answer, setIsOpen, isOpen, questionImg, answerImg } = props
  const [type, setType] = useState<string>('Text')
  const { handleSubmit, control } = useForm<Form>({
    resolver: zodResolver(cardSchema),
    mode: 'onSubmit',
    values: {
      question: question,
      answer: answer,
    },
  })

  const onSubmitForm = handleSubmit(data => {
    onSubmit &&
      onSubmit({
        question: data.question,
        answer: data.answer,
        questionImg: data.questionImg,
        answerImg: data.answerImg,
      })
    setIsOpen && setIsOpen(false)
  })

  const setIsOpenHandler = () => {
    setIsOpen && setIsOpen(false)
  }

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
        <ControlledFileInput
          name={'questionImg'}
          withPreview
          control={control}
          variant={'large'}
          cover={questionImg}
        >
          {onClick => (
            <Button type={'button'} variant={'secondary'} onClick={onClick}>
              Change cover
            </Button>
          )}
        </ControlledFileInput>
        <ControlledFileInput
          name={'answerImg'}
          withPreview
          control={control}
          variant={'large'}
          cover={answerImg}
        >
          {onClick => (
            <Button type={'button'} variant={'secondary'} onClick={onClick}>
              Change cover
            </Button>
          )}
        </ControlledFileInput>
      </>
    )

  return (
    <Modal.Root title={'Edit Card'} trigger={children} onOpenChange={setIsOpen} isOpen={isOpen}>
      <form onSubmit={onSubmitForm}>
        <Modal.Body>
          <Select
            items={['Text', 'Picture']}
            label={'Choose a question format'}
            value={type}
            placeholder={type}
            onChange={value => setType(value)}
            fullWidth
          />
          {questionType}
        </Modal.Body>
        <Modal.Footer>
          <Button variant={'primary'} type={'submit'}>
            <Typography variant={'subtitle2'}>Save Changes</Typography>
          </Button>
          <Button variant={'secondary'} onClick={setIsOpenHandler}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Root>
  )
}
