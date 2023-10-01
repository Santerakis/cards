import { RootState } from '@/app/store.ts'

export const selectDecksPage = (state: RootState) => state.decksParams.page
export const selectDecksPageSize = (state: RootState) => state.decksParams.pageSize
export const selectDecksSort = (state: RootState) => state.decksParams.sort
export const selectDecksOrderBy = (state: RootState) => state.decksParams.orderBy
export const selectDeckNameToSearch = (state: RootState) => state.decksParams.nameToSearch
export const selectMinSlider = (state: RootState) => state.decksParams.minSlider
export const selectMaxSlider = (state: RootState) => state.decksParams.maxSlider
export const selectIsMyDecks = (state: RootState) => state.decksParams.isMyDecks
