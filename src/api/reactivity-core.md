# 반응성 API: 코어 {#reactivity-api-core}

:::info 참고
반응성 API를 더 잘 이해하려면 다음 가이드 챕터를 읽는 것이 좋습니다:

- [반응성 기본](/guide/essentials/reactivity-fundamentals) (API 선호도를 Composition API로 설정)
- [반응성 심층 분석](/guide/extras/reactivity-in-depth)
  :::

## ref() {#ref}

내부 값을 받아서 반응형이며 변경 가능한 ref 객체를 반환합니다. 이 객체는 내부 값을 가리키는 단일 속성 `.value`를 가집니다.

- **타입**

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **세부사항**

  ref 객체는 변경 가능합니다. 즉, `.value`에 새로운 값을 할당할 수 있습니다. 또한 반응형이기도 하여, `.value`에 대한 읽기 작업은 추적되고, 쓰기 작업은 관련된 효과를 트리거합니다.

  객체가 ref의 값으로 할당되면, 해당 객체는 [reactive()](#reactive)로 깊게 반응형이 됩니다. 이는 객체에 중첩된 ref가 있을 경우, 이들도 깊게 언랩된다는 의미입니다.

  깊은 변환을 피하려면 [`shallowRef()`](./reactivity-advanced#shallowref)를 사용하세요.

- **예시**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value = 1
  console.log(count.value) // 1
  ```

- **참고**
  - [가이드 - `ref()`와 함께하는 반응성 기본](/guide/essentials/reactivity-fundamentals#ref)
  - [가이드 - `ref()` 타입 지정](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

## computed() {#computed}

[getter 함수](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description)를 받아, getter에서 반환된 값에 대한 읽기 전용 반응형 [ref](#ref) 객체를 반환합니다. 또한 `get`과 `set` 함수가 포함된 객체를 받아서 쓰기 가능한 ref 객체를 생성할 수도 있습니다.

- **타입**

  ```ts
  // 읽기 전용
  function computed<T>(
    getter: (oldValue: T | undefined) => T,
    // 아래 "Computed Debugging" 링크 참고
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // 쓰기 가능
  function computed<T>(
    options: {
      get: (oldValue: T | undefined) => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **예시**

  읽기 전용 computed ref 생성:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // 에러
  ```

  쓰기 가능한 computed ref 생성:

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
      count.value = val - 1
    }
  })

  plusOne.value = 1
  console.log(count.value) // 0
  ```

  디버깅:

  ```js
  const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **참고**
  - [가이드 - 계산된 속성](/guide/essentials/computed)
  - [가이드 - Computed 디버깅](/guide/extras/reactivity-in-depth#computed-debugging)
  - [가이드 - `computed()` 타입 지정](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />
  - [가이드 - 성능 - Computed 안정성](/guide/best-practices/performance#computed-stability)

## reactive() {#reactive}

객체의 반응형 프록시(proxy)를 반환합니다.

- **타입**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **세부사항**

  반응형 변환은 "깊게" 이루어집니다: 모든 중첩 속성에 영향을 미칩니다. 반응형 객체는 [ref](#ref) 속성도 깊게 언랩하면서 반응성(reactivity)을 유지합니다.

  또한 ref가 반응형 배열이나 `Map`과 같은 네이티브 컬렉션 타입의 요소로 접근될 때는 ref 언래핑이 수행되지 않는다는 점에 유의해야 합니다.

  깊은 변환을 피하고 루트 레벨에서만 반응성을 유지하려면 [shallowReactive()](./reactivity-advanced#shallowreactive)를 사용하세요.

  반환된 객체와 그 중첩 객체들은 [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)로 래핑되며, **원본 객체와 동일하지 않습니다**. 반응형 프록시만을 사용하고 원본 객체에 의존하지 않는 것이 권장됩니다.

- **예시**

  반응형 객체 생성:

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  ref 언래핑:

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // ref가 언랩됩니다
  console.log(obj.count === count.value) // true

  // `obj.count`가 업데이트됩니다
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // `count` ref도 업데이트됩니다
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  ref가 배열이나 컬렉션 요소로 접근될 때는 **언랩되지 않습니다**:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // 여기서는 .value가 필요합니다
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // 여기서도 .value가 필요합니다
  console.log(map.get('count').value)
  ```

  [ref](#ref)를 `reactive` 속성에 할당하면, 해당 ref도 자동으로 언랩됩니다:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **참고**
  - [가이드 - 반응성 기본](/guide/essentials/reactivity-fundamentals)
  - [가이드 - `reactive()` 타입 지정](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

## readonly() {#readonly}

객체(반응형 또는 일반 객체)나 [ref](#ref)를 받아 원본에 대한 읽기 전용 프록시를 반환합니다.

- **타입**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **세부사항**

  읽기 전용 프록시는 깊게 적용됩니다: 중첩된 모든 속성도 읽기 전용이 됩니다. 또한 `reactive()`와 동일한 ref 언래핑 동작을 가지지만, 언랩된 값도 읽기 전용이 됩니다.

  깊은 변환을 피하려면 [shallowReadonly()](./reactivity-advanced#shallowreadonly)를 사용하세요.

- **예시**

  ```js
  const original = reactive({ count: 0 })

  const copy = readonly(original)

  watchEffect(() => {
    // 반응성 추적에 사용 가능
    console.log(copy.count)
  })

  // 원본을 변경하면 copy를 참조하는 watcher가 트리거됨
  original.count++

  // copy를 변경하려고 하면 실패하고 경고가 발생함
  copy.count++ // 경고!
  ```

## watchEffect() {#watcheffect}

함수를 즉시 실행하면서 그 의존성을 반응적으로 추적하고, 의존성이 변경될 때마다 다시 실행합니다.

- **타입**

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): WatchHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // 기본값: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  interface WatchHandle {
    (): void // 호출 가능, `stop`과 동일
    pause: () => void
    resume: () => void
    stop: () => void
  }
  ```

- **세부사항**

  첫 번째 인자는 실행할 effect 함수입니다. effect 함수는 정리 콜백(callback)을 등록할 수 있는 함수를 인자로 받습니다. 정리 콜백은 effect가 다음에 다시 실행되기 직전에 호출되며, 예를 들어 대기 중인 비동기 요청과 같은 무효화된 부수 효과를 정리하는 데 사용할 수 있습니다(아래 예시 참고).

  두 번째 인자는 선택적 옵션 객체로, effect의 flush 타이밍을 조정하거나 의존성 디버깅에 사용할 수 있습니다.

  기본적으로 watcher는 컴포넌트(component) 렌더링 직전에 실행됩니다. `flush: 'post'`로 설정하면 watcher가 컴포넌트 렌더링(rendering) 후에 실행됩니다. 자세한 내용은 [콜백 flush 타이밍](/guide/essentials/watchers#callback-flush-timing)을 참고하세요. 드물게, 반응형 의존성이 변경될 때 watcher를 즉시 트리거해야 할 필요가 있을 수 있습니다(예: 캐시 무효화). 이 경우 `flush: 'sync'`를 사용할 수 있습니다. 단, 이 설정은 여러 속성이 동시에 업데이트될 때 성능 및 데이터 일관성 문제를 일으킬 수 있으므로 주의해서 사용해야 합니다.

  반환값은 effect의 재실행을 중지할 수 있는 핸들 함수입니다.

- **예시**

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> 0 출력

  count.value++
  // -> 1 출력
  ```

  watcher 중지:

  ```js
  const stop = watchEffect(() => {})

  // watcher가 더 이상 필요 없을 때:
  stop()
  ```

  watcher 일시정지 / 재개: <sup class="vt-badge" data-text="3.5+" />

  ```js
  const { stop, pause, resume } = watchEffect(() => {})

  // watcher를 일시적으로 정지
  pause()

  // 나중에 재개
  resume()

  // 중지
  stop()
  ```

  부수 효과 정리:

  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel`은 `id`가 변경되면 호출되어,
    // 이전 요청이 아직 완료되지 않았다면 취소합니다
    onCleanup(cancel)
    data.value = await response
  })
  ```

  3.5+에서의 부수 효과 정리:

  ```js
  import { onWatcherCleanup } from 'vue'

  watchEffect(async () => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel`은 `id`가 변경되면 호출되어,
    // 이전 요청이 아직 완료되지 않았다면 취소합니다
    onWatcherCleanup(cancel)
    data.value = await response
  })
  ```

  옵션:

  ```js
  watchEffect(() => {}, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **참고**
  - [가이드 - Watcher](/guide/essentials/watchers#watcheffect)
  - [가이드 - Watcher 디버깅](/guide/extras/reactivity-in-depth#watcher-debugging)

## watchPostEffect() {#watchposteffect}

[`watchEffect()`](#watcheffect)에서 `flush: 'post'` 옵션을 사용한 별칭입니다.

## watchSyncEffect() {#watchsynceffect}

[`watchEffect()`](#watcheffect)에서 `flush: 'sync'` 옵션을 사용한 별칭입니다.

## watch() {#watch}

하나 이상의 반응형 데이터 소스를 감시하고, 소스가 변경될 때 콜백 함수를 호출합니다.

- **타입**

  ```ts
  // 단일 소스 감시
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): WatchHandle

  // 다중 소스 감시
  function watch<T>(
    sources: WatchSource<T>[],
    callback: WatchCallback<T[]>,
    options?: WatchOptions
  ): WatchHandle

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type WatchSource<T> =
    | Ref<T> // ref
    | (() => T) // getter
    | (T extends object ? T : never) // 반응형 객체

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // 기본값: false
    deep?: boolean | number // 기본값: false
    flush?: 'pre' | 'post' | 'sync' // 기본값: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
    once?: boolean // 기본값: false (3.4+)
  }

  interface WatchHandle {
    (): void // 호출 가능, `stop`과 동일
    pause: () => void
    resume: () => void
    stop: () => void
  }
  ```

  > 타입은 가독성을 위해 단순화되었습니다.

- **세부사항**

  `watch()`는 기본적으로 lazy(지연) 방식입니다. 즉, 감시하는 소스가 변경될 때만 콜백이 호출됩니다.

  첫 번째 인자는 watcher의 **소스**입니다. 소스는 다음 중 하나일 수 있습니다:

  - 값을 반환하는 getter 함수
  - ref
  - 반응형 객체
  - ...또는 위의 항목들의 배열

  두 번째 인자는 소스가 변경될 때 호출되는 콜백입니다. 콜백은 세 개의 인자를 받습니다: 새로운 값, 이전 값, 그리고 부수 효과 정리 콜백을 등록하는 함수. 정리 콜백은 effect가 다음에 다시 실행되기 직전에 호출되며, 예를 들어 대기 중인 비동기 요청과 같은 무효화된 부수 효과를 정리하는 데 사용할 수 있습니다.

  여러 소스를 감시할 때, 콜백은 소스 배열에 대응하는 새로운 값/이전 값의 두 배열을 받습니다.

  세 번째 선택적 인자는 옵션 객체로, 다음과 같은 옵션을 지원합니다:

  - **`immediate`**: watcher 생성 시 콜백을 즉시 트리거합니다. 첫 호출 시 이전 값은 `undefined`입니다.
  - **`deep`**: 소스가 객체일 경우 깊은 탐색을 강제하여, 깊은 변경에도 콜백이 실행됩니다. 3.5+에서는 최대 탐색 깊이를 나타내는 숫자도 허용됩니다. [깊은 Watcher](/guide/essentials/watchers#deep-watchers) 참고.
  - **`flush`**: 콜백의 flush 타이밍을 조정합니다. [콜백 flush 타이밍](/guide/essentials/watchers#callback-flush-timing) 및 [`watchEffect()`](/api/reactivity-core#watcheffect) 참고.
  - **`onTrack / onTrigger`**: watcher의 의존성 디버깅. [Watcher 디버깅](/guide/extras/reactivity-in-depth#watcher-debugging) 참고.
  - **`once`**: (3.4+) 콜백을 한 번만 실행합니다. 첫 콜백 실행 후 watcher가 자동으로 중지됩니다.

  [`watchEffect()`](#watcheffect)와 비교했을 때, `watch()`는 다음을 할 수 있습니다:

  - 부수 효과를 lazy하게 수행
  - watcher를 재실행시킬 상태를 더 구체적으로 지정
  - 감시하는 상태의 이전 값과 현재 값 모두에 접근

- **예시**

  getter 감시:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  ref 감시:

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  여러 소스를 감시할 때, 콜백은 소스 배열에 대응하는 새로운 값/이전 값의 배열을 받습니다:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  getter 소스를 사용할 때, getter의 반환값이 변경된 경우에만 watcher가 실행됩니다. 깊은 변경에도 콜백이 실행되길 원한다면, `{ deep: true }`로 watcher를 명시적으로 깊은 모드로 설정해야 합니다. 깊은 모드에서는, 콜백이 깊은 변경에 의해 트리거된 경우 새 값과 이전 값이 동일한 객체가 됩니다:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  ```

  반응형 객체를 직접 감시할 때는 watcher가 자동으로 깊은 모드가 됩니다:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* state의 깊은 변경에도 트리거됨 */
  })
  ```

  `watch()`는 [`watchEffect()`](#watcheffect)와 동일한 flush 타이밍 및 디버깅 옵션을 공유합니다:

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

  watcher 중지:

  ```js
  const stop = watch(source, callback)

  // watcher가 더 이상 필요 없을 때:
  stop()
  ```

  watcher 일시정지 / 재개: <sup class="vt-badge" data-text="3.5+" />

  ```js
  const { stop, pause, resume } = watch(() => {})

  // watcher를 일시적으로 정지
  pause()

  // 나중에 재개
  resume()

  // 중지
  stop()
  ```

  부수 효과 정리:

  ```js
  watch(id, async (newId, oldId, onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel`은 `id`가 변경되면 호출되어,
    // 이전 요청이 아직 완료되지 않았다면 취소합니다
    onCleanup(cancel)
    data.value = await response
  })
  ```

  3.5+에서의 부수 효과 정리:

  ```js
  import { onWatcherCleanup } from 'vue'

  watch(id, async (newId) => {
    const { response, cancel } = doAsyncWork(newId)
    onWatcherCleanup(cancel)
    data.value = await response
  })
  ```

- **참고**

  - [가이드 - Watcher](/guide/essentials/watchers)
  - [가이드 - Watcher 디버깅](/guide/extras/reactivity-in-depth#watcher-debugging)

## onWatcherCleanup() <sup class="vt-badge" data-text="3.5+" /> {#onwatchercleanup}

현재 watcher가 다시 실행되기 직전에 실행할 정리 함수를 등록합니다. `watchEffect` 효과 함수나 `watch` 콜백 함수의 동기 실행 중에만 호출할 수 있습니다(즉, async 함수에서 `await` 이후에는 호출할 수 없습니다).

- **타입**

  ```ts
  function onWatcherCleanup(
    cleanupFn: () => void,
    failSilently?: boolean
  ): void
  ```

- **예시**

  ```ts
  import { watch, onWatcherCleanup } from 'vue'

  watch(id, (newId) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel`은 `id`가 변경되면 호출되어,
    // 이전 요청이 아직 완료되지 않았다면 취소합니다
    onWatcherCleanup(cancel)
  })
  ```
