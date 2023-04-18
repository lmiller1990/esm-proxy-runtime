export const Mod = {
  async fetcher () {
    // Works with `import(...).then
    import('./mod_2').then((mod) => {
      document.querySelector(`[data-cy-root]`)!.innerHTML = `<h1>${mod.greeting.name}</h1>`
    })
  },

  async run () {
    window.setTimeout(() => {
      this.fetcher()
    }, 500)

    // Works with `await import(...)
    const mod = await import('./mod_3')
    console.log(`${mod.foo()} at ${new Date().toLocaleString()}`)

    // @ts-expect-error 
    console.log(`mod.box -> ${mod.box}`)

    Object.defineProperty(mod, 'box', {
      value: 'qux',
      configurable: true,
      writable: true,
      enumerable: true,
    })

    // @ts-expect-error 
    console.log(`mod.box -> ${mod.box}`)
  },
}
