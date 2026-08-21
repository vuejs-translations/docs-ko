# 옵션: 라이프사이클 {#options-lifecycle}

:::info 참고
라이프사이클(lifecycle) 훅의 공통 사용법에 대해서는 [가이드 - 라이프사이클 훅](/guide/essentials/lifecycle)을 참고하세요.
:::

## beforeCreate {#beforecreate}

인스턴스(instance)가 초기화될 때 호출됩니다.

- **타입**

  ```ts
  interface ComponentOptions {
    beforeCreate?(this: ComponentPublicInstance): void
  }
  ```

- **세부사항**

  인스턴스가 초기화되고 props가 해석되자마자 즉시 호출됩니다.

  이후 props는 반응형 속성으로 정의되고, `data()`나 `computed`와 같은 상태가 설정됩니다.

  Composition API의 `setup()` 훅(hook)은 모든 Options API 훅보다 먼저, 심지어 `beforeCreate()`보다도 먼저 호출된다는 점에 유의하세요.

## created {#created}

인스턴스가 모든 상태 관련 옵션 처리를 마친 후 호출됩니다.

- **타입**

  ```ts
  interface ComponentOptions {
    created?(this: ComponentPublicInstance): void
  }
  ```

- **세부사항**

  이 훅이 호출될 때는 반응형 데이터, 계산 속성(computed property), 메서드, 감시자(watchers)가 모두 설정되어 있습니다. 하지만 마운트(mount) 단계는 아직 시작되지 않았으며, `$el` 속성도 아직 사용할 수 없습니다.

## beforeMount {#beforemount}

컴포넌트(component)가 마운트되기 직전에 호출됩니다.

- **타입**

  ```ts
  interface ComponentOptions {
    beforeMount?(this: ComponentPublicInstance): void
  }
  ```

- **세부사항**

  이 훅이 호출될 때, 컴포넌트는 반응형 상태 설정을 마쳤지만 아직 DOM 노드가 생성되지 않았습니다. 이제 처음으로 DOM 렌더 효과를 실행하려고 합니다.

  **이 훅은 서버 사이드 렌더링(rendering) 중에는 호출되지 않습니다.**

## mounted {#mounted}

컴포넌트가 마운트된 후 호출됩니다.

- **타입**

  ```ts
  interface ComponentOptions {
    mounted?(this: ComponentPublicInstance): void
  }
  ```

- **세부사항**

  컴포넌트가 마운트된 것으로 간주되는 시점은 다음과 같습니다:

  - 모든 동기 자식 컴포넌트가 마운트된 후 (비동기 컴포넌트나 `<Suspense>` 트리 내의 컴포넌트는 포함하지 않음)

  - 자신의 DOM 트리가 생성되어 부모 컨테이너에 삽입된 후. 단, 애플리케이션의 루트 컨테이너가 문서 내에 있을 때만 컴포넌트의 DOM 트리가 문서 내에 있음을 보장합니다.

  이 훅은 일반적으로 컴포넌트의 렌더링된 DOM에 접근해야 하는 부수 효과를 수행하거나, [서버 렌더링 애플리케이션](/guide/scaling-up/ssr)에서 DOM 관련 코드를 클라이언트로 제한할 때 사용됩니다.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

## beforeUpdate {#beforeupdate}

반응형 상태 변경으로 인해 컴포넌트의 DOM 트리가 업데이트되기 직전에 호출됩니다.

- **타입**

  ```ts
  interface ComponentOptions {
    beforeUpdate?(this: ComponentPublicInstance): void
  }
  ```

- **세부사항**

  이 훅에서는 Vue가 DOM을 업데이트하기 전의 DOM 상태에 접근할 수 있습니다. 또한 이 훅 내에서 컴포넌트 상태를 수정해도 안전합니다.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

## updated {#updated}

반응형 상태 변경으로 인해 컴포넌트의 DOM 트리가 업데이트된 후 호출됩니다.

- **타입**

  ```ts
  interface ComponentOptions {
    updated?(this: ComponentPublicInstance): void
  }
  ```

