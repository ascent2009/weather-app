import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    hmr: { overlay: false },
  },
  // build: {
  //   outDir: "build", // Specify the output directory
  //   sourcemap: true, // Generate source maps for debugging
  //   minify: "esbuild", // Use esbuild for minification
  // },
});
