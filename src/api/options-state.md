# 옵션: 상태 {#options-state}

## data {#data}

컴포넌트 인스턴스(instance)의 초기 반응형 상태를 반환하는 함수입니다.

- **타입**

  ```ts
  interface ComponentOptions {
    data?(
      this: ComponentPublicInstance,
      vm: ComponentPublicInstance
    ): object
  }
  ```

- **세부 정보**

  이 함수는 일반 JavaScript 객체를 반환해야 하며, 반환된 객체는 Vue가 반응형으로 만듭니다. 인스턴스가 생성된 후에는 반응형 데이터 객체에 `this.$data`로 접근할 수 있습니다. 컴포넌트 인스턴스는 데이터 객체에 있는 모든 속성을 프록시(proxy)하므로, `this.a`는 `this.$data.a`와 동일합니다.

  반환된 데이터 객체에는 모든 최상위 데이터 속성이 포함되어야 합니다. `this.$data`에 새로운 속성을 추가하는 것은 가능하지만, **권장되지 않습니다**. 속성에 넣을 값이 아직 준비되지 않았다면, `undefined`나 `null`과 같은 빈 값을 플레이스홀더로 포함시켜 Vue가 해당 속성이 존재함을 알 수 있도록 해야 합니다.

  `_` 또는 `$`로 시작하는 속성은 Vue의 내부 속성 및 API 메서드와 충돌할 수 있으므로 컴포넌트 인스턴스에서 **프록시되지 않습니다**. 이러한 속성은 `this.$data._property`와 같이 접근해야 합니다.

  자체 상태를 가진 브라우저 API 객체나 프로토타입 속성과 같은 객체를 반환하는 것은 **권장되지 않습니다**. 이상적으로, 반환되는 객체는 컴포넌트(component)의 상태만을 나타내는 일반 객체여야 합니다.

- **예시**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    created() {
      console.log(this.a) // 1
      console.log(this.$data) // { a: 1 }
    }
  }
  ```

  `data` 속성에 화살표 함수를 사용할 경우, `this`는 컴포넌트 인스턴스를 가리키지 않지만, 함수의 첫 번째 인자로 인스턴스에 접근할 수 있습니다:

  ```js
  data: (vm) => ({ a: vm.myProp })
  ```

- **관련 문서** [반응성 심층 안내](/guide/extras/reactivity-in-depth)

## props {#props}

컴포넌트의 props를 선언합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    props?: ArrayPropsOptions | ObjectPropsOptions
  }

  type ArrayPropsOptions = string[]

  type ObjectPropsOptions = { [key: string]: Prop }

  type Prop<T = any> = PropOptions<T> | PropType<T> | null

  interface PropOptions<T> {
    type?: PropType<T>
    required?: boolean
    default?: T | ((rawProps: object) => T)
    validator?: (value: unknown, rawProps: object) => boolean
  }

  type PropType<T> = { new (): T } | { new (): T }[]
  ```

  > 가독성을 위해 타입이 단순화되었습니다.

