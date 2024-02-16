import { Platform } from 'react-native'

const isAndroid = Platform.OS === 'android'
class EnvVars {
  public baseURLApolo: string
  constructor() {
    this.baseURLApolo = (
      isAndroid
        ? process.env.EXPO_PUBLIC_APOLO_API_URL_ANDROID
        : process.env.EXPO_PUBLIC_APOLO_API_URL_IOS
    ) as string
    if (!this.baseURLApolo) {
      throw new Error(
        '[.env failed] The environment variable was not defined EXPO_PUBLIC_APOLO_API_URL_ANDROID or EXPO_PUBLIC_APOLO_API_URL_IOS',
      )
    }
  }
}
export default new EnvVars()
