<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // v-model에 대한 문서가 예전에 이 페이지의 일부였습니다. 오래된 링크를 리디렉션하려고 시도합니다.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>

# 컴포넌트 이벤트 {#component-events}

> 이 페이지는 이미 [컴포넌트 기본](/guide/essentials/component-basics)을 읽었다고 가정합니다. 컴포넌트(component)가 처음이라면 먼저 해당 내용을 읽으세요.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="사용자 정의 이벤트 정의에 대한 무료 Vue.js 강의"/>
</div>

## 이벤트 발생 및 리스닝 {#emitting-and-listening-to-events}

컴포넌트는 내장된 `$emit` 메서드를 사용하여 템플릿(template) 표현식(예: `v-on` 핸들러)에서 직접 커스텀 이벤트를 발생시킬 수 있습니다:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">Click Me</button>
```

<div class="options-api">

`$emit()` 메서드는 컴포넌트 인스턴스(instance)에서 `this.$emit()`으로도 사용할 수 있습니다:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```

</div>

부모는 `v-on`을 사용하여 해당 이벤트를 리스닝할 수 있습니다:

```vue-html
<MyComponent @some-event="callback" />
```

컴포넌트 이벤트 리스너(listener)에서도 `.once` 수식어(modifier)를 사용할 수 있습니다:

```vue-html
<MyComponent @some-event.once="callback" />
```

컴포넌트와 props처럼, 이벤트 이름도 자동으로 케이스 변환이 적용됩니다. 위에서는 camelCase 이벤트를 발생시켰지만, 부모에서는 kebab-case 리스너로 리스닝할 수 있습니다. [props 케이스](/guide/components/props#prop-name-casing)와 마찬가지로, 템플릿에서는 kebab-case 이벤트 리스너 사용을 권장합니다.

:::tip
네이티브 DOM 이벤트와 달리, 컴포넌트에서 발생한 이벤트는 **버블링되지 않습니다**. 직접적인 자식 컴포넌트가 발생시킨 이벤트만 리스닝할 수 있습니다. 형제 또는 깊게 중첩된 컴포넌트 간에 통신이 필요하다면 외부 이벤트 버스나 [글로벌 상태 관리 솔루션](/guide/scaling-up/state-management)을 사용하세요.
:::

## 이벤트 인자 {#event-arguments}

이벤트와 함께 특정 값을 발생시키는 것이 유용할 때가 있습니다. 예를 들어, `<BlogPost>` 컴포넌트가 텍스트를 얼마나 확대할지 결정하도록 하고 싶을 수 있습니다. 이런 경우, `$emit`에 추가 인자를 전달하여 값을 제공할 수 있습니다:

```vue-html
<button @click="$emit('increaseBy', 1)">
  1만큼 증가
</button>
```

그런 다음, 부모에서 이벤트를 리스닝할 때 인라인 화살표 함수를 리스너로 사용하면 이벤트 인자에 접근할 수 있습니다:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

또는, 이벤트 핸들러가 메서드인 경우:

```vue-html
<MyButton @increase-by="increaseCount" />
```

그러면 그 값이 해당 메서드의 첫 번째 매개변수로 전달됩니다:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip
`$emit()`을 호출할 때 이벤트 이름 뒤에 전달한 모든 추가 인자는 리스너로 전달됩니다. 예를 들어, `$emit('foo', 1, 2, 3)`의 경우 리스너 함수는 세 개의 인자를 받게 됩니다.
:::

## 발생시킬 이벤트 선언하기 {#declaring-emitted-events}

컴포넌트는 <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup#defineprops-defineemits) 매크로</span><span class="options-api">[`emits`](/api/options-state#emits) 옵션</span>을 사용하여 발생시킬 이벤트를 명시적으로 선언할 수 있습니다:

<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

`<template>`에서 사용한 `$emit` 메서드는 컴포넌트의 `<script setup>` 섹션 내에서는 접근할 수 없지만, `defineEmits()`는 대신 사용할 수 있는 동등한 함수를 반환합니다:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

`defineEmits()` 매크로는 **함수 내부에서 사용할 수 없으며**, 위 예시처럼 반드시 `<script setup>` 내에 직접 위치해야 합니다.

명시적인 `setup` 함수를 `<script setup>` 대신 사용하는 경우, 이벤트는 [`emits`](/api/options-state#emits) 옵션을 사용해 선언해야 하며, `emit` 함수는 `setup()` 컨텍스트에 노출됩니다:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

`setup()` 컨텍스트의 다른 속성과 마찬가지로, `emit`도 안전하게 구조 분해 할당할 수 있습니다:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```

</div>

`emits` 옵션과 `defineEmits()` 매크로는 객체 문법도 지원합니다. TypeScript를 사용하는 경우 인자에 타입을 지정할 수 있어, 발생시킨 이벤트의 페이로드에 대한 런타임 유효성 검사가 가능합니다:

<div class="composition-api">

```vue
<script setup lang="ts">
const emit = defineEmits({
  submit(payload: { email: string, password: string }) {
    // 유효성 검사 통과/실패를 나타내기 위해
    // `true` 또는 `false`를 반환합니다.
  }
})
</script>
```

`<script setup>`에서 TypeScript를 사용하는 경우, 순수 타입 주석만으로도 발생시킬 이벤트를 선언할 수 있습니다:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

자세한 내용: [컴포넌트 Emits 타입 지정](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```ts
export default {
  emits: {
    submit(payload: { email: string, password: string }) {
      // 유효성 검사 통과/실패를 나타내기 위해
      // `true` 또는 `false`를 반환합니다.
    }
  }
}
```

참고: [컴포넌트 Emits 타입 지정](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

</div>

선택 사항이지만, 컴포넌트가 어떻게 동작해야 하는지 더 잘 문서화하기 위해 발생시킬 모든 이벤트를 정의하는 것이 좋습니다. 또한 Vue가 [폴스루 속성(fallthrough attributes)](/guide/components/attrs#v-on-listener-inheritance)에서 알려진 리스너를 제외할 수 있게 하여, 서드파티 코드가 수동으로 디스패치한 DOM 이벤트로 인한 예외적인 상황을 방지할 수 있습니다.

:::tip
네이티브 이벤트(예: `click`)가 `emits` 옵션에 정의되어 있으면, 리스너는 이제 컴포넌트에서 발생시킨 `click` 이벤트만 리스닝하며, 더 이상 네이티브 `click` 이벤트에는 반응하지 않습니다.
:::

## 이벤트 유효성 검사 {#events-validation}

props 타입 유효성 검사와 유사하게, 발생시킬 이벤트가 배열 문법이 아닌 객체 문법으로 정의된 경우 유효성 검사를 할 수 있습니다.

유효성 검사를 추가하려면, 이벤트에 <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> 호출 시 전달된 인자를 받아 이벤트가 유효한지 여부를 boolean으로 반환하는 함수를 할당합니다.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // 유효성 검사 없음
  click: null,

  // submit 이벤트 유효성 검사
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('유효하지 않은 submit 이벤트 페이로드입니다!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // 유효성 검사 없음
    click: null,

    // submit 이벤트 유효성 검사
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('유효하지 않은 submit 이벤트 페이로드입니다!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>
