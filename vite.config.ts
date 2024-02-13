import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate'
  }), sentryVitePlugin({
    org: "dipsy",
    project: "old-calendar"
  })],

  base: '/old-calendar/',

  build: {
    sourcemap: true
  }
})