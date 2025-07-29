import tailwindcss from "@tailwindcss/vite";
import { ViteToml } from "vite-plugin-toml";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  autoIcons: {
    baseIconPath: "./assets/img/icon-default.svg",
    grayscaleOnDevelopment: false,
  },
  manifest: {
    permissions: ["storage"],
  },
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  vite: () => ({
    plugins: [ViteToml(), tailwindcss()],
  }),
});
