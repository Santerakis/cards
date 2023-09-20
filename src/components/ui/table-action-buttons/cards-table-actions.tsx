import { FC } from 'react'

import s from './table-action-buttons.module.scss'

import { DeleteIcon, EditIcon } from '@/assets'
import { DeleteDialog } from '@/components/ui/modal/delete-dialog/delete-dialog.tsx'
import { EditCardModal } from '@/components/ui/modal/edit-card'
import { useDeleteCardMutation, useUpdateCardMutation } from '@/services/cards/cards.api.ts'
import { Card } from '@/services/decks/decks.api.types.ts'

type Props = {
  item: Card
}
export const CardsTableActions: FC<Props> = ({ item }) => {
  const [deleteCard] = useDeleteCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const { id, answer, question } = item
  const onClickHandler = () => {
    deleteCard({ id })
  }

  return (
    <div className={s.container}>
      <EditCardModal
        question={question}
        answer={answer}
        onSubmit={data => updateCard({ id, ...data })}
      >
        <button>
          <EditIcon />
        </button>
      </EditCardModal>

      <DeleteDialog
        buttonTitle={'Delete Card'}
        onClick={onClickHandler}
        title={'Delete Card'}
        bodyMessage={`Do you really want to delete card?`}
        isOpen={false}
        setIsOpen={() => {}}
      >
        <button>
          <DeleteIcon />
        </button>
      </DeleteDialog>
    </div>
  )
}
