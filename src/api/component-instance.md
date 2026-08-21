# 컴포넌트 인스턴스 {#component-instance}

:::info
이 페이지는 컴포넌트 공개 인스턴스(instance), 즉 `this`에 노출되는 내장 속성과 메서드에 대해 문서화합니다.

이 페이지에 나열된 모든 속성은 읽기 전용입니다(`$data`의 중첩 속성 제외).
:::

## $data {#data}

[`data`](./options-state#data) 옵션에서 반환된 객체로, 컴포넌트(component)에 의해 반응형으로 만들어집니다. 컴포넌트 인스턴스는 자신의 데이터 객체의 속성에 대한 접근을 프록시(proxy)합니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## $props {#props}

컴포넌트의 현재, 해석된 props를 나타내는 객체입니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **세부사항**

  [`props`](./options-state#props) 옵션을 통해 선언된 props만 포함됩니다. 컴포넌트 인스턴스는 자신의 props 객체의 속성에 대한 접근을 프록시합니다.

## $el {#el}

컴포넌트 인스턴스가 관리하는 루트 DOM 노드입니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $el: any
  }
  ```

- **세부사항**

  컴포넌트가 [마운트(mount)](./options-lifecycle#mounted)되기 전까지 `$el`은 `undefined`입니다.

  - 단일 루트 엘리먼트를 가진 컴포넌트의 경우, `$el`은 해당 엘리먼트를 가리킵니다.
  - 텍스트 루트를 가진 컴포넌트의 경우, `$el`은 텍스트 노드를 가리킵니다.
  - 여러 루트 노드를 가진 컴포넌트의 경우, `$el`은 Vue가 DOM 내 컴포넌트의 위치를 추적하기 위해 사용하는 플레이스홀더 DOM 노드(텍스트 노드 또는 SSR 하이드레이션(hydration) 모드의 주석 노드)입니다.

  :::tip
  일관성을 위해 `$el`에 의존하는 대신 [템플릿(template) ref](/guide/essentials/template-refs)를 사용하여 엘리먼트에 직접 접근하는 것이 권장됩니다.
  :::

## $options {#options}

현재 컴포넌트 인스턴스를 인스턴스화하는 데 사용된 해석된 컴포넌트 옵션입니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **세부사항**

  `$options` 객체는 현재 컴포넌트의 해석된 옵션을 노출하며, 다음과 같은 가능한 소스의 병합 결과입니다:

  - 전역 믹스인(mixin)
  - 컴포넌트 `extends` 기반
  - 컴포넌트 믹스인

  일반적으로 사용자 정의 컴포넌트 옵션을 지원하는 데 사용됩니다:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **참고** [`app.config.optionMergeStrategies`](/api/application#app-config-optionmergestrategies)

## $parent {#parent}

현재 인스턴스에 부모가 있다면 부모 인스턴스입니다. 루트 인스턴스 자체의 경우 `null`입니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## $root {#root}

현재 컴포넌트 트리의 루트 컴포넌트 인스턴스입니다. 현재 인스턴스에 부모가 없다면 이 값은 자기 자신입니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## $slots {#slots}

부모 컴포넌트에 의해 전달된 [슬롯(slot)](/guide/components/slots)을 나타내는 객체입니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **세부사항**

  일반적으로 [렌더 함수](/guide/extras/render-function)를 수동으로 작성할 때 사용되지만, 슬롯이 존재하는지 감지하는 데에도 사용할 수 있습니다.

  각 슬롯은 해당 슬롯 이름에 해당하는 키로 `this.$slots`에 함수로 노출되며, 이 함수는 vnode 배열을 반환합니다. 기본 슬롯은 `this.$slots.default`로 노출됩니다.

  슬롯이 [스코프 슬롯(scoped slots)](/guide/components/slots#scoped-slots)인 경우, 슬롯 함수에 전달된 인자는 슬롯의 슬롯 props로 사용할 수 있습니다.

- **참고** [렌더 함수 - 슬롯 렌더링(rendering)](/guide/extras/render-function#rendering-slots)

## $refs {#refs}

[템플릿 ref](/guide/essentials/template-refs)를 통해 등록된 DOM 엘리먼트와 컴포넌트 인스턴스의 객체입니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **참고**

  - [템플릿 ref](/guide/essentials/template-refs)
  - [특수 속성 - ref](./built-in-special-attributes.md#ref)

## $attrs {#attrs}

컴포넌트의 폴스루 속성(fallthrough attributes)을 포함하는 객체입니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **세부사항**

  [폴스루 속성](/guide/components/attrs)은 부모 컴포넌트에 의해 전달되었지만, 자식에서 prop이나 emit 이벤트로 선언되지 않은 속성과 이벤트 핸들러입니다.

  기본적으로, `$attrs`의 모든 내용은 컴포넌트에 단일 루트 엘리먼트가 있을 경우 해당 루트 엘리먼트에 자동으로 상속됩니다. 컴포넌트에 여러 루트 노드가 있으면 이 동작은 비활성화되며, [`inheritAttrs`](./options-misc#inheritattrs) 옵션으로 명시적으로 비활성화할 수 있습니다.

- **참고**

  - [폴스루 속성](/guide/components/attrs)

## $watch() {#watch}

감시자(watcher)를 생성하는 명령형 API입니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $watch(
      source: string | (() => any),
      callback: WatchCallback,
      options?: WatchOptions
    ): StopHandle
  }

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  interface WatchOptions {
    immediate?: boolean // 기본값: false
    deep?: boolean // 기본값: false
    flush?: 'pre' | 'post' | 'sync' // 기본값: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **세부사항**

  첫 번째 인자는 감시할 소스입니다. 컴포넌트 속성 이름 문자열, 단순 점(.)으로 구분된 경로 문자열, 또는 [getter 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get#description)일 수 있습니다.

  두 번째 인자는 콜백(callback) 함수입니다. 콜백은 감시 대상의 새 값과 이전 값을 받습니다.

  - **`immediate`**: 감시자 생성 시 즉시 콜백을 트리거합니다. 첫 호출 시 이전 값은 `undefined`입니다.
  - **`deep`**: 소스가 객체일 경우 깊은 탐색을 강제하여, 깊은 변경에도 콜백이 실행됩니다. [깊은 감시자](/guide/essentials/watchers#deep-watchers) 참고.
  - **`flush`**: 콜백의 실행 타이밍을 조정합니다. [콜백 실행 타이밍](/guide/essentials/watchers#callback-flush-timing) 및 [`watchEffect()`](/api/reactivity-core#watcheffect) 참고.
  - **`onTrack / onTrigger`**: 감시자의 의존성 디버깅에 사용합니다. [감시자 디버깅](/guide/extras/reactivity-in-depth#watcher-debugging) 참고.

- **예시**

  속성 이름 감시:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  점(.)으로 구분된 경로 감시:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  더 복잡한 표현식에 getter 사용:

  ```js
  this.$watch(
    // 표현식 `this.a + this.b`의 결과가
    // 달라질 때마다 핸들러가 호출됩니다.
    // 마치 계산된 속성을 정의하지 않고
    // 계산된 속성을 감시하는 것과 같습니다.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  감시자 중지:

  ```js
  const unwatch = this.$watch('a', cb)

  // 나중에...
  unwatch()
  ```

- **참고**
  - [옵션 - `watch`](/api/options-state#watch)
  - [가이드 - 감시자](/guide/essentials/watchers)

## $emit() {#emit}

현재 인스턴스에서 커스텀 이벤트를 트리거합니다. 추가 인자는 리스너(listener)의 콜백 함수로 전달됩니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **예시**

  ```js
  export default {
    created() {
      // 이벤트만
      this.$emit('foo')
      // 추가 인자와 함께
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **참고**

  - [컴포넌트 - 이벤트](/guide/components/events)
  - [`emits` 옵션](./options-state#emits)

## $forceUpdate() {#forceupdate}

컴포넌트 인스턴스의 강제 재렌더링을 수행합니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **세부사항**

  Vue의 완전 자동 반응성(reactivity) 시스템 덕분에 이 기능이 필요할 일은 거의 없습니다. 고급 반응성 API를 사용하여 명시적으로 비반응성 컴포넌트 상태를 생성한 경우에만 필요할 수 있습니다.

## $nextTick() {#nexttick}

전역 [`nextTick()`](./general#nexttick)의 인스턴스 바인딩(binding) 버전입니다.

- **타입**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **세부사항**

  `nextTick()`의 전역 버전과의 유일한 차이점은, `this.$nextTick()`에 전달된 콜백의 `this` 컨텍스트가 현재 컴포넌트 인스턴스에 바인딩된다는 점입니다.

- **참고** [`nextTick()`](./general#nexttick)
