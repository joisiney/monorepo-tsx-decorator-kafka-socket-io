import { EnvVarsService } from '@olympus/fe-rn-atena/src/utils/envVars'
import { Platform } from 'react-native'

import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('EnvVars', () => {
  const envVars = {
    EXPO_PUBLIC_APOLO_API_URL_ANDROID: 'http://android-url',
    EXPO_PUBLIC_APOLO_API_URL_IOS: 'http://ios-url',
  }
  beforeEach(() => {
    process.env = {
      ...process.env,
      ...envVars,
    }
  })

  it.each([
    { os: 'android', url: envVars.EXPO_PUBLIC_APOLO_API_URL_ANDROID },
    { os: 'ios', url: envVars.EXPO_PUBLIC_APOLO_API_URL_IOS },
  ])('should return the correct URL', ({ os, url }) => {
    const sut = new EnvVarsService()
    vi.spyOn(Platform, 'OS', 'get').mockReturnValue(os as any)
    expect(sut.baseURLApolo).toBe(url)
  })
  it('should throw an error if the URL is not defined', () => {
    vi.spyOn(Platform, 'OS', 'get').mockReturnValue('android')
    process.env.EXPO_PUBLIC_APOLO_API_URL_ANDROID = undefined
    const sut = new EnvVarsService()
    expect(() => sut.baseURLApolo).toThrow(
      /The environment variable was not defined/gi,
    )
  })
})
