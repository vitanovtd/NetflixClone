import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return {
        root: path.resolve(__dirname, ""),
        build: {
            outDir: path.resolve(__dirname, "build")
        },
        server: {
            port: 3000
        },
        plugins: [react()],
        css: {
            devSourcemap: true
        }
    }
});
