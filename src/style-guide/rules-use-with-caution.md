# 우선순위 D 규칙: 주의해서 사용 {#priority-d-rules-use-with-care}

Vue의 일부 기능은 드문 에지 케이스나 레거시 코드 기반에서 원활한 마이그레이션을 위해 존재합니다. 그러나 과도하게 사용하면 코드 유지 관리가 더 어려워지거나 버그의 원인이 될 수 있습니다. 이 규칙은 잠재적으로 위험한 기능을 조명하여 언제, 왜 피해야 하는지 설명합니다.


## scoped`가 포함된 앨리먼트 선택기 {#element-selectors-with-scoped}

**앨리먼트 선택기는 `scoped`를 사용하지 않아야 합니다.

많은 수의 앨리먼트 선택기는 느리기 때문에 `scoped` 스타일의 앨리먼트 선택기보다 클래스 선택기를 선호합니다.


::: details 자세한 설명
스타일 범위를 지정하기 위해 Vue는 컴포넌트 앨리먼트에 `데이터-v-f3f3eg9`와 같은 고유 속성을 추가합니다. 그런 다음 이 속성을 가진 일치하는 앨리먼트만 선택되도록 선택기를 수정합니다(예: `button[data-v-f3f3eg9]`).

문제는 많은 수의 앨리먼트 속성 선택자(예: `button[data-v-f3f3eg9]`)가 클래스 속성 선택자(예: `.btn-close[data-v-f3f3eg9]`)보다 상당히 느리다는 것이므로 가능하면 클래스 선택자를 선호해야 한다는 것입니다.
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

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
<h3>Good</h3>

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

## 암시적 부모-자식 통신 {#implicit-parent-child-communication}

**부모-자식 컴포넌트 통신에는 `this.$parent` 또는 변이 프로퍼티 대신 프로퍼티와 이벤트가 선호됩니다.

이상적인 Vue 애플리케이션은 프로퍼티는 아래로, 이벤트는 위로 배치하는 것입니다. 이 규칙을 고수하면 컴포넌트를 훨씬 더 쉽게 이해할 수 있습니다. 그러나 프로퍼티 돌연변이 또는 `this.$parent`가 이미 깊게 결합된 두 컴포넌트를 단순화할 수 있는 에지 케이스가 있습니다.

문제는 이러한 패턴이 편의를 제공할 수 있는 _단순한_ 경우도 많다는 것입니다. 주의: 단기적인 편의성(코드 작성 감소)을 위해 단순성(상태의 흐름을 이해할 수 있음)을 거래하는 유혹에 빠지지 마세요.

<div class="style-example style-example-bad">
<h3>Bad</h3>

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
<h3>Good</h3>

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
