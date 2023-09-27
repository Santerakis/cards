import { ChangeEvent, FC, useState } from 'react'

import { clsx } from 'clsx'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'

import s from './cards.module.scss'

import { useAppDispatch } from '@/app/hooks.ts'
import { ArrowLeftIcon, EditIcon } from '@/assets'
import DeleteIcon from '@/assets/icons/DeleteIcon.tsx'
import {
  Button,
  DeckEditMenu,
  DeleteDialog,
  Grade,
  GradeType,
  Page,
  Pagination,
  Sort,
  Table,
  TextField,
  Typography,
} from '@/components'
import { AddNewCard, CardForm } from '@/components/ui/modal/add-new-card'
import { EditCardModal } from '@/components/ui/modal/edit-card'
import { createFormData } from '@/helpers/createFormData.ts'
import { columns } from '@/pages/cards/table-columns.ts'
import { useGetMeQuery } from '@/services/auth/auth.api.ts'
import { useDeleteCardMutation, useUpdateCardMutation } from '@/services/cards/cards.api.ts'
import {
  selectCardNameToSearch,
  selectCardsOrderBy,
  selectCardsPage,
  selectCardsPageSize,
  selectCardsSort,
} from '@/services/cards/cards.params.selectors.ts'
import { cardsActions } from '@/services/cards/cards.params.slice.ts'
import {
  useCreateCardMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useUpdateCardGradeMutation,
} from '@/services/decks/decks.api.ts'
import { Card } from '@/services/decks/decks.api.types.ts'
type Props = {
  removeDeckHandler: () => void
}
export const Cards: FC<Props> = ({ removeDeckHandler }) => {
  const dispatch = useAppDispatch()

  const search = useSelector(selectCardNameToSearch)
  const setSearch = (name: string) => {
    dispatch(cardsActions.setNameToSearch({ name }))
  }
  const page = useSelector(selectCardsPage)
  const setPage = (page: number) => {
    dispatch(cardsActions.setPage({ page }))
  }
  const pageSize = useSelector(selectCardsPageSize)
  const setPageSize = (pageSize: string) => {
    dispatch(cardsActions.setPageSize({ pageSize }))
  }
  const debouncedNameToSearch = useDebounce<string>(search, 800)
  const sort = useSelector(selectCardsSort)
  const orderBy = useSelector(selectCardsOrderBy)
  const sortHandler = (sort: Sort) => {
    dispatch(cardsActions.setSort({ sort }))
    dispatch(
      cardsActions.setOrderBy({ orderBy: sort ? `${sort?.columnKey}-${sort?.direction}` : '' })
    )
  }
  const { id: deckIdFromParams } = useParams()
  const deckId = deckIdFromParams ?? ''
  const { data: deck } = useGetDeckQuery({ id: deckId })
  const { data: rawCards } = useGetCardsQuery({
    id: deckId,
    currentPage: page,
    itemsPerPage: +pageSize,
    answer: debouncedNameToSearch,
    orderBy,
  })

  const { data: me } = useGetMeQuery()
  const isMyDeck = me?.id === deck?.userId
  const [createCard] = useCreateCardMutation()
  const [updateGrade] = useUpdateCardGradeMutation()
  const isMyPack = me?.id === deck?.userId
  const currentPage = rawCards ? rawCards.pagination.currentPage : 1
  const totalCount = rawCards ? rawCards.pagination.totalItems : 0
  const pSize = rawCards ? rawCards.pagination.itemsPerPage : 0
  const preparedColumns = isMyDeck ? columns : columns.filter(column => column.key !== 'actions')
  const navigate = useNavigate()
  const [isOpenEditCard, setIsOpenEditCard] = useState<boolean>(false)
  const [selectedCard, setSelectedCard] = useState<Card>({} as Card)
  const [isOpenDeleteCard, setIsOpenDeleteCard] = useState<boolean>(false)
  const [deleteCard] = useDeleteCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const navigateBack = () => {
    navigate('/')
  }
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  const deckName = deck?.name ?? ''
  const cNames = {
    header: clsx(s.headerPage),
    textField: clsx(s.textField),
    back: clsx(s.back),
    wrapper: clsx(s.wrapper, 'container'),
    image: clsx(s.image),
    menu: clsx(s.menuSection),
    cardImg: clsx(s.cardImage),
    container: clsx(s.cardContainer),
    actions: clsx(s.actions),
  }

  const removeCardHandler = () => deleteCard({ id: selectedCard.id })

  const onAddCard = (data: CardForm) => {
    const formData = createFormData(data)

    createCard({ id: deckId, formData: formData })
  }

  const onEditCard = (data: CardForm) => {
    const formData = createFormData(data)

    updateCard({ id: selectedCard.id, data: formData })
  }

  const editMenu = isMyPack && (
    <DeckEditMenu onEdit={() => console.log('onEdit called')} onDelete={removeDeckHandler} />
  )
  const addCard = isMyPack && (
    <AddNewCard onSubmit={onAddCard}>
      <Button variant={'primary'}>Add New Card</Button>
    </AddNewCard>
  )
  const learnDeck = !isMyPack && (
    <Button variant={'primary'} as={'a'} href={`/learn/${deck?.id}`}>
      Learn to Deck
    </Button>
  )

  const cards = rawCards?.items.map(card => {
    const updateGradeHandler = (grade: GradeType) => {
      if (deckId) updateGrade({ id: deckId, grade, cardId: card.id })
    }
    const onClickEditHandler = () => {
      setSelectedCard(card)
      setIsOpenEditCard(true)
    }

    const onClickDeleteHandler = () => {
      setSelectedCard(card)
      setIsOpenDeleteCard(true)
    }

    return (
      <Table.Row key={card.id}>
        <Table.DataCell>
          {card.questionImg ? (
            <div className={cNames.container}>
              <div
                className={cNames.cardImg}
                style={{ backgroundImage: `url(${card.questionImg})` }}
              />
              {card.question}
            </div>
          ) : (
            <>{card.question}</>
          )}
        </Table.DataCell>
        <Table.DataCell>
          {card.answerImg ? (
            <div className={cNames.container}>
              <div
                className={cNames.cardImg}
                style={{ backgroundImage: `url(${card.answerImg})` }}
              />
              {card.answer}
            </div>
          ) : (
            <>{card.answer}</>
          )}
        </Table.DataCell>
        <Table.DataCell>{new Date(card.updated).toLocaleString('en-Gb')}</Table.DataCell>
        <Table.DataCell>
          <Grade onClick={updateGradeHandler} grade={card.grade} />
        </Table.DataCell>
        {isMyDeck && (
          <Table.DataCell>
            <div className={cNames.actions}>
              <button onClick={onClickEditHandler}>
                <EditIcon />
              </button>
              <button onClick={onClickDeleteHandler}>
                <DeleteIcon />
              </button>
            </div>
          </Table.DataCell>
        )}
      </Table.Row>
    )
  })

  return (
    <Page>
      <EditCardModal
        question={selectedCard.question}
        answer={selectedCard.answer}
        onSubmit={onEditCard}
        isOpen={isOpenEditCard}
        setIsOpen={setIsOpenEditCard}
      ></EditCardModal>
      <DeleteDialog
        title={'Delete Card'}
        bodyMessage={`Do you really want to delete "${selectedCard.question}"`}
        buttonTitle={'Delete Card'}
        onClick={removeCardHandler}
        isOpen={isOpenDeleteCard}
        setIsOpen={setIsOpenDeleteCard}
      />
      <div className={cNames.wrapper}>
        <Button variant={'link'} onClick={navigateBack}>
          <Typography variant={'body2'} className={cNames.back}>
            <ArrowLeftIcon /> Back to Packs List
          </Typography>
        </Button>
        <div className={cNames.header}>
          <div className={cNames.menu}>
            <Typography variant={'large'}>{deckName}</Typography>
            {editMenu}
          </div>
          {addCard}
          {learnDeck}
        </div>
        {deck?.cover && <img className={cNames.image} src={deck?.cover} alt="deck-cover" />}
        {deck?.cardsCount && (
          <>
            <TextField
              onChange={onValueChange}
              placeholder={'Input search'}
              inputType={'search'}
              className={cNames.textField}
            />
            <Table.Root className={s.tableRoot}>
              <Table.Head columns={preparedColumns} sort={sort} onSort={sortHandler} />
              <Table.Body>{cards}</Table.Body>
            </Table.Root>
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pSize}
              siblingCount={3}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </>
        )}
      </div>
    </Page>
  )
}
