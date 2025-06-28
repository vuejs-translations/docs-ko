# 옵션: 렌더링 {#options-rendering}

## template {#template}

컴포넌트의 문자열 템플릿입니다.

- **타입**

  ```ts
  interface ComponentOptions {
    template?: string
  }
  ```

- **세부사항**

  `template` 옵션을 통해 제공된 템플릿은 런타임에 즉석에서 컴파일됩니다. 이는 템플릿 컴파일러가 포함된 Vue 빌드를 사용할 때만 지원됩니다. 템플릿 컴파일러는 이름에 `runtime`이 포함된 Vue 빌드(예: `vue.runtime.esm-bundler.js`)에는 **포함되어 있지 않습니다**. 다양한 빌드에 대한 자세한 내용은 [dist 파일 가이드](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use)를 참고하세요.

  문자열이 `#`로 시작하면 `querySelector`로 사용되어 선택된 요소의 `innerHTML`을 템플릿 문자열로 사용합니다. 이를 통해 소스 템플릿을 네이티브 `<template>` 요소를 사용하여 작성할 수 있습니다.

  동일한 컴포넌트에 `render` 옵션도 존재하는 경우, `template`은 무시됩니다.

  애플리케이션의 루트 컴포넌트에 `template` 또는 `render` 옵션이 지정되지 않은 경우, Vue는 대신 마운트된 요소의 `innerHTML`을 템플릿으로 사용하려고 시도합니다.

  :::warning 보안 참고
  신뢰할 수 있는 템플릿 소스만 사용하세요. 사용자로부터 제공된 콘텐츠를 템플릿으로 사용하지 마세요. 자세한 내용은 [보안 가이드](/guide/best-practices/security#rule-no-1-never-use-non-trusted-templates)를 참고하세요.
  :::

## render {#render}

컴포넌트의 가상 DOM 트리를 프로그래밍 방식으로 반환하는 함수입니다.

- **타입**

  ```ts
  interface ComponentOptions {
    render?(this: ComponentPublicInstance) => VNodeChild
  }

  type VNodeChild = VNodeChildAtom | VNodeArrayChildren

  type VNodeChildAtom =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | void

  type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[]
  ```

- **세부사항**

  `render`는 문자열 템플릿의 대안으로, 컴포넌트의 렌더 출력을 선언할 때 JavaScript의 완전한 프로그래밍 기능을 활용할 수 있게 해줍니다.

  예를 들어 싱글 파일 컴포넌트의 사전 컴파일된 템플릿은 빌드 시점에 `render` 옵션으로 컴파일됩니다. 컴포넌트에 `render`와 `template`이 모두 존재하는 경우, `render`가 더 높은 우선순위를 가집니다.

- **관련 문서**
  - [렌더링 메커니즘](/guide/extras/rendering-mechanism)
  - [렌더 함수](/guide/extras/render-function)

## compilerOptions {#compileroptions}

컴포넌트의 템플릿에 대한 런타임 컴파일러 옵션을 설정합니다.

- **타입**

  ```ts
  interface ComponentOptions {
    compilerOptions?: {
      isCustomElement?: (tag: string) => boolean
      whitespace?: 'condense' | 'preserve' // 기본값: 'condense'
      delimiters?: [string, string] // 기본값: ['{{', '}}']
      comments?: boolean // 기본값: false
    }
  }
  ```

- **세부사항**

  이 구성 옵션은 전체 빌드(즉, 브라우저에서 템플릿을 컴파일할 수 있는 독립형 `vue.js`)를 사용할 때만 적용됩니다. 앱 레벨의 [app.config.compilerOptions](/api/application#app-config-compileroptions)와 동일한 옵션을 지원하며, 현재 컴포넌트에 대해 더 높은 우선순위를 가집니다.

- **관련 문서** [app.config.compilerOptions](/api/application#app-config-compileroptions)

## slots<sup class="vt-badge ts"/> {#slots}

- 3.3+에서만 지원

렌더 함수에서 슬롯을 프로그래밍 방식으로 사용할 때 타입 추론을 돕기 위한 옵션입니다.

- **세부사항**

  이 옵션의 런타임 값은 사용되지 않습니다. 실제 타입은 `SlotsType` 타입 헬퍼를 사용한 타입 캐스팅을 통해 선언해야 합니다:

  ```ts
  import { SlotsType } from 'vue'

  defineComponent({
    slots: Object as SlotsType<{
      default: { foo: string; bar: number }
      item: { data: number }
    }>,
    setup(props, { slots }) {
      expectType<
        undefined | ((scope: { foo: string; bar: number }) => any)
      >(slots.default)
      expectType<undefined | ((scope: { data: number }) => any)>(
        slots.item
      )
    }
  })
  ```
