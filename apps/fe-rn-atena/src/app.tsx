import {
  Inter_300Light,
  Inter_500Medium,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter'
import { ContextReactQuery } from '@olympus/gateway-eros'
import classNames from 'classnames'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native'
import imgBg from '../assets/background.png'
import { PageHome } from './pages/home'

const hehavior = Platform.OS === 'ios' ? 'padding' : undefined

const Bg = styled(ImageBackground)
const KeyboardView = styled(KeyboardAvoidingView)

export function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    Inter_300Light,
    Inter_500Medium,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }
  const isAndroid = Platform.OS === 'android'
  return (
    <ContextReactQuery baseUrl={process.env.EXPO_PUBLIC_APOLO_API_URL}>
      <KeyboardView className="flex-1" behavior={hehavior} enabled>
        <Bg className="flex-1" source={imgBg} resizeMode="repeat">
          <View
            className={classNames('flex-1', {
              'mt-12': !isAndroid,
              'mt-6': isAndroid,
            })}
          >
            <PageHome />
            <StatusBar backgroundColor="black" style="light" />
          </View>
        </Bg>
      </KeyboardView>
    </ContextReactQuery>
  )
}
