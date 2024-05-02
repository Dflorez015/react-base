import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import mkcert from "vite-plugin-mkcert"
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const APP_VERSION = JSON.stringify(process.env.npm_package_version)

  if (mode === "development") {
    return {
      plugins: [mkcert(), tsconfigPaths(), react(),
        //   TanStackRouterVite({
        //   "routesDirectory": "./src/routes",
        //   "generatedRouteTree": "./src/routeTree.gen.ts",
        //   "routeFileIgnorePrefix": "-",
        // }),
      ],
      resolve: {
        alias: {
          "@": resolve(__dirname, "src")
        },
      },
      // optimizeDeps: {
      //   include: [
      //     '@apollo/client/core',
      //     '@apollo/client/cache'
      //   ]
      // },
      server: {
        port: 3001,
        host: true,
      },
      define: {
        'import.meta.env.APP_VERSION': APP_VERSION
      }
    }
  } else {
    return {
      plugins: [tsconfigPaths(), react()],
      resolve: {
        alias: {
          "@": resolve(__dirname, "src")
        }
      },
      preview: {
        host: "0.0.0.0",
        port: 3001
      },
      define: {
        'import.meta.env.APP_VERSION': APP_VERSION
      }
    }
  }
})