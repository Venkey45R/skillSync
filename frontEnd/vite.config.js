import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [], // Keep this empty
    },
  },
  // Removed optimizeDeps and resolve.alias as they might be interfering
  // Rely on default Vite/Rollup behavior for module resolution
});
