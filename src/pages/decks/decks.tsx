import { ChangeEvent, FC, useEffect, useState } from 'react'

import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'

import s from './decks.module.scss'

import { useAppDispatch, useAppSelector } from '@/app/hooks.ts'
import { EditIcon, PlayIcon } from '@/assets'
import DeleteIcon from '@/assets/icons/DeleteIcon.tsx'
import {
  Button,
  CreateDeck,
  DeleteDialog,
  Page,
  Pagination,
  Sort,
  Table,
  TextField,
  Typography,
} from '@/components'
import { EditDeckModal } from '@/components/ui/modal/edit-pack-modal/edit-deck-modal.tsx'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { columns } from '@/pages/decks/columns.ts'
import { useGetMeQuery } from '@/services/auth/auth.api.ts'
import {
  useCreateDeckMutation,
  useGetDecksQuery,
  useRemoveDeckMutation,
  useUpdateDeckMutation,
} from '@/services/decks/decks.api.ts'
import { Deck } from '@/services/decks/decks.api.types.ts'
import {
  selectDeckNameToSearch,
  selectDecksOrderBy,
  selectDecksPage,
  selectDecksPageSize,
  selectDecksSort,
  selectIsMyDecks,
} from '@/services/decks/decks.params.selectors.ts'
import { decksActions } from '@/services/decks/decks.params.slice.ts'

