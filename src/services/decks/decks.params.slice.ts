import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/components'

const initialState = {
  page: 1,
  pageSize: '7',
  sort: {} as Sort,
  orderBy: '',
  nameToSearch: '',
  minSlider: 0,
  maxSlider: 100,
  isMyDecks: '',
}

const slice = createSlice({
  name: 'decksParams',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page
    },
    setPageSize: (state, action: PayloadAction<{ pageSize: string }>) => {
      state.pageSize = action.payload.pageSize
    },
    setSort: (state, action: PayloadAction<{ sort: Sort }>) => {
      state.sort = action.payload.sort
    },
    setOrderBy: (state, action: PayloadAction<{ orderBy: string }>) => {
      state.orderBy = action.payload.orderBy
    },
    setNameToSearch: (state, action: PayloadAction<{ name: string }>) => {
      state.nameToSearch = action.payload.name
    },
    setMinSlider: (state, action: PayloadAction<{ value: number }>) => {
      state.minSlider = action.payload.value
    },
    setMaxSlider: (state, action: PayloadAction<{ value: number }>) => {
      state.maxSlider = action.payload.value
    },
    setIsMyDeck: (state, action: PayloadAction<{ isMy: string }>) => {
      state.isMyDecks = action.payload.isMy
    },
  },
})

export const decksReducer = slice.reducer
export const decksActions = slice.actions
