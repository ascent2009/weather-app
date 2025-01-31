import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    hmr: { overlay: false },
  },
  // build: {
  //   outDir: "build", // Specify the output directory
  //   sourcemap: true, // Generate source maps for debugging
  //   minify: "esbuild", // Use esbuild for minification
  // },
});
