import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

const conditionalPlugins: [string, Record<string, any>][] = [];

// @ts-ignore
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react({
      plugins: conditionalPlugins,
    }),
    tempo(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            // Handle API requests
            if (req.url?.startsWith("/api/auth/nonce")) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  nonce: Math.floor(Math.random() * 1000000).toString(),
                }),
              );
            }
            if (req.url?.startsWith("/api/auth/login")) {
              // Mock login response
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  user: {
                    id: "1",
                    address: req.body?.address,
                    role: {
                      id: "1",
                      name: "user",
                      permissions: ["read:profile"],
                    },
                    kycStatus: "none",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                  token: "mock_jwt_token",
                }),
              );
            }
          });
        },
      },
    },
  },
});
