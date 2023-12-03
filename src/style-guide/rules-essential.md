# 우선 순위 A 규칙: 필수 {#priority-a-rules-essential}

이 규칙들은 오류를 방지하는 데 도움이 되므로, 반드시 숙지하고 따라야 합니다. 예외는 있을 수 있지만, JavaScript와 Vue에 대한 전문 지식을 가진 사람만이 드물게 만들어야 합니다.

## 멀티 워드 컴포넌트 이름 사용 {#use-multi-word-component-names}

사용자 컴포넌트 이름은 항상 멀티 워드여야 하며, 루트 `App` 컴포넌트를 제외합니다. 이는 모든 HTML 요소가 단어 하나로 구성되어 있으므로, 기존 및 미래의 HTML 요소와의 [충돌을 방지](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)합니다.

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```vue-html
<!-- 사전 컴파일된 템플릿에서 -->
<Item />

<!-- in-DOM 템플릿에서 -->
<item></item>
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```vue-html
<!-- 사전 컴파일된 템플릿에서 -->
<TodoItem />

<!-- in-DOM 템플릿에서 -->
<todo-item></todo-item>
```

</div>

## 상세한 prop 정의 사용 {#use-detailed-prop-definitions}

커밋된 코드에서는 prop 정의가 가능한 한 상세해야 하며, 최소한 타입을 명시해야 합니다.

::: details 상세한 설명
상세한 [prop 정의](/guide/components/props#prop-validation)는 두 가지 장점이 있습니다:

- 컴포넌트의 API를 문서화하여 컴포넌트의 사용 방법을 쉽게 파악할 수 있습니다.
- 개발 중에 Vue는 잘못된 형식의 props가 컴포넌트에 제공될 경우 경고를 표시하여 오류의 잠재적 원인을 잡을 수 있도록 도와줍니다.
  :::

<div class="options-api">

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```js
// 이것은 프로토타이핑할 때만 괜찮습니다
props: ['status']
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```js
props: {
  status: String
}
```

```js
// 더 좋은 예!
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```js
// 이것은 프로토타이핑할 때만 괜찮습니다
const props = defineProps(['status'])
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```js
const props = defineProps({
  status: String
})
```

```js
// 더 좋은 예!

const props = defineProps({
  status: {
    type: String,
    required: true,

    validator: (value) => {
      return ['syncing', 'synced', 'version-conflict', 'error'].includes(
        value
      )
    }
  }
})
```

</div>

</div>

## `v-for`에 `key` 사용하기 {#use-keyed-v-for}