type PacksProps = {}
export const Decks: FC<PacksProps> = () => {
  const dispatch = useAppDispatch()
  const { data: me } = useGetMeQuery()
  const myID = me?.id ? me?.id : ''
  const myDecks = useAppSelector(selectIsMyDecks)
  const setMyDecks = (isMy: string) => {
    dispatch(decksActions.setIsMyDeck({ isMy }))
  }
  const page = useAppSelector(selectDecksPage)
  const setPage = (page: number) => {
    dispatch(decksActions.setPage({ page }))
  }
  const pageSize = useAppSelector(selectDecksPageSize)
  const setPageSize = (pageSize: string) => {
    dispatch(decksActions.setPageSize({ pageSize }))
  }
  const sort = useAppSelector(selectDecksSort)
  const orderBy = useAppSelector(selectDecksOrderBy)

  const setSort = (sort: Sort) => {
    dispatch(decksActions.setSort({ sort }))
    dispatch(
      decksActions.setOrderBy({ orderBy: sort ? `${sort?.columnKey}-${sort?.direction}` : '' })
    )
  }

  const nameToSearch = useAppSelector(selectDeckNameToSearch)
  const setNameToSearch = (name: string) => {
    dispatch(decksActions.setNameToSearch({ name }))
  }
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100])
  const [debouncedSliderValue, setDebouncedSliderValue] = useState<[number, number]>([0, 100])
  const [selectedDeck, setSelectedDeck] = useState<Deck>({} as Deck)
  const [isOpenEditDeck, setIsOpenEditDeck] = useState<boolean>(false)
  const [isOpenDeleteDeck, setIsOpenDeleteDeck] = useState<boolean>(false)
  const debouncedNameToSearch = useDebounce<string>(nameToSearch, 800)
  const navigate = useNavigate()
  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [removeDeck] = useRemoveDeckMutation()
  const { data } = useGetDecksQuery({
    name: debouncedNameToSearch,
    authorId: myDecks,
    currentPage: page,
    itemsPerPage: +pageSize,
    orderBy: orderBy ?? '',
    minCardsCount: `${debouncedSliderValue[0]}`,
    maxCardsCount: `${debouncedSliderValue[1]}`,
  })

  const maxCardsCount = data ? data.maxCardsCount : 100
  const totalDecks = data ? data.pagination.totalItems : 0
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameToSearch(e.currentTarget.value)
  }
  const clearFilters = () => {
    setPage(1)
    setMyDecks('')
    setNameToSearch('')
    setSliderValue([0, maxCardsCount])
    setDebouncedSliderValue([0, maxCardsCount])
  }
  const removeDeckHandler = () => {
    debugger
    removeDeck({ id: selectedDeck.id })
  }

  const cNames = {
    container: clsx(s.container, 'container'),
    title: clsx(s.pageTitle),
    root: clsx(s.wrapper),
    image: clsx(s.image),
    imageContainer: clsx(s.imageContainer),
    actions: clsx(s.actions),
  }

  useEffect(() => {
    setSliderValue([0, maxCardsCount])
    setDebouncedSliderValue([0, maxCardsCount])
  }, [data?.maxCardsCount])

  const tableRows = data?.items.map(deck => {
    const onClickEditHandler = () => {
      setSelectedDeck(deck)
      setIsOpenEditDeck(true)
    }
    const onClickDeleteHandler = () => {
      setSelectedDeck(deck)
      setIsOpenDeleteDeck(true)
    }

    return (
      <Table.Row key={deck.id} className={s.row}>
        <Table.DataCell>
          <div className={cNames.imageContainer} onClick={() => navigate(`/cards/${deck.id}`)}>
            {deck.cover && (
              <div className={cNames.image} style={{ backgroundImage: `url(${deck.cover})` }} />
            )}
            {deck.name}
          </div>
        </Table.DataCell>
        <Table.DataCell>{deck.cardsCount}</Table.DataCell>
        <Table.DataCell>{new Date(deck.updated).toLocaleString('en-Gb')}</Table.DataCell>
        <Table.DataCell>{deck.author.name}</Table.DataCell>
        <Table.DataCell>
          <div className={cNames.actions}>
            <button onClick={() => navigate(`/learn/${deck.id}`)}>
              <PlayIcon />
            </button>
            {myID === deck.author.id && (
              <>
                <button onClick={onClickEditHandler}>
                  <EditIcon />
                </button>
                <button onClick={onClickDeleteHandler}>
                  <DeleteIcon />
                </button>
              </>
            )}
          </div>
        </Table.DataCell>
      </Table.Row>
    )
  })

  return (
    <Page>
      <EditDeckModal
        trigger={<></>}
        onSubmit={({ cover, name, isPrivate }) => {
          const form = new FormData()

          form.append('name', name)
          form.append('isPrivate', String(isPrivate))
          form.append('cover', cover)
          updateDeck({ id: selectedDeck.id, formData: form })
        }}
        isPrivate={selectedDeck.isPrivate}
        packName={selectedDeck.name}
        cover={selectedDeck.cover ?? ''}
        isOpenEditDeck={isOpenEditDeck}
        setIsOpenEditDeck={setIsOpenEditDeck}
      />

      <DeleteDialog
        buttonTitle={'Delete Pack'}
        onClick={removeDeckHandler}
        title={'Delete Deck'}
        bodyMessage={`Do you really want to delete "${selectedDeck.name}" deck?`}
        isOpen={isOpenDeleteDeck}
        setIsOpen={setIsOpenDeleteDeck}
      />
      <div className={cNames.container}>
        <div className={cNames.title}>
          <Typography variant={'large'}>Pack list</Typography>
          <CreateDeck trigger={<Button>Create Deck</Button>} onSubmit={createDeck} />
        </div>

        <div className={cNames.root}>
          <TextField
            onChange={onValueChange}
            title={''}
            inputType={'search'}
            placeholder={'Input search'}
            className={s.text_field}
            value={nameToSearch}
          />
          <Tabs
            defaultValue={''}
            tabs={[
              { tabName: 'MY', value: myID },
              { tabName: 'ALL', value: '' },
            ]}
            label={'Show decks'}
            value={myDecks}
            onValueChange={setMyDecks}
          />
          <Slider
            max={data?.maxCardsCount}
            onValueCommit={setDebouncedSliderValue}
            onChange={setSliderValue}
            label={'Number of cards'}
            className={s.slider}
            value={sliderValue}
            maxValue={sliderValue[1]}
            minValue={sliderValue[0]}
          />
          <Button variant={'secondary'} className={s.btn} onClick={clearFilters}>
            <DeleteIcon />
            <Typography variant={'subtitle2'}>Clear Filter</Typography>
          </Button>
        </div>

        <Table.Root>
          <Table.Head sort={sort} onSort={setSort} columns={columns}></Table.Head>
          <Table.Body>{tableRows}</Table.Body>
        </Table.Root>

        <Pagination
          currentPage={page}
          totalCount={totalDecks}
          pageSize={+pageSize}
          siblingCount={3}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </Page>
  )
}
