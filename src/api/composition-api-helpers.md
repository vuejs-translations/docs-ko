# Composition API: Helpers {#composition-api-helpers}

## useAttrs() {#useattrs}

[Setup Context](/api/composition-api-setup#setup-context)에서 `attrs` 객체를 반환하며, 이 객체에는 현재 컴포넌트의 [전달 속성(fallthrough attributes)](/guide/components/attrs#fallthrough-attributes)이 포함되어 있습니다. 이 함수는 setup 컨텍스트 객체를 사용할 수 없는 `<script setup>`에서 사용하도록 설계되었습니다.

- **타입**

  ```ts
  function useAttrs(): Record<string, unknown>
  ```

## useSlots() {#useslots}

[Setup Context](/api/composition-api-setup#setup-context)에서 `slots` 객체를 반환하며, 이 객체에는 부모로부터 전달된 슬롯이 Virtual DOM 노드를 반환하는 호출 가능한 함수로 포함되어 있습니다. 이 함수는 setup 컨텍스트 객체를 사용할 수 없는 `<script setup>`에서 사용하도록 설계되었습니다.

TypeScript를 사용하는 경우, [`defineSlots()`](/api/sfc-script-setup#defineslots)를 대신 사용하는 것이 더 좋습니다.

- **타입**

  ```ts
  function useSlots(): Record<string, (...args: any[]) => VNode[]>
  ```

## useModel() {#usemodel}

이 함수는 [`defineModel()`](/api/sfc-script-setup#definemodel)을 지원하는 기본 헬퍼입니다. `<script setup>`을 사용하는 경우, `defineModel()`을 대신 사용하는 것이 더 좋습니다.

- 3.4+에서만 사용 가능합니다.

- **타입**

  ```ts
  function useModel(
    props: Record<string, any>,
    key: string,
    options?: DefineModelOptions
  ): ModelRef

  type DefineModelOptions<T = any> = {
    get?: (v: T) => any
    set?: (v: T) => any
  }

  type ModelRef<T, M extends PropertyKey = string, G = T, S = T> = Ref<G, S> & [
    ModelRef<T, M, G, S>,
    Record<M, true | undefined>
  ]
  ```

- **예시**

  ```js
  export default {
    props: ['count'],
    emits: ['update:count'],
    setup(props) {
      const msg = useModel(props, 'count')
      msg.value = 1
    }
  }
  ```

- **상세 설명**

  `useModel()`은 SFC가 아닌 컴포넌트, 예를 들어 순수 `setup()` 함수를 사용할 때 사용할 수 있습니다. 첫 번째 인자로 `props` 객체를, 두 번째 인자로 모델 이름을 받습니다. 선택적인 세 번째 인자는 결과 모델 ref에 대한 커스텀 getter와 setter를 선언하는 데 사용할 수 있습니다. `defineModel()`과 달리, props와 emits를 직접 선언해야 한다는 점에 유의하세요.

## useTemplateRef() <sup class="vt-badge" data-text="3.5+" /> {#usetemplateref}

일치하는 ref 속성을 가진 템플릿 요소 또는 컴포넌트와 동기화되는 얕은 ref를 반환합니다.

- **타입**

  ```ts
  function useTemplateRef<T>(key: string): Readonly<ShallowRef<T | null>>
  ```

- **예시**

  ```vue
  <script setup>
  import { useTemplateRef, onMounted } from 'vue'

  const inputRef = useTemplateRef('input')

  onMounted(() => {
    inputRef.value.focus()
  })
  </script>

  <template>
    <input ref="input" />
  </template>
  ```

- **더 알아보기**
  - [가이드 - 템플릿 ref](/guide/essentials/template-refs)
  - [가이드 - 템플릿 ref 타입 지정](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [가이드 - 컴포넌트 템플릿 ref 타입 지정](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## useId() <sup class="vt-badge" data-text="3.5+" /> {#useid}

접근성 속성이나 폼 요소를 위한 애플리케이션별 고유 ID를 생성하는 데 사용됩니다.

- **타입**

  ```ts
  function useId(): string
  ```

- **예시**

  ```vue
  <script setup>
  import { useId } from 'vue'

  const id = useId()
  </script>

  <template>
    <form>
      <label :for="id">Name:</label>
      <input :id="id" type="text" />
    </form>
  </template>
  ```

- **상세 설명**

  `useId()`로 생성된 ID는 애플리케이션별로 고유합니다. 폼 요소와 접근성 속성의 ID를 생성하는 데 사용할 수 있습니다. 동일한 컴포넌트 내에서 여러 번 호출하면 서로 다른 ID가 생성되며, 동일한 컴포넌트의 여러 인스턴스가 `useId()`를 호출해도 각각 다른 ID가 생성됩니다.

  `useId()`로 생성된 ID는 서버와 클라이언트 렌더링 간에도 안정적으로 유지되므로, SSR 애플리케이션에서 하이드레이션 불일치 없이 사용할 수 있습니다.

  동일한 페이지에 여러 Vue 애플리케이션 인스턴스가 있는 경우, [`app.config.idPrefix`](/api/application#app-config-idprefix)를 통해 각 앱에 ID 접두사를 지정하여 ID 충돌을 방지할 수 있습니다.

  :::warning Caution
  `useId()` should be not be called inside a `computed()` property as it may cause instance conflicts. Instead, declare the ID outside of `computed()` and reference it within the computed function.
  :::
