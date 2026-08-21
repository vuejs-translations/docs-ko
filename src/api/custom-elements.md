# 커스텀 엘리먼트 API {#custom-elements-api}

## defineCustomElement() {#definecustomelement}

이 메서드는 [`defineComponent`](#definecomponent)와 동일한 인자를 받지만, 대신 네이티브 [커스텀 엘리먼트](https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_custom_elements) 클래스 생성자를 반환합니다.

- **타입**

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & CustomElementsOptions)
      | ComponentOptions['setup'],
    options?: CustomElementsOptions
  ): {
    new (props?: object): HTMLElement
  }

  interface CustomElementsOptions {
    styles?: string[]

    // 아래 옵션들은 3.5+ 버전에서 지원됩니다.
    configureApp?: (app: App) => void
    shadowRoot?: boolean
    nonce?: string
  }
  ```

  > 가독성을 위해 타입이 단순화되었습니다.

- **세부사항**

  일반 컴포넌트(component) 옵션 외에도, `defineCustomElement()`는 커스텀 엘리먼트 전용 옵션들을 추가로 지원합니다:

  - **`styles`**: 엘리먼트의 섀도우 루트에 주입될 CSS를 제공하기 위한 인라인 CSS 문자열 배열입니다.

  - **`configureApp`** <sup class="vt-badge" data-text="3.5+"/>: 커스텀 엘리먼트의 Vue 앱 인스턴스(instance)를 구성하는 데 사용할 수 있는 함수입니다.

  - **`shadowRoot`** <sup class="vt-badge" data-text="3.5+"/>: `boolean`, 기본값은 `true`입니다. `false`로 설정하면 커스텀 엘리먼트가 섀도우 루트 없이 렌더링(rendering)됩니다. 이 경우 커스텀 엘리먼트 SFC 내의 `<style>`은 더 이상 캡슐화되지 않습니다.

  - **`nonce`** <sup class="vt-badge" data-text="3.5+"/>: `string`, 제공되면 섀도우 루트에 주입되는 style 태그의 `nonce` 속성으로 설정됩니다.

  이러한 옵션들은 컴포넌트 자체의 일부로 전달하는 대신, 두 번째 인자를 통해서도 전달할 수 있습니다:

  ```js
  import Element from './MyElement.ce.vue'

  defineCustomElement(Element, {
    configureApp(app) {
      // ...
    }
  })
  ```

  반환값은 [`customElements.define()`](https://developer.mozilla.org/ko/docs/Web/API/CustomElementRegistry/define)를 사용하여 등록할 수 있는 커스텀 엘리먼트 생성자입니다.

- **예시**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* 컴포넌트 옵션 */
  })

  // 커스텀 엘리먼트 등록
  customElements.define('my-vue-element', MyVueElement)
  ```

- **관련 문서**

  - [가이드 - Vue로 커스텀 엘리먼트 빌드하기](/guide/extras/web-components#building-custom-elements-with-vue)

  - 또한, Single-File Component와 함께 `defineCustomElement()`를 사용할 때는 [특별한 설정](/guide/extras/web-components#sfc-as-custom-element)이 필요함을 참고하세요.

## useHost() <sup class="vt-badge" data-text="3.5+"/> {#usehost}

현재 Vue 커스텀 엘리먼트의 호스트 엘리먼트를 반환하는 Composition API 헬퍼입니다.

## useShadowRoot() <sup class="vt-badge" data-text="3.5+"/> {#useshadowroot}

현재 Vue 커스텀 엘리먼트의 섀도우 루트를 반환하는 Composition API 헬퍼입니다.

## this.$host <sup class="vt-badge" data-text="3.5+"/> {#this-host}

현재 Vue 커스텀 엘리먼트의 호스트 엘리먼트를 노출하는 Options API 속성입니다.
