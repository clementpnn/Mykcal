import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"
import path from "node:path"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
