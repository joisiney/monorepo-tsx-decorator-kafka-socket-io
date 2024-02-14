import { FC } from 'react'
import { Text, View } from 'react-native'

export const Header: FC<{ total: number }> = ({ total }) => {
  return (
    <View className="w-full h-14 justify-betweenflex flex-row px-6">
      <View className="flex justify-center">
        <Text className="text-lg font-interblack text-neutral-900">
          OLYMPUS.NEWS
        </Text>
      </View>
      {total > 0 ? (
        <View className="flex-1 flex-row justify-end items-center">
          <Text className="text-base font-interregular text-neutral-900">
            Você tem
          </Text>
          <Text className="text-base font-interbold text-neutral-900">
            {' '}
            {total} notícias
          </Text>
        </View>
      ) : (
        <View className="flex-1 flex-row justify-end items-center">
          <Text className="text-base font-interregular text-neutral-900">
            Você não tem notícias
          </Text>
        </View>
      )}
    </View>
  )
}
