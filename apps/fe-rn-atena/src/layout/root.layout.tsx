import envVars from '@/utils/envVars'
import {
  Inter_300Light,
  Inter_500Medium,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter'
import { ContextReactQuery } from '@olympus/gateway-eros'
import { styled } from 'nativewind'
import { FC, ReactNode } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

const hehavior = Platform.OS === 'ios' ? 'padding' : undefined
const KeyboardView = styled(KeyboardAvoidingView)

export const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    Inter_300Light,
    Inter_500Medium,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }
  return (
    <ContextReactQuery baseUrl={envVars.baseURLApolo}>
      <KeyboardView className="flex-1" behavior={hehavior} enabled>
        {children}
      </KeyboardView>
    </ContextReactQuery>
  )
}
