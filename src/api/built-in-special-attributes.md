# 내장 특수 속성 {#built-in-special-attributes}

## key {#key}

`key` 특수 속성은 주로 Vue의 가상 DOM 알고리즘이 새로운 노드 목록과 이전 노드 목록을 비교(diffing)할 때 vnode를 식별하는 힌트로 사용됩니다.

- **기대값:** `number | string | symbol`

- **세부사항**

  key가 없으면, Vue는 요소의 이동을 최소화하고 같은 타입의 요소를 최대한 제자리에서 패치/재사용하려는 알고리즘을 사용합니다. key가 있으면, key의 순서 변경에 따라 요소를 재정렬하고, 더 이상 존재하지 않는 key를 가진 요소는 항상 제거/파괴됩니다.

  동일한 공통 부모를 가진 자식들은 **고유한 key**를 가져야 합니다. 중복된 key는 렌더링(rendering) 오류를 일으킵니다.

  가장 일반적인 사용 사례는 `v-for`와 결합하는 것입니다:

  ```vue-html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  또한 요소/컴포넌트(component)의 재사용 대신 교체를 강제로 할 때 사용할 수 있습니다. 이는 다음과 같은 경우에 유용할 수 있습니다:

  - 컴포넌트의 라이프사이클(lifecycle) 훅(hook)을 제대로 트리거하고 싶을 때
  - 트랜지션(transition)을 트리거하고 싶을 때

  예를 들어:

  ```vue-html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  `text`가 변경되면, `<span>`은 항상 패치되는 대신 교체되어 트랜지션이 트리거됩니다.

- **관련 문서** [가이드 - 리스트 렌더링 - `key`로 상태 유지하기](/guide/essentials/list#maintaining-state-with-key)

## ref {#ref}

[템플릿(template) ref](/guide/essentials/template-refs)를 나타냅니다.

- **기대값:** `string | Function`

- **세부사항**

  `ref`는 요소나 자식 컴포넌트에 대한 참조를 등록하는 데 사용됩니다.

  옵션 API에서는 참조가 컴포넌트의 `this.$refs` 객체에 등록됩니다:

  ```vue-html
  <!-- this.$refs.p로 저장됨 -->
  <p ref="p">hello</p>
  ```

  컴포지션 API에서는 참조가 동일한 이름의 ref에 저장됩니다:

  ```vue
  <script setup>
  import { useTemplateRef } from 'vue'

  const pRef = useTemplateRef('p')
  </script>

  <template>
    <p ref="p">hello</p>
  </template>
  ```

  일반 DOM 요소에 사용하면 참조는 해당 요소가 되고, 자식 컴포넌트에 사용하면 참조는 자식 컴포넌트 인스턴스(instance)가 됩니다.

  또는 `ref`는 함수 값을 받아 참조를 어디에 저장할지 완전히 제어할 수 있습니다:

  ```vue-html
  <ChildComponent :ref="(el) => child = el" />
  ```

  ref 등록 타이밍에 대한 중요한 참고 사항: ref 자체는 렌더 함수의 결과로 생성되기 때문에, 컴포넌트가 마운트(mount)될 때까지 참조에 접근해서는 안 됩니다.

  `this.$refs`는 반응형이 아니므로, 데이터 바인딩(binding)을 위해 템플릿에서 사용하려고 해서는 안 됩니다.

- **관련 문서**
  - [가이드 - 템플릿 ref](/guide/essentials/template-refs)
  - [가이드 - 템플릿 ref 타입 지정](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [가이드 - 컴포넌트 템플릿 ref 타입 지정](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## is {#is}

[동적 컴포넌트](/guide/essentials/component-basics#dynamic-components) 바인딩에 사용됩니다.

- **기대값:** `string | Component`

- **네이티브 요소에서의 사용**
 
  - 3.1+에서만 지원됩니다

  `is` 속성이 네이티브 HTML 요소에 사용되면, [커스터마이즈드 내장 요소](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)로 해석되며, 이는 웹 플랫폼의 네이티브 기능입니다.

  하지만 [in-DOM 템플릿 파싱 주의사항](/guide/essentials/component-basics#in-dom-template-parsing-caveats)에서 설명한 것처럼, 네이티브 요소를 Vue 컴포넌트로 대체해야 할 필요가 있을 수 있습니다. 이 경우 `is` 속성 값 앞에 `vue:`를 붙이면 Vue가 해당 요소를 Vue 컴포넌트로 렌더링합니다:

  ```vue-html
  <table>
    <tr is="vue:my-row-component"></tr>
  </table>
  ```

- **관련 문서**

  - [내장 특수 요소 - `<component>`](/api/built-in-special-elements#component)
  - [동적 컴포넌트](/guide/essentials/component-basics#dynamic-components)
