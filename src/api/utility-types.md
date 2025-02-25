# 유틸리티 타입 {#utility-types}

::: info
이 페이지는 사용법에 대한 설명이 필요할 수 있는 몇 가지 일반적으로 사용되는 유틸리티 타입을 나열합니다. 내보낸 타입의 전체 목록을 확인하려면 [소스 코드](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131)를 참조하십시오.
:::

## PropType\<T> {#proptype-t}

런타임 props 선언을 사용할 때 보다 고급 유형으로 prop을 주석 처리하는 데 사용됩니다.

- **예시**

  ```ts
  import type { PropType } from 'vue'

  interface Book {
    title: string
    author: string
    year: number
  }

  export default {
    props: {
      book: {
        // `Object`에 더 구체적인 타입 제공
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **참고** [가이드 - 컴포넌트 Props 타이핑](/guide/typescript/options-api#typing-component-props)

## MaybeRef\<T> {#mayberef}

`T | Ref<T>`의 별칭입니다. [컴포저블](/guide/reusability/composables)의 인자를 주석 처리하는 데 유용합니다.

- 3.3+에서만 지원됩니다.

## MaybeRefOrGetter\<T> {#maybereforgetter}

`T | Ref<T> | (() => T)`의 별칭입니다. [컴포저블](/guide/reusability/composables)의 인자를 주석 처리하는 데 유용합니다.

- 3.3+에서만 지원됩니다.

## ExtractPropTypes\<T> {#extractproptypes}

런타임 props 옵션 객체에서 prop 타입을 추출합니다. 추출된 타입은 내부 지향적입니다 - 즉, 컴포넌트가 받는 해결된 props입니다. 이는 boolean props와 기본값이 있는 props는 필수가 아니더라도 항상 정의된다는 것을 의미합니다.

부모가 전달할 수 있는 props, 즉 공개적으로 직면하는 props를 추출하려면 [`ExtractPublicPropTypes`](#extractpublicproptypes)를 사용하세요.

- **예시**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar: boolean,
  //   baz: number,
  //   qux: number
  // }
  ```

## ExtractPublicPropTypes\<T> {#extractpublicproptypes}

런타임 props 옵션 객체에서 prop 타입을 추출합니다. 추출된 타입은 공개적으로 직면합니다 - 즉, 부모가 전달할 수 있는 props입니다.

- 3.3+에서만 지원됩니다.

- **예시**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPublicPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar?: boolean,
  //   baz: number,
  //   qux?: number
  // }
  ```

## ComponentCustomProperties {#componentcustomproperties}

컴포넌트 인스턴스 타입을 사용자 정의 전역 속성을 지원하도록 확장하는 데 사용됩니다.

- **예시**

  ```ts
  import axios from 'axios'

  declare module 'vue' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
    }
  }
  ```

  :::tip
  확장은 모듈 `.ts` 또는 `.d.ts` 파일에 배치해야 합니다. 더 자세한 내용은 [타입 확장 위치](/guide/typescript/options-api#augmenting-global-properties)를 참조하세요.
  :::

- **참고** [가이드 - 전역 속성 확장](/guide/typescript/options-api#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

사용자 정의 옵션을 지원하도록 컴포넌트 옵션 타입을 확장하는 데 사용됩니다.

- **예시**

  ```ts
  import { Route } from 'vue-router'

  declare module 'vue' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip
  확장은 모듈 `.ts` 또는 `.d.ts` 파일에 배치해야 합니다. 더 자세한 내용은 [타입 확장 위치](/guide/typescript/options-api#augmenting-global-properties)를 참조하세요.
  :::

- **참고** [가이드 - 사용자 정의 옵션 확장](/guide/typescript/options-api#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

TSX 요소에서 선언되지 않은 props를 사용하기 위해 허용된 TSX props를 확장하는 데 사용됩니다.

- **예시**

  ```ts
  declare module 'vue' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // 이제 hello가 선언된 prop이 아니더라도 작동합니다
  <MyComponent hello="world" />
  ```

  :::tip
  확장은 모듈 `.ts` 또는 `.d.ts` 파일에 배치해야 합니다. 더 자세한 내용은 [타입 확장 위치](/guide/typescript/options-api#augmenting-global-properties)를 참조하세요.
  :::

## CSSProperties {#cssproperties}

스타일 속성 바인딩에서 허용되는 값에 추가하는 데 사용됩니다.

- **예시**

  모든 사용자 정의 CSS 속성 허용

  ```ts
  declare module 'vue' {
    interface CSSProperties {
      [key: `--${string}`]: string
    }
  }
  ```

  ```tsx
  <div style={ { '--bg-color': 'blue' } }>
  ```

  ```html
  <div :style="{ '--bg-color': 'blue' }"></div>
  ```

::: tip
확장은 모듈 `.ts` 또는 `.d.ts` 파일에 배치해야 합니다. 더 자세한 내용은 [타입 확장 위치](/guide/typescript/options-api#augmenting-global-properties)를 참조하세요.
:::

::: info 참고
SFC `<style>` 태그는 CSS 값과 동적 컴포넌트 상태를 `v-bind` CSS 함수를 사용하여 연결할 수 있게 지원하여, 타입 확장 없이 사용자 정의 속성을 가능하게 합니다.

- [CSS에서의 v-bind()](/api/sfc-css-features#v-bind-in-css)
  :::
