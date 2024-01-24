import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'Replant World',
        short_name: 'Replant',
        description:
          'Mobile app for planters to capture and submit their planted trees for review.',
        theme_color: '#1b3233',
        background_color: '#ffffff',
        icons: [
          {
            src: 'squoosh-icon-x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'squoosh-icon-x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'squoosh-icon-x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'squoosh-icon-x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
