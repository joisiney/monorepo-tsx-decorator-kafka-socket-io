import {
  Inter_300Light,
  Inter_500Medium,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter'

import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'
import imgBg from '../assets/background.png'
import { PageHome } from './pages/home'
const Bg = styled(ImageBackground)
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
    <Bg className="flex-1" source={imgBg} resizeMode="repeat">
      <PageHome />
      <StatusBar backgroundColor="black" style="light" />
    </Bg>
  )
}
