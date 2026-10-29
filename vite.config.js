import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import os from 'os';

function getLocalLanIp() {
  const nets = os.networkInterfaces();
  let fallbackIp = '127.0.0.1';
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        if (net.address === '192.168.137.1') {
          return net.address;
        }
        if (fallbackIp === '127.0.0.1') {
          fallbackIp = net.address;
        }
      }
    }
  }
  return fallbackIp;
}

// Built-in Local Wi-Fi Counter-to-TV Sync Relay (Phone <-> Counter PC <-> 1080p HDMI TV)
function sargeLockerWifiSyncPlugin() {
  let sharedState = {
    updatedAt: 0,
    inventory: null,
    sewingStatus: null,
    crateDrops: null,
    announcements: null,
    tvBoardTheme: null
  };

  return {
    name: 'sarge-locker-wifi-sync',
    configureServer(server) {
      server.middlewares.use('/__sarge_sync', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method === 'GET') {
          res.end(
            JSON.stringify({
              ok: true,
              lanIp: getLocalLanIp(),
              port: server.config.server.port || 3000,
              state: sharedState
            })
          );
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const incoming = JSON.parse(body || '{}');
              sharedState = {
                ...sharedState,
                ...incoming,
                updatedAt: Date.now()
              };
              res.end(JSON.stringify({ ok: true, updatedAt: sharedState.updatedAt }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false }));
            }
          });
          return;
        }

        res.statusCode = 405;
        res.end(JSON.stringify({ ok: false }));
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    sargeLockerWifiSyncPlugin()
  ],
  server: {
    host: true,
    port: 3000,
    open: false
  }
});
