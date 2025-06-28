---
pageClass: api
---

# 내장 컴포넌트 {#built-in-components}

:::info 등록 및 사용법
내장 컴포넌트는 등록 없이 템플릿에서 바로 사용할 수 있습니다. 또한 트리 셰이킹이 가능합니다. 즉, 사용된 경우에만 빌드에 포함됩니다.

[렌더 함수](/guide/extras/render-function)에서 사용할 때는 명시적으로 import 해야 합니다. 예시:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```

:::

## `<Transition>` {#transition}

**하나의** 요소 또는 컴포넌트에 애니메이션 전환 효과를 제공합니다.

- **Props**

  ```ts
  interface TransitionProps {
    /**
     * 전환 CSS 클래스 이름을 자동으로 생성하는 데 사용됩니다.
     * 예: `name: 'fade'`를 지정하면 `.fade-enter`,
     * `.fade-enter-active` 등으로 자동 확장됩니다.
     */
    name?: string
    /**
     * CSS 전환 클래스를 적용할지 여부입니다.
     * 기본값: true
     */
    css?: boolean
    /**
     * 전환 종료 타이밍을 결정하기 위해
     * 대기할 전환 이벤트의 종류를 지정합니다.
     * 기본 동작은 더 긴 지속 시간을 가진
     * 타입을 자동 감지합니다.
     */
    type?: 'transition' | 'animation'
    /**
     * 전환의 명시적 지속 시간을 지정합니다.
     * 기본 동작은 루트 전환 요소에서 첫 번째 `transitionend`
     * 또는 `animationend` 이벤트를 대기합니다.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * 나가기/들어오기 전환의 타이밍 시퀀스를 제어합니다.
     * 기본 동작은 동시에 실행됩니다.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * 초기 렌더 시 전환을 적용할지 여부입니다.
     * 기본값: false
     */
    appear?: boolean

    /**
     * 전환 클래스를 커스터마이즈하기 위한 props입니다.
     * 템플릿에서는 케밥 케이스를 사용하세요. 예: enter-from-class="xxx"
     */
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    appearFromClass?: string
    appearActiveClass?: string
    appearToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }
  ```

- **이벤트**

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (`v-show`에서만)
  - `@appear-cancelled`

- **예시**

  단순 요소:

  ```vue-html
  <Transition>
    <div v-if="ok">토글된 내용</div>
  </Transition>
  ```

  `key` 속성을 변경하여 전환 강제 적용:

  ```vue-html
  <Transition>
    <div :key="text">{{ text }}</div>
  </Transition>
  ```

  동적 컴포넌트, 전환 모드 + appear 시 애니메이션:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  전환 이벤트 리스닝:

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">토글된 내용</div>
  </Transition>
  ```

- **더 알아보기** [가이드 - Transition](/guide/built-ins/transition)

## `<TransitionGroup>` {#transitiongroup}

목록 내 **여러** 요소 또는 컴포넌트에 전환 효과를 제공합니다.

