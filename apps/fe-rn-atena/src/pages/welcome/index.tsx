import { Button } from '@/components/button'
import { StackActions, useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { Text, View } from 'react-native'
export const PageWelcome: FC = () => {
  const navigation = useNavigation()
  return (
    <View className="flex-1 bg-white p-6" testID="welcome">
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-robotosemibold text-black">
          Bem-vindo!
        </Text>
      </View>

      <Button
        title="Crud notícias Socket.io/Kafka"
        onPress={() => navigation.dispatch(StackActions.push('news'))}
      />
      <Button
        title="Crud usuários"
        onPress={() => navigation.dispatch(StackActions.push('user'))}
      />
    </View>
  )
}
