import { GradeType } from '@/components'
import { Nullable } from '@/services/common/common.api.types.ts'

export type Author = {
  id: string
  name: string
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type GetDeckType = Omit<Deck, 'author'>

export type Decks = Deck[]
export type DecksParams = {
  minCardsCount?: string
  maxCardsCount?: string
  name?: string
  authorId?: string
}
export type ArgCreateDeck = FormData
export type ArgUpdateDeck = { formData: ArgCreateDeck; id: string }
export type CardsParams = {
  id: string
  question?: Nullable<string>
  answer?: Nullable<string>
}

export type ArgCreateCard = { formData: FormData; id: string }
//   id: string
//   question: string
//   answer: string
//   questionImg?: string
//   answerImg?: string
//   questionVideo?: string
//   answerVideo?: string
// }

export type Card = {
  userId: string
  shots: number
  comments?: any
  type?: any
  rating: number
  moreId?: any
  grade: GradeType
} & LearnCard
export type ArgGradeUpdate = {
  id: string
  cardId: string
  grade: GradeType
}
export type LearnCard = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
}
