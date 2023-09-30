import { RootState } from '@/app/store.ts'

export const selectCardsPage = (state: RootState) => state.cardsParams.page
export const selectCardsPageSize = (state: RootState) => state.cardsParams.pageSize
export const selectCardsSort = (state: RootState) => state.cardsParams.sort
export const selectCardsOrderBy = (state: RootState) => state.cardsParams.orderBy
export const selectCardNameToSearch = (state: RootState) => state.cardsParams.nameToSearch
