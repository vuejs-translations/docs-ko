# Composition API: Helpers {#composition-api-helpers}

## useAttrs() {#useattrs}

[Setup Context](/api/composition-api-setup#setup-context)에서 `attrs` 객체를 반환하며, 이는 현재 컴포넌트의 [전달 속성(fallthrough attributes)](/guide/components/attrs#fallthrough-attributes)을 포함합니다. 이 기능은 `<script setup>`에서 사용하도록 설계되었으며, 해당 환경에서는 setup 컨텍스트 객체가 제공되지 않습니다.

- **타입**

  ```ts
  function useAttrs(): Record<string, unknown>
  ```

## useSlots() 

[Setup Context](/api/composition-api-setup#setup-context)에서 `slots` 객체를 반환하며, 이는 부모가 전달한 슬롯을 가상 DOM 노드를 반환하는 호출 가능한 함수 형태로 포함합니다. 이 기능은 `<script setup>`에서 사용하도록 설계되었으며, 해당 환경에서는 setup 컨텍스트 객체가 제공되지 않습니다.

TypeScript를 사용할 경우, [`defineSlots()`](/api/sfc-script-setup#defineslots)를 대신 사용하는 것이 권장됩니다.

- **타입**

  ```ts
  function useSlots(): Record<string, (...args: any[]) => VNode[]>
  ```

## useModel() {#usemodel}

이것은 [`defineModel()`](/api/sfc-script-setup#definemodel)을 지원하는 기본 헬퍼 함수입니다. `<script setup>`을 사용하는 경우, `defineModel()`을 대신 사용하는 것이 권장됩니다.

- 버전 3.4 이상에서만 사용 가능합니다.

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

- **예제**

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

- **Details**

  `useModel()`은 SFC가 아닌 컴포넌트에서도 사용할 수 있으며, 예를 들어, `setup()` 함수를 직접 사용할 때 활용할 수 있습니다. 첫 번째 인자로 `props` 객체를, 두 번째 인자로 모델 이름을 전달해야 합니다. 선택적인 세 번째 인자는 반환된 모델 ref에 대한 사용자 정의 getter와 setter를 선언하는 데 사용할 수 있습니다.  단, `defineModel()`과는 달리 `props` 및 `emits`를 직접 선언해야 한다는 점에 유의해야 합니다.

  

## useTemplateRef() <sup class="vt-badge" data-text="3.5+" /> {#usetemplateref}

일치하는 `ref` 속성을 가진 템플릿 요소 또는 컴포넌트와 동기화되는 얕은 ref를 반환합니다.

- **타입**

  ```ts
  function useTemplateRef<T>(key: string): Readonly<ShallowRef<T | null>>
  ```

- **예제**

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

- **참조**
  - [가이드 - Template Refs](/guide/essentials/template-refs)
  - [가이드 - Typing Template Refs](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [가이드 - Typing Component Template Refs](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## useId() <sup class="vt-badge" data-text="3.5+" /> {#useid}

접근성 속성 또는 폼 요소에 사용할 애플리케이션별 고유 ID를 생성하는 데 사용됩니다.

- **타입**

  ```ts
  function useId(): string
  ```

- **예제**

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

- **상세**

  `useId()`로 생성된 ID는 애플리케이션 내에서 고유합니다. 이 함수는 폼 요소 및 접근성 속성에 사용할 ID를 생성하는 데 사용할 수 있습니다. 동일한 컴포넌트 내에서 여러 번 호출하면 각각 다른 ID가 생성되며, 동일한 컴포넌트의 여러 인스턴스가 `useId()`를 호출하더라도 서로 다른 ID가 부여됩니다.

  또한, `useId()`로 생성된 ID는 서버와 클라이언트 렌더링 간에도 안정적으로 유지되므로, SSR(서버 사이드 렌더링) 애플리케이션에서 사용해도 hydration 불일치 문제가 발생하지 않습니다.

  동일한 페이지에서 여러 개의 Vue 애플리케이션 인스턴스를 사용하는 경우, [`app.config.idPrefix`](/api/application#app-config-idprefix)를 통해 각 애플리케이션에 ID 접두사를 지정하여 ID 충돌을 방지할 수 있습니다.
