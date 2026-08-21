# 반응성 API: 고급 {#reactivity-api-advanced}

## shallowRef() {#shallowref}

[`ref()`](./reactivity-core#ref)의 얕은(shallow) 버전입니다.

- **타입**

  ```ts
  function shallowRef<T>(value: T): ShallowRef<T>

  interface ShallowRef<T> {
    value: T
  }
  ```

- **세부사항**

  `ref()`와 달리, 얕은 ref의 내부 값은 그대로 저장되고 노출되며, 깊은 반응성(reactivity)으로 변환되지 않습니다. 오직 `.value` 접근만 반응성을 가집니다.

  `shallowRef()`는 일반적으로 대용량 데이터 구조의 성능 최적화나 외부 상태 관리 시스템과의 통합에 사용됩니다.

- **예시**

  ```js
  const state = shallowRef({ count: 1 })

  // 변경을 트리거하지 않음
  state.value.count = 2

  // 변경을 트리거함
  state.value = { count: 2 }
  ```

- **관련 문서**
  - [가이드 - 대용량 불변 구조의 반응성 오버헤드 줄이기](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
  - [가이드 - 외부 상태 시스템과의 통합](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

## triggerRef() {#triggerref}

[shallow ref](#shallowref)에 의존하는 효과를 강제로 트리거합니다. 이는 일반적으로 shallow ref의 내부 값을 깊게 변경한 후에 사용됩니다.

- **타입**

  ```ts
  function triggerRef(ref: ShallowRef): void
  ```

- **예시**

  ```js
  const shallow = shallowRef({
    greet: 'Hello, world'
  })

  // 첫 실행 시 "Hello, world"를 한 번 출력함
  watchEffect(() => {
    console.log(shallow.value.greet)
  })

  // ref가 shallow이기 때문에 효과를 트리거하지 않음
  shallow.value.greet = 'Hello, universe'

  // "Hello, universe"를 출력함
  triggerRef(shallow)
  ```

## customRef() {#customref}

의존성 추적과 업데이트 트리거를 명시적으로 제어할 수 있는 커스텀 ref를 생성합니다.

- **타입**

  ```ts
  function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

  type CustomRefFactory<T> = (
    track: () => void,
    trigger: () => void
  ) => {
    get: () => T
    set: (value: T) => void
  }
  ```

- **세부사항**

  `customRef()`는 팩토리 함수를 기대하며, 이 함수는 `track`과 `trigger` 함수를 인자로 받아 `get`과 `set` 메서드를 가진 객체를 반환해야 합니다.

  일반적으로 `track()`은 `get()` 내부에서, `trigger()`는 `set()` 내부에서 호출되어야 합니다. 하지만 언제 호출할지, 혹은 호출하지 않을지에 대한 완전한 제어권이 있습니다.

- **예시**

  마지막 set 호출 이후 일정 시간 후에만 값을 업데이트하는 디바운스(debounce) ref를 생성합니다:

  ```js
  import { customRef } from 'vue'

  export function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }
  ```

  컴포넌트(component)에서의 사용 예시:

  ```vue
  <script setup>
  import { useDebouncedRef } from './debouncedRef'
  const text = useDebouncedRef('hello')
  </script>

  <template>
    <input v-model="text" />
  </template>
  ```

  [Playground에서 시도해보기](https://play.vuejs.org/#eNplUkFugzAQ/MqKC1SiIekxIpEq9QVV1BMXCguhBdsyaxqE/PcuGAhNfYGd3Z0ZDwzeq1K7zqB39OI205UiaJGMOieiapTUBAOYFt/wUxqRYf6OBVgotGzA30X5Bt59tX4iMilaAsIbwelxMfCvWNfSD+Gw3++fEhFHTpLFuCBsVJ0ScgUQjw6Az+VatY5PiroHo3IeaeHANlkrh7Qg1NBL43cILUmlMAfqVSXK40QUOSYmHAZHZO0KVkIZgu65kTnWp8Qb+4kHEXfjaDXkhd7DTTmuNZ7MsGyzDYbz5CgSgbdppOBFqqT4l0eX1gZDYOm057heOBQYRl81coZVg9LQWGr+IlrchYKAdJp9h0C6KkvUT3A6u8V1dq4ASqRgZnVnWg04/QWYNyYzC2rD5Y3/hkDgz8fY/cOT1ZjqizMZzGY3rDPC12KGZYyd3J26M8ny1KKx7c3X25q1c1wrZN3L9LCMWs/+AmeG6xI=)

  :::warning 주의해서 사용하세요
  customRef를 사용할 때, getter의 반환값에 주의해야 합니다. 특히 getter가 실행될 때마다 새로운 객체 데이터 타입을 생성하는 경우, 이 customRef가 prop으로 전달된 부모-자식 컴포넌트 관계에 영향을 미칩니다.

  부모 컴포넌트의 렌더 함수는 다른 반응성 상태의 변경에 의해 트리거될 수 있습니다. 리렌더링 중에 customRef의 값이 다시 평가되어 자식 컴포넌트에 prop으로 새로운 객체 데이터 타입이 전달됩니다. 이 prop은 자식 컴포넌트에서 이전 값과 비교되며, 값이 다르기 때문에 customRef의 반응성 의존성이 자식 컴포넌트에서 트리거됩니다. 한편, customRef의 setter가 호출되지 않았으므로 부모 컴포넌트의 반응성 의존성은 실행되지 않습니다.

  [Playground에서 확인하기](https://play.vuejs.org/#eNqFVEtP3DAQ/itTS9Vm1ZCt1J6WBZUiDvTQIsoNcwiOkzU4tmU7+9Aq/71jO1mCWuhlN/PyfPP45kAujCk2HSdLsnLMCuPBcd+Zc6pEa7T1cADWOa/bW17nYMPPtvRsDT3UVrcww+DZ0flStybpKSkWQQqPU0IVVUwr58FYvdvDWXgpu6ek1pqSHL0fS0vJw/z0xbN1jUPHY/Ys87Zkzzl4K5qG2zmcnUN2oAqg4T6bQ/wENKNXNk+CxWKsSlmLTSk7XlhedYxnWclYDiK+MkQCoK4wnVtnIiBJuuEJNA2qPof7hzkEoc8DXgg9yzYTBBFgNr4xyY4FbaK2p6qfI0iqFgtgulOe27HyQRy69Dk1JXY9C03JIeQ6wg4xWvJCqFpnlNytOcyC2wzYulQNr0Ao+Mhw0KnTTEttl/CIaIJiMz8NGBHFtYetVrPwa58/IL48Zag4N0ssquNYLYBoW16J0vOkC3VQtVqk7cG9QcHz1kj0QAlgVYkNMFk6d0bJ1pbGYKUkmtD42HmvFfi94WhOEiXwjUnBnlEz9OLTJwy5qCo44D4O7en71SIFjI/F9VuG4jEy/GHQKq5hQrJAKOc4uNVighBF5/cygS0GgOMoK+HQb7+EWvLdMM7weVIJy5kXWi0Rj+xaNRhLKRp1IvB9hxYegA6WJ1xkUe9PcF4e9a+suA3YwYiC5MQ79KlFUzw5rZCZEUtoRWuE5PaXCXmxtuWIkpJSSr39EXXHQcWYNWfP/9A/uV3QUXJjueN2E1ZhtPnSIqGS+er3T77D76Ox1VUn0fsd4y3HfewCxuT2vVMVwp74RbTX8WQI1dy5qx12xI1Fpa1K5AreeEHCCN8q/QXul+LrSC3s4nh93jltkVPDIYt5KJkcIKStCReo4rVQ/CZI6dyEzToCCJu7hAtry/1QH/qXncQB400KJwqPxZHxEyona0xS/E3rt1m9Ld1rZl+uhaxecRtP3EjtgddCyimtXyj9H/Ii3eId7uOGTkyk/wOEbQ9h)

  :::

## shallowReactive() {#shallowreactive}

[`reactive()`](./reactivity-core#reactive)의 얕은(shallow) 버전입니다.

- **타입**

  ```ts
  function shallowReactive<T extends object>(target: T): T
  ```

- **세부사항**

  `reactive()`와 달리, 깊은 변환이 없습니다: 얕은 반응성 객체에서는 루트 레벨 속성만 반응성을 가집니다. 속성 값은 그대로 저장되고 노출됩니다. 즉, ref 값을 가진 속성은 **자동으로 언래핑되지 않습니다**.

  :::warning 주의해서 사용하세요
  얕은 데이터 구조는 컴포넌트의 루트 레벨 상태에만 사용해야 합니다. 깊은 반응성 객체 내부에 중첩해서 사용하는 것은 일관성 없는 반응성 트리 구조를 만들어 이해 및 디버깅이 어려워질 수 있습니다.
  :::

- **예시**

  ```js
  const state = shallowReactive({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // state의 자체 속성 변경은 반응성을 가짐
  state.foo++

  // ...하지만 중첩 객체는 변환하지 않음
  isReactive(state.nested) // false

  // 반응성 없음
  state.nested.bar++
  ```

## shallowReadonly() {#shallowreadonly}

[`readonly()`](./reactivity-core#readonly)의 얕은(shallow) 버전입니다.

- **타입**

  ```ts
  function shallowReadonly<T extends object>(target: T): Readonly<T>
  ```

- **세부사항**

  `readonly()`와 달리, 깊은 변환이 없습니다: 루트 레벨 속성만 읽기 전용으로 만들어집니다. 속성 값은 그대로 저장되고 노출됩니다. 즉, ref 값을 가진 속성은 **자동으로 언래핑되지 않습니다**.

  :::warning 주의해서 사용하세요
  얕은 데이터 구조는 컴포넌트의 루트 레벨 상태에만 사용해야 합니다. 깊은 반응성 객체 내부에 중첩해서 사용하는 것은 일관성 없는 반응성 트리 구조를 만들어 이해 및 디버깅이 어려워질 수 있습니다.
  :::

- **예시**

  ```js
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // state의 자체 속성 변경은 실패함
  state.foo++

  // ...하지만 중첩 객체에는 적용되지 않음
  isReadonly(state.nested) // false

  // 동작함
  state.nested.bar++
  ```

## toRaw() {#toraw}

Vue에서 생성된 프록시(proxy)의 원본, 즉 가공되지 않은 객체를 반환합니다.

- **타입**

  ```ts
  function toRaw<T>(proxy: T): T
  ```

- **세부사항**

  `toRaw()`는 [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](#shallowreactive), [`shallowReadonly()`](#shallowreadonly)로 생성된 프록시에서 원본 객체를 반환할 수 있습니다.

  이는 프록시 접근/추적 오버헤드 없이 임시로 읽거나, 변경을 트리거하지 않고 쓸 수 있는 탈출구입니다. 원본 객체에 대한 지속적인 참조를 유지하는 것은 **권장되지 않습니다**. 주의해서 사용하세요.

- **예시**

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)

  console.log(toRaw(reactiveFoo) === foo) // true
  ```

## markRaw() {#markraw}

객체가 프록시로 변환되지 않도록 표시합니다. 객체 자체를 반환합니다.

- **타입**

  ```ts
  function markRaw<T extends object>(value: T): T
  ```

- **예시**

  ```js
  const foo = markRaw({})
  console.log(isReactive(reactive(foo))) // false

  // 다른 반응성 객체 내부에 중첩되어 있어도 동작함
  const bar = reactive({ foo })
  console.log(isReactive(bar.foo)) // false
  ```

  :::warning 주의해서 사용하세요
  `markRaw()`와 `shallowReactive()`와 같은 얕은 API는 기본 깊은 반응성/읽기 전용 변환에서 선택적으로 제외하고, 상태 그래프에 가공되지 않은(non-proxied) 객체를 삽입할 수 있게 해줍니다. 다양한 이유로 사용할 수 있습니다:

  - 일부 값은 반응성으로 만들면 안 됩니다. 예를 들어 복잡한 3rd party 클래스 인스턴스(instance)나 Vue 컴포넌트 객체 등입니다.

  - 프록시 변환을 건너뛰면 불변 데이터 소스를 가진 대용량 리스트 렌더링(rendering) 시 성능 향상을 얻을 수 있습니다.

  이들은 고급 기능으로 간주되는데, raw 제외는 루트 레벨에만 적용되기 때문입니다. 즉, 중첩된, markRaw되지 않은 raw 객체를 반응성 객체에 설정한 후 다시 접근하면 프록시 버전을 얻게 됩니다. 이는 **아이덴티티 위험**을 초래할 수 있습니다. 즉, 객체 아이덴티티에 의존하는 작업을 수행하면서 동일한 객체의 raw와 프록시 버전을 모두 사용하는 경우입니다:

  ```js
  const foo = markRaw({
    nested: {}
  })

  const bar = reactive({
    // `foo`는 raw로 표시되었지만, foo.nested는 그렇지 않음.
    nested: foo.nested
  })

  console.log(foo.nested === bar.nested) // false
  ```

  아이덴티티 위험은 일반적으로 드뭅니다. 하지만 이러한 API를 제대로 활용하면서 아이덴티티 위험을 안전하게 피하려면 반응성 시스템의 동작 원리에 대한 확실한 이해가 필요합니다.

  :::

## effectScope() {#effectscope}

효과 스코프 객체를 생성하여, 그 안에서 생성된 반응성 효과(즉, computed와 watcher)를 함께 캡처하고 일괄적으로 해제(dispose)할 수 있습니다. 이 API의 자세한 사용 사례는 해당 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md)를 참고하세요.

- **타입**

  ```ts
  function effectScope(detached?: boolean): EffectScope

  interface EffectScope {
    run<T>(fn: () => T): T | undefined // 스코프가 비활성화된 경우 undefined
    stop(): void
  }
  ```

- **예시**

  ```js
  const scope = effectScope()

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)

    watch(doubled, () => console.log(doubled.value))

    watchEffect(() => console.log('Count: ', doubled.value))
  })

  // 스코프 내의 모든 효과를 해제하려면
  scope.stop()
  ```

## getCurrentScope() {#getcurrentscope}

현재 활성화된 [effect scope](#effectscope)가 있다면 반환합니다.

- **타입**

  ```ts
  function getCurrentScope(): EffectScope | undefined
  ```

## onScopeDispose() {#onscopedispose}

현재 활성화된 [effect scope](#effectscope)에 dispose 콜백(callback)을 등록합니다. 해당 effect scope가 중지될 때 콜백이 호출됩니다.

이 메서드는 재사용 가능한 컴포지션 함수에서 컴포넌트에 종속되지 않는 `onUnmounted`의 대체로 사용할 수 있습니다. 각 Vue 컴포넌트의 `setup()` 함수도 effect scope 내에서 호출되기 때문입니다.

활성화된 effect scope 없이 이 함수를 호출하면 경고가 발생합니다. 3.5+에서는 두 번째 인자로 `true`를 전달하여 이 경고를 억제할 수 있습니다.

- **타입**

  ```ts
  function onScopeDispose(fn: () => void, failSilently?: boolean): void
  ```
