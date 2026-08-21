# 애플리케이션 API {#application-api}

## createApp() {#createapp}

애플리케이션 인스턴스를 생성합니다.

- **타입**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **세부사항**

  첫 번째 인자는 루트 컴포넌트입니다. 두 번째 선택적 인자는 루트 컴포넌트에 전달할 props입니다.

- **예시**

  인라인 루트 컴포넌트 사용:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* 루트 컴포넌트 옵션 */
  })
  ```

  임포트한 컴포넌트 사용:

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **관련 문서** [가이드 - Vue 애플리케이션 생성](/guide/essentials/application)

## createSSRApp() {#createssrapp}

[SSR 하이드레이션](/guide/scaling-up/ssr#client-hydration) 모드에서 애플리케이션 인스턴스를 생성합니다. 사용법은 `createApp()`과 완전히 동일합니다.

## app.mount() {#app-mount}

애플리케이션 인스턴스를 컨테이너 엘리먼트에 마운트합니다.

- **타입**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **세부사항**

  인자는 실제 DOM 엘리먼트이거나 CSS 선택자일 수 있습니다(첫 번째로 일치하는 엘리먼트가 사용됩니다). 루트 컴포넌트 인스턴스를 반환합니다.

  컴포넌트에 템플릿이나 렌더 함수가 정의되어 있으면, 컨테이너 내부의 기존 DOM 노드를 대체합니다. 그렇지 않고 런타임 컴파일러가 사용 가능한 경우, 컨테이너의 `innerHTML`이 템플릿으로 사용됩니다.

  SSR 하이드레이션 모드에서는 컨테이너 내부의 기존 DOM 노드를 하이드레이트합니다. [불일치](/guide/scaling-up/ssr#hydration-mismatch)가 있는 경우, 기존 DOM 노드가 예상 출력에 맞게 변형됩니다.

  각 앱 인스턴스마다 `mount()`는 한 번만 호출할 수 있습니다.

- **예시**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  실제 DOM 엘리먼트에 마운트할 수도 있습니다:

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount() {#app-unmount}

마운트된 애플리케이션 인스턴스를 언마운트하며, 애플리케이션의 컴포넌트 트리 내 모든 컴포넌트에 대한 언마운트 라이프사이클 훅을 트리거합니다.

- **타입**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.onUnmount() <sup class="vt-badge" data-text="3.5+" /> {#app-onunmount}

앱이 언마운트될 때 호출될 콜백을 등록합니다.

- **타입**

  ```ts
  interface App {
    onUnmount(callback: () => any): void
  }
  ```

## app.component() {#app-component}

이름 문자열과 컴포넌트 정의를 모두 전달하면 전역 컴포넌트를 등록하고, 이름만 전달하면 이미 등록된 컴포넌트를 반환합니다.

- **타입**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **예시**

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  // 옵션 객체 등록
  app.component('MyComponent', {
    /* ... */
  })

  // 등록된 컴포넌트 가져오기
  const MyComponent = app.component('MyComponent')
  ```

- **관련 문서** [컴포넌트 등록](/guide/components/registration)

## app.directive() {#app-directive}

이름 문자열과 디렉티브 정의를 모두 전달하면 전역 커스텀 디렉티브를 등록하고, 이름만 전달하면 이미 등록된 디렉티브를 반환합니다.

