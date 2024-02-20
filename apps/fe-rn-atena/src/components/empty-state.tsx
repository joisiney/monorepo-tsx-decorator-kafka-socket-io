import emptyState from '@assets/empty-state.png'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'
export const EmptyStateList: FC = () => {
  return (
    <View className="w-full h-full items-center mt-20">
      <Image source={emptyState} alt="" />
      <Text className="text-lg font-interblack text-neutral-900">
        Você não tem nada para ler.
      </Text>
      <Text className="text-base font-interbold text-neutral-900 text-center px-6">
        Vá ler um livro ou clique em adicionar para adicionar uma notícia.
      </Text>
    </View>
  )
}
