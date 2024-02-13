import react from "@vitejs/plugin-react";
import reactNative from "vitest-react-native";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [reactNative() as any, react({ jsxRuntime: 'classic' })],
    test: {
        setupFiles: ['src/utils/setup.ts'],
        globals: true,
        testTimeout: 30000,
      },
});