- **세부 정보**

  Vue에서는 모든 컴포넌트 props를 명시적으로 선언해야 합니다. 컴포넌트 props는 두 가지 형태로 선언할 수 있습니다:

  - 문자열 배열을 사용하는 간단한 형태
  - 각 속성 키가 prop의 이름이고 값이 prop의 타입(생성자 함수) 또는 고급 옵션인 객체 형태

  객체 기반 문법에서는 각 prop에 대해 다음과 같은 옵션을 추가로 정의할 수 있습니다:

  - **`type`**: 다음과 같은 기본 생성자 중 하나일 수 있습니다: `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`, 임의의 커스텀 생성자 함수 또는 이들의 배열. 개발 모드에서 Vue는 prop의 값이 선언된 타입과 일치하는지 확인하고, 일치하지 않으면 경고를 표시합니다. 자세한 내용은 [Prop 유효성 검사](/guide/components/props#prop-validation)를 참고하세요.

    또한, `Boolean` 타입의 prop은 개발 및 프로덕션 모두에서 값의 캐스팅 동작에 영향을 미칩니다. 자세한 내용은 [Boolean 캐스팅](/guide/components/props#boolean-casting)을 참고하세요.

  - **`default`**: 부모에서 전달되지 않거나 값이 `undefined`인 경우 prop의 기본값을 지정합니다. 객체나 배열의 기본값은 팩토리 함수를 사용해 반환해야 합니다. 팩토리 함수는 인자로 원시 props 객체를 받습니다.

  - **`required`**: prop이 필수인지 정의합니다. 프로덕션 환경이 아닌 경우, 이 값이 참이고 prop이 전달되지 않으면 콘솔 경고가 발생합니다.

  - **`validator`**: prop 값과 props 객체를 인자로 받는 커스텀 유효성 검사 함수입니다. 개발 모드에서 이 함수가 거짓 값을 반환하면(즉, 유효성 검사가 실패하면) 콘솔 경고가 발생합니다.

- **예시**

  간단한 선언:

  ```js
  export default {
    props: ['size', 'myMessage']
  }
  ```

  유효성 검사가 포함된 객체 선언:

  ```js
  export default {
    props: {
      // 타입 검사
      height: Number,
      // 타입 검사 및 기타 유효성 검사
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: (value) => {
          return value >= 0
        }
      }
    }
  }
  ```

- **관련 문서**
  - [가이드 - Props](/guide/components/props)
  - [가이드 - 컴포넌트 Props 타입 지정](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

## computed {#computed}

컴포넌트 인스턴스에 노출할 계산된 속성(computed property)을 선언합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    computed?: {
      [key: string]: ComputedGetter<any> | WritableComputedOptions<any>
    }
  }

  type ComputedGetter<T> = (
    this: ComponentPublicInstance,
    vm: ComponentPublicInstance,
    previous?: T
  ) => T

  type ComputedSetter<T> = (
    this: ComponentPublicInstance,
    value: T
  ) => void

  type WritableComputedOptions<T> = {
    get: ComputedGetter<T>
    set: ComputedSetter<T>
  }
  ```

- **세부 정보**

  이 옵션은 객체를 받으며, 키는 계산된 속성의 이름이고 값은 계산된 getter 또는 `get`과 `set` 메서드가 있는 객체(쓰기 가능한 계산된 속성)입니다.

  모든 getter와 setter는 `this` 컨텍스트가 자동으로 컴포넌트 인스턴스에 바인딩(binding)됩니다.

  계산된 속성에 화살표 함수를 사용할 경우, `this`는 컴포넌트 인스턴스를 가리키지 않지만, 함수의 첫 번째 인자로 인스턴스에 접근할 수 있습니다:

  ```js
  export default {
    computed: {
      aDouble: (vm) => vm.a * 2
    }
  }
  ```

- **예시**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    computed: {
      // 읽기 전용
      aDouble() {
        return this.a * 2
      },
      // 쓰기 가능
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    },
    created() {
      console.log(this.aDouble) // => 2
      console.log(this.aPlus) // => 2

      this.aPlus = 3
      console.log(this.a) // => 2
      console.log(this.aDouble) // => 4
    }
  }
  ```

- **관련 문서**
  - [가이드 - 계산된 속성](/guide/essentials/computed)
  - [가이드 - 계산된 속성 타입 지정](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

## methods {#methods}

컴포넌트 인스턴스에 혼합될 메서드를 선언합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    methods?: {
      [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
    }
  }
  ```

- **세부 정보**

  선언된 메서드는 컴포넌트 인스턴스에서 직접 접근하거나 템플릿(template) 표현식에서 사용할 수 있습니다. 모든 메서드는 `this` 컨텍스트가 자동으로 컴포넌트 인스턴스에 바인딩되며, 메서드를 다른 곳으로 전달해도 이 바인딩은 유지됩니다.

  메서드를 선언할 때 화살표 함수 사용은 피해야 합니다. 화살표 함수는 `this`를 통해 컴포넌트 인스턴스에 접근할 수 없습니다.

- **예시**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    },
    created() {
      this.plus()
      console.log(this.a) // => 2
    }
  }
  ```

- **관련 문서** [이벤트 처리](/guide/essentials/event-handling)

## watch {#watch}

데이터 변경 시 호출될 watch 콜백(callback)을 선언합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    watch?: {
      [key: string]: WatchOptionItem | WatchOptionItem[]
    }
  }

  type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type ObjectWatchOptionItem = {
    handler: WatchCallback | string
    immediate?: boolean // 기본값: false
    deep?: boolean // 기본값: false
    flush?: 'pre' | 'post' | 'sync' // 기본값: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > 가독성을 위해 타입이 단순화되었습니다.

- **세부 정보**

  `watch` 옵션은 객체를 받으며, 키는 감시할 반응형 컴포넌트 인스턴스 속성(예: `data`나 `computed`로 선언된 속성)이고, 값은 해당 콜백입니다. 콜백은 감시 대상의 새 값과 이전 값을 받습니다.

  루트 레벨 속성 외에도, 키는 점(.)으로 구분된 경로(`a.b.c`)일 수도 있습니다. 이 사용법은 **복잡한 표현식은 지원하지 않으며**, 점으로 구분된 경로만 사용할 수 있습니다. 복잡한 데이터 소스를 감시해야 한다면, 명령형 [`$watch()`](/api/component-instance#watch) API를 사용하세요.

  값은 (`methods`를 통해 선언된) 메서드 이름의 문자열이거나, 추가 옵션이 포함된 객체일 수도 있습니다. 객체 문법을 사용할 때 콜백은 `handler` 필드에 선언해야 합니다. 추가 옵션은 다음과 같습니다:

  - **`immediate`**: 감시자(watcher)가 생성될 때 즉시 콜백을 트리거합니다. 첫 호출 시 이전 값은 `undefined`입니다.
  - **`deep`**: 소스가 객체나 배열인 경우 깊은 탐색을 강제하여, 깊은 변경에도 콜백이 실행됩니다. [깊은 감시자](/guide/essentials/watchers#deep-watchers) 참고.
  - **`flush`**: 콜백의 실행 타이밍을 조정합니다. [콜백 플러시 타이밍](/guide/essentials/watchers#callback-flush-timing) 및 [`watchEffect()`](/api/reactivity-core#watcheffect) 참고.
  - **`onTrack / onTrigger`**: 감시자의 의존성 디버깅. [감시자 디버깅](/guide/extras/reactivity-in-depth#watcher-debugging) 참고.

  watch 콜백을 선언할 때 화살표 함수 사용은 피해야 합니다. 화살표 함수는 `this`를 통해 컴포넌트 인스턴스에 접근할 수 없습니다.

- **예시**

  ```js
  export default {
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 5,
        f: 6
      }
    },
    watch: {
      // 최상위 속성 감시
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // 문자열 메서드 이름
      b: 'someMethod',
      // 감시하는 객체의 모든 속성이 변경될 때마다 콜백이 호출됨 (중첩 깊이와 무관)
      c: {
        handler(val, oldVal) {
          console.log('c changed')
        },
        deep: true
      },
      // 단일 중첩 속성 감시:
      'c.d': function (val, oldVal) {
        // 작업 수행
      },
      // 감시 시작 직후 콜백이 즉시 호출됨
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // 콜백 배열을 전달할 수 있으며, 순차적으로 호출됨
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 triggered')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 triggered')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b changed')
      },
      handle1() {
        console.log('handle 1 triggered')
      }
    },
    created() {
      this.a = 3 // => new: 3, old: 1
    }
  }
  ```

- **관련 문서** [감시자](/guide/essentials/watchers)

## emits {#emits}

컴포넌트에서 발생시키는 커스텀 이벤트를 선언합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    emits?: ArrayEmitsOptions | ObjectEmitsOptions
  }

  type ArrayEmitsOptions = string[]

  type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

  type EmitValidator = (...args: unknown[]) => boolean
  ```

- **세부 정보**

  발생시키는 이벤트는 두 가지 형태로 선언할 수 있습니다:

  - 문자열 배열을 사용하는 간단한 형태
  - 각 속성 키가 이벤트 이름이고 값이 `null` 또는 유효성 검사 함수인 객체 형태

  유효성 검사 함수는 컴포넌트의 `$emit` 호출에 전달된 추가 인자를 받습니다. 예를 들어, `this.$emit('foo', 1)`이 호출되면, `foo`에 대한 유효성 검사기는 인자 `1`을 받게 됩니다. 유효성 검사 함수는 이벤트 인자가 유효한지 여부를 나타내는 불리언 값을 반환해야 합니다.

  `emits` 옵션은 어떤 이벤트 리스너(listener)를 네이티브 DOM 이벤트 리스너가 아닌 컴포넌트 이벤트 리스너로 간주할지에 영향을 미칩니다. 선언된 이벤트의 리스너는 컴포넌트의 `$attrs` 객체에서 제거되어, 컴포넌트의 루트 엘리먼트로 전달되지 않습니다. 자세한 내용은 [속성 전달](/guide/components/attrs)을 참고하세요.

- **예시**

  배열 문법:

  ```js
  export default {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  }
  ```

  객체 문법:

  ```js
  export default {
    emits: {
      // 유효성 검사 없음
      click: null,

      // 유효성 검사 포함
      submit: (payload) => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  }
  ```

- **관련 문서**
  - [가이드 - 속성 전달](/guide/components/attrs)
  - [가이드 - 컴포넌트 Emits 타입 지정](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

## expose {#expose}

템플릿 ref를 통해 부모가 컴포넌트 인스턴스에 접근할 때 노출할 공개 속성을 선언합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    expose?: string[]
  }
  ```

- **세부 정보**

  기본적으로 컴포넌트 인스턴스는 `$parent`, `$root`, 또는 템플릿 ref를 통해 부모가 접근할 때 모든 인스턴스 속성을 노출합니다. 컴포넌트에 내부 상태나 메서드가 있을 경우, 강한 결합을 피하려면 이러한 노출이 바람직하지 않을 수 있습니다.

  `expose` 옵션은 속성 이름 문자열의 목록을 받습니다. `expose`를 사용하면, 명시적으로 나열된 속성만 컴포넌트의 공개 인스턴스에 노출됩니다.

  `expose`는 사용자 정의 속성에만 영향을 미치며, 내장 컴포넌트 인스턴스 속성은 필터링하지 않습니다.

- **예시**

  ```js
  export default {
    // `publicMethod`만 공개 인스턴스에서 사용할 수 있습니다
    expose: ['publicMethod'],
    methods: {
      publicMethod() {
        // ...
      },
      privateMethod() {
        // ...
      }
    }
  }
  ```