- **타입**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **예시**

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // 등록 (객체 디렉티브)
  app.directive('myDirective', {
    /* 커스텀 디렉티브 훅 */
  })

  // 등록 (함수 디렉티브 단축형)
  app.directive('myDirective', () => {
    /* ... */
  })

  // 등록된 디렉티브 가져오기
  const myDirective = app.directive('myDirective')
  ```

- **관련 문서** [커스텀 디렉티브](/guide/reusability/custom-directives)

## app.use() {#app-use}

[플러그인](/guide/reusability/plugins)을 설치합니다.

- **타입**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **세부사항**

  첫 번째 인자로 플러그인을, 두 번째 인자로 선택적 플러그인 옵션을 기대합니다.

  플러그인은 `install()` 메서드를 가진 객체이거나, `install()` 메서드로 사용할 함수일 수 있습니다. 옵션(`app.use()`의 두 번째 인자)은 플러그인의 `install()` 메서드에 전달됩니다.

  동일한 플러그인에 대해 `app.use()`가 여러 번 호출되어도 플러그인은 한 번만 설치됩니다.

- **예시**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **관련 문서** [플러그인](/guide/reusability/plugins)

## app.mixin() {#app-mixin}

전역 믹스인(애플리케이션 범위)을 적용합니다. 전역 믹스인은 포함된 옵션을 애플리케이션 내 모든 컴포넌트 인스턴스에 적용합니다.

:::warning 권장하지 않음
믹스인은 생태계 라이브러리에서 널리 사용되어 Vue 3에서 주로 하위 호환성을 위해 지원됩니다. 애플리케이션 코드에서 믹스인, 특히 전역 믹스인 사용은 피해야 합니다.

로직 재사용을 위해서는 [컴포저블](/guide/reusability/composables)을 사용하는 것이 더 좋습니다.
:::

- **타입**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.provide() {#app-provide}

애플리케이션 내 모든 하위 컴포넌트에서 주입할 수 있는 값을 제공합니다.

- **타입**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **세부사항**

  첫 번째 인자로 주입 키를, 두 번째 인자로 제공할 값을 기대합니다. 애플리케이션 인스턴스 자체를 반환합니다.

- **예시**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'hello')
  ```

  애플리케이션 내 컴포넌트에서:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'hello'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'hello'
    }
  }
  ```

  </div>

- **관련 문서**
  - [Provide / Inject](/guide/components/provide-inject)
  - [앱 레벨 Provide](/guide/components/provide-inject#app-level-provide)
  - [app.runWithContext()](#app-runwithcontext)

## app.runWithContext() {#app-runwithcontext}

- 3.3+에서만 지원

현재 앱을 주입 컨텍스트로 하여 콜백을 실행합니다.

- **타입**

  ```ts
  interface App {
    runWithContext<T>(fn: () => T): T
  }
  ```

- **세부사항**

  콜백 함수를 기대하며, 콜백을 즉시 실행합니다. 콜백의 동기 호출 중에는, 현재 활성 컴포넌트 인스턴스가 없어도 `inject()` 호출이 현재 앱에서 제공한 값을 조회할 수 있습니다. 콜백의 반환값도 그대로 반환됩니다.

- **예시**

  ```js
  import { inject } from 'vue'

  app.provide('id', 1)

  const injected = app.runWithContext(() => {
    return inject('id')
  })

  console.log(injected) // 1
  ```

## app.version {#app-version}

애플리케이션이 생성된 Vue의 버전을 제공합니다. 이는 [플러그인](/guide/reusability/plugins) 내부에서, 다양한 Vue 버전에 따라 조건부 로직이 필요할 때 유용합니다.

- **타입**

  ```ts
  interface App {
    version: string
  }
  ```

- **예시**

  플러그인 내부에서 버전 체크 수행:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('이 플러그인은 Vue 3이 필요합니다')
      }
    }
  }
  ```

