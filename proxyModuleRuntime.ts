import { createProxyModule } from "./proxify";

declare global {
  interface Window {
    cypressModule: typeof cypressModule;
  }
}

/**
 * Used by plugin to change `import(...)` to `cypressModule(...)`
 *
 * `cypressModule` returns a Promise than resolves to the original import that has been
 * "proxified" to side step the fact ES Modules are immutable and sealed.
 */
function cypressModule(importPromise: Promise<unknown>) {
  return Promise.resolve(importPromise.then((mod) => createProxyModule(mod)));
}

window.cypressModule = cypressModule;
