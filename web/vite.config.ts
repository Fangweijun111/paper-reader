import vinext from "vinext";
import { defineConfig } from "vite";

// Portable Node.js reader. No private Sites project or Cloudflare account is needed.
export default defineConfig({ plugins: [vinext()] });
