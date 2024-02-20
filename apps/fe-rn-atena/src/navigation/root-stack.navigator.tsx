import { RootLayout } from '@/layout/root.layout'
import { NewsPage } from '@/pages/news'
import { UserPage } from '@/pages/user'

import { PageWelcome } from '@/pages/welcome'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'

const Root = createNativeStackNavigator()

export function App() {
  return (
    <RootLayout>
      <NavigationContainer>
        <Root.Navigator screenOptions={{ headerShown: false }}>
          <Root.Screen name="welcome" component={PageWelcome} />
          <Root.Screen name="user" component={UserPage} />
          <Root.Screen name="news" component={NewsPage} />
        </Root.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor="black" style="light" />
    </RootLayout>
  )
}
