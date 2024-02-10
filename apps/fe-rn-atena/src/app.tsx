import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export function App() {
  return (
    <View className="mt-8 px-2 bg-orange-50">
      <Text className="text-2xl text-black dark:text-white">
        Open up App.js to start working on your app
      </Text>
      <StatusBar style="auto" />
    </View>
  )
}
