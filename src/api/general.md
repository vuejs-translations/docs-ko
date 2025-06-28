# 글로벌 API: 일반 {#global-api-general}

## version {#version}

현재 Vue의 버전을 노출합니다.

- **타입:** `string`

- **예시**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick() {#nexttick}

다음 DOM 업데이트 플러시를 기다리기 위한 유틸리티입니다.

- **타입**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **세부사항**

  Vue에서 반응형 상태를 변경하면, 그에 따른 DOM 업데이트는 동기적으로 적용되지 않습니다. 대신 Vue는 "다음 틱"까지 이를 버퍼링하여, 여러 번 상태를 변경해도 각 컴포넌트가 한 번만 업데이트되도록 보장합니다.

  `nextTick()`은 상태 변경 직후에 DOM 업데이트가 완료될 때까지 기다릴 때 사용할 수 있습니다. 콜백을 인자로 전달하거나, 반환된 Promise를 await할 수 있습니다.

- **예시**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // DOM이 아직 업데이트되지 않음
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // DOM이 이제 업데이트됨
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

        // DOM이 아직 업데이트되지 않음
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // DOM이 이제 업데이트됨
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **관련 항목** [`this.$nextTick()`](/api/component-instance#nexttick)

## defineComponent() {#definecomponent}

타입 추론과 함께 Vue 컴포넌트를 정의하기 위한 타입 헬퍼입니다.

- **타입**

  ```ts
  // 옵션 문법
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // 함수 문법 (3.3+ 필요)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > 가독성을 위해 타입이 단순화되었습니다.

- **세부사항**

  첫 번째 인자는 컴포넌트 옵션 객체를 기대합니다. 반환값은 동일한 옵션 객체이며, 이 함수는 타입 추론 목적을 위한 런타임 no-op입니다.

  반환 타입은 약간 특별합니다: 옵션을 기반으로 추론된 컴포넌트 인스턴스 타입의 생성자 타입이 됩니다. 이는 반환 타입이 TSX에서 태그로 사용될 때 타입 추론에 사용됩니다.

  컴포넌트의 인스턴스 타입(옵션 내에서의 `this` 타입과 동일)을 `defineComponent()`의 반환 타입에서 다음과 같이 추출할 수 있습니다:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### 함수 시그니처 {#function-signature}

  - 3.3+에서만 지원

  `defineComponent()`는 Composition API 및 [렌더 함수 또는 JSX](/guide/extras/render-function.html)와 함께 사용하기 위한 대체 시그니처도 제공합니다.

  옵션 객체를 전달하는 대신, 함수를 전달해야 합니다. 이 함수는 Composition API의 [`setup()`](/api/composition-api-setup.html#composition-api-setup) 함수와 동일하게 동작하며, props와 setup context를 받습니다. 반환값은 렌더 함수여야 하며, `h()`와 JSX 모두 지원됩니다:

  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
      // <script setup>에서처럼 Composition API 사용
      const count = ref(0)

      return () => {
        // 렌더 함수 또는 JSX
        return h('div', count.value)
      }
    },
    // 추가 옵션, 예: props와 emits 선언
    {
      props: {
        /* ... */
      }
    }
  )
  ```

  이 시그니처의 주요 사용 사례는 TypeScript(특히 TSX)와 함께 사용하는 것입니다. 제네릭을 지원하기 때문입니다:

  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {
      // <script setup>에서처럼 Composition API 사용
      const count = ref(0)

      return () => {
        // 렌더 함수 또는 JSX
        return <div>{count.value}</div>
      }
    },
    // 현재는 런타임 props 선언이 수동으로 필요합니다.
    {
      props: ['msg', 'list']
    }
  )
  ```

  앞으로는 런타임 props 선언을 생략할 수 있도록, Babel 플러그인을 제공하여(마치 SFC의 `defineProps`처럼) 런타임 props를 자동으로 추론하고 주입할 계획입니다.

  ### webpack 트리쉐이킹에 대한 참고 {#note-on-webpack-treeshaking}

  `defineComponent()`는 함수 호출이기 때문에, 일부 빌드 도구(예: webpack)에서는 부작용이 있는 것으로 간주할 수 있습니다. 이로 인해 컴포넌트가 실제로 사용되지 않더라도 트리쉐이킹되지 않을 수 있습니다.

  이 함수 호출이 트리쉐이킹에 안전하다는 것을 webpack에 알리려면, 함수 호출 앞에 `/*#__PURE__*/` 주석을 추가할 수 있습니다:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  Vite를 사용하는 경우에는 필요하지 않습니다. Vite의 기본 프로덕션 번들러인 Rollup은 수동 주석 없이도 `defineComponent()`가 실제로 부작용이 없다는 것을 충분히 판단할 수 있습니다.

- **관련 항목** [가이드 - TypeScript와 함께 Vue 사용하기](/guide/typescript/overview#general-usage-notes)

## defineAsyncComponent() {#defineasynccomponent}

렌더링될 때에만 지연 로드되는 비동기 컴포넌트를 정의합니다. 인자는 로더 함수이거나, 로딩 동작을 더 세밀하게 제어할 수 있는 옵션 객체일 수 있습니다.

- **타입**

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **관련 항목** [가이드 - 비동기 컴포넌트](/guide/components/async)
