# SFC 구문 명세 {#sfc-syntax-specification}

## 개요 {#overview}

Vue Single-File Component(SFC)는 관례적으로 `*.vue` 파일 확장자를 사용하며, Vue 컴포넌트를 설명하기 위해 HTML과 유사한 구문을 사용하는 커스텀 파일 형식입니다. Vue SFC는 문법적으로 HTML과 호환됩니다.

각 `*.vue` 파일은 세 가지 유형의 최상위 언어 블록(`<template>`, `<script>`, `<style>`)과 선택적으로 추가적인 커스텀 블록으로 구성됩니다:

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  이곳에는 예를 들어 컴포넌트에 대한 문서가 들어갈 수 있습니다.
</custom1>
```

## 언어 블록 {#language-blocks}

### `<template>` {#template}

- 각 `*.vue` 파일에는 최상위 `<template>` 블록이 최대 한 개만 포함될 수 있습니다.

- 내용은 추출되어 `@vue/compiler-dom`에 전달되고, JavaScript 렌더 함수로 사전 컴파일되어 내보내는 컴포넌트의 `render` 옵션에 연결됩니다.

### `<script>` {#script}

- 각 `*.vue` 파일에는 `<script>` 블록이 최대 한 개만 포함될 수 있습니다([`<script setup>`](/api/sfc-script-setup)은 제외).

- 스크립트는 ES 모듈로 실행됩니다.

- **기본 내보내기(default export)**는 Vue 컴포넌트 옵션 객체여야 하며, 일반 객체이거나 [defineComponent](/api/general#definecomponent)의 반환값일 수 있습니다.

### `<script setup>` {#script-setup}

- 각 `*.vue` 파일에는 `<script setup>` 블록이 최대 한 개만 포함될 수 있습니다(일반 `<script>`는 제외).

- 이 스크립트는 사전 처리되어 컴포넌트의 `setup()` 함수로 사용되며, 즉 **컴포넌트의 각 인스턴스마다 실행**됩니다. `<script setup>`의 최상위 바인딩은 템플릿에 자동으로 노출됩니다. 자세한 내용은 [`<script setup>` 전용 문서](/api/sfc-script-setup)를 참고하세요.

### `<style>` {#style}

- 하나의 `*.vue` 파일에는 여러 개의 `<style>` 태그를 포함할 수 있습니다.

- `<style>` 태그는 `scoped` 또는 `module` 속성(자세한 내용은 [SFC 스타일 기능](/api/sfc-css-features) 참고)을 가질 수 있어, 스타일을 현재 컴포넌트에 캡슐화하는 데 도움이 됩니다. 서로 다른 캡슐화 모드를 가진 여러 `<style>` 태그를 하나의 컴포넌트에 혼합할 수 있습니다.

### 커스텀 블록 {#custom-blocks}

프로젝트별 필요에 따라 추가적인 커스텀 블록을 `*.vue` 파일에 포함할 수 있습니다. 예를 들어 `<docs>` 블록이 있습니다. 실제 커스텀 블록의 예시는 다음과 같습니다:

- [Gridsome: `<page-query>`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql: `<gql>`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n: `<i18n>`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#i18n-custom-block)

커스텀 블록의 처리는 도구에 따라 달라집니다. 커스텀 블록 통합을 직접 구축하고 싶다면 [SFC 커스텀 블록 통합 도구 섹션](/guide/scaling-up/tooling#sfc-custom-block-integrations)을 참고하세요.

## 자동 이름 추론 {#automatic-name-inference}

SFC는 다음과 같은 경우 **파일명**에서 컴포넌트의 이름을 자동으로 추론합니다:

- 개발 경고 포맷팅
- DevTools 검사
- 재귀적 자기 참조, 예를 들어 `FooBar.vue`라는 파일은 템플릿에서 `<FooBar/>`로 자신을 참조할 수 있습니다. 이는 명시적으로 등록/임포트된 컴포넌트보다 우선순위가 낮습니다.

## 프리프로세서 {#pre-processors}

블록은 `lang` 속성을 사용하여 프리프로세서 언어를 선언할 수 있습니다. 가장 일반적인 예는 `<script>` 블록에서 TypeScript를 사용하는 경우입니다:

```vue-html
<script lang="ts">
  // TypeScript 사용
</script>
```

`lang`는 모든 블록에 적용할 수 있습니다. 예를 들어, [Sass](https://sass-lang.com/)를 사용하는 `<style>`과 [Pug](https://pugjs.org/api/getting-started.html)를 사용하는 `<template>`을 사용할 수 있습니다:

```vue-html
<template lang="pug">
p {{ msg }}
</template>

<style lang="scss">
  $primary-color: #333;
  body {
    color: $primary-color;
  }
</style>
```

다양한 프리프로세서와의 통합은 도구 체인에 따라 다를 수 있습니다. 예시는 각 문서를 참고하세요:

- [Vite](https://vite.dev/guide/features.html#css-pre-processors)
- [Vue CLI](https://cli.vuejs.org/guide/css.html#pre-processors)
- [webpack + vue-loader](https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors)

## `src` 임포트 {#src-imports}

`*.vue` 컴포넌트를 여러 파일로 분리하고 싶다면, `src` 속성을 사용하여 언어 블록에 외부 파일을 임포트할 수 있습니다:

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

`src` 임포트는 webpack 모듈 요청과 동일한 경로 해석 규칙을 따르므로 주의하세요:

- 상대 경로는 `./`로 시작해야 합니다.
- npm 의존성에서 리소스를 임포트할 수 있습니다:

```vue
<!-- 설치된 "todomvc-app-css" npm 패키지에서 파일 임포트 -->
<style src="todomvc-app-css/index.css" />
```

`src` 임포트는 커스텀 블록에도 사용할 수 있습니다. 예:

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

:::warning 참고
`src`에서 별칭을 사용할 때는 `~`로 시작하지 마세요. 그 뒤의 모든 것은 모듈 요청으로 해석됩니다. 즉, node 모듈 내부의 에셋을 참조할 수 있습니다:
```vue
<img src="~some-npm-package/foo.png">
```
:::

## 주석 {#comments}

각 블록 내부에서는 사용 중인 언어(HTML, CSS, JavaScript, Pug 등)의 주석 구문을 사용해야 합니다. 최상위 주석에는 HTML 주석 구문을 사용하세요: `<!-- 여기에 주석 내용을 입력 -->`
