import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite' // 引入unocss
import { presetUno, presetAttributify, presetIcons } from "unocss" // 引入unocss预设

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), unocss({
    rules: [],
    presets: [presetUno(), presetAttributify(), presetIcons()],
  })],
})
