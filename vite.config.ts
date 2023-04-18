import { defineConfig, Plugin } from "vite";

function dynamicImportProxyRuntimePlugin(): Plugin {
  return {
    name: "cypress:mocks",
    enforce: "post",
    transform(code, id, options) {
      return {
        code: importCypressModule(code, id),
      };
    },
  };
}

/**
 * Transform dynamic imports to use a runtime that turns the ES modules into proxies by injecting
 * a `cypressModule` runtime.
 * 
 * `cypressModule` returns a Promise than resolves to the original import that has been
 * "proxified" to side step the fact ES Modules are immutable and sealed.
 * 
 * Examples - https://regex101.com/r/Ic1OHA/1
 * 
 * Given: 
 *   const m = import("./mod_1")
 *   const m = await import("lodash")
 *   import("./mod_2").then(mod => mod)
 * 
 * Returns:
 *   const m = cypressModule(import("./mod_1"))
 *   const m = await cypressModule(import("lodash"))
 *   cypressModule(import("./mod_2")).then(mod => mod)
 */
function importCypressModule(code: string, id: string) {
  const RE = /(import\(.+?\))/gi;

  const c = code.replace(RE, `cypressModule($1)`);

  return c;
}

export default defineConfig({
  plugins: [dynamicImportProxyRuntimePlugin()],
});
