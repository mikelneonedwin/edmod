import type { PluginsConfig } from "tailwindcss/types/config";

declare module "tailwindcss-animate" {
  const plugin: PluginsConfig;
  export default plugin;
}

export { };
