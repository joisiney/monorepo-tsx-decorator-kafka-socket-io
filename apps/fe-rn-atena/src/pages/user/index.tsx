import { TemplateListCrud } from '@/template/list-crud'
import { FC } from 'react'
import { useCreateService } from './hooks/create-service.hook'
import { useFindAllService } from './hooks/find-all-service.hook'
import { useRemoveService } from './hooks/remove-service.hook'
import { useUpdateService } from './hooks/update-service.hook'

export const UserPage: FC = () => {
  const newsFindAllService = useFindAllService()
  const newsCreateService = useCreateService()
  const newsUpdateService = useUpdateService()
  const newsRemoveService = useRemoveService()
  return (
    <TemplateListCrud
      headerTitle="OLYMPUS.USER"
      {...newsFindAllService}
      {...newsCreateService}
      {...newsUpdateService}
      {...newsRemoveService}
    />
  )
}
