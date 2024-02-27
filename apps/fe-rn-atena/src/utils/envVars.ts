import { Platform } from 'react-native'

export class EnvVarsService {
  private _baseURLApolo?: string
  public get baseURLApolo() {
    const isAndroid = Platform.OS === 'android'
    if (this._baseURLApolo) {
      return this._baseURLApolo
    }
    this._baseURLApolo = (
      isAndroid
        ? process.env.EXPO_PUBLIC_APOLO_API_URL_ANDROID
        : process.env.EXPO_PUBLIC_APOLO_API_URL_IOS
    ) as string
    if (!this._baseURLApolo) {
      throw new Error(
        '[.env failed] The environment variable was not defined EXPO_PUBLIC_APOLO_API_URL_ANDROID or EXPO_PUBLIC_APOLO_API_URL_IOS',
      )
    }
    return this._baseURLApolo
  }
}
export default new EnvVarsService()