컴포넌트 내에서 하위 트리의 내부 컴포넌트 상태를 유지하기 위해, `v-for`와 함께 `key`는 _항상_ 필요합니다. 심지어 요소에 대해서도, [객체의 일관성](https://bost.ocks.org/mike/constancy/)과 같은 예측 가능한 동작을 유지하는 것이 좋은 관행입니다.

::: details 상세한 설명
할 일 목록이 있다고 가정해 봅시다:

<div class="options-api">

```js
data() {
  return {
    todos: [
      {
        id: 1,
        text: 'v-for 사용법 배우기'
      },
      {
        id: 2,
        text: 'key 사용법 배우기'
      }
    ]
  }
}
```

</div>

<div class="composition-api">

```js
const todos = ref([
  {
    id: 1,
    text: 'v-for 사용법 배우기'
  },
  {
    id: 2,
    text: 'key 사용법 배우기'
  }
])
```

</div>

그런 다음 그것들을 알파벳 순으로 정렬합니다. DOM을 업데이트할 때, Vue는 가능한 가장 저렴한 DOM 변형을 수행하기 위해 렌더링을 최적화할 것입니다. 이것은 첫 번째 할 일 요소를 삭제한 다음 목록 끝에 다시 추가하는 것을 의미할 수 있습니다.

문제는 DOM에 남아 있을 요소를 삭제하지 않는 것이 중요한 경우가 있다는 것입니다. 예를 들어, 목록 정렬을 애니메이션으로 표현하기 위해 `<transition-group>`을 사용하거나 렌더링된 요소가 `<input>`인 경우 포커스를 유지하고 싶을 수 있습니다. 이러한 경우에 각 항목에 고유한 키를 추가하는 것 (예: `:key="todo.id"`)은 Vue에게 더 예측 가능하게 행동하도록 지시합니다.

우리의 경험에 따르면, _항상_ 고유한 키를 추가하는 것이 좋습니다, 그래서 당신과 당신의 팀은 이러한 에지 케이스에 대해 결코 걱정할 필요가 없습니다. 그런 다음 객체의 일관성이 필요하지 않은 드문 성능 중심의 시나리오에서 의식적으로 예외를 만들 수 있습니다.
:::

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```vue-html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```vue-html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

</div>

## `v-if`와 `v-for`를 함께 사용하지 않기 {#avoid-v-if-with-v-for}

**`v-for`가 있는 같은 요소에 `v-if`를 사용하지 마세요.**

이것이 유혹적일 수 있는 두 가지 일반적인 경우가 있습니다:

- 목록의 항목을 필터링하기 위해 (예: `v-for="user in users" v-if="user.isActive"`). 이 경우에는 `users`를 새로운 계산된 속성으로 대체하여 필터링된 목록을 반환하도록 합니다 (예: `activeUsers`).

- 목록이 숨겨져야 할 경우 목록을 렌더링하지 않기 위해 (예: `v-for="user in users" v-if="shouldShowUsers"`). 이 경우에는 `v-if`를 컨테이너 요소 (예: `ul`, `ol`)로 이동시킵니다.

::: details 상세한 설명
Vue가 지시문을 처리할 때, `v-if`는 `v-for`보다 더 높은 우선 순위를 가지므로, 이 템플릿:

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

는 오류를 발생시킬 것입니다, 왜냐하면 `v-if` 지시문이 먼저 평가되고 이 시점에 반복 변수 `user`가 존재하지 않기 때문입니다.

이는 계산된 속성을 대신 반복하는 것으로 수정할 수 있습니다, 예를 들어:

<div class="options-api">

```js
computed: {
  activeUsers() {
    return this.users.filter(user => user.isActive)
  }
}
```

</div>

<div class="composition-api">

```js
const activeUsers = computed(() => {
  return users.filter((user) => user.isActive)
})
```

</div>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

또는 `<template>` 태그를 사용하여 `v-for`로 `<li>` 요소를 감싸는 것도 가능합니다:

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

:::

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

</div>

## 컴포넌트 범위 스타일 사용하기 {#use-component-scoped-styling}

어플리케이션에서는 최상위 `App` 컴포넌트와 레이아웃 컴포넌트의 스타일이 전역적일 수 있지만, 다른 모든 컴포넌트는 항상 범위가 지정되어야 합니다.

이것은 [싱글 파일 컴포넌트](/guide/scaling-up/sfc)에만 관련이 있습니다. 이것은 [`scoped` 속성](https://vue-loader.vuejs.org/en/features/scoped-css.html)을 사용해야 한다는 것을 의미하지는 _않습니다_. 범위 지정은 [CSS 모듈](https://vue-loader.vuejs.org/en/features/css-modules), [BEM](http://getbem.com/)과 같은 클래스 기반 전략 또는 다른 라이브러리/관례를 통해 이루어질 수 있습니다.

**하지만, 컴포넌트 라이브러리는 `scoped` 속성을 사용하기보다는 클래스 기반 전략을 선호해야 합니다.**

이것은 내부 스타일을 오버라이딩하기 쉽게 하며, 너무 높은 특이성을 가지지 않으면서도 충돌 가능성이 매우 낮은 사람이 읽을 수 있는 클래스 이름을 제공합니다.

::: details 상세한 설명
큰 프로젝트를 개발하거나 다른 개발자와 함께 작업하거나 때때로 타사의 HTML/CSS (예: Auth0에서)를 포함하는 경우, 일관된 범위 지정은 스타일이 의도한 컴포넌트에만 적용되도록 보장합니다.

`scoped` 속성 외에도, 고유한 클래스 이름을 사용하면 타사 CSS가 자신의 HTML에 적용되지 않도록 도와줍니다. 예를 들어, 많은 프로젝트는 `button`, `btn`, 또는 `icon` 클래스 이름을 사용하므로, BEM과 같은 전략을 사용하지 않더라도 앱 특정 및/또는 컴포넌트 특정 접두사 (예: `ButtonClose-icon`)를 추가하면 어느 정도 보호가 될 수 있습니다.
:::

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```vue-html
<template>
  <button class="button button-close">×</button>
</template>

<!-- `scoped` 속성 사용하기 -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- CSS 모듈 사용하기 -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- BEM 관례 사용하기 -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

</div>
