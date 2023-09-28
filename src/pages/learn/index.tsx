import { useParams } from 'react-router-dom'

import { GradeType, LearnDeck, Page } from '@/components'
import {
  useGetDeckQuery,
  useLearnCardQuery,
  useUpdateCardGradeMutation,
} from '@/services/decks/decks.api.ts'

export const Learn = () => {
  const { id } = useParams()
  const { data: deck } = useGetDeckQuery({ id: id ?? '' })
  const [updateGrade] = useUpdateCardGradeMutation()
  const { data: randomCard } = useLearnCardQuery({ id: id ?? '' })

  return (
    <Page>
      {deck && randomCard && (
        <LearnDeck
          packName={deck.name}
          question={randomCard.question}
          attempts={randomCard.shots}
          answer={randomCard.answer}
          loadNextQuestion={data => {
            updateGrade({ id: deck.id, grade: +data as GradeType, cardId: randomCard.id })
          }}
        />
      )}
    </Page>
  )
}
