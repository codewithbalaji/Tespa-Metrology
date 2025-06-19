import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "child_process";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'generate-sitemap',
      closeBundle() {
        if (mode !== 'development') {
          console.log('Generating sitemap...');
          try {
            execSync('node generate-sitemap.js', { stdio: 'inherit' });
            console.log('Sitemap generated successfully!');
          } catch (error) {
            console.error('Failed to generate sitemap:', error);
          }
        }
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
