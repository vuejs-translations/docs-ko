# Global API: General {#global-api-general}

## version {#version}

Vue의 현재 버전(문자열)을 반환합니다.

- **타입:** `string`

- **예제**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick() {#nexttick}

다음 DOM 업데이트 발생을 기다리는 유틸리티입니다.

- **타입**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **세부 사항**
  반응형 상태를 변경한 결과는 동기적으로 DOM에 업데이트되지 않습니다.
  대신, 이것은 상태를 얼마나 많이 변경했는지에 관계없이 "다음 틱"까지 버퍼링하여, 각 컴포넌트가 한 번만 업데이트 되었음을 보장합니다.

  `nextTick()`은 상태 변경 직후에 DOM 업데이트가 완료될 때까지 대기하는 데 사용할 수 있습니다.
  콜백을 인자로 전달하거나, 프로미스(Promise) 반환을 기다릴 수 있습니다.

- **예제**

  
  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // 아직 DOM 업데이트되지 않음.
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // 이제 DOM 업데이트됨.
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

        // 아직 DOM 업데이트되지 않음.
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // 이제 DOM 업데이트됨.
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

- **참고** [`this.$nextTick()`](/api/component-instance#nexttick)

## defineComponent() {#definecomponent}

타입 추론으로 Vue 컴포넌트를 정의하기 위한 타입 핼퍼입니다.

- **타입**

  ```ts
  // options 문법
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // function 문법 (requires 3.3+)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > 타입은 가독성을 위해 단순화되었습니다.

- **세부 사항**

  첫 번째 인자로 컴포넌트 옵션 객체가 필요합니다.
  이 함수는 본질적으로 타입 추론 목적이므로, 동일한 옵션 객체를 반환하며, 런타임에 작동하지 않습니다.

  반환 타입은 약간 특별한데, 옵션을 기반으로 추론된 컴포넌트 인스턴스 타입인 생성자 타입이 됩니다.
  이것은 반환된 타입이 TSX에서 태그로 사용될 때 타입 추론에 사용됩니다.

  다음과 같이 `defineComponent()`의 반환 타입에서 컴포넌트의 인스턴스 타입(해당 옵션의 `this` 타입과 동일)을 추출할 수 있습니다:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### Function Signature {#function-signature}

  - 3.3+ 버전에서만 지원됩니다.

  `defineComponent()`은 Composition API 및 [렌더 함수 또는 JSX](/guide/extras/render-function)와 함께 사용할 수 있도록 설계된 또 다른 형태의 시그니처를 제공합니다.

  옵션 객체를 전달하는 대신, 함수를 전달해야 합니다. 이 함수는 Composition API의 [`setup()`](/api/composition-api-setup#composition-api-setup) 함수와 동일한 방식으로 동작하며, props와 setup 컨텍스트를 매개변수로 받습니다. 반환값은 렌더 함수여야 하며, `h()`와 JSX를 모두 지원합니다.


  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
      // 여기에서는 `<script setup>`에서와 같이 Composition API를 사용하세요.
      const count = ref(0)

      return () => {
        // 렌더 함수 또는 JSX
        return h('div', count.value)
      }
    },
    // 추가 옵션(예: props 및 emits 선언)
    {
      props: {
        /* ... */
      }
    }
  )
  ```

  이 시그니처의 주요 사용 사례는 TypeScript(특히 TSX)와 함께 사용하는 경우로, 제네릭을 지원하기 때문입니다.:


  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {
      // 여기에서는 `<script setup>`에서와 같이 Composition API를 사용하세요.
      const count = ref(0)

      return () => {
        // 렌더 함수 또는 JSX
        return <div>{count.value}</div>
      }
    },
    //현재는 수동으로 런타임 props 선언이 여전히 필요합니다.
  {
      props: ['msg', 'list']
    }
  )
  ```

향후에는 Babel 플러그인을 제공하여 런타임 props를 자동으로 추론하고 주입할 수 있도록 할 계획입니다. (`defineProps`가 SFC에서 동작하는 방식과 유사) 이를 통해 런타임 props 선언을 생략할 수 있게 될 것입니다.

  ### Note on webpack Treeshaking {#note-on-webpack-treeshaking}

  `defineComponent()`는 함수 호출이기 때문에 웹팩과 같은 일부 빌드 도구에 부작용(Side-effect)을 일으키는 것처럼 보일 수 있습니다. 이렇게 하면 컴포넌트가 전혀 사용되지 않는 경우에도 트리가 흔들리는 것을 방지할 수 있습니다.

  이 함수 호출이 트리 셰이크해도 안전하다는 것을 웹팩에 알리려면 함수 호출 앞에 `/*#__PURE__*/` 주석 표기법을 추가하면 됩니다:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  롤업(Vite에서 사용하는 기본 프로덕션 번들러)은 수동 어노테이션 없이도 `defineComponent()`가 실제로 부작용이 없는지 판단할 수 있을 만큼 똑똑하기 때문에 Vite를 사용하는 경우 이 작업이 필요하지 않습니다.

- **참고** [가이드 - Vue에서 타입스크립트 사용하기](/guide/typescript/overview#general-usage-notes)

## defineAsyncComponent() {#defineasynccomponent}

렌더링될 때 지연 로드되는 비동기 컴포넌트를 정의합니다.
인자는 로더 함수이거나 로드 동작의 고급 제어를 위한 옵션 객체일 수 있습니다.

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

- **참고** [가이드 - 비동기 컴포넌트](/guide/components/async)
