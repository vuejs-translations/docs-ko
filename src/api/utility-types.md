# 유틸리티 타입 {#utility-types}

:::info
이 페이지에는 사용법에 대한 설명이 필요한 몇 가지 일반적으로 사용되는 유틸리티 타입만 나열되어 있습니다. 내보내는 타입의 전체 목록은 [소스 코드](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131)를 참고하세요.
:::

## PropType\<T> {#proptype-t}

런타임 props 선언을 사용할 때 prop에 더 고급 타입을 주석으로 달 때 사용합니다.

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
        // `Object`에 더 구체적인 타입을 제공합니다
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **관련 문서** [가이드 - 컴포넌트 Props 타입 지정](/guide/typescript/options-api#typing-component-props)

## MaybeRef\<T> {#mayberef}

- 3.3+에서만 지원

`T | Ref<T>`의 별칭입니다. [컴포저블(composable)](/guide/reusability/composables.html) 인자의 타입을 주석으로 달 때 유용합니다.

## MaybeRefOrGetter\<T> {#maybereforgetter}

- 3.3+에서만 지원

`T | Ref<T> | (() => T)`의 별칭입니다. [컴포저블](/guide/reusability/composables.html) 인자의 타입을 주석으로 달 때 유용합니다.

## ExtractPropTypes\<T> {#extractproptypes}

런타임 props 옵션 객체에서 prop 타입을 추출합니다. 추출된 타입은 내부적으로 사용되는 타입입니다. 즉, 컴포넌트(component)가 받는 props의 해석된 타입입니다. 이 말은 불리언 props와 기본값이 있는 props는 필수 여부와 상관없이 항상 정의되어 있다는 뜻입니다.

외부에서 전달 가능한 props, 즉 부모가 전달할 수 있는 props를 추출하려면 [`ExtractPublicPropTypes`](#extractpublicproptypes)를 사용하세요.

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

- 3.3+에서만 지원

런타임 props 옵션 객체에서 prop 타입을 추출합니다. 추출된 타입은 외부에서 사용되는 타입입니다. 즉, 부모가 전달할 수 있는 props입니다.

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

커스텀 전역 속성을 지원하기 위해 컴포넌트 인스턴스(instance) 타입을 확장할 때 사용합니다.

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
  확장은 모듈 `.ts` 또는 `.d.ts` 파일에 작성해야 합니다. 자세한 내용은 [타입 확장 위치](/guide/typescript/options-api#augmenting-global-properties)를 참고하세요.
  :::

- **관련 문서** [가이드 - 전역 속성 확장](/guide/typescript/options-api#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

커스텀 옵션을 지원하기 위해 컴포넌트 옵션 타입을 확장할 때 사용합니다.

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
  확장은 모듈 `.ts` 또는 `.d.ts` 파일에 작성해야 합니다. 자세한 내용은 [타입 확장 위치](/guide/typescript/options-api#augmenting-global-properties)를 참고하세요.
  :::

- **관련 문서** [가이드 - 커스텀 옵션 확장](/guide/typescript/options-api#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

TSX 요소에서 선언되지 않은 props를 사용하기 위해 허용되는 TSX props를 확장할 때 사용합니다.

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
  // hello가 선언된 prop이 아니어도 이제 동작합니다
  <MyComponent hello="world" />
  ```

  :::tip
  확장은 모듈 `.ts` 또는 `.d.ts` 파일에 작성해야 합니다. 자세한 내용은 [타입 확장 위치](/guide/typescript/options-api#augmenting-global-properties)를 참고하세요.
  :::

## CSSProperties {#cssproperties}

style 속성 바인딩(binding)에서 허용되는 값을 확장할 때 사용합니다.

- **예시**

  커스텀 CSS 속성 허용

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

:::tip
확장은 모듈 `.ts` 또는 `.d.ts` 파일에 작성해야 합니다. 자세한 내용은 [타입 확장 위치](/guide/typescript/options-api#augmenting-global-properties)를 참고하세요.
:::

:::info 관련 문서
SFC `<style>` 태그는 `v-bind` CSS 함수를 사용하여 CSS 값을 동적 컴포넌트 상태에 연결하는 것을 지원합니다. 이를 통해 타입 확장 없이도 커스텀 속성을 사용할 수 있습니다.

- [CSS에서 v-bind()](/api/sfc-css-features#v-bind-in-css)
  :::
