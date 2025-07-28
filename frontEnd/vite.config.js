import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import 'path' module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [], // Keep this empty
    },
  },
  optimizeDeps: {
    include: ["@react-oauth/google", "lucide-react"],
  },
  // Add resolve alias to explicitly map the module
  resolve: {
    alias: {
      // Ensure this path is correct relative to your project root
      // '/app/node_modules/@react-oauth/google' is the path inside the Docker container
      "@react-oauth/google": path.resolve(
        __dirname,
        "node_modules/@react-oauth/google"
      ),
      "lucide-react": path.resolve(__dirname, "node_modules/lucide-react"),
    },
  },
});
