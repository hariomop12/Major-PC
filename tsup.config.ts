import { defineConfig } from "tsup";

// Default tsup configuration for packages
export const tsup = defineConfig({
  splitting: false,
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  target: "node20",
  sourcemap: true,
  minify: false,
  shims: true,
  skipNodeModulesBundle: true,
  external: ["pg-native", "node:*"],
});
