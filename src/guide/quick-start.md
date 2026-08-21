---
footer: false
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# 빠른 시작 {#quick-start}

## 온라인에서 Vue 체험하기 {#try-vue-online}

- Vue를 빠르게 체험해보고 싶다면 [Playground](https://play.vuejs.org/#eNo9jcEKwjAMhl/lt5fpQYfXUQfefAMvvRQbddC1pUuHUPrudg4HIcmXjyRZXEM4zYlEJ+T0iEPgXjn6BB8Zhp46WUZWDjCa9f6w9kAkTtH9CRinV4fmRtZ63H20Ztesqiylphqy3R5UYBqD1UyVAPk+9zkvV1CKbCv9poMLiTEfR2/IXpSoXomqZLtti/IFwVtA9A==)에서 바로 사용해볼 수 있습니다.

- 빌드 과정 없이 순수 HTML 환경을 선호한다면, 이 [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/)을 시작점으로 사용할 수 있습니다.

- Node.js와 빌드 도구 개념에 익숙하다면, [StackBlitz](https://vite.new/vue)에서 브라우저 내에서 완전한 빌드 환경을 바로 체험할 수 있습니다.

- 권장 설정에 대한 안내가 필요하다면, 첫 Vue 앱을 실행, 수정, 배포하는 방법을 보여주는 대화형 [Scrimba](http://scrimba.com/links/vue-quickstart) 튜토리얼을 시청하세요.

## Vue 애플리케이션 생성하기 {#creating-a-vue-application}

:::tip 사전 준비 사항

- 커맨드 라인 사용에 익숙할 것
- [Node.js](https://nodejs.org/) `^22.18.0 || >=24.12.0` 버전 설치
  :::

이 섹션에서는 로컬 컴퓨터에서 Vue [싱글 페이지 애플리케이션](/guide/extras/ways-of-using-vue#single-page-application-spa)을 스캐폴딩하는 방법을 소개합니다. 생성된 프로젝트는 [Vite](https://vite.dev/)를 기반으로 한 빌드 환경을 사용하며, Vue [싱글 파일 컴포넌트](/guide/scaling-up/sfc) (SFC)를 사용할 수 있습니다.

최신 버전의 [Node.js](https://nodejs.org/)가 설치되어 있는지 확인하고, 현재 작업 디렉터리가 프로젝트를 생성하려는 위치인지 확인하세요. 커맨드 라인에서 다음 명령어를 실행하세요(`$` 기호는 입력하지 않습니다):

::: code-group

```sh [npm]
$ npm create vue@latest
```

```sh [pnpm]
$ pnpm create vue@latest
```

```sh [yarn]
# Yarn (v1+)용
$ yarn create vue

# Yarn Modern (v2+)용
$ yarn create vue@latest

# Yarn ^v4.11 용
$ yarn dlx create-vue@latest
```

```sh [bun]
$ bun create vue@latest
```
:::

이 명령어는 공식 Vue 프로젝트 스캐폴딩 도구인 [create-vue](https://github.com/vuejs/create-vue)를 설치하고 실행합니다. TypeScript 및 테스트 지원과 같은 여러 선택적 기능에 대한 프롬프트가 표시됩니다:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">프로젝트 이름: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">TypeScript 추가? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">아니오</span> / 예</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">JSX 지원 추가? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">아니오</span> / 예</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">싱글 페이지 애플리케이션 개발을 위한 Vue Router 추가? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">아니오</span> / 예</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">상태 관리를 위한 Pinia 추가? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">아니오</span> / 예</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">단위 테스트를 위한 Vitest 추가? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">아니오</span> / 예</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">엔드 투 엔드 테스트 솔루션 추가? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">아니오</span> / Cypress / Nightwatch / Playwright</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">코드 품질을 위한 ESLint 추가? <span style="color:#888;">… 아니오 / <span style="color:#89DDFF;text-decoration:underline">예</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">코드 포매팅을 위한 Prettier 추가? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">아니오</span> / 예</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">디버깅을 위한 Vue DevTools 7 확장 프로그램 추가? (실험적) <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">아니오</span> / 예</span></span>
<span></span>
<span style="color:#A6ACCD;">./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>에 프로젝트 스캐폴딩 중...</span>
<span style="color:#A6ACCD;">완료.</span></code></pre></div>

옵션이 확실하지 않다면, 일단 엔터를 눌러 `No`를 선택하세요. 프로젝트가 생성되면, 의존성 설치 및 개발 서버 실행을 위한 안내에 따라 진행하세요:

::: code-group

```sh-vue [npm]
$ cd {{'<your-project-name>'}}
$ npm install
$ npm run dev
```

```sh-vue [pnpm]
$ cd {{'<your-project-name>'}}
$ pnpm install
$ pnpm run dev
```

```sh-vue [yarn]
$ cd {{'<your-project-name>'}}
$ yarn
$ yarn dev
```

```sh-vue [bun]
$ cd {{'<your-project-name>'}}
$ bun install
$ bun run dev
```

:::


이제 첫 번째 Vue 프로젝트가 실행되고 있을 것입니다! 생성된 프로젝트의 예제 컴포넌트는 [옵션 API](/guide/introduction#options-api)가 아닌 [컴포지션 API](/guide/introduction#composition-api)와 `<script setup>`을 사용하여 작성되어 있습니다. 추가 팁은 다음과 같습니다:

- 권장 IDE 설정은 [Visual Studio Code](https://code.visualstudio.com/) + [Vue - 공식 확장 프로그램](https://marketplace.visualstudio.com/items?itemName=Vue.volar)입니다. 다른 에디터를 사용한다면 [IDE 지원 섹션](/guide/scaling-up/tooling#ide-support)을 참고하세요.
- 백엔드 프레임워크와의 통합 등 더 많은 도구 관련 정보는 [도구 가이드](/guide/scaling-up/tooling)에서 다룹니다.
- 빌드 도구 Vite에 대해 더 알고 싶다면 [Vite 문서](https://vite.dev/)를 참고하세요.
- TypeScript를 사용하기로 했다면 [TypeScript 사용 가이드](typescript/overview)를 참고하세요.

앱을 프로덕션에 배포할 준비가 되면 다음 명령어를 실행하세요:

::: code-group

```sh [npm]
$ npm run build
```

```sh [pnpm]
$ pnpm run build
```

```sh [yarn]
$ yarn build
```

```sh [bun]
$ bun run build
```

:::


이 명령어는 프로젝트의 `./dist` 디렉터리에 프로덕션용 빌드를 생성합니다. 앱을 프로덕션에 배포하는 방법에 대해서는 [프로덕션 배포 가이드](/guide/best-practices/production-deployment)를 참고하세요.

[다음 단계 >](#next-steps)

## CDN에서 Vue 사용하기 {#using-vue-from-cdn}

스크립트 태그를 통해 CDN에서 직접 Vue를 사용할 수 있습니다:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

여기서는 [unpkg](https://unpkg.com/)를 사용했지만, [jsdelivr](https://www.jsdelivr.com/package/npm/vue)나 [cdnjs](https://cdnjs.com/libraries/vue) 등 npm 패키지를 제공하는 다른 CDN도 사용할 수 있습니다. 물론 이 파일을 직접 다운로드하여 직접 서비스할 수도 있습니다.

CDN에서 Vue를 사용할 때는 "빌드 단계"가 필요하지 않습니다. 이로 인해 설정이 훨씬 간단해지며, 정적 HTML을 보강하거나 백엔드 프레임워크와 통합할 때 적합합니다. 하지만 싱글 파일 컴포넌트(SFC) 문법은 사용할 수 없습니다.

### 글로벌 빌드 사용하기 {#using-the-global-build}

위 링크는 Vue의 _글로벌 빌드_를 로드하며, 모든 최상위 API가 전역 `Vue` 객체의 속성으로 노출됩니다. 다음은 글로벌 빌드를 사용하는 전체 예제입니다:

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

[CodePen 데모 >](https://codepen.io/vuejs-examples/pen/QWJwJLp)

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

[CodePen 데모 >](https://codepen.io/vuejs-examples/pen/eYQpQEG)

:::tip
가이드 전반에 걸쳐 많은 컴포지션 API 예제가 `<script setup>` 문법을 사용할 예정이며, 이는 빌드 도구가 필요합니다. 빌드 단계 없이 컴포지션 API를 사용하려면 [`setup()` 옵션](/api/composition-api-setup) 사용법을 참고하세요.
:::

</div>

### ES 모듈 빌드 사용하기 {#using-the-es-module-build}

이후 문서에서는 주로 [ES 모듈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 문법을 사용할 것입니다. 대부분의 최신 브라우저는 ES 모듈을 기본적으로 지원하므로, 다음과 같이 CDN에서 네이티브 ES 모듈로 Vue를 사용할 수 있습니다:

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

여기서는 `<script type="module">`을 사용하고, 가져오는 CDN URL이 Vue의 **ES 모듈 빌드**를 가리키고 있다는 점에 주의하세요.

<div class="options-api">

[CodePen 데모 >](https://codepen.io/vuejs-examples/pen/VwVYVZO)

</div>
<div class="composition-api">

[CodePen 데모 >](https://codepen.io/vuejs-examples/pen/MWzazEv)

</div>

### Import maps 활성화하기 {#enabling-import-maps}

위 예제에서는 전체 CDN URL에서 import하고 있지만, 이후 문서에서는 다음과 같은 코드를 자주 보게 될 것입니다:

```js
import { createApp } from 'vue'
```

[Import Maps](https://caniuse.com/import-maps)를 사용하여 브라우저에 `vue` import 위치를 알려줄 수 있습니다:

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

[CodePen 데모 >](https://codepen.io/vuejs-examples/pen/wvQKQyM)

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

[CodePen 데모 >](https://codepen.io/vuejs-examples/pen/YzRyRYM)

</div>

다른 의존성도 import map에 추가할 수 있지만, 반드시 해당 라이브러리의 ES 모듈 버전을 가리키도록 해야 합니다.

:::tip Import Maps 브라우저 지원
Import Maps는 비교적 새로운 브라우저 기능입니다. [지원 범위](https://caniuse.com/import-maps) 내의 브라우저를 사용해야 합니다. 특히 Safari는 16.4 이상에서만 지원됩니다.
:::

:::warning 프로덕션 사용 시 주의사항
지금까지의 예제는 Vue의 개발용 빌드를 사용하고 있습니다. CDN에서 Vue를 프로덕션에 사용할 계획이라면 [프로덕션 배포 가이드](/guide/best-practices/production-deployment#without-build-tools)를 반드시 참고하세요.

빌드 시스템 없이 Vue를 사용하는 것도 가능하지만, 과거에 [`jquery/jquery`](https://github.com/jquery/jquery)를, 혹은 현재 [`alpinejs/alpine`](https://github.com/alpinejs/alpine)을 사용할 만한 상황이라면, 대안으로 [`vuejs/petite-vue`](https://github.com/vuejs/petite-vue)를 사용하는 것이 더 적합할 수 있습니다.
:::

### 모듈 분리하기 {#splitting-up-the-modules}

가이드가 더 깊어질수록, 코드를 관리하기 쉽게 여러 자바스크립트 파일로 분리해야 할 수도 있습니다. 예를 들어:

```html [index.html]
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

<div class="options-api">

```js [my-component.js]
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>Count is: {{ count }}</div>`
}
```

</div>
<div class="composition-api">

```js [my-component.js]
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>Count is: {{ count }}</div>`
}
```

</div>

위의 `index.html`을 브라우저에서 직접 열면, ES 모듈은 `file://` 프로토콜에서는 동작하지 않기 때문에 오류가 발생합니다. 브라우저가 로컬 파일을 열 때 사용하는 프로토콜이 바로 `file://`입니다.

보안상의 이유로, ES 모듈은 `http://` 프로토콜에서만 동작합니다. 즉, 브라우저가 웹에서 페이지를 열 때 사용하는 프로토콜입니다. 로컬 컴퓨터에서 ES 모듈을 사용하려면, 반드시 `index.html`을 `http://` 프로토콜로 제공해야 하며, 이를 위해 로컬 HTTP 서버가 필요합니다.

로컬 HTTP 서버를 시작하려면, 먼저 [Node.js](https://nodejs.org/en/)가 설치되어 있는지 확인한 후, HTML 파일이 있는 디렉터리에서 커맨드 라인으로 `npx serve`를 실행하세요. 정적 파일을 올바른 MIME 타입으로 제공할 수 있는 다른 HTTP 서버를 사용해도 됩니다.

가져온 컴포넌트의 템플릿이 자바스크립트 문자열로 인라인되어 있다는 점을 눈치챘을 수도 있습니다. VS Code를 사용한다면 [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) 확장 프로그램을 설치하고, 문자열 앞에 `/*html*/` 주석을 붙이면 문법 하이라이팅을 받을 수 있습니다.

## 프레임워크 {#frameworks}

[SSR](/guide/scaling-up/ssr)을 비롯한 다양한 기능을 기본으로 지원하는 Vue 프레임워크들이 있습니다:
- [Nuxt](https://nuxt.com/)
- [Vike](https://vike.dev/)
- [Astro](https://astro.build/)
- [Quasar](https://quasar.dev/)

:::tip
일반적으로 SSR이 필요한 경우에만 프레임워크를 사용하는 것을 권장합니다.

SSR이 필요하지 않다면 [Vite](https://vite.dev/)만 사용해도 충분합니다(위의 [Vue 애플리케이션 생성하기](#creating-a-vue-application) 섹션에서 스캐폴딩하는 구성이 바로 이 구성입니다).
:::

:::info
Vue 프레임워크는 일반적으로 내부에서 Vite를 사용하므로, SSR이 필요하지 않다면 Vue 프레임워크 대신 Vite를 직접 사용하는 편이 설정이 더 간단합니다. 다만 프레임워크는 UI 테마와 같은 추가 기능도 지원하므로, 이러한 추가 기능이 Vite만 사용하는 대신 Vue 프레임워크를 선택하는 이유가 될 수도 있습니다.
:::

## 다음 단계 {#next-steps}

[소개](/guide/introduction)를 건너뛰었다면, 나머지 문서를 읽기 전에 꼭 읽어보시길 강력히 권장합니다.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">가이드 계속하기</p>
    <p class="next-steps-caption">가이드는 프레임워크의 모든 측면을 자세히 안내합니다.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">튜토리얼 체험하기</p>
    <p class="next-steps-caption">직접 실습하며 배우는 것을 선호하는 분들을 위한 코스입니다.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">예제 살펴보기</p>
    <p class="next-steps-caption">핵심 기능과 일반적인 UI 작업 예제를 탐색해보세요.</p>
  </a>
</div>
