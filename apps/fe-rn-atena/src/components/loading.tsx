import { FC } from 'react'
import { ActivityIndicator, View } from 'react-native'

export const Loading: FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null
  return (
    <View>
      <ActivityIndicator />
    </View>
  )
}
