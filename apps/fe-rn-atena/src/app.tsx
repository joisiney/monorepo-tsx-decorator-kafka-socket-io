import {
  Inter_300Light,
  Inter_500Medium,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
export function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    Inter_300Light,
    Inter_500Medium,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }
  return (
    <View className="mt-8 px-2 bg-orange-50">
      <Text className="text-2xl font-interblack text-black dark:text-white">
        Open up App.js to start working on your app
      </Text>
      <Text className="text-2xl font-interbold text-black dark:text-white">
        Open up App.js to start working on your app
      </Text>
      <Text className="text-2xl font-interregular text-black dark:text-white">
        Open up App.js to start working on your app
      </Text>
      <StatusBar style="auto" />
    </View>
  )
}
