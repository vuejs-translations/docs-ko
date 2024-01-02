---
footer: false
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# 빠른 시작 {#quick-start}

사용 사례 및 기본 설정에 따라 빌드 과정을 포함하거나 포함하지 않고 Vue를 사용할 수 있습니다.

## Try Vue Online {#try-vue-online}

- Vue를 빠르게 체험해 보려면 [Playground](https://play.vuejs.org/#eNo9jcEKwjAMhl/lt5fpQYfXUQfefAMvvRQbddC1pUuHUPrudg4HIcmXjyRZXEM4zYlEJ+T0iEPgXjn6BB8Zhp46WUZWDjCa9f6w9kAkTtH9CRinV4fmRtZ63H20Ztesqiylphqy3R5UYBqD1UyVAPk+9zkvV1CKbCv9poMLiTEfR2/IXpSoXomqZLtti/IFwVtA9A==)에서 직접 사용해 보세요.

- 빌드 단계가 없는 일반 HTML 설정을 선호하는 경우, 이 [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/)을 시작점으로 사용할 수 있습니다.

- Node.js와 빌드 도구의 개념에 이미 익숙하다면, [StackBlitz](https://vite.new/vue)에서 브라우저 내에서 바로 전체 빌드 설정을 시도해 볼 수도 있습니다.


## Vue 애플리케이션 만들기 {#creating-a-vue-application}

:::tip 전제 조건

- 명령줄에 대한 친숙함
- [Node.js](https://nodejs.org/) 버전 18.0 이상 설치
  :::

이 섹션에서는 로컬 컴퓨터에서 Vue [싱글 페이지 애플리케이션](/guide/extras/ways-of-using-vue.html#single-page-application-spa)을 스캐폴드하는 방법을 소개합니다. 생성된 프로젝트는 [Vite](https://vitejs.dev)를 기반으로 빌드 설정을 사용하고 Vue [싱글 파일 컴포넌트](/guide/scaling-up/sfc)(SFC)를 사용할 수 있도록 합니다.

최신 버전의 [Node.js](https://nodejs.org/)가 설치되어 있고 현재 작업 디렉터리가 프로젝트를 만들려는 디렉터리인지 확인하세요. 명령줄에서 다음 명령을 실행합니다(`$` 기호 제외):

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ npm create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh
  $ pnpm create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh
  $ yarn create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">

  ```sh
  $ bun create vue@latest
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

이 명령은 공식 Vue 프로젝트 스캐폴딩 도구인 [create-vue](https://github.com/vuejs/create-vue)를 설치 및 실행합니다. TypeScript 및 테스트 지원과 같은 몇 가지 선택적 기능에 대한 프롬프트가 표시됩니다:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add an End-to-End Testing Solution? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Cypress / Playwright</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

옵션에 대해 확신이 서지 않는다면 일단 엔터키를 눌러 `No`를 선택하면 됩니다. 프로젝트가 생성되면 지침에 따라 종속 요소를 설치하고 개발 서버를 시작합니다:

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ cd <your-project-name>
  $ npm install
  $ npm run dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh
  $ cd <your-project-name>
  $ pnpm install
  $ pnpm run dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh
  $ cd <your-project-name>
  $ yarn
  $ yarn dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">

  ```sh
  $ cd <your-project-name>
  $ bun install
  $ bun run dev
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

이제 첫 번째 Vue 프로젝트가 실행 중일 것입니다! 생성된 프로젝트의 예제 컴포넌트는 [Options API](/guide/introduction.html#composition-api) 대신  `<script setup>`과 [Composition API](/guide/introduction.html#options-api)를 사용하여 작성되었음을 유의하세요. 다음은 몇 가지 추가 팁입니다:

- 권장 IDE 설정은 [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)입니다. 다른 편집기를 사용하는 경우 [IDE 지원 섹션](/guide/scaling-up/tooling.html#ide-support)을 확인하세요.
- 백엔드 프레임워크와의 통합을 포함한 자세한 툴링 내용은 [툴링 가이드](/guide/scaling-up/tooling)에서 확인할 수 있습니다.
- 기본 빌드 도구인 Vite에 대해 자세히 알아보려면 [Vite 문서](https://vitejs.dev)를 확인하세요.
- 타입스크립트를 사용하기로 선택한 경우 [타입스크립트 사용 가이드](typescript/overview)를 확인하세요.

앱을 프로덕션으로 출시할 준비가 되면 다음을 실행하세요:

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ npm run build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh
  $ pnpm run build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh
  $ yarn build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">

  ```sh
  $ bun run build
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

이렇게 하면 프로젝트의 `./dist` 디렉터리에 프로덕션에 사용할 수 있는 앱 빌드가 생성됩니다. 프로덕션 배포 가이드](/guide/best-practices/production-deployment)를 확인하여 앱을 프로덕션에 배포하는 방법에 대해 자세히 알아보세요.

[Next Steps >](#next-steps)

## CDN에서 Vue 사용{#using-vue-from-cdn}

스크립트 태그를 통해 CDN에서 직접 Vue를 사용할 수 있습니다:



```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

여기서는 [unpkg](https://unpkg.com/)를 사용하고 있지만, [jsdelivr](https://www.jsdelivr.com/package/npm/vue) 또는 [cdnjs](https://cdnjs.com/libraries/vue)와 같이 npm 패키지를 제공하는 모든 CDN을 사용할 수도 있습니다. 물론 이 파일을 다운로드하여 직접 제공할 수도 있습니다.


CDN에서 Vue를 사용하는 경우 "빌드 단계"가 필요하지 않습니다. 따라서 설정이 훨씬 간단해지며 정적 HTML을 향상시키거나 백엔드 프레임워크와 통합하는 데 적합합니다. 하지만 싱글 파일 컴포넌트(SFC) 구문은 사용할 수 없습니다.


### 글로벌 빌드 사용 {#using-the-global-build}

위의 링크는 Vue의 _전역 빌드(global build)_를 불러옵니다. 이 빌드에서는 모든 최상위 API가 전역 `Vue` 객체의 속성으로 노출됩니다. 전역 빌드를 사용한 전체 예제는 다음과 같습니다:

<div class="options-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

[Codepen demo](https://codepen.io/vuejs-examples/pen/QWJwJLp)

</div>

<div class="composition-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[Codepen demo](https://codepen.io/vuejs-examples/pen/eYQpQEG)

:::팁
가이드 전체에서 Composition API에 대한 많은 예제는 빌드 도구가 필요한 `<script setup>` 구문을 사용할 것입니다. 빌드 단계 없이 Composition API를 사용하려는 경우 [`setup()` 옵션](/api/composition-api-setup)의 사용법을 참조하십시오.
:::

</div>

### ES 모듈 빌드 사용 {#using-the-es-module-build}

이 문서의 나머지 부분에서는 주로 [ES 모듈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 구문을 사용할 것입니다. 현재 대부분의 최신 브라우저는 ES 모듈을 기본적으로 지원하므로 이와 같은 기본 ES 모듈을 통해 CDN에서 Vue를 사용할 수 있습니다:

<div class="options-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

</div>

<div class="composition-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

</div>

`<script type="module">`을 사용하고 있으며, 가져온 CDN URL이 대신 Vue의 **ES 모듈 빌드**를 가리키고 있음을 알 수 있습니다.

<div class="options-api">

[Codepen demo](https://codepen.io/vuejs-examples/pen/VwVYVZO)

</div>
<div class="composition-api">

[Codepen demo](https://codepen.io/vuejs-examples/pen/MWzazEv)

</div>

### 임포트맵 활성화 {#enabling-import-maps}

위의 예에서는 전체 CDN URL에서 임포트하고 있지만 나머지 문서에서는 다음과 같은 코드를 볼 수 있습니다:

```js
import { createApp } from 'vue'
```

[임포트 맵](https://caniuse.com/import-maps)를 사용하여 브라우저에 `vue`를 어디에서 가져와야 할지  알려줄 수 있습니다:

<div class="options-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

[Codepen demo](https://codepen.io/vuejs-examples/pen/wvQKQyM)

</div>

<div class="composition-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[Codepen demo](https://codepen.io/vuejs-examples/pen/YzRyRYM)

</div>

임포트 맵에 다른 종속성에 대한 항목을 추가할 수도 있지만 사용하려는 라이브러리의 ES 모듈 버전을 가리키는지 확인해야 합니다.

:::팁 임포트 맵 브라우저 지원
임포트 맵은 비교적 최신의 브라우저 기능입니다. [지원 범위](https://caniuse.com/import-maps) 내에서 브라우저를 사용하는 것을 확인하십시오. 특히, Safari 16.4 이상에서만 지원됩니다.
:::

:::warning 운영 환경에서 사용
지금까지의 예제는 Vue의 개발 빌드를 사용한 것으로, 프로덕션 환경에서 CDN의 Vue를 사용하려면 [프로덕션 배포 가이드](/guide/best-practices/production-deployment.html#without-build-tools)를 확인하시기 바랍니다.
:::

### 모듈 분할 {#splitting-up-the-modules}

가이드를 자세히 살펴볼수록 코드를 관리하기 쉽도록 별도의 JavaScript 파일로 분할해야 할 수도 있습니다. 예를 들어

```html
<!-- index.html -->
<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

<div class="options-api">

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`
}
```

</div>
<div class="composition-api">

```js
// my-component.js
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>count is {{ count }}</div>`
}
```

</div>

위의 `index.html` 파일을 직접 브라우저에서 열면 ES 모듈이 `file://` 프로토콜 위에서 작동하지 않아 오류가 발생합니다. 로컬 파일을 열 때 브라우저가 사용하는 프로토콜이기 때문입니다.

보안상의 이유로 ES 모듈은 웹 페이지를 열 때 브라우저가 사용하는 `http://` 프로토콜에서만 작동할 수 있습니다. 로컬 컴퓨터에서 ES 모듈이 작동하려면 로컬 HTTP 서버를 사용하여 `index.html`을 `http://` 프로토콜로 서비스해야 합니다.

로컬 HTTP 서버를 시작하려면 먼저 [Node.js](https://nodejs.org/en/)가 설치되어 있는지 확인한 다음 명령줄에서 HTML 파일이 있는 동일한 디렉토리에서 `npx serve`를 실행하십시오. 또는 올바른 MIME 유형으로 정적 파일을 서비스할 수 있는 다른 HTTP 서버를 사용할 수도 있습니다.

가져온 컴포넌트의 템플릿이 JavaScript 문자열로 인라인으로 포함되어 있는 것을 알아챘을 것입니다. VSCode를 사용하는 경우 [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) 확장을 설치하고 문자열을 `/*html*/` 주석으로 접두사를 붙여 문법 강조 효과를 얻을 수 있습니다.

## Next Steps {#next-steps}

[소개](/guide/introduction)를 건너뛰셨다면, 나머지 설명서를 읽기 전에 반드시 읽어보시길 권장합니다.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">가이드 계속 진행하기</p>
    <p class="next-steps-caption">이 가이드는 프레임워크의 모든 측면을 자세히 안내합니다..</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">튜토리얼 시도</p>
    <p class="next-steps-caption">직접 체험하며 배우는 것을 선호하는 분들을 위한 코스입니다 </p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">예제 확인</p>
    <p class="next-steps-caption">핵심 기능 및 일반적인 UI 작업의 예를 살펴보세요.</p>
  </a>
</div>
