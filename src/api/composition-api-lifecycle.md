# 컴포지션 API: 라이프사이클 훅 {#composition-api-lifecycle-hooks}

:::info 사용 참고
이 페이지에 나열된 모든 API는 컴포넌트(component)의 `setup()` 단계에서 동기적으로 호출되어야 합니다. 자세한 내용은 [가이드 - 라이프사이클(lifecycle) 훅](/guide/essentials/lifecycle)을 참고하세요.
:::

## onMounted() {#onmounted}

컴포넌트가 마운트(mount)된 후 호출될 콜백(callback)을 등록합니다.

- **타입**

  ```ts
  function onMounted(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **상세 설명**

  컴포넌트는 다음과 같은 경우 마운트된 것으로 간주됩니다:

  - 모든 동기 자식 컴포넌트가 마운트된 후 (비동기 컴포넌트나 `<Suspense>` 트리 내의 컴포넌트는 포함하지 않음).

  - 자신의 DOM 트리가 생성되어 부모 컨테이너에 삽입된 후. 애플리케이션의 루트 컨테이너가 문서 내에 있는 경우에만 컴포넌트의 DOM 트리가 문서 내에 있음을 보장합니다.

  이 훅(hook)은 일반적으로 컴포넌트의 렌더링(rendering)된 DOM에 접근해야 하는 부수 효과를 수행하거나, [서버 렌더링 애플리케이션](/guide/scaling-up/ssr)에서 DOM 관련 코드를 클라이언트로 제한할 때 사용됩니다.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

- **예시**

  템플릿(template) ref를 통해 엘리먼트에 접근하기:

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  const el = ref()

  onMounted(() => {
    el.value // <div>
  })
  </script>

  <template>
    <div ref="el"></div>
  </template>
  ```

## onUpdated() {#onupdated}

반응형 상태 변경으로 인해 컴포넌트의 DOM 트리가 업데이트된 후 호출될 콜백을 등록합니다.

