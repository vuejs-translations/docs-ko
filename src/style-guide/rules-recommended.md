# 우선순위 C 규칙: 권장 {#priority-c-rules-recommended}

똑같이 좋은 옵션이 여러 개 있는 경우 일관성을 유지하기 위해 임의로 선택할 수 있습니다. 이 규칙에서는 허용 가능한 각 옵션을 설명하고 기본 선택을 제안합니다. 즉, 일관성이 유지되고 타당한 이유가 있는 한 코드베이스에서 자유롭게 다른 선택을 할 수 있습니다. 하지만 정당한 이유가 있어야 합니다! 커뮤니티 표준에 적응하면 다음과 같은 이점이 있습니다:

1. 여러분이 접하는 대부분의 커뮤니티 코드를 더 쉽게 파싱할 수 있도록 두뇌를 훈련할 수 있습니다.
2. 대부분의 커뮤니티 코드 예제를 수정하지 않고 복사하여 붙여넣을 수 있습니다.
3. 적어도 Vue와 관련하여 선호하는 코딩 스타일에 이미 익숙한 신입 사원을 종종 찾을 수 있습니다.


## 컴포넌트/인스턴스 옵션 순서 {#component-instance-options-order}

**컴포넌트/인스턴스 옵션은 일관된 순서로 정렬해야 합니다.**

이것이 컴포넌트 옵션에 권장하는 기본 순서입니다. 카테고리별로 구분되어 있으므로 플러그인에서 새 속성을 추가할 위치를 알 수 있습니다.



1. **전역 인식** (구성 요소 이상의 지식이 필요합니다.)

   - `name`

2. **템플릿 컴파일러 옵션** (템플릿 컴파일 방식을 변경합니다.)

   - `compilerOptions`

3. **템플릿 의존성** (템플릿에 사용된 에셋)

   - `components`
   - `directives`

4. **컴포지션** (속성을 옵션으로 병합합니다.)

   - `extends`
   - `mixins`
   - `provide`/`inject`

5. **인터페이스** (컴포넌트에 대한 인터페이스)

   - `inheritAttrs`
   - `props`
   - `emits`

6. **컴포지션 API** (컴포지션 API를 사용하기 위한 진입점)

   - `setup`

7. **로컬 상태** (로컬 반응형 속성)

   - `data`
   - `computed`

8. **이벤트** (반응형 이벤트에 의해 트리거되는 콜백)

   - `watch`
   - 생명 주기 이벤트(호출되는 순서대로)
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

9. **비 리액티브 속성** (반응성 시스템과 무관한 인스턴스 속성)

   - `methods`

10. **렌더링** (컴포넌트 출력에 대한 선언적 설명)
    - `template`/`render`

## 앨리먼트 속성 순서 {#element-attribute-order}
**요소(컴포넌트 포함)의 속성은 일관된 순서로 정렬해야 합니다.**

이것이 컴포넌트 옵션에 권장하는 기본 순서입니다. 컴포넌트 옵션은 카테고리로 나뉘어 있으므로 사용자 정의 속성과 지시문을 추가할 위치를 알 수 있습니다.

1. **정의** (컴포넌트 옵션을 제공합니다.)

   - `is`

2. **리스트 렌더링** (동일한 요소의 여러 변형을 생성합니다.)

   - `v-for`

3. **조건부** (요소 렌더링/표시 여부)

   - `v-if`
   - `v-else-if`
   - `v-else`
   - `v-show`
   - `v-cloak`

4. **렌더링 수정자** (요소의 렌더링 방식을 변경합니다.)

   - `v-pre`
   - `v-once`

5. **글로벌 인식** (구성 요소 이상의 지식이 필요합니다.)

   - `id`

6. **유니크 속성** (고유 값이 필요한 속성)

   - `ref`
   - `key`

7. **양방향 바인딩** (바인딩과 이벤트 결합)

   - `v-model`

8. **다른 속성** (지정되지 않은 모든 바인딩 및 언바인딩 속성)

9. **이벤트** (컴포넌트 이벤트 리스너)

   - `v-on`

10. **컨텐츠** (요소의 콘텐츠를 덮어씁니다.)
    - `v-html`
    - `v-text`

##컴포넌트/인스턴스 옵션의 빈 줄 {#empty-lines-in-component-instance-options}

**여러 줄로 된 속성 사이에 빈 줄을 하나 추가하는 것이 좋습니다. 특히 스크롤하지 않으면 옵션이 화면에 더 이상 맞지 않는 경우**.

컴포넌트가 비좁게 느껴지거나 읽기 어려운 경우 여러 줄의 속성 사이에 공백을 추가하면 다시 훑어보기가 쉬워집니다. Vim과 같은 일부 편집기에서는 이와 같은 서식 지정 옵션으로 키보드로 더 쉽게 탐색할 수 있습니다.

<div class="style-example style-example-good">
<h3>Good</h3>

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

```js
// 구성 요소가 여전히 읽기 쉽고 탐색하기 쉽다면 공백이 없어도 괜찮습니다.
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

## 단일 파일 컴포넌트 최상위 요소 순서 {#single-file-component-top-level-element-order}

**[싱글 파일 컴포넌트](/guide/scaling-up/sfc.html)는 항상 다른 두 태그 중 하나 이상이 항상 필요하므로 `<script>`, `<template>`, `<style>` 태그의 순서를 일관되게 유지하되 `<style>`을 마지막에 배치해야 합니다.**


<div class="style-example style-example-bad">
<h3>Bad</h3>

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
<h3>Good</h3>

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
