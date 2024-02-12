import { AppNewsEntity } from '@/@core/domain/entities/news.entity'
import { FC } from 'react'
import { FlatList } from 'react-native'
import { EmptyState } from './empty-state'
import { HomeItem } from './item'
export const List: FC<{
  data: AppNewsEntity[]
  handleDelete: (itemDelete: AppNewsEntity) => void
  handleUpdateTitle: (title: string, id: string) => void
}> = ({ data, handleDelete, handleUpdateTitle }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <HomeItem
            key={item.id}
            item={item}
            handleRemove={() => handleDelete(item)}
            handleUpdateTitle={handleUpdateTitle}
          />
        )
      }}
      ListEmptyComponent={<EmptyState />}
      style={{
        marginTop: 32,
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
      }}
    />
  )
}
