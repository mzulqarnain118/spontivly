import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'

/* eslint-disable import/no-default-export */
export default defineConfig({
  // Depending on your application, base can also be "/"
  base: '',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    // This ensures that the browser opens upon server start
    open: true,
    // This sets a default port to 3000
    port: 3000
  }
})
