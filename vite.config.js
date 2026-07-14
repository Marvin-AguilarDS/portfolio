import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
// https://vitejs.dev/config/
// `base` is the subpath the site is served from. On GitHub Pages a project site
// lives at /<repo>/, so production builds use '/portfolio/'. Dev stays at '/'.
// Override with the VITE_BASE env var if you rename the repo or use a custom domain.
export default defineConfig(function (_a) {
    var _b;
    var command = _a.command;
    return ({
        base: (_b = process.env.VITE_BASE) !== null && _b !== void 0 ? _b : (command === 'build' ? '/portfolio/' : '/'),
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            port: 5173,
            open: true,
        },
    });
});
