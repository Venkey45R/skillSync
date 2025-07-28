import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remove externalization of common npm packages like @react-oauth/google and lucide-react
  // These should be bundled with the application.
  build: {
    rollupOptions: {
      // The 'external' array should typically only contain truly external dependencies,
      // like those loaded from a CDN or provided by the host environment.
      // For npm packages, they generally need to be bundled.
      external: [], // This array should be empty or contain only truly external libraries.
    },
  },
});
