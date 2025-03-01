# 우선 순위 D 규칙: 주의해서 사용하기 {#priority-d-rules-use-with-caution}

::: warning 주의  
이 Vue.js 스타일 가이드는 오래된 내용이므로 검토가 필요합니다. 질문이나 제안 사항이 있다면 [이슈를 등록](https://github.com/vuejs/docs/issues/new)해 주세요.  
:::

Vue의 일부 기능은 드문 에지 케이스나 레거시 코드 베이스에서의 부드러운 마이그레이션을 수용하기 위해 존재합니다. 그러나 과도하게 사용되면 코드를 유지 관리하기 어렵게 만들거나 심지어 버그의 원인이 될 수 있습니다. 이 규칙들은 잠재적으로 위험한 기능에 대해 조명을 비추고, 언제 그리고 왜 피해야 하는지 설명합니다.

## `scoped`에서의 요소 선택자 {#element-selectors-with-scoped}

**`scoped`에서는 요소 선택자를 피해야 합니다.**

`scoped` 스타일에서는 요소 선택자보다 클래스 선택자를 선호합니다. 왜냐하면 많은 수의 요소 선택자는 처리 속도가 느리기 때문입니다.

::: details 상세한 설명
스타일을 범위 지정하기 위해, Vue는 컴포넌트 앨리먼트에 고유한 속성을 추가합니다, 예를 들어 `data-v-f3f3eg9` 같은 것입니다. 그런 다음 선택자가 수정되어 이 속성을 가진 일치하는 앨리먼트만 선택되도록 합니다 (예: `button[data-v-f3f3eg9]`).

문제는 많은 수의 앨리먼트-속성 선택자(예: `button[data-v-f3f3eg9]`)가 클래스-속성 선택자(예: `.btn-close[data-v-f3f3eg9]`)보다 상당히 느리다는 것이므로, 가능한 한 클래스 선택자를 선호해야 합니다.
:::

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```vue-html
<template>
  <button>×</button>
</template>

<style scoped>
button {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style scoped>
.btn-close {
  background-color: red;
}
</style>
```

</div>

## 암시적인 부모-자식 커뮤니케이션 {#implicit-parent-child-communication}

**부모-자식 컴포넌트 간의 커뮤니케이션은 `this.$parent`를 사용하거나 prop을 변형하는 대신, prop과 이벤트를 선호해야 합니다.**

이상적인 Vue 애플리케이션은 prop을 통해 아래로 전달하고, 이벤트를 통해 위로 전달합니다. 이 관례를 따르면 컴포넌트를 이해하기 훨씬 쉬워집니다. 그러나 prop 변형이나 `this.$parent`가 이미 깊게 결합된 두 컴포넌트를 단순화하는 에지 케이스가 있습니다.

문제는, 이러한 패턴들이 편리함을 제공할 수 있는 많은 _단순한_ 경우도 있다는 것입니다. 주의하세요: 단기적인 편리함(더 적은 코드 작성)을 위해 단순함(상태의 흐름을 이해할 수 있음)을 희생하는 유혹에 빠지지 마십시오.

<div class="options-api">

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  template: '<input v-model="todo.text">'
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  methods: {
    removeTodo() {
      this.$parent.todos = this.$parent.todos.filter(
        (todo) => todo.id !== vm.todo.id
      )
    }
  },

  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo">
        ×
      </button>
    </span>
  `
})
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  emits: ['input'],

  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  emits: ['delete'],

  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        ×
      </button>
    </span>
  `
})
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <input v-model="todo.text" />
</template>
```

```vue
<script setup>
import { getCurrentInstance } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const instance = getCurrentInstance()

function removeTodo() {
  const parent = instance.parent
  if (!parent) return

  parent.props.todos = parent.props.todos.filter((todo) => {
    return todo.id !== props.todo.id
  })
}
</script>

<template>
  <span>
    {{ todo.text }}
    <button @click="removeTodo">×</button>
  </span>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['input'])
</script>

<template>
  <input :value="todo.text" @input="emit('input', $event.target.value)" />
</template>
```

```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])
</script>

<template>
  <span>
    {{ todo.text }}
    <button @click="emit('delete')">×</button>
  </span>
</template>
```

</div>

</div>
