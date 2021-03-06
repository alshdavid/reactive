import Reactive from '../src/index'

const VALUE_1 = 'VALUE_1'

describe('Dependency Injection', () => {
  it('Should ignore specific object instance', async () => {
    class Foo {
      value: string = VALUE_1
    }

    class Bar {
      value: string = VALUE_1

      constructor(
        public foo: Foo
      ) {}
    }

    const foo = new Foo()
    const $Bar = Reactive.create(Bar)

    Reactive.ignore(foo)

    const bar = new $Bar(foo)

    const testFunc1 = () => Reactive.observe(bar)
    const testFunc2 = () => Reactive.observe(foo)

    expect(testFunc1).not.toThrow()
    expect(testFunc2).toThrow()
  })

  it('Should ignore typeof class', async () => {
    class Foo {
      value: string = VALUE_1
    }

    class Bar {
      value: string = VALUE_1

      constructor(
        public foo: Foo
      ) {}
    }

    const foo = new Foo()
    const $Bar = Reactive.create(Bar)

    Reactive.ignoreInstanceOf(Foo)

    const bar = new $Bar(foo)

    const testFunc1 = () => Reactive.observe(bar)
    const testFunc2 = () => Reactive.observe(foo)

    expect(testFunc1).not.toThrow()
    expect(testFunc2).toThrow()
  })

  it('Should ignore typeof class', async () => {
    class Foobar {
      value: string = VALUE_1
    }
    
    class Foo extends Foobar {}

    class Bar {
      value: string = VALUE_1

      constructor(
        public foo: Foo
      ) {}
    }

    const foo = new Foo()
    const $Bar = Reactive.create(Bar)

    Reactive.ignoreInstanceOf(Foobar)

    const bar = new $Bar(foo)

    const testFunc1 = () => Reactive.observe(bar)
    const testFunc2 = () => Reactive.observe(foo)

    expect(testFunc1).not.toThrow()
    expect(testFunc2).toThrow()
  })
})