- **세부사항**

  부모 컴포넌트의 updated 훅은 자식 컴포넌트의 updated 훅이 호출된 후에 호출됩니다.

  이 훅은 컴포넌트의 모든 DOM 업데이트 후에 호출되며, 이는 다양한 상태 변경에 의해 발생할 수 있습니다. 특정 상태 변경 후에 업데이트된 DOM에 접근해야 한다면 [nextTick()](/api/general#nexttick)을 대신 사용하세요.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

  :::warning
  updated 훅 내에서 컴포넌트 상태를 변경하지 마세요 - 이는 무한 업데이트 루프를 유발할 수 있습니다!
  :::

## beforeUnmount {#beforeunmount}

컴포넌트 인스턴스가 언마운트(unmount)되기 직전에 호출됩니다.

- **타입**

  ```ts
  interface ComponentOptions {
    beforeUnmount?(this: ComponentPublicInstance): void
  }
  ```

- **세부사항**

  이 훅이 호출될 때 컴포넌트 인스턴스는 여전히 완전히 동작 가능합니다.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

## unmounted {#unmounted}

컴포넌트가 언마운트된 후 호출됩니다.

- **타입**

  ```ts
  interface ComponentOptions {
    unmounted?(this: ComponentPublicInstance): void
  }
  ```

- **세부사항**

  컴포넌트가 언마운트된 것으로 간주되는 시점은 다음과 같습니다:

  - 모든 자식 컴포넌트가 언마운트된 후

  - 모든 관련 반응형 효과(렌더 효과 및 `setup()` 중에 생성된 computed/감시자)가 중지된 후

  이 훅은 타이머, DOM 이벤트 리스너(listener), 서버 연결 등 수동으로 생성한 부수 효과를 정리하는 데 사용하세요.

  **이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

## errorCaptured {#errorcaptured}

하위 컴포넌트에서 전파된 오류가 포착되었을 때 호출됩니다.

- **타입**

  ```ts
  interface ComponentOptions {
    errorCaptured?(
      this: ComponentPublicInstance,
      err: unknown,
      instance: ComponentPublicInstance | null,
      info: string
    ): boolean | void
  }
  ```

- **세부사항**

  다음과 같은 소스에서 오류를 포착할 수 있습니다:

  - 컴포넌트 렌더링
  - 이벤트 핸들러
  - 라이프사이클 훅
  - `setup()` 함수
  - 감시자
  - 커스텀 디렉티브(directive) 훅
  - 트랜지션(transition) 훅

  이 훅은 세 개의 인자를 받습니다: 오류, 오류를 발생시킨 컴포넌트 인스턴스, 오류 소스 타입을 지정하는 정보 문자열.

  :::tip
  프로덕션 환경에서는 세 번째 인자(`info`)가 전체 정보 문자열 대신 축약된 코드로 제공됩니다. 코드와 문자열의 매핑은 [프로덕션 오류 코드 참조](/error-reference/#runtime-errors)에서 확인할 수 있습니다.
  :::

  `errorCaptured()`에서 컴포넌트 상태를 수정하여 사용자에게 오류 상태를 표시할 수 있습니다. 단, 오류 상태가 오류를 유발한 원래 콘텐츠를 렌더링하지 않도록 해야 합니다. 그렇지 않으면 컴포넌트가 무한 렌더 루프에 빠질 수 있습니다.

  이 훅에서 `false`를 반환하면 오류의 추가 전파를 중단할 수 있습니다. 아래의 오류 전파 세부사항을 참고하세요.

  **오류 전파 규칙**

  - 기본적으로 모든 오류는 애플리케이션 레벨의 [`app.config.errorHandler`](/api/application#app-config-errorhandler)가 정의되어 있다면 여전히 전달되어, 이러한 오류를 한 곳에서 분석 서비스로 보고할 수 있습니다.

  - 컴포넌트의 상속 체인 또는 부모 체인에 여러 개의 `errorCaptured` 훅이 존재하는 경우, 동일한 오류에 대해 모두 하위에서 상위 순서로 호출됩니다. 이는 네이티브 DOM 이벤트의 버블링 메커니즘과 유사합니다.

  - `errorCaptured` 훅 자체에서 오류가 발생하면, 이 오류와 원래 포착된 오류 모두 `app.config.errorHandler`로 전달됩니다.

  - `errorCaptured` 훅에서 `false`를 반환하면 오류의 추가 전파를 막을 수 있습니다. 이는 "이 오류는 처리되었으니 무시해야 한다"는 의미입니다. 이 경우 추가적인 `errorCaptured` 훅이나 `app.config.errorHandler`는 이 오류에 대해 호출되지 않습니다.

  **오류 포착 주의사항**
  
  - 비동기 `setup()` 함수(최상위 `await` 사용)를 가진 컴포넌트에서는 Vue가 **항상** 컴포넌트 템플릿(template)을 렌더링하려고 시도합니다. 비록 `setup()`에서 오류가 발생하더라도 말이죠. 이로 인해 렌더링 중에 실패한 `setup()` 컨텍스트의 존재하지 않는 속성에 접근하려고 하여 추가 오류가 발생할 수 있습니다. 이러한 컴포넌트에서 오류를 포착할 때는 실패한 비동기 `setup()`(항상 먼저 발생)과 실패한 렌더 프로세스 양쪽의 오류를 모두 처리할 준비가 되어 있어야 합니다.

  - <sup class="vt-badge" data-text="SSR only"></sup> 부모 컴포넌트에서 `<Suspense>` 내부 깊은 곳의 오류가 발생한 자식 컴포넌트를 대체하면 SSR에서 하이드레이션(hydration) 불일치가 발생할 수 있습니다. 대신, 오류가 발생할 수 있는 로직을 자식의 `setup()`에서 별도의 함수로 분리하고, 부모 컴포넌트의 `setup()`에서 안전하게 `try/catch`로 실행하여 실제 자식 컴포넌트를 렌더링하기 전에 필요하다면 대체 처리를 하세요.

## renderTracked <sup class="vt-badge dev-only" /> {#rendertracked}

컴포넌트의 렌더 효과에 의해 반응형 의존성이 추적될 때 호출됩니다.

**이 훅은 개발 모드에서만 호출되며, 서버 사이드 렌더링 중에는 호출되지 않습니다.**

- **타입**

  ```ts
  interface ComponentOptions {
    renderTracked?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **참고** [반응성 심층 가이드](/guide/extras/reactivity-in-depth)

## renderTriggered <sup class="vt-badge dev-only" /> {#rendertriggered}

반응형 의존성이 컴포넌트의 렌더 효과를 다시 실행하도록 트리거할 때 호출됩니다.

**이 훅은 개발 모드에서만 호출되며, 서버 사이드 렌더링 중에는 호출되지 않습니다.**

- **타입**

  ```ts
  interface ComponentOptions {
    renderTriggered?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

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

## activated {#activated}

[`<KeepAlive>`](/api/built-in-components#keepalive)에 의해 캐시된 트리의 일부로 컴포넌트 인스턴스가 DOM에 삽입된 후 호출됩니다.

**이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

- **타입**

  ```ts
  interface ComponentOptions {
    activated?(this: ComponentPublicInstance): void
  }
  ```

- **참고** [가이드 - 캐시된 인스턴스의 라이프사이클](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## deactivated {#deactivated}

[`<KeepAlive>`](/api/built-in-components#keepalive)에 의해 캐시된 트리의 일부로 컴포넌트 인스턴스가 DOM에서 제거된 후 호출됩니다.

**이 훅은 서버 사이드 렌더링 중에는 호출되지 않습니다.**

- **타입**

  ```ts
  interface ComponentOptions {
    deactivated?(this: ComponentPublicInstance): void
  }
  ```

- **참고** [가이드 - 캐시된 인스턴스의 라이프사이클](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## serverPrefetch <sup class="vt-badge" data-text="SSR only" /> {#serverprefetch}

컴포넌트 인스턴스가 서버에서 렌더링되기 전에 해결되어야 하는 비동기 함수입니다.

- **타입**

  ```ts
  interface ComponentOptions {
    serverPrefetch?(this: ComponentPublicInstance): Promise<any>
  }
  ```

- **세부사항**

  이 훅이 Promise를 반환하면, 서버 렌더러는 Promise가 해결될 때까지 컴포넌트 렌더링을 대기합니다.

  이 훅은 서버 사이드 렌더링 중에만 호출되며, 서버 전용 데이터 패칭에 사용할 수 있습니다.

- **예시**

  ```js
  export default {
    data() {
      return {
        data: null
      }
    },
    async serverPrefetch() {
      // 컴포넌트가 초기 요청의 일부로 렌더링됨
      // 서버에서 데이터를 미리 패칭 (클라이언트보다 빠름)
      this.data = await fetchOnServer(/* ... */)
    },
    async mounted() {
      if (!this.data) {
        // 마운트 시 data가 null이면,
        // 컴포넌트가 클라이언트에서 동적으로 렌더링된 것임.
        // 대신 클라이언트에서 데이터를 패칭함.
        this.data = await fetchOnClient(/* ... */)
      }
    }
  }
  ```

- **참고** [서버 사이드 렌더링](/guide/scaling-up/ssr)
