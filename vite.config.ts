import { UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import unocss from "unocss/vite"; // 引入unocss
import { presetUno, presetAttributify, presetIcons } from "unocss"; // 引入unocss预设

// https://vitejs.dev/config/
export default (): UserConfigExport => {
  return {
    css: {
      // 配置全局scss变量
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/public/element.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      unocss({
        rules: [],
        presets: [presetUno(), presetAttributify(), presetIcons()],
      }),
    ],
    server: {
      port: 3000,
    },
  };
};
