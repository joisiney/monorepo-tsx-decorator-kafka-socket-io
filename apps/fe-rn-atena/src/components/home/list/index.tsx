import { AppNewsEntity } from '@/@core/domain/entities/news.entity'
import { FC } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { EmptyState } from '../empty-state'
import { HomeItem } from '../item'
export const List: FC<{
  data: AppNewsEntity[]
  handleDelete: (itemDelete: AppNewsEntity) => void
  handleUpdateTitle: (title: string, id: string) => void
  handleInfiniteScroll: () => void
  isLoading: boolean
}> = ({
  data,
  isLoading,
  handleDelete,
  handleUpdateTitle,
  handleInfiniteScroll,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `item-${item.id}-index-${index}`}
      contentContainerStyle={{ paddingBottom: 24 }}
      onEndReached={handleInfiniteScroll}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={() => {
        if (!isLoading) return null
        return (
          <View>
            <ActivityIndicator />
          </View>
        )
      }}
      renderItem={({ item, index }) => {
        return (
          <HomeItem
            key={`item-${item.id}-index-${index}`}
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
