import react from '@vitejs/plugin-react'
import reactNative from 'vitest-react-native'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [reactNative() as any, react({ jsxRuntime: 'classic' })],
  test: {
    setupFiles: ['/packages/vitest-kairos/src/utils/setup.ts'],
    globals: true,
    testTimeout: 30000,
    root: '../../',
    coverage: {
      provider: 'v8',
      exclude: [
        '**/node_modules/**',
        'node_modules/**',
        '**/.expo/**',
        '.expo/**',
        '**/dist/**',
        'dist/**',
        'apps/be-demeter/**',
        'packages/lint-zeus/**',
        'packages/vitest-kairos/**',
        'packages/domain-ceos/**',
        'packages/gateway-eros/**',
        'packages/io-server-pluto/**',
        'packages/kafka-persefone/**',
        'packages/lib-hera/**',
        'packages/lint-zeus/**',
        '**/coverage/**',
        '**/controllers/**',
        '**/use-cases/**',
        '**/*.cjs',
        '**/*.dto.ts',
        '**/*.js',
        '**/infra/**',
        '**/@types/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/packages/vitest-kairos/src',
    },
  },
})
