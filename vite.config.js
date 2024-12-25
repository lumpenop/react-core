import path from 'path'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'

export default defineConfig({
  plugins: [
    babel({
      babelConfig: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                esmodules: true,
              },
              modules: false, // CommonJS 변환을 비활성화
            },
          ],
        ],
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              runtime: 'automatic',
              importSource: '@/src/utils/jsx',
            },
          ],
        ],
      },
    }),
  ],
  // ESM 관련 설정 추가
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['@babel/preset-env'],
  },
})
