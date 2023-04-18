import Mod from './mod_4'

function run () {
  import('./mod').then((mod) => {
    mod.Mod.run()
  })

  console.log(Mod.qux())

  Mod.qux = () => 'A'
  // Object.defineProperty(Mod, 'qux', {
  //   value: () => 'New message',
  //   configurable: true,
  //   writable: true,
  //   enumerable: true,
  // })

  console.log(Mod.qux())
}

run()