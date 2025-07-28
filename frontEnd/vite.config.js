import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add build configuration to externalize @react-oauth/google and lucide-react
  build: {
    rollupOptions: {
      external: ["@react-oauth/google", "lucide-react"], // Added 'lucide-react' here
    },
  },
});
