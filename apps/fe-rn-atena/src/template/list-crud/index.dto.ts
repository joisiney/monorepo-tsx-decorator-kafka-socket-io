export interface ITemplateListCrud<T> {
  total: number
  headerTitle: string
  data: T[]
  isLoading: boolean
  handleInfiniteScroll: () => void
  handleAdd: (newTaskTitle: string) => Promise<void>
  handleUpdateTitle: (
    dataUpdated: T,
  ) => (title: string, id: string | number) => Promise<void>
  handleDelete: (id: string | number) => Promise<void>
}
