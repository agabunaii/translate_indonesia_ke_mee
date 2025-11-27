import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import translateHandler from './api/translate.js';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const base = env.BASE_PATH || '/kamus-indonesia-suku-mee/';
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'local-api',
          configureServer(server) {
            server.middlewares.use((req, res, next) => {
              const u = req.url || '';
              if (u.startsWith('/api/translate')) {
                translateHandler(req, res);
                return;
              }
              next();
            });
          }
        }
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
  });
