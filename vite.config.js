import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  root: "./src",
  resolve: {
    alias: {
      "@/": resolve(__dirname, "./src"),
      "@/app": resolve(__dirname, "./src/scripts/app"),
      "@/core": resolve(__dirname, "./src/scripts/core"),
      "@/core/ext": resolve(__dirname, "./src/scripts/core/extensions"),
      "@/infra": resolve(__dirname, "./src/scripts/infra"),
      "@/scenes": resolve(__dirname, "./src/scripts/scenes"),
    }
  },
  build: {
    outDir: "../docs",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "assets/[name].js"
      }
    }
  },
  server: {
    port: 8080
  }
});
