import { Header } from '@/components/home/header'
import { HomeInput } from '@/components/home/input'
import { List } from '@/components/home/list'
import { FC } from 'react'
import { useCreateService } from './hooks/create-service.hook'
import { useFindAllService } from './hooks/find-all-service.hook'
import { useRemoveService } from './hooks/remove-service.hook'
import { useUpdateService } from './hooks/update-service.hook'

export const PageHome: FC = () => {
  const { handleAdd } = useCreateService()
  const { total, data, isLoading, handleInfiniteScroll } = useFindAllService()
  const { handleUpdateTitle } = useUpdateService()
  const { handleDelete } = useRemoveService()

  return (
    <>
      <Header total={total} />
      <HomeInput handleAdd={handleAdd} />
      <List
        data={data ?? []}
        handleDelete={handleDelete}
        handleInfiniteScroll={handleInfiniteScroll}
        isLoading={isLoading}
        handleUpdateTitle={handleUpdateTitle}
      />
    </>
  )
}
