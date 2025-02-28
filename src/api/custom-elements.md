# Custom Elements API {#custom-elements-api}

## defineCustomElement() {#definecustomelement}

이 메서드는 [`defineComponent`](#definecomponent)와 동일한 인자를 받지만, 대신 네이티브 [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) 클래스 생성자를 반환합니다.

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

    // the following options are 3.5+
    configureApp?: (app: App) => void
    shadowRoot?: boolean
    nonce?: string
  }
  ```

  > 가독성을 위해 타입은 간략화 했습니다. 

- **상세**

  `defineCustomElement()`은 일반적인 컴포넌트 옵션 외에도 커스텀 엘리먼트 전용 옵션을 추가로 지원합니다:

  - **`styles`**: 요소의 shadow root에 주입할 CSS를 포함하는 인라인 CSS 문자열 배열입니다.

  - **`configureApp`** <sup class="vt-badge" data-text="3.5+"/>: 커스텀 엘리먼트용 Vue 애플리케이션 인스턴스를 설정하는 데 사용할 수 있는 함수입니다.

  - **`shadowRoot`** <sup class="vt-badge" data-text="3.5+"/>: `boolean` 값이며 기본값은 `true`입니다. `false`로 설정하면 커스텀 엘리먼트가 shadow root 없이 렌더링됩니다. 이 경우, 커스텀 엘리먼트 SFC 내부의 `<style>`이 더 이상 캡슐화되지 않습니다.

  - **`nonce`** <sup class="vt-badge" data-text="3.5+"/>: `string` 값으로, 제공될 경우 shadow root에 주입되는 `<style>` 태그의 `nonce` 속성으로 설정됩니다.

  참고로 이러한 옵션들은 컴포넌트 자체의 일부로 전달하는 대신, 두 번째 인자로도 전달할 수 있습니다.
 

  ```js
  import Element from './MyElement.ce.vue'

  defineCustomElement(Element, {
    configureApp(app) {
      // ...
    }
  })
  ```

  반환값은 [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define)를 사용하여 등록할 수 있는 커스텀 엘리먼트 생성자입니다.

- **예제**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* 컴포넌트 옵션 */
  })

  // 커스텀 앨리먼트 등록
  customElements.define('my-vue-element', MyVueElement)
  ```

- **참조**

  - [가이드 - Vue로 커스텀 앨리먼트 만들기](/guide/extras/web-components#building-custom-elements-with-vue)

  - 또한, `defineCustomElement()`을 Single-File Component(SFC)와 함께 사용할 경우, [특별한 설정](/guide/extras/web-components#sfc-as-custom-element)이 필요하다는 점을 유의하세요.

## useHost() <sup class="vt-badge" data-text="3.5+"/> {#usehost}

현재 Vue 커스텀 엘리먼트의 호스트 요소를 반환하는 Composition API 헬퍼 함수입니다.

## useShadowRoot() <sup class="vt-badge" data-text="3.5+"/> {#useshadowroot}

현재 Vue 커스텀 엘리먼트의 shadow root를 반환하는 Composition API 헬퍼 함수입니다.

## this.$host <sup class="vt-badge" data-text="3.5+"/> {#this-host}

현재 Vue 커스텀 엘리먼트의 호스트 요소를 노출하는 Options API 속성입니다.

