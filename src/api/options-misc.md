# 옵션: 기타 {#options-misc}

## name {#name}

컴포넌트에 대한 표시 이름을 명시적으로 선언합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    name?: string
  }
  ```

- **상세 정보**

  컴포넌트의 이름은 다음과 같은 용도로 사용됩니다:

  - 컴포넌트 자체 템플릿에서 재귀적인 자기 참조
  - Vue DevTools의 컴포넌트 검사 트리에서 표시
  - 경고 컴포넌트 추적에서 표시

  단일 파일 컴포넌트(Single-File Components)를 사용하는 경우, 컴포넌트는 이미 파일 이름에서 추론된 이름을 가지게 됩니다. 예를 들어, `MyComponent.vue`라는 파일은 추론된 표시 이름이 "MyComponent"가 됩니다.

  또 다른 경우는 [`app.component`](/api/application#app-component)를 사용하여 전역으로 컴포넌트를 등록하는 경우, 전역 ID가 자동으로 이름으로 설정됩니다.

  `name` 옵션을 사용하면 추론된 이름을 재정의하거나 이름을 명시적으로 제공할 수 있습니다 (빌드 도구를 사용하지 않거나 인라인된 비-SFC 컴포넌트를 사용하는 경우와 같이 이름을 추론할 수 없는 경우).

  `name`이 명시적으로 필요한 경우가 하나 있습니다: [`<KeepAlive>`](/guide/built-ins/keep-alive)의 `include / exclude` props에서 캐시 가능한 컴포넌트와 일치시킬 때입니다.

  :::tip
  3.2.34 버전부터 `<script setup>`을 사용하는 단일 파일 컴포넌트는 `<KeepAlive>`와 함께 사용될 때도 이름을 수동으로 선언할 필요 없이 파일 이름을 기반으로 자동으로 `name` 옵션을 추론합니다.
  :::

## inheritAttrs {#inheritattrs}

기본 컴포넌트 속성 전달 동작을 활성화할지 여부를 제어합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    inheritAttrs?: boolean // 기본값: true
  }
  ```

- **상세 정보**

  기본적으로, 부모 범위에서 인식되지 않는 속성 바인딩은 "전달됩니다(fallthrough)". 즉, 단일 루트 컴포넌트인 경우, 이러한 바인딩은 하위 컴포넌트의 루트 요소에 일반 HTML 속성으로 적용됩니다. 대상 요소나 다른 컴포넌트를 감싸는 컴포넌트를 작성할 때 항상 원하는 동작은 아닐 수 있습니다. `inheritAttrs`를 `false`로 설정하여 이 기본 동작을 비활성화할 수 있습니다. 속성은 `$attrs` 인스턴스 속성을 통해 사용할 수 있으며, `v-bind`를 사용하여 비루트 요소에 명시적으로 바인딩할 수 있습니다.

- **예시**

  <div class="options-api">

  ```vue
  <script>
  export default {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input']
  }
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>
  <div class="composition-api">

  `<script setup>`을 사용하는 컴포넌트에서 이 옵션을 선언할 때는 [`defineOptions`](/api/sfc-script-setup#defineoptions) 매크로를 사용할 수 있습니다:

  ```vue
  <script setup>
  defineProps(['label', 'value'])
  defineEmits(['input'])
  defineOptions({
    inheritAttrs: false
  })
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>

- **참고** [전달 속성](/guide/components/attrs)

## components {#components}

컴포넌트 인스턴스에서 사용 가능하도록 컴포넌트를 등록하는 객체입니다.

- **타입**

  ```ts
  interface ComponentOptions {
    components?: { [key: string]: Component }
  }
  ```

- **예시**

  ```js
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: {
      // 간략한 표현
      Foo,
      // 다른 이름으로 등록
      RenamedBar: Bar
    }
  }
  ```

- **참고** [컴포넌트 등록](/guide/components/registration)

## directives {#directives}

컴포넌트 인스턴스에서 사용 가능하도록 지시자를 등록하는 객체입니다.

- **타입**

  ```ts
  interface ComponentOptions {
    directives?: { [key: string]: Directive }
  }
  ```

- **예시**

  ```js


  export default {
    directives: {
      // 템플릿에서 v-focus 활성화
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    }
  }
  ```

  ```vue-html
  <input v-focus>
  ```

- **참고** [사용자 정의 지시자](/guide/reusability/custom-directives)