- **관련 문서** [글로벌 API - version](/api/general#version)

## app.config {#app-config}

모든 애플리케이션 인스턴스는 해당 애플리케이션의 설정을 담고 있는 `config` 객체를 노출합니다. 애플리케이션을 마운트하기 전에 이 객체의 속성(아래에 문서화됨)을 수정할 수 있습니다.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler {#app-config-errorhandler}

애플리케이션 내에서 전파되는 잡히지 않은 에러에 대한 전역 핸들러를 지정합니다.

- **타입**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info`는 Vue 전용 에러 정보입니다.
      // 예: 어떤 라이프사이클 훅에서 에러가 발생했는지 등
      info: string
    ) => void
  }
  ```

- **세부사항**

  에러 핸들러는 세 개의 인자를 받습니다: 에러, 에러를 발생시킨 컴포넌트 인스턴스, 에러 소스 타입을 지정하는 정보 문자열.

  다음 소스에서 발생한 에러를 포착할 수 있습니다:

  - 컴포넌트 렌더링
  - 이벤트 핸들러
  - 라이프사이클 훅
  - `setup()` 함수
  - 감시자(watchers)
  - 커스텀 디렉티브 훅
  - 트랜지션 훅

  :::tip
  프로덕션에서는 3번째 인자(`info`)가 전체 정보 문자열 대신 축약된 코드가 됩니다. 코드와 문자열 매핑은 [프로덕션 에러 코드 참조](/error-reference/#runtime-errors)에서 확인할 수 있습니다.
  :::

- **예시**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // 에러 처리, 예: 서비스에 리포트
  }
  ```

- **기본값**

  기본 에러 핸들러는 개발 환경에서는 에러를 다시 throw하고, 프로덕션 환경에서는 에러를 로그로 출력합니다.
  이 동작은 [throwUnhandledErrorInProduction](#app-config-throwunhandlederrorinproduction) 속성으로 설정할 수 있습니다.

## app.config.warnHandler {#app-config-warnhandler}

Vue의 런타임 경고에 대한 커스텀 핸들러를 지정합니다.

- **타입**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **세부사항**

  경고 핸들러는 첫 번째 인자로 경고 메시지, 두 번째 인자로 소스 컴포넌트 인스턴스, 세 번째 인자로 컴포넌트 트레이스 문자열을 받습니다.

  특정 경고를 필터링하여 콘솔의 장황함을 줄이는 데 사용할 수 있습니다. 모든 Vue 경고는 개발 중에 해결되어야 하므로, 이 설정은 많은 경고 중 특정 경고에 집중하고자 하는 디버그 세션에서만 권장되며, 디버깅이 끝나면 제거해야 합니다.

  :::tip
  경고는 개발 중에만 동작하므로, 이 설정은 프로덕션 모드에서는 무시됩니다.
  :::

- **예시**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace`는 컴포넌트 계층 트레이스입니다
  }
  ```

## app.config.performance {#app-config-performance}

이 값을 `true`로 설정하면 브라우저 개발자 도구의 performance/timeline 패널에서 컴포넌트 초기화, 컴파일, 렌더, 패치 성능 추적이 활성화됩니다. 개발 모드에서만 동작하며, [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API를 지원하는 브라우저에서만 사용할 수 있습니다.

- **타입:** `boolean`

- **관련 문서** [가이드 - 성능](/guide/best-practices/performance)

## app.config.compilerOptions {#app-config-compileroptions}

런타임 컴파일러 옵션을 설정합니다. 이 객체에 설정된 값은 브라우저 내 템플릿 컴파일러에 전달되며, 설정된 앱의 모든 컴포넌트에 영향을 미칩니다. 또한 [`compilerOptions` 옵션](/api/options-rendering#compileroptions)을 사용하여 컴포넌트별로 이 옵션을 오버라이드할 수도 있습니다.

::: warning 중요
이 설정 옵션은 전체 빌드(즉, 브라우저에서 템플릿을 컴파일할 수 있는 독립형 `vue.js`)를 사용할 때만 적용됩니다. 빌드 설정과 함께 런타임 전용 빌드를 사용하는 경우, 컴파일러 옵션은 빌드 도구 설정을 통해 `@vue/compiler-dom`에 전달해야 합니다.

- `vue-loader`의 경우: [loader 옵션의 `compilerOptions`를 통해 전달](https://vue-loader.vuejs.org/options.html#compileroptions). [`vue-cli`에서 설정하는 방법도 참고](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

- `vite`의 경우: [`@vitejs/plugin-vue` 옵션을 통해 전달](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options).
  :::

### app.config.compilerOptions.isCustomElement {#app-config-compileroptions-iscustomelement}

네이티브 커스텀 엘리먼트를 인식하는 체크 메서드를 지정합니다.

- **타입:** `(tag: string) => boolean`

- **세부사항**

  태그가 네이티브 커스텀 엘리먼트로 처리되어야 하면 `true`를 반환해야 합니다. 일치하는 태그에 대해 Vue는 해당 태그를 Vue 컴포넌트로 해석하지 않고 네이티브 엘리먼트로 렌더링합니다.

  네이티브 HTML 및 SVG 태그는 이 함수에서 일치시킬 필요가 없습니다. Vue의 파서는 이를 자동으로 인식합니다.

- **예시**

  ```js
  // 'ion-'으로 시작하는 모든 태그를 커스텀 엘리먼트로 처리
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **관련 문서** [Vue와 웹 컴포넌트](/guide/extras/web-components)

### app.config.compilerOptions.whitespace {#app-config-compileroptions-whitespace}

템플릿 공백 처리 동작을 조정합니다.

- **타입:** `'condense' | 'preserve'`

- **기본값:** `'condense'`

- **세부사항**

  Vue는 더 효율적인 컴파일 결과를 위해 템플릿의 공백 문자를 제거/축약합니다. 기본 전략은 "condense"이며, 다음과 같은 동작을 합니다:

  1. 엘리먼트 내부의 앞/뒤 공백 문자는 하나의 공백으로 축약됩니다.
  2. 줄바꿈이 포함된 엘리먼트 사이의 공백 문자는 제거됩니다.
  3. 텍스트 노드 내 연속된 공백 문자는 하나의 공백으로 축약됩니다.

  이 옵션을 `'preserve'`로 설정하면 (2)와 (3)이 비활성화됩니다.

- **예시**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.config.compilerOptions.delimiters {#app-config-compileroptions-delimiters}

템플릿 내 텍스트 보간에 사용되는 구분자를 조정합니다.

- **타입:** `[string, string]`

- **기본값:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **세부사항**

  이는 머스태시 구문을 사용하는 서버 사이드 프레임워크와의 충돌을 피하기 위해 주로 사용됩니다.

- **예시**

  ```js
  // 구분자를 ES6 템플릿 문자열 스타일로 변경
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.config.compilerOptions.comments {#app-config-compileroptions-comments}

템플릿 내 HTML 주석 처리 방식을 조정합니다.

- **타입:** `boolean`

- **기본값:** `false`

- **세부사항**

  기본적으로 Vue는 프로덕션에서 주석을 제거합니다. 이 옵션을 `true`로 설정하면 프로덕션에서도 주석이 유지됩니다. 개발 중에는 항상 주석이 유지됩니다. 이 옵션은 주로 HTML 주석에 의존하는 다른 라이브러리와 함께 Vue를 사용할 때 사용됩니다.

- **예시**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties {#app-config-globalproperties}

애플리케이션 내 모든 컴포넌트 인스턴스에서 접근할 수 있는 전역 속성을 등록할 수 있는 객체입니다.

- **타입**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **세부사항**

  이는 Vue 2의 `Vue.prototype`을 대체하는 것으로, Vue 3에서는 더 이상 존재하지 않습니다. 모든 전역 설정과 마찬가지로, 신중하게 사용해야 합니다.

  전역 속성이 컴포넌트의 자체 속성과 충돌하는 경우, 컴포넌트의 자체 속성이 더 높은 우선순위를 가집니다.

- **사용법**

  ```js
  app.config.globalProperties.msg = 'hello'
  ```

  이렇게 하면 애플리케이션 내 모든 컴포넌트 템플릿과 컴포넌트 인스턴스의 `this`에서 `msg`를 사용할 수 있습니다:

  ```js
  export default {
    mounted() {
      console.log(this.msg) // 'hello'
    }
  }
  ```

- **관련 문서** [가이드 - 전역 속성 확장](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

## app.config.optionMergeStrategies {#app-config-optionmergestrategies}

커스텀 컴포넌트 옵션에 대한 병합 전략을 정의하는 객체입니다.

- **타입**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **세부사항**

  일부 플러그인/라이브러리는 커스텀 컴포넌트 옵션 지원을 추가합니다(전역 믹스인 주입 등). 이러한 옵션은 동일한 옵션이 여러 소스(예: 믹스인 또는 컴포넌트 상속)에서 "병합"되어야 할 때 특별한 병합 로직이 필요할 수 있습니다.

  병합 전략 함수는 옵션 이름을 키로 하여 `app.config.optionMergeStrategies` 객체에 할당함으로써 커스텀 옵션에 대해 등록할 수 있습니다.

  병합 전략 함수는 부모와 자식 인스턴스에 정의된 해당 옵션의 값을 각각 첫 번째, 두 번째 인자로 받습니다.

- **예시**

  ```js
  const app = createApp({
    // 자체 옵션
    msg: 'Vue',
    // 믹스인에서 온 옵션
    mixins: [
      {
        msg: 'Hello '
      }
    ],
    mounted() {
      // 병합된 옵션은 this.$options에 노출됨
      console.log(this.$options.msg)
    }
  })

  // `msg`에 대한 커스텀 병합 전략 정의
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // 'Hello Vue'가 출력됨
  ```

- **관련 문서** [컴포넌트 인스턴스 - `$options`](/api/component-instance#options)

## app.config.idPrefix <sup class="vt-badge" data-text="3.5+" /> {#app-config-idprefix}

이 애플리케이션 내에서 [useId()](/api/composition-api-helpers.html#useid)를 통해 생성된 모든 ID에 대한 접두사를 설정합니다.

- **타입:** `string`

- **기본값:** `undefined`

- **예시**

  ```js
  app.config.idPrefix = 'myApp'
  ```

  ```js
  // 컴포넌트 내에서:
  const id1 = useId() // 'myApp:0'
  const id2 = useId() // 'myApp:1'
  ```

## app.config.throwUnhandledErrorInProduction <sup class="vt-badge" data-text="3.5+" /> {#app-config-throwunhandlederrorinproduction}

프로덕션 모드에서 처리되지 않은 에러를 강제로 throw합니다.

- **타입:** `boolean`

- **기본값:** `false`

- **세부사항**

  기본적으로 Vue 애플리케이션 내에서 throw되었지만 명시적으로 처리되지 않은 에러는 개발 모드와 프로덕션 모드에서 서로 다르게 동작합니다:

  - 개발 모드에서는 에러가 throw되어 애플리케이션이 중단될 수 있습니다. 이는 에러를 더 눈에 띄게 하여 개발 중에 발견하고 수정할 수 있도록 하기 위함입니다.

  - 프로덕션 모드에서는 에러가 콘솔에만 기록되어 최종 사용자에게 미치는 영향을 최소화합니다. 그러나 이로 인해 프로덕션에서만 발생하는 에러가 에러 모니터링 서비스에 포착되지 않을 수 있습니다.

  `app.config.throwUnhandledErrorInProduction`을 `true`로 설정하면, 프로덕션 모드에서도 처리되지 않은 에러가 throw됩니다.
