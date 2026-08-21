# 내장 특수 엘리먼트 {#built-in-special-elements}

:::info 컴포넌트가 아님
`<component>`, `<slot>`, `<template>`는 컴포넌트(component)와 유사한 기능을 하며 템플릿(template) 문법의 일부입니다. 이들은 실제 컴포넌트가 아니며 템플릿 컴파일 시 사라집니다. 따라서 템플릿에서는 관례적으로 소문자로 작성합니다.
:::

## `<component>` {#component}

동적 컴포넌트 또는 엘리먼트를 렌더링(rendering)하기 위한 "메타 컴포넌트"입니다.

- **Props**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **상세 설명**

  실제로 렌더링할 컴포넌트는 `is` prop에 의해 결정됩니다.

  - `is`가 문자열일 경우, HTML 태그 이름이거나 등록된 컴포넌트의 이름일 수 있습니다.

  - 또는, `is`에 컴포넌트의 정의 자체를 직접 바인딩(binding)할 수도 있습니다.

- **예시**

  등록된 이름으로 컴포넌트 렌더링하기 (Options API):

  ```vue
  <script>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: { Foo, Bar },
    data() {
      return {
        view: 'Foo'
      }
    }
  }
  </script>

  <template>
    <component :is="view" />
  </template>
  ```

  컴포넌트 정의로 렌더링하기 (`<script setup>`을 사용하는 Composition API):

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Math.random() > 0.5 ? Foo : Bar" />
  </template>
  ```

  HTML 엘리먼트 렌더링하기:

  ```vue-html
  <component :is="href ? 'a' : 'span'"></component>
  ```

  [내장 컴포넌트](./built-in-components)도 모두 `is`에 전달할 수 있지만, 이름으로 전달하려면 반드시 등록해야 합니다. 예를 들어:

  ```vue
  <script>
  import { Transition, TransitionGroup } from 'vue'

  export default {
    components: {
      Transition,
      TransitionGroup
    }
  }
  </script>

  <template>
    <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
      ...
    </component>
  </template>
  ```

  컴포넌트 자체를 `is`에 전달하는 경우(예: `<script setup>`에서)는 등록이 필요하지 않습니다.

  `<component>` 태그에 `v-model`을 사용할 경우, 템플릿 컴파일러는 이를 `modelValue` prop과 `update:modelValue` 이벤트 리스너(listener)로 확장합니다. 이는 다른 컴포넌트와 마찬가지입니다. 하지만, 이는 `<input>`이나 `<select>`와 같은 네이티브 HTML 엘리먼트와는 호환되지 않습니다. 따라서, 동적으로 생성된 네이티브 엘리먼트에 `v-model`을 사용하는 것은 동작하지 않습니다:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const tag = ref('input')
  const username = ref('')
  </script>

  <template>
    <!-- 'input'이 네이티브 HTML 엘리먼트이므로 동작하지 않습니다 -->
    <component :is="tag" v-model="username" />
  </template>
  ```

  실제로 이와 같은 예외적인 경우는 드물며, 네이티브 폼 필드는 실제 애플리케이션에서 보통 컴포넌트로 감싸서 사용합니다. 만약 네이티브 엘리먼트를 직접 사용해야 한다면, `v-model`을 속성과 이벤트로 수동 분리하여 사용할 수 있습니다.

- **관련 문서** [동적 컴포넌트](/guide/essentials/component-basics#dynamic-components)

## `<slot>` {#slot}

템플릿에서 슬롯(slot) 콘텐츠의 출력 위치를 나타냅니다.

- **Props**

  ```ts
  interface SlotProps {
    /**
     * <slot>에 전달된 모든 prop은
     * 스코프 슬롯의 인자로 전달됩니다
     */
    [key: string]: any
    /**
     * 슬롯 이름을 지정할 때 사용됩니다.
     */
    name?: string
  }
  ```

- **상세 설명**

  `<slot>` 엘리먼트는 `name` 속성을 사용하여 슬롯 이름을 지정할 수 있습니다. `name`이 지정되지 않으면 기본 슬롯이 렌더링됩니다. 슬롯 엘리먼트에 전달된 추가 속성들은 부모에서 정의된 스코프 슬롯(scoped slots)에 슬롯 prop으로 전달됩니다.

  해당 엘리먼트 자체는 일치하는 슬롯 콘텐츠로 대체됩니다.

  Vue 템플릿의 `<slot>` 엘리먼트는 자바스크립트로 컴파일되므로, [네이티브 `<slot>` 엘리먼트](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)와 혼동하지 마세요.

- **관련 문서** [컴포넌트 - 슬롯](/guide/components/slots)

## `<template>` {#template}

`<template>` 태그는 DOM에 엘리먼트를 렌더링하지 않고 내장 디렉티브를 사용하고 싶을 때 플레이스홀더로 사용됩니다.

- **상세 설명**

  `<template>`에 대한 특별한 처리는 다음 디렉티브(directive) 중 하나와 함께 사용될 때만 적용됩니다:

  - `v-if`, `v-else-if`, 또는 `v-else`
  - `v-for`
  - `v-slot`

  이들 디렉티브가 없으면 [네이티브 `<template>` 엘리먼트](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)로 렌더링됩니다.

  `v-for`가 있는 `<template>`에는 [`key` 속성](/api/built-in-special-attributes#key)을 사용할 수 있습니다. 그 외의 모든 속성과 디렉티브는 해당 엘리먼트가 없으면 의미가 없으므로 무시됩니다.

  싱글 파일 컴포넌트는 전체 템플릿을 감싸기 위해 [최상위 `<template>` 태그](/api/sfc-spec#language-blocks)를 사용합니다. 이 사용법은 위에서 설명한 `<template>`의 사용과는 별개입니다. 최상위 태그는 템플릿 자체의 일부가 아니며, 디렉티브와 같은 템플릿 문법을 지원하지 않습니다.

- **관련 문서**
  - [가이드 - `<template>`에서의 `v-if`](/guide/essentials/conditional#v-if-on-template)
  - [가이드 - `<template>`에서의 `v-for`](/guide/essentials/list#v-for-on-template)
  - [가이드 - 명명된 슬롯](/guide/components/slots#named-slots)
