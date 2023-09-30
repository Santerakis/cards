import { ArgUpdateCard } from '@/services/cards/cards.api.types.ts'
import { commonApi } from '@/services/common/common.api.ts'
import { Card } from '@/services/decks/decks.api.types.ts'

export const cardsAPI = commonApi.injectEndpoints({
  endpoints: builder => ({
    getCard: builder.query<Card, { id: string }>({
      query: ({ id }) => ({
        url: `v1/cards/${id}`,
      }),
    }),
    updateCard: builder.mutation<Card, ArgUpdateCard>({
      query: ({ id, ...body }) => ({
        method: 'PATCH',
        url: `v1/cards/${id}`,
        body: body.data,
      }),
      invalidatesTags: ['UPDATE_CARDS'],
    }),
    deleteCard: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `v1/cards/${id}`,
      }),
      invalidatesTags: ['UPDATE_CARDS'],
    }),
  }),
})
export const { useGetCardQuery, useDeleteCardMutation, useUpdateCardMutation } = cardsAPI
