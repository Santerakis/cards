export type Paginated<T> = {
  pagination: Pagination
  items: T[]
}
export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}
export type GetArgs<T extends Record<string, any> = {}> = {
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
} & T
export type Nullable<T> = T | null
