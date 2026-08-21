# Composition API: <br>의존성 주입(dependency injection) {#composition-api-dependency-injection}

## provide() {#provide}

하위 컴포넌트에서 주입할 수 있는 값을 제공합니다.

- **타입**

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **세부사항**

  `provide()`는 두 개의 인자를 받습니다. 첫 번째는 문자열 또는 심볼이 될 수 있는 key이고, 두 번째는 주입할 값입니다.

  TypeScript를 사용할 때, key는 `InjectionKey`로 캐스팅된 심볼일 수 있습니다. `InjectionKey`는 Vue에서 제공하는 유틸리티 타입으로, `Symbol`을 확장하며 `provide()`와 `inject()` 간의 값 타입을 동기화하는 데 사용할 수 있습니다.

  라이프사이클(lifecycle) 훅 등록 API와 유사하게, `provide()`는 컴포넌트(component)의 `setup()` 단계에서 동기적으로 호출되어야 합니다.

- **예시**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // 정적 값 제공
  provide('path', '/project/')

  // 반응형 값 제공
  const count = ref(0)
  provide('count', count)

  // Symbol 키로 제공
  provide(countSymbol, count)
  </script>
  ```

- **관련 문서**
  - [가이드 - Provide / Inject](/guide/components/provide-inject)
  - [가이드 - Provide / Inject 타입 지정](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## inject() {#inject}

상위 컴포넌트 또는 애플리케이션(`app.provide()`를 통해)에서 제공한 값을 주입합니다.

- **타입**

  ```ts
  // 기본값 없이
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // 기본값과 함께
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // 팩토리와 함께
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **세부사항**

  첫 번째 인자는 주입 키입니다. Vue는 부모 체인을 따라 올라가며 일치하는 키로 제공된 값을 찾습니다. 부모 체인에서 여러 컴포넌트가 동일한 키를 제공하는 경우, 주입하는 컴포넌트에 가장 가까운 컴포넌트가 체인 상위의 값들을 "가리며(shadow)", 그 컴포넌트의 값이 사용됩니다. 일치하는 키의 값이 없고 기본값도 제공되지 않았다면, `inject()`는 `undefined`를 반환합니다.

  두 번째 인자는 선택 사항이며, 일치하는 값이 없을 때 사용할 기본값입니다.

  두 번째 인자는 값 생성 비용이 큰 경우 값을 반환하는 팩토리 함수가 될 수도 있습니다. 이 경우, 세 번째 인자로 `true`를 전달하여 해당 함수가 값 자체가 아닌 팩토리로 사용되어야 함을 나타내야 합니다.

  라이프사이클 훅(hook) 등록 API와 유사하게, `inject()`는 컴포넌트의 `setup()` 단계에서 동기적으로 호출되어야 합니다.

  TypeScript를 사용할 때, key는 `InjectionKey` 타입일 수 있습니다. `InjectionKey`는 Vue에서 제공하는 유틸리티 타입으로, `Symbol`을 확장하며 `provide()`와 `inject()` 간의 값 타입을 동기화하는 데 사용할 수 있습니다.

- **예시**

  상위 컴포넌트가 이전 `provide()` 예시와 같이 값을 제공했다고 가정합니다:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // 기본값 없이 정적 값 주입
  const path = inject('path')

  // 반응형 값 주입
  const count = inject('count')

  // Symbol 키로 주입
  const count2 = inject(countSymbol)

  // 기본값과 함께 주입
  const bar = inject('path', '/default-path')

  // 함수 기본값으로 주입
  const fn = inject('function', () => {})

  // 기본값 팩토리로 주입
  const baz = inject('factory', () => new ExpensiveObject(), true)
  </script>
  ```
  
- **관련 문서**
  - [가이드 - Provide / Inject](/guide/components/provide-inject)
  - [가이드 - Provide / Inject 타입 지정](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## hasInjectionContext() {#has-injection-context}

- 3.3+에서만 지원

잘못된 위치(예: `setup()` 외부)에서 호출했다는 경고 없이 [inject()](#inject)를 사용할 수 있다면 true를 반환합니다. 이 메서드는 내부적으로 `inject()`를 사용하되 최종 사용자에게 경고를 발생시키지 않으려는 라이브러리에서 사용하도록 설계되었습니다.

- **타입**

  ```ts
  function hasInjectionContext(): boolean
  ```
