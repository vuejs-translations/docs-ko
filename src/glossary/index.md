# 용어집 {#glossary}

이 용어집은 Vue에 대해 이야기할 때 일반적으로 사용되는 기술 용어의 의미에 대한 지침을 제공하기 위한 것입니다. 이 용어집은 용어가 일반적으로 어떻게 사용되는지에 대한 *기술적 설명*을 제공하는 것이지, 반드시 어떻게 사용해야 하는지에 대한 *규정*을 제시하는 것은 아닙니다. 일부 용어는 주변 맥락에 따라 약간 다른 의미나 뉘앙스를 가질 수 있습니다.

[[TOC]]

## 비동기 컴포넌트 {#async-component}

*비동기 컴포넌트*는 다른 컴포넌트를 감싸는 래퍼로, 감싸진 컴포넌트를 지연 로딩할 수 있게 해줍니다. 이는 일반적으로 빌드된 `.js` 파일의 크기를 줄이고, 필요할 때만 더 작은 청크로 분할하여 로드할 수 있도록 하는 방법으로 사용됩니다.

Vue Router에도 [라우트 컴포넌트의 지연 로딩](https://router.vuejs.org/guide/advanced/lazy-loading.html)을 위한 유사한 기능이 있지만, 이는 Vue의 비동기 컴포넌트 기능을 사용하지 않습니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 비동기 컴포넌트](/guide/components/async.html)

## 컴파일러 매크로 {#compiler-macro}

*컴파일러 매크로*는 컴파일러에 의해 처리되어 다른 것으로 변환되는 특별한 코드입니다. 이는 사실상 문자열 치환의 영리한 형태입니다.

Vue의 [SFC](#single-file-component) 컴파일러는 `defineProps()`, `defineEmits()`, `defineExpose()`와 같은 다양한 매크로를 지원합니다. 이러한 매크로는 의도적으로 일반 JavaScript 함수처럼 보이도록 설계되어, JavaScript/TypeScript 주변의 동일한 파서와 타입 추론 도구를 활용할 수 있습니다. 하지만 이들은 실제로 브라우저에서 실행되는 함수가 아닙니다. 이들은 컴파일러가 감지하여 실제로 실행될 진짜 JavaScript 코드로 대체하는 특별한 문자열입니다.

매크로는 일반 JavaScript 코드에는 적용되지 않는 사용상의 제한이 있습니다. 예를 들어, `const dp = defineProps`로 `defineProps`의 별칭을 만들 수 있다고 생각할 수 있지만, 실제로는 오류가 발생합니다. 또한 `defineProps()`에 전달할 수 있는 값에도 제한이 있는데, '인자'는 런타임이 아니라 컴파일러에 의해 처리되어야 합니다.

자세한 내용은 다음을 참고하세요:
- [`<script setup>` - `defineProps()` & `defineEmits()`](/api/sfc-script-setup.html#defineprops-defineemits)
- [`<script setup>` - `defineExpose()`](/api/sfc-script-setup.html#defineexpose)

## 컴포넌트 {#component}

*컴포넌트*라는 용어는 Vue에만 국한된 것이 아닙니다. 이는 많은 UI 프레임워크에서 공통적으로 사용됩니다. 버튼이나 체크박스와 같은 UI의 일부를 설명합니다. 컴포넌트는 더 큰 컴포넌트로 결합될 수도 있습니다.

컴포넌트는 UI를 더 작은 조각으로 분할하여 유지보수성을 높이고 코드 재사용을 가능하게 하는 Vue의 주요 메커니즘입니다.

Vue 컴포넌트는 객체입니다. 모든 속성은 선택 사항이지만, 컴포넌트가 렌더링되려면 템플릿이나 렌더 함수 중 하나가 필요합니다. 예를 들어, 다음 객체는 유효한 컴포넌트가 됩니다:

```js
const HelloWorldComponent = {
  render() {
    return 'Hello world!'
  }
}
```

실제로 대부분의 Vue 애플리케이션은 [싱글 파일 컴포넌트](#single-file-component) (`.vue` 파일)를 사용하여 작성됩니다. 이러한 컴포넌트는 처음에는 객체처럼 보이지 않을 수 있지만, SFC 컴파일러가 이를 객체로 변환하여 파일의 기본 내보내기로 사용합니다. 외부 관점에서 보면 `.vue` 파일은 컴포넌트 객체를 내보내는 ES 모듈일 뿐입니다.

컴포넌트 객체의 속성은 일반적으로 *옵션*이라고 불립니다. [옵션 API](#options-api)의 이름도 여기서 유래합니다.

컴포넌트의 옵션은 해당 컴포넌트의 인스턴스가 어떻게 생성되어야 하는지 정의합니다. 컴포넌트는 개념적으로 클래스와 유사하지만, Vue는 실제 JavaScript 클래스를 사용하여 컴포넌트를 정의하지는 않습니다.

컴포넌트라는 용어는 컴포넌트 인스턴스를 느슨하게 지칭하는 데에도 사용될 수 있습니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 컴포넌트 기본](/guide/essentials/component-basics.html)

'컴포넌트'라는 단어는 다음과 같은 여러 용어에도 등장합니다:
- [비동기 컴포넌트](#async-component)
- [동적 컴포넌트](#dynamic-component)
- [함수형 컴포넌트](#functional-component)
- [웹 컴포넌트](#web-component)

## 컴포저블 {#composable}

*컴포저블*이라는 용어는 Vue에서 일반적으로 사용되는 패턴을 설명합니다. 이는 Vue의 [컴포지션 API](#composition-api)를 사용하는 방법일 뿐, 별도의 기능은 아닙니다.

* 컴포저블은 함수입니다.
* 컴포저블은 상태가 있는 로직을 캡슐화하고 재사용하는 데 사용됩니다.
* 함수 이름은 일반적으로 `use`로 시작하여, 다른 개발자들이 이것이 컴포저블임을 알 수 있게 합니다.
* 이 함수는 일반적으로 컴포넌트의 `setup()` 함수(또는 동등하게 `<script setup>` 블록)에서 동기적으로 호출되는 것이 기대됩니다. 이는 컴포저블의 호출을 현재 컴포넌트 컨텍스트에 연결합니다. 예: `provide()`, `inject()`, `onMounted()` 호출을 통해.
* 컴포저블은 일반적으로 반응형 객체가 아닌 일반 객체를 반환합니다. 이 객체는 보통 ref와 함수들을 포함하며, 호출 코드 내에서 구조 분해 할당되는 것이 기대됩니다.

많은 패턴과 마찬가지로, 특정 코드가 컴포저블로 분류될 수 있는지에 대해 의견이 다를 수 있습니다. 모든 JavaScript 유틸리티 함수가 컴포저블인 것은 아닙니다. 함수가 컴포지션 API를 사용하지 않는다면 아마도 컴포저블이 아닐 것입니다. `setup()`의 동기 실행 중에 호출되는 것이 기대되지 않는다면 역시 컴포저블이 아닐 것입니다. 컴포저블은 상태가 있는 로직을 캡슐화하는 데에만 사용되며, 단순히 함수의 명명 규칙이 아닙니다.

컴포저블 작성에 대한 자세한 내용은 [가이드 - 컴포저블](/guide/reusability/composables.html)을 참고하세요.

## 컴포지션 API {#composition-api}

*컴포지션 API*는 Vue에서 컴포넌트와 컴포저블을 작성하는 데 사용되는 함수들의 모음입니다.

이 용어는 컴포넌트를 작성하는 두 가지 주요 스타일 중 하나를 설명하는 데에도 사용됩니다. 다른 하나는 [옵션 API](#options-api)입니다. 컴포지션 API를 사용하여 작성된 컴포넌트는 `<script setup>` 또는 명시적인 `setup()` 함수를 사용합니다.

자세한 내용은 [컴포지션 API FAQ](/guide/extras/composition-api-faq)를 참고하세요.

## 커스텀 엘리먼트 {#custom-element}

*커스텀 엘리먼트*는 최신 웹 브라우저에 구현된 [웹 컴포넌트](#web-component) 표준의 기능입니다. 이는 HTML 마크업에서 커스텀 HTML 엘리먼트를 사용하여 해당 위치에 웹 컴포넌트를 포함할 수 있는 기능을 의미합니다.

Vue는 커스텀 엘리먼트 렌더링을 기본적으로 지원하며, Vue 컴포넌트 템플릿에서 직접 사용할 수 있습니다.

커스텀 엘리먼트는 다른 Vue 컴포넌트의 템플릿 내에서 Vue 컴포넌트를 태그로 포함하는 기능과 혼동해서는 안 됩니다. 커스텀 엘리먼트는 Vue 컴포넌트가 아니라 웹 컴포넌트를 만들 때 사용됩니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - Vue와 웹 컴포넌트](/guide/extras/web-components.html)

## 디렉티브 {#directive}

*디렉티브*라는 용어는 `v-` 접두사로 시작하는 템플릿 속성이나 그에 해당하는 축약형을 의미합니다.

내장 디렉티브에는 `v-if`, `v-for`, `v-bind`, `v-on`, `v-slot` 등이 있습니다.

Vue는 커스텀 디렉티브 생성도 지원하지만, 일반적으로 DOM 노드를 직접 조작해야 할 때 '탈출구'로만 사용됩니다. 커스텀 디렉티브로 내장 디렉티브의 기능을 재현하는 것은 일반적으로 불가능합니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 템플릿 문법 - 디렉티브](/guide/essentials/template-syntax.html#directives)
- [가이드 - 커스텀 디렉티브](/guide/reusability/custom-directives.html)

## 동적 컴포넌트 {#dynamic-component}

*동적 컴포넌트*라는 용어는 어떤 자식 컴포넌트를 렌더링할지 동적으로 결정해야 하는 경우를 설명할 때 사용됩니다. 일반적으로 `<component :is="type">`를 사용하여 구현합니다.

동적 컴포넌트는 특별한 유형의 컴포넌트가 아닙니다. 모든 컴포넌트는 동적 컴포넌트로 사용될 수 있습니다. 동적인 것은 컴포넌트 자체가 아니라, 선택되는 컴포넌트입니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 컴포넌트 기본 - 동적 컴포넌트](/guide/essentials/component-basics.html#dynamic-components)

## 이펙트 {#effect}

[반응형 이펙트](#reactive-effect) 및 [사이드 이펙트](#side-effect)를 참고하세요.

## 이벤트 {#event}

프로그램의 여러 부분 간 통신을 위해 이벤트를 사용하는 것은 다양한 프로그래밍 영역에서 공통적입니다. Vue 내에서는 이 용어가 네이티브 HTML 엘리먼트 이벤트와 Vue 컴포넌트 이벤트 모두에 일반적으로 적용됩니다. `v-on` 디렉티브는 템플릿에서 두 가지 유형의 이벤트를 모두 수신하는 데 사용됩니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 이벤트 처리](/guide/essentials/event-handling.html)
- [가이드 - 컴포넌트 이벤트](/guide/components/events.html)

## 프래그먼트 {#fragment}

*프래그먼트*라는 용어는 다른 [VNode](#vnode)의 부모로 사용되지만, 자체적으로는 어떤 엘리먼트도 렌더링하지 않는 특별한 유형의 VNode를 의미합니다.

이 이름은 네이티브 DOM API의 [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)와 유사한 개념에서 유래했습니다.

프래그먼트는 여러 루트 노드를 가진 컴포넌트를 지원하기 위해 사용됩니다. 이러한 컴포넌트는 여러 루트를 가진 것처럼 보일 수 있지만, 내부적으로는 프래그먼트 노드를 단일 루트로 사용하여 '루트' 노드들의 부모로 삼습니다.

프래그먼트는 또한 템플릿 컴파일러가 여러 동적 노드를 감싸는 방법으로 사용됩니다. 예: `v-for`나 `v-if`로 생성된 노드들. 이를 통해 [VDOM](#virtual-dom) 패칭 알고리즘에 추가 힌트를 전달할 수 있습니다. 대부분은 내부적으로 처리되지만, `v-for`가 있는 `<template>` 태그에 `key`를 사용하는 경우 직접적으로 이를 접할 수 있습니다. 이 경우 `key`는 프래그먼트 VNode의 [prop](#prop)으로 추가됩니다.

프래그먼트 노드는 현재 DOM에 빈 텍스트 노드로 렌더링되지만, 이는 구현 세부사항입니다. `$el`을 사용하거나 내장 브라우저 API로 DOM을 순회하려고 할 때 이러한 텍스트 노드를 볼 수 있습니다.

## 함수형 컴포넌트 {#functional-component}

컴포넌트 정의는 일반적으로 옵션을 포함하는 객체입니다. `<script setup>`을 사용하는 경우에는 그렇게 보이지 않을 수 있지만, `.vue` 파일에서 내보내는 컴포넌트는 여전히 객체입니다.

*함수형 컴포넌트*는 대신 함수로 선언되는 컴포넌트의 대안적인 형태입니다. 이 함수는 컴포넌트의 [렌더 함수](#render-function) 역할을 합니다.

함수형 컴포넌트는 자체 상태를 가질 수 없습니다. 또한 일반적인 컴포넌트 라이프사이클을 거치지 않으므로 라이프사이클 훅을 사용할 수 없습니다. 이로 인해 일반적인 상태가 있는 컴포넌트보다 약간 더 가볍습니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 렌더 함수 & JSX - 함수형 컴포넌트](/guide/extras/render-function.html#functional-components)

## 호이스팅 {#hoisting}

*호이스팅*이라는 용어는 코드의 특정 부분을 도달하기 전에, 다른 코드보다 먼저 실행하는 것을 설명할 때 사용됩니다. 실행이 더 이른 시점으로 '끌어올려집니다'.

JavaScript는 `var`, `import`, 함수 선언과 같은 일부 구조에 대해 호이스팅을 사용합니다.

Vue에서는 컴파일러가 성능 향상을 위해 *호이스팅*을 적용합니다. 컴포넌트를 컴파일할 때, 정적인 값들은 컴포넌트의 스코프 밖으로 이동됩니다. 이러한 정적 값들은 컴포넌트 외부에서 생성되기 때문에 '호이스팅'되었다고 표현합니다.

## 정적 캐시 {#cache-static}

*캐시*라는 용어는 성능 향상을 위해 자주 접근하는 데이터를 임시로 저장하는 것을 설명할 때 사용됩니다.

Vue 템플릿 컴파일러는 이러한 정적 VNode를 식별하여, 초기 렌더링 시 캐시에 저장하고 이후의 모든 리렌더링에서 동일한 VNode를 재사용합니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 렌더링 메커니즘 - 정적 캐시](/guide/extras/rendering-mechanism.html#cache-static)

## in-DOM 템플릿 {#in-dom-template}

컴포넌트의 템플릿을 지정하는 방법에는 여러 가지가 있습니다. 대부분의 경우 템플릿은 문자열로 제공됩니다.

*in-DOM 템플릿*이라는 용어는 템플릿이 문자열이 아닌 DOM 노드 형태로 제공되는 시나리오를 의미합니다. Vue는 그런 다음 DOM 노드를 `innerHTML`을 사용하여 템플릿 문자열로 변환합니다.

일반적으로 in-DOM 템플릿은 페이지의 HTML에 직접 작성된 HTML 마크업으로 시작합니다. 브라우저가 이를 DOM 노드로 파싱한 후, Vue가 `innerHTML`을 사용하여 읽어옵니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 애플리케이션 생성 - in-DOM 루트 컴포넌트 템플릿](/guide/essentials/application.html#in-dom-root-component-template)
- [가이드 - 컴포넌트 기본 - in-DOM 템플릿 파싱 주의사항](/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)
- [옵션: 렌더링 - template](/api/options-rendering.html#template)

## inject {#inject}

[provide / inject](#provide-inject)를 참고하세요.

## 라이프사이클 훅 {#lifecycle-hooks}

Vue 컴포넌트 인스턴스는 라이프사이클을 거칩니다. 예를 들어, 생성되고, 마운트되고, 업데이트되고, 언마운트됩니다.

*라이프사이클 훅*은 이러한 라이프사이클 이벤트를 수신하는 방법입니다.

옵션 API에서는 각 훅이 별도의 옵션(예: `mounted`)으로 제공됩니다. 컴포지션 API에서는 대신 `onMounted()`와 같은 함수를 사용합니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 라이프사이클 훅](/guide/essentials/lifecycle.html)

## 매크로 {#macro}

[컴파일러 매크로](#compiler-macro)를 참고하세요.

## 명명된 슬롯 {#named-slot}

컴포넌트는 이름으로 구분되는 여러 슬롯을 가질 수 있습니다. 기본 슬롯이 아닌 슬롯을 *명명된 슬롯*이라고 합니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 슬롯 - 명명된 슬롯](/guide/components/slots.html#named-slots)

## 옵션 API {#options-api}

Vue 컴포넌트는 객체를 사용하여 정의됩니다. 이러한 컴포넌트 객체의 속성을 *옵션*이라고 합니다.

컴포넌트는 두 가지 스타일로 작성할 수 있습니다. 한 가지 스타일은 [컴포지션 API](#composition-api)와 `setup`(명시적 `setup()` 옵션 또는 `<script setup>`을 통해)을 함께 사용합니다. 다른 스타일은 컴포지션 API를 거의 직접적으로 사용하지 않고, 다양한 컴포넌트 옵션을 사용하여 유사한 결과를 얻습니다. 이와 같이 사용되는 컴포넌트 옵션을 *옵션 API*라고 합니다.

옵션 API에는 `data()`, `computed`, `methods`, `created()`와 같은 옵션이 포함됩니다.

`props`, `emits`, `inheritAttrs`와 같은 일부 옵션은 두 API 모두에서 컴포넌트 작성 시 사용할 수 있습니다. 이들은 컴포넌트 옵션이므로 옵션 API의 일부로 간주될 수 있습니다. 하지만 이러한 옵션은 `setup()`과 함께 사용되기도 하므로, 두 컴포넌트 스타일 모두에서 공유된다고 생각하는 것이 더 유용할 때가 많습니다.

`setup()` 함수 자체도 컴포넌트 옵션이므로, 옵션 API의 일부로 *설명될 수* 있습니다. 하지만 일반적으로 '옵션 API'라는 용어는 이렇게 사용되지 않습니다. 대신, `setup()` 함수는 컴포지션 API의 일부로 간주됩니다.

## 플러그인 {#plugin}

*플러그인*이라는 용어는 다양한 맥락에서 사용될 수 있지만, Vue에는 애플리케이션에 기능을 추가하는 방법으로서의 플러그인이라는 구체적인 개념이 있습니다.

플러그인은 `app.use(plugin)`을 호출하여 애플리케이션에 추가됩니다. 플러그인 자체는 함수이거나 `install` 함수를 가진 객체입니다. 이 함수는 애플리케이션 인스턴스를 전달받아 필요한 작업을 수행할 수 있습니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 플러그인](/guide/reusability/plugins.html)

## prop {#prop}

Vue에서 *prop*이라는 용어는 세 가지 일반적인 용도로 사용됩니다:

* 컴포넌트 prop
* VNode prop
* 슬롯 prop

*컴포넌트 prop*은 대부분의 사람들이 prop이라고 생각하는 것입니다. 이는 컴포넌트가 `defineProps()` 또는 `props` 옵션을 사용하여 명시적으로 정의한 것입니다.

*VNode prop*이라는 용어는 `h()`의 두 번째 인자로 전달되는 객체의 속성을 의미합니다. 여기에는 컴포넌트 prop도 포함될 수 있지만, 컴포넌트 이벤트, DOM 이벤트, DOM 속성, DOM 프로퍼티도 포함될 수 있습니다. VNode prop은 일반적으로 VNode를 직접 조작하기 위해 렌더 함수를 사용할 때만 접하게 됩니다.

*슬롯 prop*은 스코프 슬롯에 전달되는 속성입니다.

모든 경우에 prop은 외부에서 전달되는 속성입니다.

props라는 단어는 *properties*에서 유래했지만, Vue 맥락에서 prop은 훨씬 더 구체적인 의미를 가집니다. properties의 약어로 props를 사용하는 것은 피해야 합니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - Props](/guide/components/props.html)
- [가이드 - 렌더 함수 & JSX](/guide/extras/render-function.html)
- [가이드 - 슬롯 - 스코프 슬롯](/guide/components/slots.html#scoped-slots)

## provide / inject {#provide-inject}

`provide`와 `inject`는 컴포넌트 간 통신의 한 형태입니다.

컴포넌트가 값을 *제공*하면, 해당 컴포넌트의 모든 하위 컴포넌트는 `inject`를 사용하여 그 값을 가져올 수 있습니다. prop과 달리, 값을 제공하는 컴포넌트는 어떤 컴포넌트가 그 값을 받는지 정확히 알지 못합니다.

`provide`와 `inject`는 *prop 드릴링*을 피하기 위해 사용되기도 합니다. 또한 컴포넌트가 슬롯 콘텐츠와 암묵적으로 통신하는 방법으로도 사용할 수 있습니다.

`provide`는 애플리케이션 레벨에서도 사용할 수 있어, 해당 애플리케이션 내의 모든 컴포넌트에서 값을 사용할 수 있게 합니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - provide / inject](/guide/components/provide-inject.html)

## 반응형 이펙트 {#reactive-effect}

*반응형 이펙트*는 Vue의 반응성 시스템의 일부입니다. 이는 함수의 의존성을 추적하고, 해당 의존성의 값이 변경될 때 그 함수를 다시 실행하는 과정을 의미합니다.

`watchEffect()`는 이펙트를 생성하는 가장 직접적인 방법입니다. Vue의 다양한 다른 부분도 내부적으로 이펙트를 사용합니다. 예: 컴포넌트 렌더링 업데이트, `computed()`, `watch()` 등.

Vue는 반응형 이펙트 내에서만 반응형 의존성을 추적할 수 있습니다. 속성 값이 반응형 이펙트 외부에서 읽히면, 해당 속성은 '반응성'을 잃게 됩니다. 즉, 이후에 그 속성이 변경되어도 Vue가 무엇을 해야 할지 알지 못합니다.

이 용어는 '사이드 이펙트'에서 유래했습니다. 이펙트 함수를 호출하는 것은 속성 값이 변경될 때 발생하는 사이드 이펙트입니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 반응성 심층 분석](/guide/extras/reactivity-in-depth.html)

## 반응성 {#reactivity}

일반적으로 *반응성*은 데이터 변경에 자동으로 반응하여 동작을 수행하는 능력을 의미합니다. 예를 들어, 데이터 값이 변경될 때 DOM을 업데이트하거나 네트워크 요청을 보내는 것 등이 있습니다.

Vue 맥락에서 반응성은 여러 기능의 집합을 설명하는 데 사용됩니다. 이러한 기능들은 *반응성 시스템*을 구성하며, [반응성 API](#reactivity-api)를 통해 노출됩니다.

반응성 시스템을 구현하는 방법에는 여러 가지가 있습니다. 예를 들어, 코드의 의존성을 정적으로 분석하여 구현할 수도 있습니다. 하지만 Vue는 그런 형태의 반응성 시스템을 사용하지 않습니다.

대신, Vue의 반응성 시스템은 런타임에 속성 접근을 추적합니다. 이는 Proxy 래퍼와 속성의 [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description)/[setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set#description) 함수를 모두 사용하여 이루어집니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 반응성 기초](/guide/essentials/reactivity-fundamentals.html)
- [가이드 - 반응성 심층 분석](/guide/extras/reactivity-in-depth.html)

## 반응성 API {#reactivity-api}

*반응성 API*는 [반응성](#reactivity)과 관련된 핵심 Vue 함수들의 모음입니다. 이 함수들은 컴포넌트와 독립적으로 사용할 수 있습니다. `ref()`, `reactive()`, `computed()`, `watch()`, `watchEffect()`와 같은 함수가 포함됩니다.

반응성 API는 컴포지션 API의 하위 집합입니다.

자세한 내용은 다음을 참고하세요:
- [반응성 API: Core](/api/reactivity-core.html)
- [반응성 API: Utilities](/api/reactivity-utilities.html)
- [반응성 API: Advanced](/api/reactivity-advanced.html)

## ref {#ref}

> 이 항목은 반응성을 위한 `ref` 사용에 관한 것입니다. 템플릿에서 사용하는 `ref` 속성에 대해서는 [템플릿 ref](#template-ref)를 참고하세요.

`ref`는 Vue의 반응성 시스템의 일부입니다. 이는 `value`라는 단일 반응형 속성을 가진 객체입니다.

ref에는 다양한 유형이 있습니다. 예를 들어, `ref()`, `shallowRef()`, `computed()`, `customRef()`를 사용하여 ref를 생성할 수 있습니다. `isRef()` 함수는 객체가 ref인지 확인하는 데 사용할 수 있고, `isReadonly()`는 ref가 값의 직접 재할당을 허용하는지 확인하는 데 사용할 수 있습니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 반응성 기초](/guide/essentials/reactivity-fundamentals.html)
- [반응성 API: Core](/api/reactivity-core.html)
- [반응성 API: Utilities](/api/reactivity-utilities.html)
- [반응성 API: Advanced](/api/reactivity-advanced.html)

## 렌더 함수 {#render-function}

*렌더 함수*는 렌더링 중에 사용되는 VNode를 생성하는 컴포넌트의 일부입니다. 템플릿은 렌더 함수로 컴파일됩니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 렌더 함수 & JSX](/guide/extras/render-function.html)

## 스케줄러 {#scheduler}

*스케줄러*는 [반응형 이펙트](#reactive-effect)가 언제 실행될지 타이밍을 제어하는 Vue 내부의 일부입니다.

반응형 상태가 변경되면, Vue는 즉시 렌더링 업데이트를 트리거하지 않습니다. 대신, 큐를 사용하여 이를 함께 배치합니다. 이를 통해 기본 데이터가 여러 번 변경되어도 컴포넌트가 한 번만 다시 렌더링되도록 보장합니다.

[워처](/guide/essentials/watchers.html)도 스케줄러 큐를 사용하여 배치됩니다. `flush: 'pre'`(기본값)인 워처는 컴포넌트 렌더링 전에 실행되고, `flush: 'post'`인 워처는 컴포넌트 렌더링 후에 실행됩니다.

스케줄러의 작업은 [라이프사이클 훅](#lifecycle-hooks) 트리거, [템플릿 ref](#template-ref) 업데이트 등 다양한 내부 작업을 수행하는 데에도 사용됩니다.

## 스코프 슬롯 {#scoped-slot}

*스코프 슬롯*이라는 용어는 [slot](#slot)이 [prop](#prop)을 받는 경우를 의미합니다.

과거에는 Vue가 스코프 슬롯과 비스코프 슬롯을 훨씬 더 엄격하게 구분했습니다. 어느 정도는 두 가지 별도의 기능으로 간주될 수 있었으며, 공통 템플릿 문법 뒤에 통합되어 있었습니다.

Vue 3에서는 슬롯 API가 단순화되어 모든 슬롯이 스코프 슬롯처럼 동작하게 되었습니다. 하지만 스코프 슬롯과 비스코프 슬롯의 사용 사례가 종종 다르기 때문에, prop이 있는 슬롯을 지칭하는 용어로 여전히 유용하게 사용됩니다.

슬롯에 전달된 prop은 슬롯 콘텐츠를 정의하는 부모 템플릿의 특정 영역에서만 사용할 수 있습니다. 이 템플릿 영역은 prop에 대한 변수 스코프처럼 동작하므로 '스코프 슬롯'이라는 이름이 붙었습니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 슬롯 - 스코프 슬롯](/guide/components/slots.html#scoped-slots)

## SFC {#sfc}

[싱글 파일 컴포넌트](#single-file-component)를 참고하세요.

## 사이드 이펙트 {#side-effect}

*사이드 이펙트*라는 용어는 Vue에만 국한된 것이 아닙니다. 이는 로컬 스코프를 넘어 무언가를 수행하는 연산이나 함수를 설명할 때 사용됩니다.

예를 들어, `user.name = null`과 같은 속성을 설정할 때, 이로 인해 `user.name`의 값이 변경되는 것이 기대됩니다. 만약 이와 함께 Vue의 반응성 시스템이 트리거된다면, 이는 사이드 이펙트로 설명될 수 있습니다. 이것이 Vue 내에서 [반응형 이펙트](#reactive-effect)라는 용어의 기원입니다.

함수가 사이드 이펙트를 가진다고 설명될 때, 이는 함수가 단순히 값을 반환하는 것 외에 함수 외부에서 관찰 가능한 어떤 동작을 수행한다는 의미입니다. 예를 들어, 상태의 값을 업데이트하거나 네트워크 요청을 트리거할 수 있습니다.

이 용어는 렌더링이나 계산된 속성을 설명할 때 자주 사용됩니다. 렌더링에는 사이드 이펙트가 없어야 한다는 것이 모범 사례로 간주됩니다. 마찬가지로, 계산된 속성의 getter 함수에도 사이드 이펙트가 없어야 합니다.

## 싱글 파일 컴포넌트 {#single-file-component}

*싱글 파일 컴포넌트* 또는 SFC라는 용어는 Vue 컴포넌트에 일반적으로 사용되는 `.vue` 파일 형식을 의미합니다.

또한 참고:
- [가이드 - 싱글 파일 컴포넌트](/guide/scaling-up/sfc.html)
- [SFC 문법 명세](/api/sfc-spec.html)

## 슬롯 {#slot}

슬롯은 자식 컴포넌트에 콘텐츠를 전달하는 데 사용됩니다. prop이 데이터 값을 전달하는 데 사용된다면, 슬롯은 HTML 엘리먼트와 다른 Vue 컴포넌트로 구성된 더 풍부한 콘텐츠를 전달하는 데 사용됩니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 슬롯](/guide/components/slots.html)

## 템플릿 ref {#template-ref}

*템플릿 ref*라는 용어는 템플릿 내 태그에 `ref` 속성을 사용하는 것을 의미합니다. 컴포넌트가 렌더링된 후, 이 속성은 해당 태그에 해당하는 HTML 엘리먼트나 컴포넌트 인스턴스를 동일한 이름의 속성에 할당하는 데 사용됩니다.

옵션 API를 사용하는 경우, ref는 `$refs` 객체의 속성으로 노출됩니다.

컴포지션 API를 사용하는 경우, 템플릿 ref는 동일한 이름의 반응형 [ref](#ref)에 할당됩니다.

템플릿 ref는 Vue의 반응성 시스템에서 사용하는 반응형 ref와 혼동해서는 안 됩니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 템플릿 ref](/guide/essentials/template-refs.html)

## VDOM {#vdom}

[가상 DOM](#virtual-dom)을 참고하세요.

## 가상 DOM {#virtual-dom}

*가상 DOM* (VDOM)이라는 용어는 Vue에만 국한된 것이 아닙니다. 이는 여러 웹 프레임워크에서 UI 업데이트를 관리하는 데 사용되는 일반적인 접근 방식입니다.

브라우저는 페이지의 현재 상태를 나타내는 노드 트리를 사용합니다. 이 트리와 이를 조작하는 JavaScript API를 *문서 객체 모델* 또는 *DOM*이라고 합니다.

DOM을 조작하는 것은 주요 성능 병목입니다. 가상 DOM은 이를 관리하는 전략 중 하나입니다.

DOM 노드를 직접 생성하는 대신, Vue 컴포넌트는 자신이 원하는 DOM 노드에 대한 설명을 생성합니다. 이러한 설명자는 일반 JavaScript 객체로, VNode(가상 DOM 노드)라고 불립니다. VNode를 생성하는 것은 비교적 저렴합니다.

컴포넌트가 다시 렌더링될 때마다, 새로운 VNode 트리는 이전 VNode 트리와 비교되고, 차이점만 실제 DOM에 적용됩니다. 변경된 것이 없다면 DOM을 건드릴 필요가 없습니다.

Vue는 [컴파일러 기반 가상 DOM](/guide/extras/rendering-mechanism.html#compiler-informed-virtual-dom)이라는 하이브리드 방식을 사용합니다. Vue의 템플릿 컴파일러는 템플릿의 정적 분석을 기반으로 성능 최적화를 적용할 수 있습니다. 컴포넌트의 이전/새 VNode 트리를 런타임에 전체 비교하는 대신, 컴파일러가 추출한 정보를 사용하여 실제로 변경될 수 있는 트리의 일부만 비교하도록 줄일 수 있습니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - 렌더링 메커니즘](/guide/extras/rendering-mechanism.html)
- [가이드 - 렌더 함수 & JSX](/guide/extras/render-function.html)

## VNode {#vnode}

*VNode*는 *가상 DOM 노드*입니다. [`h()`](/api/render-function.html#h) 함수를 사용하여 생성할 수 있습니다.

자세한 내용은 [가상 DOM](#virtual-dom)을 참고하세요.

## 웹 컴포넌트 {#web-component}

*웹 컴포넌트* 표준은 최신 웹 브라우저에 구현된 기능들의 모음입니다.

Vue 컴포넌트는 웹 컴포넌트가 아니지만, `defineCustomElement()`를 사용하여 Vue 컴포넌트로부터 [커스텀 엘리먼트](#custom-element)를 생성할 수 있습니다. Vue는 또한 Vue 컴포넌트 내에서 커스텀 엘리먼트 사용도 지원합니다.

자세한 내용은 다음을 참고하세요:
- [가이드 - Vue와 웹 컴포넌트](/guide/extras/web-components.html)
