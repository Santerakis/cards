import { commonApi } from '@/services/common/common.api.ts'
import { GetArgs, Paginated } from '@/services/common/common.api.types.ts'
import {
  ArgCreateCard,
  ArgCreateDeck,
  ArgGradeUpdate,
  ArgUpdateDeck,
  Card,
  CardsParams,
  Deck,
  DecksParams,
  GetDeckType,
  LearnCard,
} from '@/services/decks/decks.api.types.ts'

export const decksAPI = commonApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<Paginated<Deck> & { maxCardsCount: number }, GetArgs<DecksParams>>({
      query: params => ({
        method: 'GET',
        url: 'v1/decks',
        params: params ?? undefined,
      }),
      providesTags: ['UPDATE_DECKS'],
    }),
    getCards: builder.query<Paginated<Card>, GetArgs<CardsParams>>({
      query: ({ id, ...rest }) => ({
        method: 'GET',
        url: `/v1/decks/${id}/cards`,
        params: { ...rest },
      }),
      providesTags: ['UPDATE_CARDS'],
    }),
    getDeck: builder.query<GetDeckType, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/decks/${id}`,
      }),
    }),
    learnCard: builder.query<LearnCard, { id: string }>({
      query: ({ id }) => ({
        method: 'GET',
        url: `v1/decks/${id}/learn`,
      }),
    }),
    createDeck: builder.mutation<Deck, ArgCreateDeck>({
      query: body => {
        return {
          method: 'POST',
          url: '/v1/decks',
          body,
        }
      },
      invalidatesTags: ['UPDATE_DECKS'],
    }),
    removeDeck: builder.mutation<Omit<Deck, 'author'>, { id: string }>({
      query: params => ({
        method: 'DELETE',
        url: `v1/decks/${params.id}`,
      }),
      invalidatesTags: ['UPDATE_DECKS'],
    }),
    updateDeck: builder.mutation<Deck, ArgUpdateDeck>({
      query: data => {
        return {
          method: 'PATCH',
          url: `/v1/decks/${data.id}`,
          body: data.formData,
        }
      },
      invalidatesTags: ['UPDATE_DECKS'],
    }),
    createCard: builder.mutation<Card, ArgCreateCard>({
      query: ({ id, ...body }) => {
        return {
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
          body: body.formData,
        }
      },
      invalidatesTags: ['UPDATE_CARDS'],
    }),
    updateCardGrade: builder.mutation<Card, ArgGradeUpdate>({
      query: ({ id, ...body }) => ({
        method: 'POST',
        url: `/v1/decks/${id}/learn`,
        body,
      }),

      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled

        dispatch(
          decksAPI.util.updateQueryData('learnCard', { id }, () => {
            return res.data
          })
        )
      },
    }),
  }),
  overrideExisting: true,
})

export const {
  useLearnCardQuery,
  useUpdateDeckMutation,
  useGetDecksQuery,
  useCreateDeckMutation,
  useRemoveDeckMutation,
  useGetDeckQuery,
  useGetCardsQuery,
  useCreateCardMutation,
  useUpdateCardGradeMutation,
} = decksAPI