- **Props**

  `<TransitionGroup>`은 `mode`를 제외한 `<Transition>`과 동일한 props를 받으며, 두 가지 추가 props가 있습니다:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * 정의하지 않으면 fragment로 렌더링됩니다.
     */
    tag?: string
    /**
     * 이동 전환 중 적용되는 CSS 클래스를 커스터마이즈합니다.
     * 템플릿에서는 케밥 케이스를 사용하세요. 예: move-class="xxx"
     */
    moveClass?: string
  }
  ```

- **이벤트**

  `<TransitionGroup>`은 `<Transition>`과 동일한 이벤트를 발생시킵니다.

- **상세 설명**

  기본적으로 `<TransitionGroup>`은 래퍼 DOM 요소를 렌더링하지 않지만, `tag` prop을 통해 정의할 수 있습니다.

  `<transition-group>` 내의 모든 자식은 애니메이션이 제대로 동작하려면 [**고유한 key**](/guide/essentials/list#maintaining-state-with-key)가 있어야 합니다.

  `<TransitionGroup>`은 CSS transform을 통한 이동 전환을 지원합니다. 업데이트 후 자식의 화면 위치가 변경되면, 이동 CSS 클래스( `name` 속성에서 자동 생성되거나 `move-class` prop으로 지정됨)가 적용됩니다. 이동 클래스가 적용될 때 CSS `transform` 속성이 "전환 가능"하다면, [FLIP 기법](https://aerotwist.com/blog/flip-your-animations/)을 사용하여 부드럽게 목적지로 애니메이션됩니다.

- **예시**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **더 알아보기** [가이드 - TransitionGroup](/guide/built-ins/transition-group)

## `<KeepAlive>` {#keepalive}

내부에 감싼 동적으로 토글되는 컴포넌트를 캐시합니다.

- **Props**

  ```ts
  interface KeepAliveProps {
    /**
     * 지정하면, `include`에 일치하는 이름의
     * 컴포넌트만 캐시됩니다.
     */
    include?: MatchPattern
    /**
     * `exclude`에 일치하는 이름의
     * 컴포넌트는 캐시되지 않습니다.
     */
    exclude?: MatchPattern
    /**
     * 캐시할 컴포넌트 인스턴스의 최대 개수입니다.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **상세 설명**

  동적 컴포넌트를 감쌀 때, `<KeepAlive>`는 비활성 컴포넌트 인스턴스를 파괴하지 않고 캐시합니다.

  한 번에 `<KeepAlive>`의 직접 자식으로는 하나의 활성 컴포넌트 인스턴스만 존재할 수 있습니다.

  `<KeepAlive>` 내부에서 컴포넌트가 토글될 때, 해당 컴포넌트의 `activated` 및 `deactivated` 라이프사이클 훅이 호출됩니다. 이는 `mounted`와 `unmounted`의 대안으로, 이 둘은 호출되지 않습니다. 이 동작은 `<KeepAlive>`의 직접 자식뿐만 아니라 모든 하위 컴포넌트에도 적용됩니다.

- **예시**

  기본 사용법:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  `v-if` / `v-else` 분기와 함께 사용할 때는 한 번에 하나의 컴포넌트만 렌더링되어야 합니다:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  `<Transition>`과 함께 사용:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  `include` / `exclude` 사용:

  ```vue-html
  <!-- 콤마로 구분된 문자열 -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- 정규식 (v-bind 사용) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- 배열 (v-bind 사용) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  `max`와 함께 사용:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **더 알아보기** [가이드 - KeepAlive](/guide/built-ins/keep-alive)

## `<Teleport>` {#teleport}

슬롯 콘텐츠를 DOM의 다른 위치에 렌더링합니다.

- **Props**

  ```ts
  interface TeleportProps {
    /**
     * 필수. 대상 컨테이너를 지정합니다.
     * 선택자 또는 실제 요소가 될 수 있습니다.
     */
    to: string | HTMLElement
    /**
     * `true`이면, 콘텐츠가 대상 컨테이너로 이동하지 않고
     * 원래 위치에 남아 있습니다.
     * 동적으로 변경할 수 있습니다.
     */
    disabled?: boolean
    /**
     * `true`이면, Teleport는
     * 애플리케이션의 다른 부분이 마운트된 후
     * 대상 해석을 지연합니다. (3.5+)
     */
    defer?: boolean
  }
  ```

- **예시**

  대상 컨테이너 지정:

  ```vue-html
  <Teleport to="#some-id" />
  <Teleport to=".some-class" />
  <Teleport to="[data-teleport]" />
  ```

  조건부 비활성화:

  ```vue-html
  <Teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </Teleport>
  ```

  대상 해석 지연 <sup class="vt-badge" data-text="3.5+" />:

  ```vue-html
  <Teleport defer to="#late-div">...</Teleport>

  <!-- 템플릿의 다른 위치에 -->
  <div id="late-div"></div>
  ```

- **더 알아보기** [가이드 - Teleport](/guide/built-ins/teleport)

## `<Suspense>` <sup class="vt-badge experimental" /> {#suspense}

컴포넌트 트리 내에서 중첩된 비동기 의존성을 조율하는 데 사용됩니다.

- **Props**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
    suspensible?: boolean
  }
  ```

- **이벤트**

  - `@resolve`
  - `@pending`
  - `@fallback`

- **상세 설명**

  `<Suspense>`는 두 개의 슬롯을 받습니다: `#default` 슬롯과 `#fallback` 슬롯. 기본 슬롯을 메모리에서 렌더링하는 동안 fallback 슬롯의 내용을 표시합니다.

  기본 슬롯을 렌더링하는 동안 비동기 의존성([비동기 컴포넌트](/guide/components/async) 및 [`async setup()`](/guide/built-ins/suspense#async-setup)이 있는 컴포넌트를 만나면, 모든 의존성이 해결될 때까지 기본 슬롯을 표시하지 않습니다.

  Suspense를 `suspensible`로 설정하면, 모든 비동기 의존성 처리가 부모 Suspense에 의해 처리됩니다. [구현 세부사항](https://github.com/vuejs/core/pull/6736) 참고

- **더 알아보기** [가이드 - Suspense](/guide/built-ins/suspense)
