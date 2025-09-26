import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: mode === "development" ? {
      "/submit-order": {
        target: `http://localhost:${process.env.SERVER_PORT || 3000}`,
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: `http://localhost:${process.env.SERVER_PORT || 3000}`,
        changeOrigin: true,
        secure: false,
      },
    } : {},
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
