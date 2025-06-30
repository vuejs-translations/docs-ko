# 옵션: 기타 {#options-misc}

## name {#name}

컴포넌트의 표시 이름을 명시적으로 선언합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    name?: string
  }
  ```

- **세부 정보**

  컴포넌트의 이름은 다음과 같은 용도로 사용됩니다:

  - 컴포넌트 자신의 템플릿에서 재귀적으로 자기 자신을 참조할 때
  - Vue DevTools의 컴포넌트 검사 트리에서 표시할 때
  - 경고 컴포넌트 추적에서 표시할 때

  싱글 파일 컴포넌트(SFC)를 사용할 때, 컴포넌트는 이미 파일 이름에서 자신의 이름을 추론합니다. 예를 들어, `MyComponent.vue`라는 파일은 "MyComponent"라는 표시 이름을 자동으로 갖게 됩니다.

  또 다른 경우로, 컴포넌트가 [`app.component`](/api/application#app-component)로 전역 등록될 때, 전역 ID가 자동으로 이름으로 설정됩니다.

  `name` 옵션을 사용하면 추론된 이름을 덮어쓸 수 있으며, 이름을 추론할 수 없는 경우(예: 빌드 도구를 사용하지 않거나 인라인된 비-SFC 컴포넌트 등) 명시적으로 이름을 지정할 수 있습니다.

  `name`이 명시적으로 필요한 한 가지 경우가 있습니다: [`<KeepAlive>`](/guide/built-ins/keep-alive)의 `include / exclude` props를 통해 캐시 가능한 컴포넌트와 매칭할 때입니다.

  :::tip
  3.2.34 버전부터 `<script setup>`을 사용하는 싱글 파일 컴포넌트는 파일 이름을 기반으로 `name` 옵션을 자동으로 추론하므로, `<KeepAlive>`와 함께 사용할 때도 이름을 수동으로 선언할 필요가 없습니다.
  :::

## inheritAttrs {#inheritattrs}

기본 컴포넌트 속성 전달(fallthrough) 동작을 활성화할지 제어합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    inheritAttrs?: boolean // 기본값: true
  }
  ```

- **세부 정보**

  기본적으로, props로 인식되지 않는 상위 스코프의 속성 바인딩은 "전달(fallthrough)"됩니다. 즉, 단일 루트 컴포넌트가 있을 때 이러한 바인딩은 자식 컴포넌트의 루트 엘리먼트에 일반 HTML 속성으로 적용됩니다. 타겟 엘리먼트나 다른 컴포넌트를 감싸는 컴포넌트를 작성할 때, 이러한 동작이 항상 원하는 것은 아닐 수 있습니다. `inheritAttrs`를 `false`로 설정하면 이 기본 동작을 비활성화할 수 있습니다. 이 속성들은 `$attrs` 인스턴스 프로퍼티를 통해 접근할 수 있으며, `v-bind`를 사용해 루트가 아닌 엘리먼트에 명시적으로 바인딩할 수 있습니다.

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

- **관련 문서**

  - [속성 전달(Fallthrough Attributes)](/guide/components/attrs)
  <div class="composition-api">

  - [일반 `<script>`에서 `inheritAttrs` 사용하기](/api/sfc-script-setup.html#usage-alongside-normal-script)
  </div>

## components {#components}

컴포넌트 인스턴스에서 사용할 수 있도록 컴포넌트를 등록하는 객체입니다.

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
      // 축약형
      Foo,
      // 다른 이름으로 등록
      RenamedBar: Bar
    }
  }
  ```

- **관련 문서** [컴포넌트 등록](/guide/components/registration)

## directives {#directives}

컴포넌트 인스턴스에서 사용할 수 있도록 디렉티브를 등록하는 객체입니다.

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
      // 템플릿에서 v-focus 사용 가능
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

- **관련 문서** [커스텀 디렉티브](/guide/reusability/custom-directives)
