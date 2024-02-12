import { AppNewsEntity } from '@/@core/domain/entities/news.entity'
import { queryClient, useCreateNews } from '@olympus/gateway-eros'
import { useCallback } from 'react'

export const useCreateService = () => {
  const createNewsService = useCreateNews()
  const handleAdd = useCallback(
    async (newTaskTitle: string) => {
      const newTask = new AppNewsEntity({
        title: newTaskTitle,
        description: `Descrição ${newTaskTitle}`,
        content: `Conteúdo ${newTaskTitle}`,
        thumbnail: `https://api.lorem.space/image/face?w=100&h=100&data=${newTaskTitle}`,
      })
      await createNewsService.mutate(newTask.toCreate())
      queryClient.setQueryData(['/olympus/news'], ({ pageParams, pages }) => {
        const lastedIndicePage = pages.length - 1
        const lastedPage = pages[lastedIndicePage]
        const cloneLastedPage = { ...lastedPage, data: [...lastedPage.data] }
        cloneLastedPage.data.push(newTask)
        const clone = [...pages]
        clone[lastedIndicePage] = cloneLastedPage
        return {
          pages: clone,
          pageParams: [...pageParams],
        }
      })
    },
    [createNewsService],
  )
  return { handleAdd }
}
