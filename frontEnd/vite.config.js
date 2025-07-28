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
  // Removed custom Rollup plugin and optimizeDeps as they are no longer needed
});
