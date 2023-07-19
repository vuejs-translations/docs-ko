# 컴포지션 API: <br>의존성 주입 {#composition-api-dependency-injection}

## provide()  {#provide}

하위 컴포넌트에 주입(Inject)할 수 있도록 값을 제공(Provide)합니다.

- **타입**:

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **세부 사항**:

  `provide()`는 "키가 될 문자열 또는 심볼(symbol)"과 "제공될 값" 두 가지 인자를 가집니다.

  TypeScript를 사용할 때 키는 `InjectionKey`(Vue에서 제공하는 `Symbol`을 확장한 다용도 타입)로 캐스팅된 심볼일 수 있으며,
  이것은 `provide()`와 `inject()` 간 값의 타입을 동기화하는 데 사용할 수 있습니다.

  생명 주기 훅을 등록하는 API와 유사하게 `provide()`는 컴포넌트의 `setup()` 단계에서 동기적으로 호출되어야 합니다.

- **예제**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { fooSymbol } from './injectionSymbols'

  // 제공: 정적 값
  provide('foo', 'bar')

  // 제공: 반응형 값
  const count = ref(0)
  provide('count', count)

  // 제공: 심볼(Symbol) 키
  provide(fooSymbol, count)
  </script>
  ```

- **참고**:
  - [가이드 - Provide/Inject](/guide/components/provide-inject)
  - [가이드 - Provide/Inject에 타입 지정하기](/guide/typescript/composition-api.html#typing-provide-inject) <sup class="vt-badge ts" />

## inject() {#inject}

상위 컴포넌트 또는 [`app.provide()`](/api/application.html#app-provide)를 통해 앱에서 제공(Provide)된 값을 주입(Inject)합니다.

- **타입**:

  ```ts
  // 기본 값 없음
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // 기본 값 정의 있음
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // 팩토리 함수
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **세부 사항**

  첫 번째 인수는 주입 키(injection key)입니다. Vue는 부모 체인을 따라 일치하는 키와 함께 제공된 값을 찾습니다. 부모 체인에서 여러 컴포넌트가 동일한 키를 제공하는 경우, 주입 컴포넌트에 가장 가까운 컴포넌트가 체인 상위의 컴포넌트를 "가리게" 됩니다. 일치하는 키를 가진 값이 없는 경우, `inject()`는 기본값이 제공되지 않는 한 `undefined`를 반환합니다.

  두 번째 인수는 선택적이며, 일치하는 값이 없을 때 사용할 기본값입니다.

  두 번째 인수는 생성 비용이 큰 값을 반환하는 팩토리 함수일 수도 있습니다. 이 경우, 함수 자체 대신 팩토리 함수를 사용해야 하므로 세 번째 인수로 `true`를 전달해야 합니다.

  라이프사이클 후크 등록 API와 유사하게, `inject()`는 컴포넌트의 `setup()` 단계에서 동기적으로 호출되어야 합니다.

  TypeScript를 사용하는 경우, 키는 `InjectionKey` 타입일 수 있습니다. `InjectionKey`는 `Symbol`을 확장한 Vue에서 제공하는 유틸리티 타입으로, `provide()`와 `inject()` 사이에서 값의 유형을 동기화하는 데 사용할 수 있습니다.

- **예제**

  부모 컴포넌트가 이전 `provide()` 예제에서와 같은 값을 제공했다고 가정:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { fooSymbol } from './injectionSymbols'

  // 주입: 정적 값
  const foo = inject('foo')

  // 주입: 반응형 값
  const count = inject('count')

  // 주입: 심볼 키를 사용하여
  const foo2 = inject(fooSymbol)

  // 주입: 기본 값 제공을 하며 (제공되는 'foo'가 없는 경우 적용됨)
  const bar = inject('foo', 'default value')

  // 함수 기본값을 사용하여 주입하기
  const fn = inject('function', () => {})

  // 팩토리 함수를 사용하여 주입하기
  const baz = inject('factory', () => new ExpensiveObject(), true)
  </script>
  ```

- **참고**:
  - [가이드 - Provide/Inject](/guide/components/provide-inject)
  - [가이드 - Provide/Inject에 타입 지정하기](/guide/typescript/composition-api.html#typing-provide-inject) <sup class="vt-badge ts" />
