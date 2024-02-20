import { isAndroid, isIphone } from '@/utils/is/device'
import imgBg from '@assets/background.png'
import classNames from 'classnames'
import { styled } from 'nativewind'
import { FlatList, ImageBackground, View } from 'react-native'

import { EmptyStateList } from '@/components/empty-state'
import { HeaderList } from '@/components/header-list'
import { InputList } from '@/components/input-list'
import { ItemList } from '@/components/item-list'
import { Loading } from '@/components/loading'
import { ITemplateListCrud } from './index.dto'
import { Styl } from './index.styl'

const Bg = styled(ImageBackground)
export function TemplateListCrud<
  T extends { id: string | number; title: string },
>({
  total,
  data,
  isLoading,
  handleInfiniteScroll,
  handleAdd,
  handleUpdateTitle,
  handleDelete,
  headerTitle,
}: ITemplateListCrud<T>) {
  return (
    <Bg className="flex-1" source={imgBg} resizeMode="repeat">
      <View
        className={classNames('flex-1', {
          'mt-12': isIphone,
          'mt-6': isAndroid,
        })}
      >
        <HeaderList total={total} title={headerTitle} />
        <InputList handleAdd={handleAdd} />
        <FlatList
          data={data}
          keyExtractor={(item, index) =>
            `item-${item.id}-${item.title}-index-${index}`
          }
          contentContainerStyle={{ paddingBottom: 24 }}
          onEndReached={handleInfiniteScroll}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<Loading isLoading={isLoading} />}
          renderItem={({ item, index }) => (
            <ItemList
              key={`item-${item.id}-${item.title}-index-${index}`}
              title={item.title ?? ''}
              id={item.id}
              handleRemove={() => handleDelete(item.id)}
              handleUpdateTitle={handleUpdateTitle(item)}
            />
          )}
          ListEmptyComponent={<EmptyStateList />}
          style={Styl.flatList}
        />
      </View>
    </Bg>
  )
}
