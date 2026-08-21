# 옵션: Composition {#options-composition}

## provide {#provide}

하위 컴포넌트에서 주입할 수 있는 값을 제공합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    provide?: object | ((this: ComponentPublicInstance) => object)
  }
  ```

- **세부사항**

  `provide`와 [`inject`](#inject)는 함께 사용되어, 상위 컴포넌트가 모든 하위 컴포넌트에 대해 의존성 주입자로 동작할 수 있게 해줍니다. 컴포넌트(component) 계층 구조가 얼마나 깊든, 같은 부모 체인 내에 있는 한 가능합니다.

  `provide` 옵션은 객체이거나 객체를 반환하는 함수여야 합니다. 이 객체는 하위 컴포넌트에서 주입받을 수 있는 속성들을 포함합니다. 이 객체의 키로 Symbol을 사용할 수 있습니다.

- **예시**

  기본 사용법:

  ```js
  const s = Symbol()

  export default {
    provide: {
      foo: 'foo',
      [s]: 'bar'
    }
  }
  ```

  컴포넌트별 상태를 제공하기 위해 함수를 사용하는 방법:

  ```js
  export default {
    data() {
      return {
        msg: 'foo'
      }
    }
    provide() {
      return {
        msg: this.msg
      }
    }
  }
  ```

  위 예시에서 제공된 `msg`는 반응형이 **아님**에 유의하세요. 자세한 내용은 [반응형과 함께 사용하기](/guide/components/provide-inject#working-with-reactivity)를 참고하세요.

- **관련 문서** [Provide / Inject](/guide/components/provide-inject)

## inject {#inject}

상위 제공자에서 찾아 현재 컴포넌트에 주입할 속성을 선언합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    inject?: ArrayInjectOptions | ObjectInjectOptions
  }

  type ArrayInjectOptions = string[]

  type ObjectInjectOptions = {
    [key: string | symbol]:
      | string
      | symbol
      | { from?: string | symbol; default?: any }
  }
  ```

- **세부사항**

  `inject` 옵션은 다음 중 하나여야 합니다:

  - 문자열 배열, 또는
  - 객체로, 키는 로컬 바인딩(binding) 이름이고 값은 다음 중 하나입니다:
    - 사용 가능한 주입에서 찾을 키(문자열 또는 Symbol), 또는
    - 객체로,
      - `from` 속성은 사용 가능한 주입에서 찾을 키(문자열 또는 Symbol)이고,
      - `default` 속성은 기본값으로 사용됩니다. props의 기본값과 유사하게, 여러 컴포넌트 인스턴스(instance) 간 값 공유를 방지하려면 객체 타입의 경우 팩토리 함수가 필요합니다.

  일치하는 속성이나 기본값이 제공되지 않은 경우, 주입된 속성은 `undefined`가 됩니다.

  주입된 바인딩은 **반응형이 아님**에 유의하세요. 이는 의도된 동작입니다. 하지만 주입된 값이 반응형 객체라면, 그 객체의 속성은 계속 반응형입니다. 자세한 내용은 [반응형과 함께 사용하기](/guide/components/provide-inject#working-with-reactivity)를 참고하세요.

- **예시**

  기본 사용법:

  ```js
  export default {
    inject: ['foo'],
    created() {
      console.log(this.foo)
    }
  }
  ```

  주입된 값을 prop의 기본값으로 사용하는 방법:

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  주입된 값을 data 항목으로 사용하는 방법:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  기본값이 있는 선택적 주입:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  다른 이름의 속성에서 주입해야 하는 경우, `from`을 사용하여 소스 속성을 지정할 수 있습니다:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  prop의 기본값과 마찬가지로, 비원시 값의 경우 팩토리 함수를 사용해야 합니다:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **관련 문서** [Provide / Inject](/guide/components/provide-inject)

## mixins {#mixins}

현재 컴포넌트에 혼합될 옵션 객체의 배열입니다.

- **타입**

  ```ts
  interface ComponentOptions {
    mixins?: ComponentOptions[]
  }
  ```

- **세부사항**

  `mixins` 옵션은 믹스인(mixin) 객체의 배열을 받습니다. 이 믹스인 객체들은 일반 인스턴스 객체처럼 인스턴스 옵션을 포함할 수 있으며, 특정 옵션 병합 로직을 사용하여 최종 옵션과 병합됩니다. 예를 들어, 믹스인에 `created` 훅(hook)이 있고 컴포넌트 자체에도 있다면, 두 함수가 모두 호출됩니다.

  믹스인 훅은 제공된 순서대로 호출되며, 컴포넌트 자체의 훅보다 먼저 호출됩니다.

  :::warning 더 이상 권장되지 않음
  Vue 2에서는 믹스인이 컴포넌트 로직의 재사용 가능한 조각을 만드는 주요 메커니즘이었습니다. Vue 3에서도 믹스인은 계속 지원되지만, 컴포넌트 간 코드 재사용에는 [Composition API를 이용한 컴포저블(composable) 함수](/guide/reusability/composables)가 이제 더 권장되는 방식입니다.
  :::

- **예시**

  ```js
  const mixin = {
    created() {
      console.log(1)
    }
  }

  createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

## extends {#extends}

확장할 "기본 클래스" 컴포넌트입니다.

- **타입**

  ```ts
  interface ComponentOptions {
    extends?: ComponentOptions
  }
  ```

- **세부사항**

  한 컴포넌트가 다른 컴포넌트를 확장하여, 그 컴포넌트의 옵션을 상속받을 수 있게 합니다.

  구현 관점에서 `extends`는 `mixins`와 거의 동일합니다. `extends`로 지정된 컴포넌트는 첫 번째 믹스인처럼 취급됩니다.

  하지만 `extends`와 `mixins`는 의도가 다릅니다. `mixins` 옵션은 주로 기능 조각을 조합하는 데 사용되고, `extends`는 주로 상속에 초점을 둡니다.

  `mixins`와 마찬가지로, 모든 옵션(`setup()` 제외)은 관련 병합 전략을 사용하여 병합됩니다.

- **예시**

  ```js
  const CompA = { ... }

  const CompB = {
    extends: CompA,
    ...
  }
  ```

  :::warning Composition API에서는 권장되지 않음
  `extends`는 Options API를 위해 설계되었으며, `setup()` 훅의 병합을 처리하지 않습니다.

  Composition API에서는 로직 재사용을 위해 "상속"보다는 "조합"이 더 권장되는 사고방식입니다. 한 컴포넌트의 로직을 다른 컴포넌트에서 재사용해야 한다면, 관련 로직을 [컴포저블](/guide/reusability/composables#composables)로 추출하는 것을 고려하세요.

  그래도 Composition API에서 컴포넌트를 "확장"하고자 한다면, 확장 컴포넌트의 `setup()`에서 기본 컴포넌트의 `setup()`을 호출할 수 있습니다:

  ```js
  import Base from './Base.js'
  export default {
    extends: Base,
    setup(props, ctx) {
      return {
        ...Base.setup(props, ctx),
        // 로컬 바인딩
      }
    }
  }
  ```
  :::
