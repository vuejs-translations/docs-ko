# 우선 순위 C 규칙: 권장 {#priority-c-rules-recommended}

::: warning 주의  
이 Vue.js 스타일 가이드는 오래된 내용이므로 검토가 필요합니다. 질문이나 제안 사항이 있다면 [이슈를 등록](https://github.com/vuejs/docs/issues/new)해 주세요.  
:::

여러 가지 동등하게 좋은 옵션이 존재할 때, 일관성을 유지하기 위해 임의적인 선택을 할 수 있습니다. 이 규칙에서는 각각의 허용 가능한 옵션을 설명하고 기본 선택을 제안합니다. 즉, 일관성을 유지하고 좋은 이유가 있다면 코드베이스에서 다른 선택을 자유롭게 할 수 있습니다. 하지만 좋은 이유가 있어야 합니다! 커뮤니티 표준에 적응함으로써 다음과 같은 이점이 있습니다:

1. 대부분의 커뮤니티 코드를 더 쉽게 파악할 수 있도록 두뇌를 훈련시킵니다.
2. 대부분의 커뮤니티 코드 예제를 수정 없이 복사 및 붙여넣을 수 있습니다.
3. 새로운 직원이 이미 Vue에 관한 선호하는 코딩 스타일에 익숙할 가능성이 높습니다.

## 컴포넌트/인스턴스 옵션 순서 {#component-instance-options-order}

**컴포넌트/인스턴스 옵션은 일관되게 정렬되어야 합니다.**

이것은 컴포넌트 옵션에 대해 우리가 권장하는 기본 순서입니다. 그들은 카테고리로 나뉘어져 있어서 플러그인에서 새로운 속성을 추가할 위치를 알 수 있습니다.

1. **글로벌 인지도** (컴포넌트를 넘어서는 지식 필요)

  - `name`

2. **템플릿 컴파일러 옵션** (템플릿 컴파일 방식 변경)

  - `compilerOptions`

3. **템플릿 의존성** (템플릿에서 사용되는 자산)

  - `components`
  - `directives`

4. **구성** (옵션에 속성 결합)

  - `extends`
  - `mixins`
  - `provide`/`inject`

5. **인터페이스** (컴포넌트의 인터페이스)

  - `inheritAttrs`
  - `props`
  - `emits`

6. **구성 API** (구성 API 사용을 위한 진입점)

  - `setup`

7. **로컬 상태** (로컬 반응형 속성)

  - `data`
  - `computed`

8. **이벤트** (반응형 이벤트에 의해 트리거되는 콜백)

  - `watch`
  - 라이프사이클 이벤트 (호출되는 순서대로)
    - `beforeCreate`
    - `created`
    - `beforeMount`
    - `mounted`
    - `beforeUpdate`
    - `updated`
    - `activated`
    - `deactivated`
    - `beforeUnmount`
    - `unmounted`
    - `errorCaptured`
    - `renderTracked`
    - `renderTriggered`

9. **비반응형 속성** (반응형 시스템과 독립적인 인스턴스 속성)

  - `methods`

10. **렌더링** (컴포넌트 출력의 선언적 설명)
  - `template`/`render`

## 요소 속성 순서 {#element-attribute-order}

**요소(컴포넌트를 포함)의 속성은 일관되게 정렬되어야 합니다.**

이것은 컴포넌트 옵션에 대해 우리가 권장하는 기본 순서입니다. 그들은 카테고리로 나뉘어져 있어서 사용자 정의 속성과 디렉티브를 어디에 추가할지 알 수 있습니다.

1. **정의** (컴포넌트 옵션 제공)

  - `is`

2. **목록 렌더링** (동일한 요소의 여러 변형 생성)

  - `v-for`

3. **조건부** (요소가 렌더링/표시되는지 여부)

  - `v-if`
  - `v-else-if`
  - `v-else`
  - `v-show`
  - `v-cloak`

4. **렌더링 수정자** (요소의 렌더링 방식 변경)

  - `v-pre`
  - `v-once`

5. **글로벌 인지도** (컴포넌트를 넘어서는 지식 필요)

  - `id`

6. **고유 속성** (고유한 값이 필요한 속성)

  - `ref`
  - `key`

7. **양방향 바인딩** (바인딩과 이벤트 결합)

  - `v-model`

8. **기타 속성** (모든 지정되지 않은 바인딩 및 바인딩되지 않은 속성)

9. **이벤트** (컴포넌트 이벤트 리스너)

  - `v-on`

10. **내용** (요소의 내용을 오버라이드함)
  - `v-html`
  - `v-text`

## 컴포넌트/인스턴스 옵션에서의 빈 줄 {#empty-lines-in-component-instance-options}

**여러 줄로 된 속성 사이에 빈 줄을 추가하고 싶을 수도 있습니다. 특히 옵션이 화면에 스크롤 없이 맞지 않을 경우에는 더욱 그렇습니다.**

컴포넌트가 읽기 어렵거나 혼잡해질 때, 여러 줄로 된 속성 사이에 공간을 추가하면 다시 살펴보기 쉬워질 수 있습니다. Vim과 같은 일부 편집기에서는 키보드로 탐색하기 쉽도록 이러한 형식의 옵션을 사용할 수도 있습니다.

<div class="options-api">

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```js
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue() {
    // ...
  },

  inputClasses() {
    // ...
  }
}
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```js
// 컴포넌트가 여전히 읽기 쉽고 탐색하기 쉬운 경우
// 공백이 없어도 괜찮습니다.
props: {
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
},
computed: {
  formattedValue() {
    // ...
  },
  inputClasses() {
    // ...
  }
}
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```js
defineProps({
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
})
const formattedValue = computed(() => {
  // ...
})
const inputClasses = computed(() => {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```js
defineProps({
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
})

const formattedValue = computed(() => {
  // ...
})

const inputClasses = computed(() => {
  // ...
})
```

</div>

</div>

## 싱글 파일 컴포넌트 최상위 요소 순서 {#single-file-component-top-level-element-order}

**[싱글 파일 컴포넌트](/guide/scaling-up/sfc)는 항상 `<script>`, `<template>`, `<style>` 태그를 일관되게 정렬해야 하며, `<style>`은 다른 두 태그 중 적어도 하나가 항상 필요하기 때문에 마지막에 와야 합니다.**

<div class="style-example style-example-bad">
<h3>잘못된 예</h3>

```vue-html
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>

<div class="style-example style-example-good">
<h3>좋은 예</h3>

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

```vue-html
<!-- ComponentA.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>
