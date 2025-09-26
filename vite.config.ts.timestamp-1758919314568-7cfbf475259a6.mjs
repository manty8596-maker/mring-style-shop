// vite.config.ts
import { defineConfig } from "file:///home/ak/%D0%9C%D1%83%D0%B7%D1%8B%D0%BA%D0%B0/%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%BF%D0%B0%D0%BF%D0%BA%D0%B0/mring-style-shop/node_modules/vite/dist/node/index.js";
import react from "file:///home/ak/%D0%9C%D1%83%D0%B7%D1%8B%D0%BA%D0%B0/%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%BF%D0%B0%D0%BF%D0%BA%D0%B0/mring-style-shop/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///home/ak/%D0%9C%D1%83%D0%B7%D1%8B%D0%BA%D0%B0/%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%BF%D0%B0%D0%BF%D0%BA%D0%B0/mring-style-shop/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/home/ak/\u041C\u0443\u0437\u044B\u043A\u0430/\u041D\u043E\u0432\u0430\u044F \u043F\u0430\u043F\u043A\u0430/mring-style-shop";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: mode === "development" ? {
      "/submit-order": {
        target: `http://localhost:${process.env.SERVER_PORT || 3e3}`,
        changeOrigin: true,
        secure: false
      },
      "/api": {
        target: `http://localhost:${process.env.SERVER_PORT || 3e3}`,
        changeOrigin: true,
        secure: false
      }
    } : {}
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hay9cdTA0MUNcdTA0NDNcdTA0MzdcdTA0NEJcdTA0M0FcdTA0MzAvXHUwNDFEXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzMFx1MDQzRlx1MDQzQVx1MDQzMC9tcmluZy1zdHlsZS1zaG9wXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9hay9cdTA0MUNcdTA0NDNcdTA0MzdcdTA0NEJcdTA0M0FcdTA0MzAvXHUwNDFEXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQzMFx1MDQzRlx1MDQzQVx1MDQzMC9tcmluZy1zdHlsZS1zaG9wL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2FrLyVEMCU5QyVEMSU4MyVEMCVCNyVEMSU4QiVEMCVCQSVEMCVCMC8lRDAlOUQlRDAlQkUlRDAlQjIlRDAlQjAlRDElOEYlMjAlRDAlQkYlRDAlQjAlRDAlQkYlRDAlQkElRDAlQjAvbXJpbmctc3R5bGUtc2hvcC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLFxuICAgIHBvcnQ6IDgwODAsXG4gICAgcHJveHk6IG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiA/IHtcbiAgICAgIFwiL3N1Ym1pdC1vcmRlclwiOiB7XG4gICAgICAgIHRhcmdldDogYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5TRVJWRVJfUE9SVCB8fCAzMDAwfWAsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBcIi9hcGlcIjoge1xuICAgICAgICB0YXJnZXQ6IGBodHRwOi8vbG9jYWxob3N0OiR7cHJvY2Vzcy5lbnYuU0VSVkVSX1BPUlQgfHwgMzAwMH1gLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICB9LFxuICAgIH0gOiB7fSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKV0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdZLFNBQVMsb0JBQW9CO0FBQ3JhLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFIaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPLFNBQVMsZ0JBQWdCO0FBQUEsTUFDOUIsaUJBQWlCO0FBQUEsUUFDZixRQUFRLG9CQUFvQixRQUFRLElBQUksZUFBZSxHQUFJO0FBQUEsUUFDM0QsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFFBQVEsb0JBQW9CLFFBQVEsSUFBSSxlQUFlLEdBQUk7QUFBQSxRQUMzRCxjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0YsSUFBSSxDQUFDO0FBQUEsRUFDUDtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLGlCQUFpQixnQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQzlFLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
