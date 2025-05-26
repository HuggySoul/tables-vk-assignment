import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8080,
    watch: {
      usePolling: true, // Для HMR в Docker
      interval: 1500,
    },
  },
});