- **타입**

  ```ts
  function onUpdated(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **상세 설명**

  부모 컴포넌트의 updated 훅은 자식 컴포넌트의 훅이 호출된 후에 호출됩니다.

  이 훅은 컴포넌트의 모든 DOM 업데이트 후에 호출되며, 이 업데이트는 서로 다른 상태 변경들로 인해 발생할 수 있습니다. 여러 상태 변경이 성능상의 이유로 하나의 렌더 사이클로 묶일 수 있기 때문입니다. 특정 상태 변경 후에 업데이트된 DOM에 접근해야 한다면 [nextTick()](/api/general#nexttick)을 대신 사용하세요.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

  :::warning
  updated 훅 내에서 컴포넌트 상태를 변경하지 마세요 - 무한 업데이트 루프가 발생할 수 있습니다!
  :::

- **예시**

  업데이트된 DOM에 접근하기:

  ```vue
  <script setup>
  import { ref, onUpdated } from 'vue'

  const count = ref(0)

  onUpdated(() => {
    // 텍스트 내용이 현재 `count.value`와 같아야 합니다.
    console.log(document.getElementById('count').textContent)
  })
  </script>

  <template>
    <button id="count" @click="count++">{{ count }}</button>
  </template>
  ```

## onUnmounted() {#onunmounted}

컴포넌트가 언마운트(unmount)된 후 호출될 콜백을 등록합니다.

- **타입**

  ```ts
  function onUnmounted(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **상세 설명**

  컴포넌트는 다음과 같은 경우 언마운트된 것으로 간주됩니다:

  - 모든 자식 컴포넌트가 언마운트된 후.

  - 모든 관련 반응형 효과(렌더 효과 및 `setup()` 중에 생성된 computed / watcher)가 중지된 후.

  이 훅은 타이머, DOM 이벤트 리스너(listener), 서버 연결 등 수동으로 생성한 부수 효과를 정리할 때 사용하세요.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

- **예시**

  ```vue
  <script setup>
  import { onMounted, onUnmounted } from 'vue'

  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      // ...
    })
  })

  onUnmounted(() => clearInterval(intervalId))
  </script>
  ```

## onBeforeMount() {#onbeforemount}

컴포넌트가 마운트되기 직전에 호출될 훅을 등록합니다.

- **타입**

  ```ts
  function onBeforeMount(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **상세 설명**

  이 훅이 호출될 때, 컴포넌트는 반응형 상태 설정을 마쳤지만 아직 DOM 노드가 생성되지 않았습니다. 곧 처음으로 DOM 렌더 효과를 실행할 예정입니다.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

## onBeforeUpdate() {#onbeforeupdate}

반응형 상태 변경으로 인해 컴포넌트의 DOM 트리가 업데이트되기 직전에 호출될 훅을 등록합니다.

- **타입**

  ```ts
  function onBeforeUpdate(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **상세 설명**

  이 훅은 Vue가 DOM을 업데이트하기 전에 DOM 상태에 접근할 때 사용할 수 있습니다. 이 훅 내에서 컴포넌트 상태를 변경해도 안전합니다.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

## onBeforeUnmount() {#onbeforeunmount}

컴포넌트 인스턴스(instance)가 언마운트되기 직전에 호출될 훅을 등록합니다.

- **타입**

  ```ts
  function onBeforeUnmount(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **상세 설명**

  이 훅이 호출될 때, 컴포넌트 인스턴스는 여전히 완전히 동작 가능한 상태입니다.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

## onErrorCaptured() {#onerrorcaptured}

하위 컴포넌트에서 전파된 오류가 포착되었을 때 호출될 훅을 등록합니다.

- **타입**

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
  ```

- **상세 설명**

  오류는 다음과 같은 소스에서 포착될 수 있습니다:

  - 컴포넌트 렌더링
  - 이벤트 핸들러
  - 라이프사이클 훅
  - `setup()` 함수
  - watcher
  - 커스텀 디렉티브(directive) 훅
  - 트랜지션(transition) 훅

  이 훅은 세 개의 인자를 받습니다: 오류, 오류를 발생시킨 컴포넌트 인스턴스, 오류 소스 타입을 지정하는 정보 문자열.

  :::tip
  프로덕션 환경에서는 세 번째 인자(`info`)가 전체 정보 문자열 대신 축약된 코드로 제공됩니다. 코드와 문자열 매핑은 [프로덕션 오류 코드 참조](/error-reference/#runtime-errors)에서 확인할 수 있습니다.
  :::

  `onErrorCaptured()`에서 컴포넌트 상태를 수정하여 사용자에게 오류 상태를 표시할 수 있습니다. 하지만 오류 상태가 오류를 발생시킨 원래 콘텐츠를 렌더링하지 않도록 주의해야 합니다. 그렇지 않으면 컴포넌트가 무한 렌더 루프에 빠질 수 있습니다.

  이 훅은 `false`를 반환하여 오류의 추가 전파를 중단할 수 있습니다. 아래의 오류 전파 규칙을 참고하세요.

  **오류 전파 규칙**

  - 기본적으로, 모든 오류는 애플리케이션 레벨의 [`app.config.errorHandler`](/api/application#app-config-errorhandler)가 정의되어 있다면 여전히 전달됩니다. 이를 통해 오류를 한 곳에서 분석 서비스로 보고할 수 있습니다.

  - 컴포넌트의 상속 체인 또는 부모 체인에 여러 개의 `errorCaptured` 훅이 존재하는 경우, 동일한 오류에 대해 모두 하위에서 상위 순서로 호출됩니다. 이는 네이티브 DOM 이벤트의 버블링 메커니즘과 유사합니다.

  - `errorCaptured` 훅 자체에서 오류가 발생하면, 이 오류와 원래 포착된 오류 모두 `app.config.errorHandler`로 전달됩니다.

  - `errorCaptured` 훅이 `false`를 반환하면 오류의 추가 전파가 중단됩니다. 이는 "이 오류는 처리되었으니 무시해야 한다"는 의미입니다. 이 경우 추가적인 `errorCaptured` 훅이나 `app.config.errorHandler`는 이 오류에 대해 호출되지 않습니다.

## onRenderTracked() <sup class="vt-badge dev-only" /> {#onrendertracked}

컴포넌트의 렌더 효과에 의해 반응형 의존성이 추적될 때 호출되는 디버그 훅을 등록합니다.

**이 훅은 개발 모드에서만 동작하며, 서버 사이드 렌더링 중에는 호출되지 않습니다.**

- **타입**

  ```ts
  function onRenderTracked(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **참고** [반응성 심층 가이드](/guide/extras/reactivity-in-depth)

## onRenderTriggered() <sup class="vt-badge dev-only" /> {#onrendertriggered}

반응형 의존성이 컴포넌트의 렌더 효과를 다시 실행하도록 트리거할 때 호출되는 디버그 훅을 등록합니다.

**이 훅은 개발 모드에서만 동작하며, 서버 사이드 렌더링 중에는 호출되지 않습니다.**

- **타입**

  ```ts
  function onRenderTriggered(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **참고** [반응성 심층 가이드](/guide/extras/reactivity-in-depth)

## onActivated() {#onactivated}

[`<KeepAlive>`](/api/built-in-components#keepalive)로 캐시된 트리의 일부로 컴포넌트 인스턴스가 DOM에 삽입된 후 호출될 콜백을 등록합니다.

**이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

- **타입**

  ```ts
  function onActivated(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **참고** [가이드 - 캐시된 인스턴스의 라이프사이클](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## onDeactivated() {#ondeactivated}

[`<KeepAlive>`](/api/built-in-components#keepalive)로 캐시된 트리의 일부로 컴포넌트 인스턴스가 DOM에서 제거된 후 호출될 콜백을 등록합니다.

**이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

- **타입**

  ```ts
  function onDeactivated(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **참고** [가이드 - 캐시된 인스턴스의 라이프사이클](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## onServerPrefetch() <sup class="vt-badge" data-text="SSR only" /> {#onserverprefetch}

컴포넌트 인스턴스가 서버에서 렌더링되기 전에 해결되어야 하는 비동기 함수를 등록합니다.

- **타입**

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **상세 설명**

  콜백이 Promise를 반환하면, 서버 렌더러는 컴포넌트를 렌더링하기 전에 해당 Promise가 해결될 때까지 대기합니다.

  이 훅은 서버 사이드 렌더링 중에만 호출되며, 서버 전용 데이터 패칭에 사용할 수 있습니다.

- **예시**

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'

  const data = ref(null)

  onServerPrefetch(async () => {
    // 컴포넌트가 초기 요청의 일부로 렌더링됩니다.
    // 서버에서 데이터를 미리 패칭하면 클라이언트보다 더 빠릅니다.
    data.value = await fetchOnServer(/* ... */)
  })

  onMounted(async () => {
    if (!data.value) {
      // 마운트 시 data가 null이면,
      // 컴포넌트가 클라이언트에서 동적으로 렌더링된 것입니다.
      // 대신 클라이언트에서 데이터를 패칭합니다.
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```

- **참고** [서버 사이드 렌더링](/guide/scaling-up/ssr)
