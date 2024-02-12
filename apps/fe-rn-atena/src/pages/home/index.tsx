import { AppNewsEntity } from '@/@core/domain/entities/news.entity'
import { Header } from '@/components/home/header'
import { HomeInput } from '@/components/home/input'
import { List } from '@/components/home/list'
import { useAllNews } from '@olympus/gateway-eros'
import { IPagination } from '@olympus/lib-hera'

import { FC, useCallback, useRef, useState } from 'react'
import { Alert } from 'react-native'
export const PageHome: FC = () => {
  const [itemView, setItemView] = useState<AppNewsEntity[]>([])
  const isLastPageRef = useRef<any | undefined>()
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
  } = useAllNews<IPagination.Hydrate<any>, IPagination.Hydrate<AppNewsEntity>>({
    transformData: (result) => {
      isLastPageRef.current = result.page >= result.pages

      result.data = result.data.map((item) => new AppNewsEntity(item))
      return result
    },
    select: ({
      pages,
    }: {
      pageParams: number
      pages: IPagination.Hydrate<AppNewsEntity>[]
    }) => pages.map((item) => item.data).flat(),
  })
  const isLoading = isFetchingNextPage || isFetchingPreviousPage

  const handleAdd = useCallback(
    (newTaskTitle: string) => {
      const hasTodo = itemView.findIndex((item) =>
        item.hasUniqueTitle(newTaskTitle),
      )
      if (hasTodo === -1) {
        const newTask = new AppNewsEntity({
          title: newTaskTitle,
          description: `Descrição ${newTaskTitle}`,
          content: `Conteúdo ${newTaskTitle}`,
          thumbnail: `https://api.lorem.space/image/face?w=100&h=100&data=${newTaskTitle}`,
        })
        setItemView([...itemView, newTask])
      } else {
        Alert.alert(
          'Item já cadastrada',
          'Você não pode cadastrar um item com o mesmo nome',
        )
      }
    },
    [itemView],
  )

  const handleUpdateTitle = useCallback(
    (title: string, id: string) => {
      const index = itemView.findIndex((item) => item.id === id)
      if (index !== -1) {
        setItemView((prev) => {
          const newItem = new AppNewsEntity({ ...prev[index].db, title })
          const clone = [...prev]
          clone.splice(index, 1, newItem)
          return clone
        })
        return
      }
      Alert.alert('Erro ao deletar', 'Não foi possível editar o item')
    },
    [itemView],
  )

  const handleDelete = useCallback(
    (itemDelete: AppNewsEntity) => {
      const index = itemView.findIndex((item) => item.id === itemDelete.id)
      if (index !== -1) {
        setItemView((prev) => {
          const clone = [...prev]
          clone.splice(index, 1)
          return clone
        })
        return
      }
      Alert.alert('Erro ao deletar', 'Não foi possível deletar o item')
    },
    [itemView],
  )

  const handleInfiniteScroll = useCallback(() => {
    if (!isLoading && hasNextPage && !isLastPageRef.current) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isLoading])
  return (
    <>
      <Header total={itemView.length} />
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
