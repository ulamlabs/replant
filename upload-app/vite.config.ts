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
      includeAssets: ['/favicon-32x32.png', '/apple-touch-icon.png'],
      manifest: {
        name: 'Replant World',
        short_name: 'Replant World',
        description:
          'Capture, monitor and verify your tree planting with Poptech, Replant World’s proof of planting technology.',
        theme_color: '#1b3233',
        background_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: '/screenshot-dashboard.jpg',
            sizes: '360x740',
            type: 'image/jpeg',
            form_factor: 'narrow',
          },
          {
            src: '/screenshot-capture.jpg',
            sizes: '360x740',
            type: 'image/jpeg',
            form_factor: 'narrow',
          },
          {
            src: '/screenshot-dashboard-wide.jpg',
            sizes: '1024x768',
            type: 'image/jpeg',
            form_factor: 'wide',
          },
          {
            src: '/screenshot-capture-wide.jpg',
            sizes: '1024x768',
            type: 'image/jpeg',
            form_factor: 'wide',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{css,html,jpg,js,png,webp}'],
      },
    }),
  ],
});
