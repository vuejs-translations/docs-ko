# 용어 사전 {#glossary}

이 용어집은 Vue에 관해 이야기할 때 일반적으로 사용되는 기술 용어의 의미에 대한 지침을 제공하기 위한 것입니다. 이는 어떤 용어가 일반적으로 사용되는지에 대한 '서술적인' 정보를 제공하는 것이 목적이며, 어떻게 사용되어야 하는지에 대한 '규정적인' 명세는 아닙니다. 일부 용어는 주변 맥락에 따라 약간 다른 의미나 뉘앙스를 가질 수 있습니다.

[[TOC]]

## 비동기 컴포넌트 {#async-component}

비동기 컴포넌트(Async Component)는 다른 컴포넌트를 감싸는 래퍼(wrapper)로, 감싸진 컴포넌트를 지연 로딩(lazy load)할 수 있게 해줍니다. 이는 일반적으로 `.js` 파일의 크기를 줄이는 방법으로 사용되며, 필요할 때만 로드되도록 작은 청크(chunk)로 분할될 수 있도록 합니다.

Vue Router는 [라우트 컴포넌트의 지연 로딩](https://router.vuejs.org/guide/advanced/lazy-loading.html)을 위한 유사한 기능을 제공하지만, 이는 Vue의 비동기 컴포넌트 기능을 사용하지 않습니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 비동기 컴포넌트](/guide/components/async.html)

## 컴파일러 매크로 {#compiler-macro}

컴파일러 매크로(Compiler Macro)는 컴파일러에 의해 처리되고 다른 형태로 변환되는 특수한 코드입니다. 사실상 문자열 대체의 유려한 형태로 볼 수 있습니다.

Vue의 [SFC(단일 파일 컴포넌트)](#single-file-component) 컴파일러는 `defineProps()`, `defineEmits()`, `defineExpose()`와 같은 다양한 매크로를 지원합니다. 이러한 매크로들은 일반적인 JavaScript 함수처럼 보이도록 의도적으로 설계되었으며, JavaScript/TypeScript 주변의 구문 분석기와 타입 추론 도구를 활용할 수 있도록 되어 있습니다. 그러나 이들은 브라우저에서 실행되는 실제 함수가 아닙니다. 이들은 컴파일러가 감지하고 실제로 실행될 JavaScript 코드로 대체하는 특수한 문자열입니다.

매크로는 일반적인 JavaScript 코드에 적용되지 않는 사용 제약이 있습니다. 예를 들어, `const dp = defineProps`와 같이 `defineProps`에 대한 별칭을 만들 수 있다고 생각할 수 있지만, 실제로는 오류가 발생합니다. `defineProps()`에 전달할 수 있는 값에도 제약이 있습니다. '인수(arguments)'는 런타임이 아닌 컴파일러에서 처리되어야 합니다.

자세한 내용은 다음을 참조하세요:
- [`<script setup>` - `defineProps()` & `defineEmits()`](/api/sfc-script-setup.html#defineprops-defineemits)
- [`<script setup>` - `defineExpose()`](/api/sfc-script-setup.html#defineexpose)

## 컴포넌트 {#component}

컴포넌트(Component)라는 용어는 Vue에만 해당되는 것이 아닙니다. 많은 UI 프레임워크에서 일반적으로 사용됩니다. 이 용어는 버튼이나 체크박스와 같은 UI의 일부를 설명합니다. 컴포넌트는 더 큰 컴포넌트를 구성하기 위해 결합될 수도 있습니다.

컴포넌트는 UI를 더 작은 조각으로 나누는 주요 메커니즘으로, 유지 보수성을 향상시키고 코드 재사용을 가능하게 하는 데 Vue에서 제공하는 주요 기능입니다.

Vue 컴포넌트는 객체입니다. 모든 속성은 선택적이지만, 컴포넌트를 렌더링하기 위해 템플릿(template) 또는 렌더 함수(render function)가 필요합니다. 예를 들어, 다음과 같은 객체는 유효한 컴포넌트가 될 것입니다:

```js
const HelloWorldComponent = {
  render() {
    return 'Hello world!'
  }
}
```

실제로 대부분의 Vue 애플리케이션은 [단일 파일 컴포넌트](#single-file-component)(`.vue` 파일)를 사용하여 작성됩니다. 이러한 컴포넌트들은 처음에는 객체로 보이지 않을 수 있지만, SFC 컴파일러는 이들을 객체로 변환하며, 해당 객체는 파일의 기본 내보내기(default export)로 사용됩니다. 외부 관점에서 `.vue` 파일은 컴포넌트 객체를 내보내는 ES 모듈에 불과합니다.

컴포넌트 객체의 속성은 일반적으로 옵션(options)으로 참조됩니다. 이것이 [옵션 API](#options-api)의 이름을 얻게 된 이유입니다.

컴포넌트의 옵션은 해당 컴포넌트의 인스턴스가 어떻게 생성되어야 하는지를 정의합니다. 컴포넌트는 개념적으로 클래스와 유사하지만, Vue는 실제 JavaScript 클래스를 사용하여 컴포넌트를 정의하지 않습니다.

또한 '컴포넌트'라는 용어는 더 널리 사용되어 컴포넌트 인스턴스를 가리키는 데에도 사용될 수 있습니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 컴포넌트 기초](/guide/essentials/component-basics.html)

'컴포넌트'라는 단어는 다른 여러 용어에서도 사용됩니다:
- [비동기 컴포넌트](#async-component)
- [동적 컴포넌트](#dynamic-component)
- [함수형 컴포넌트](#functional-component)
- [웹 컴포넌트](#web-component)

## 컴포저블 {#composable}

"컴포저블(Composable)"이라는 용어는 Vue에서 일반적으로 사용되는 사용 패턴을 설명합니다. 이는 Vue의 별도의 기능이 아니라, 프레임워크의 [Composition API](#composition-api)를 사용하는 방법입니다.

* 컴포저블(Composable)은 함수입니다.
* 컴포저블은 상태를 가지는 로직을 캡슐화하고 재사용하는 데 사용됩니다.
* 함수 이름은 일반적으로 `use`로 시작하여 다른 개발자가 이 함수가 컴포저블임을 알 수 있도록 합니다.
* 함수는 일반적으로 컴포넌트의 `setup()` 함수의 동기 실행 중에 호출되기를 기대합니다(또는 `<script setup>` 블록의 실행 중). 이는 컴포저블의 호출을 현재 컴포넌트 컨텍스트에 연결합니다. 예를 들어, `provide()`, `inject()` 또는 `onMounted()`를 통한 호출로 가능합니다.
* 컴포저블은 일반적으로 반응형 객체가 아닌 일반 객체를 반환합니다. 이 객체에는 일반적으로 ref와 함수가 포함되어 있으며, 호출하는 코드 내에서 구조 분해(destructuring)될 것으로 예상됩니다.

다양한 패턴들과 마찬가지로, 특정 코드가 해당 레이블을 갖는지에 대한 의견 차이가 있을 수 있습니다. 모든 JavaScript 유틸리티 함수가 콤포저블은 아닙니다. 만약 함수가 Composition API를 사용하지 않는다면 콤포저블이 아닐 가능성이 큽니다. 또한, `setup()`의 동기 실행 중에 호출되기를 기대하지 않는다면 콤포저블이 아닐 가능성이 큽니다. 콤포저블은 특히 상태를 가지는 로직을 캡슐화하기 위해 사용되며, 함수에 대한 명명 규칙일 뿐입니다.

더 자세한 내용은 [가이드 - 컴포저블](/guide/reusability/composables.html)을 참조하세요.

## Composition API {#composition-api}

*Composition API*는 Vue에서 컴포넌트와 콤포저블을 작성하는 데 사용되는 함수 모음입니다.

이 용어는 또한 컴포넌트를 작성하는 두 가지 주요 스타일 중 하나인 [옵션 API](#options-api)와 함께 사용됩니다. Composition API를 사용하여 작성된 컴포넌트는 `<script setup>` 또는 명시적인 `setup()` 함수를 사용합니다.

자세한 내용은 [Composition API FAQ](/guide/extras/composition-api-faq)를 참조하세요.

## 커스텀 엘리먼트 {#custom-element}

*커스텀 엘리먼트(Custom Element)*는 현대적인 웹 브라우저에서 구현된 [웹 컴포넌트(Web Components)](#web-component) 표준의 기능입니다. 이는 HTML 마크업에서 커스텀 HTML 엘리먼트를 사용하여 해당 위치에서 웹 컴포넌트를 포함시킬 수 있는 능력을 의미합니다.

Vue는 커스텀 엘리먼트를 렌더링하기 위한 내장 지원을 제공하며, 이를 Vue 컴포넌트 템플릿에서 직접 사용할 수 있도록 합니다.

커스텀 엘리먼트는 다른 Vue 컴포넌트의 템플릿 내에서 태그로 Vue 컴포넌트를 포함하는 기능과 혼동해서는 안 됩니다. 커스텀 엘리먼트는 웹 컴포넌트를 생성하는 데 사용되며, Vue 컴포넌트와는 다릅니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - Vue와 웹 컴포넌트](/guide/extras/web-components.html)

## 디렉티브 {#directive}

디렉티브(지시자:Directive)라는 용어는 `v-` 접두사로 시작하는 템플릿 속성 또는 해당 속성의 축약형을 가리킵니다.

내장된 지시자에는 `v-if`, `v-for`, `v-bind`, `v-on` 및 `v-slot`이 포함됩니다.

Vue는 사용자 정의 지시자를 생성하는 것도 지원하지만, 일반적으로 이들은 DOM 노드를 직접 조작하기 위한 '탈출구'로만 사용됩니다. 사용자 정의 지시자는 일반적으로 내장된 지시자의 기능을 완전히 재구현하는 데 사용되지는 않습니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 템플릿 구문 - 지시자](/guide/essentials/template-syntax.html#directives)
- [가이드 - 사용자 정의 지시자](/guide/reusability/custom-directives.html)

## 동적 컴포넌트 {#dynamic-component}

*동적 컴포넌트(Dynamic Component)*라는 용어는 어떤 자식 컴포넌트를 렌더링할지를 동적으로 결정해야 하는 경우에 사용됩니다. 일반적으로는 `<component :is="type">`을 사용하여 이를 구현합니다.

동적 컴포넌트는 특별한 종류의 컴포넌트가 아닙니다. 어떤 컴포넌트든 동적 컴포넌트로 사용할 수 있습니다. 컴포넌트 자체가 동적인 것이 아니라 컴포넌트의 선택이 동적인 것입니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 컴포넌트 기본 - 동적 컴포넌트](/guide/essentials/component-basics.html#dynamic-components)

## effect {#effect}

[Reactive effect](#reactive-effect)와 [Side effect](#side-effect)를 참조하세요.

## 이밴트 {#event}

프로그램의 다른 부분 간에 통신하기 위해 이벤트를 사용하는 것은 프로그래밍의 다양한 영역에서 일반적으로 사용됩니다. Vue 내에서는 이 용어가 일반적으로 원시 HTML 요소 이벤트와 Vue 컴포넌트 이벤트 둘 다에 적용됩니다. 템플릿에서는 `v-on` 지시자를 사용하여 두 유형의 이벤트에 대해 수신 대기합니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 이벤트 처리](/guide/essentials/event-handling.html)
- [가이드 - 컴포넌트 이벤트](/guide/components/events.html)

## 프래그먼트 {#fragment}

프래그먼트(Fragment)라는 용어는 자체적으로 요소를 렌더링하지 않지만 다른 [VNode](#vnode)의 부모로 사용되는 특수한 유형의 VNode를 가리킵니다.

이 이름은 원시 DOM API의 [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) 개념과 유사한 개념에서 유래했습니다.

프래그먼트는 여러 개의 루트 노드를 가진 컴포넌트를 지원하기 위해 사용됩니다. 이러한 컴포넌트는 여러 개의 루트를 가지고 있는 것처럼 보일 수 있지만, 내부적으로는 '루트' 노드의 부모인 단일한 루트로서 프래그먼트 노드를 사용합니다.

템플릿 컴파일러에서는 프래그먼트를 사용하여 `v-for` 또는 `v-if`를 통해 생성된 여러 동적 노드를 래핑하는 방식으로 사용됩니다. 이를 통해 [VDOM](#virtual-dom) 패칭 알고리즘에 대한 추가적인 힌트를 전달할 수 있습니다. 이러한 많은 부분은 내부적으로 처리되지만, 직접적으로 이를 직접 만나볼 수 있는 장소 중 하나는 `v-for`와 함께 `<template>` 태그에 `key`를 사용하는 경우입니다. 이 시나리오에서 키는 프래그먼트 VNode에 [prop](#prop)으로 추가됩니다.

현재 프래그먼트 노드는 빈 텍스트 노드로 DOM에 렌더링됩니다. 그러나 이는 구현 세부 사항입니다. 내장된 브라우저 API를 사용하여 DOM을 탐색하거나 `$el`을 사용하는 경우 해당 텍스트 노드를 만날 수 있습니다.

## 함수형 컴포넌트 {#functional-component}

컴포넌트 정의는 일반적으로 옵션을 포함한 객체입니다. `<script setup>`을 사용하면 그렇게 보이지 않을 수 있지만, `.vue` 파일에서 내보낸 컴포넌트는 여전히 객체입니다.

함수형 컴포넌트는 함수를 사용하여 선언된 대체 형식의 컴포넌트입니다. 이 함수는 컴포넌트의 [렌더 함수](#render-function)로 작동합니다.

함수형 컴포넌트는 자체 상태를 가질 수 없습니다. 또한 일반적인 컴포넌트 라이프사이클을 거치지 않으므로 라이프사이클 훅을 사용할 수 없습니다. 이로 인해 일반적인 상태를 가진 컴포넌트보다 약간 가볍습니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 렌더 함수 및 JSX - 함수형 컴포넌트](/guide/extras/render-function.html#functional-components)

## 호이스팅 {#hoisting}

호이스팅(hoisting)은 코드 섹션을 다른 코드보다 먼저 실행하는 것을 설명하는 용어입니다. 실행이 이른 시점으로 '끌어올려지는' 것을 의미합니다.

JavaScript는 `var`, `import` 및 함수 선언과 같은 구조에 대해 호이스팅을 사용합니다.

Vue 컨텍스트에서는 템플릿 컴파일러가 성능을 향상시키기 위해 *정적 호이스팅(static hoisting)*을 적용합니다. 템플릿을 렌더 함수로 변환할 때, 정적 콘텐츠에 해당하는 VNode는 한 번 생성한 후 재사용될 수 있습니다. 이러한 정적 VNode는 렌더 함수가 실행되기 전에 생성되기 때문에 호이스팅되었다고 설명됩니다. 템플릿 컴파일러에 의해 생성된 정적 객체나 배열에도 비슷한 형태의 호이스팅이 적용됩니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 렌더링 메커니즘 - 정적 호이스팅](/guide/extras/rendering-mechanism.html#static-hoisting)

## in-DOM 템플릿 {#in-dom-template}

컴포넌트에 템플릿을 지정하는 다양한 방법이 있습니다. 대부분의 경우 템플릿은 문자열로 제공됩니다.

*in-DOM 템플릿*이란 템플릿이 문자열 대신 DOM 노드 형태로 제공되는 상황을 말합니다. Vue는 이후에 DOM 노드를 `innerHTML`을 사용하여 템플릿 문자열로 변환합니다.

일반적으로 in-DOM 템플릿은 페이지의 HTML에 직접 작성된 HTML 마크업으로 시작합니다. 브라우저는 이를 DOM 노드로 구문 분석하고, Vue는 이를 통해 `innerHTML`을 읽어옵니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 애플리케이션 생성 - in-DOM 루트 컴포넌트 템플릿](/guide/essentials/application.html#in-dom-root-component-template)
- [가이드 - 컴포넌트 기본 - in-DOM 템플릿 구문 분석 주의사항](/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)
- [옵션: 렌더링 - template](/api/options-rendering.html#template)

## inject {#inject}

참고 [provide / inject](#provide-inject).

## 라이프사이클 훅 {#lifecycle-hooks}

Vue 컴포넌트 인스턴스는 라이프사이클을 거칩니다. 예를 들어, 생성되고 마운트되며, 업데이트되고 언마운트됩니다.

*라이프사이클 훅*은 이러한 라이프사이클 이벤트를 감시하기 위한 방법입니다.

옵션 API를 사용할 경우, 각 훅은 개별적인 옵션으로 제공됩니다. 예를 들어, `mounted`와 같습니다. 반면, Composition API는 `onMounted()`와 같은 함수를 사용합니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 라이프사이클 훅](/guide/essentials/lifecycle.html)

## macro {#macro}

참고 [컴파일러 매크로](#compiler-macro).

## 이름이 있는 슬롯 {#named-slot}

컴포넌트는 이름에 따라 여러 개의 슬롯을 가질 수 있습니다. 기본 슬롯 이외의 슬롯을 *이름이 있는 슬롯(네임드 슬롯)*이라고 합니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 이름이 있는 슬롯](/guide/components/slots.html#named-slots)

## 옵션 API {#options-api}

Vue 컴포넌트는 객체를 사용하여 정의됩니다. 이 컴포넌트 객체의 속성을 *옵션*이라고 합니다.

컴포넌트는 두 가지 스타일로 작성할 수 있습니다. 하나는 [Composition API](#composition-api)를 `setup()`과 함께 사용하는 스타일입니다. 이 스타일은 `setup()` 옵션이나 `<script setup>`을 통해 사용됩니다. 다른 스타일은 Composition API를 거의 사용하지 않고, 대신 다양한 컴포넌트 옵션을 사용하여 유사한 결과를 얻습니다. 이러한 방식으로 사용되는 컴포넌트 옵션을 *옵션 API*라고 합니다.

옵션 API에는 `data()`, `computed`, `methods`, `created()`와 같은 옵션이 포함됩니다.

일부 옵션인 `props`, `emits`, `inheritAttrs`와 같은 옵션은 두 가지 API로 컴포넌트를 작성할 때 모두 사용할 수 있습니다. 이들은 컴포넌트 옵션이므로 옵션 API의 일부로 간주될 수 있습니다. 그러나 이러한 옵션은 `setup()`과 함께 사용되기도 하므로 일반적으로 두 컴포넌트 스타일 간에 공유되는 옵션으로 생각하는 것이 더 유용합니다.

`setup()` 함수 자체는 컴포넌트 옵션이므로 옵션 API의 일부로 설명될 수 있습니다. 그러나 'Options API'라는 용어는 일반적으로 사용되지 않는 방식입니다. 대신, `setup()` 함수는 Composition API의 일부로 간주됩니다.

## 플러그인 {#plugin}

*플러그인*이라는 용어는 다양한 맥락에서 사용될 수 있지만, Vue에서는 응용 프로그램에 기능을 추가하는 방법으로서의 특정 개념을 갖고 있습니다.

플러그인은 `app.use(plugin)`를 호출하여 응용 프로그램에 추가됩니다. 플러그인 자체는 함수이거나 `install` 함수가 있는 객체입니다. 해당 함수는 응용 프로그램 인스턴스를 전달받고 필요한 작업을 수행할 수 있습니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 플러그인](/guide/reusability/plugins.html)

## 프롭(prop) {#prop}

Vue에서는 "프롭(prop)"이라는 용어를 세 가지 주요 상황에서 사용합니다:

* 컴포넌트 프롭
* VNode 프롭
* 슬롯 프롭

*컴포넌트 프롭*은 대부분의 사람들이 프롭으로 생각하는 것입니다. 이들은 `defineProps()` 또는 `props` 옵션을 사용하여 컴포넌트에서 명시적으로 정의됩니다.

*VNode 프롭*이라는 용어는 `h()`의 두 번째 인자로 전달되는 객체의 속성을 나타냅니다. 이는 컴포넌트 프롭뿐만 아니라 컴포넌트 이벤트, DOM 이벤트, DOM 속성 및 DOM 프로퍼티 등을 포함할 수 있습니다. 일반적으로 VNode 프롭은 렌더 함수를 사용하여 직접 VNode을 조작하는 경우에만 만나게 됩니다.

*슬롯 프롭*은 스코프드 슬롯에 전달되는 속성입니다.

모든 경우에 프롭은 외부에서 전달되는 속성입니다.

단어 "props"는 "properties"의 줄임말에서 유래되었지만, Vue의 문맥에서 "props"라는 용어는 훨씬 구체적인 의미를 갖습니다. 따라서 속성(properties)의 약어로 사용하는 것은 피해야 합니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - Props](/guide/components/props.html)
- [가이드 - 렌더 함수 및 JSX](/guide/extras/render-function.html)
- [가이드 - 슬롯 - 스코프드 슬롯](/guide/components/slots.html#scoped-slots)

## provide / inject {#provide-inject}

`provide`와 `inject`은 컴포넌트 간의 상호 통신 방식입니다.

컴포넌트가 값 *제공* 시, 해당 컴포넌트의 모든 자손 컴포넌트는 `inject`을 사용하여 해당 값을 가져올 수 있습니다. 프롭과는 달리, 값을 받는 컴포넌트가 정확히 어떤 컴포넌트인지를 제공하는 컴포넌트가 알지 못합니다.

`provide`와 `inject`은 때로는 *프롭 드릴링(prop drilling)*을 피하는 데 사용될 수 있습니다. 또한 컴포넌트가 슬롯 내용과 암묵적으로 통신하는 방법으로도 사용될 수 있습니다.

`provide`는 응용 프로그램 수준에서도 사용될 수 있으며, 해당 응용 프로그램의 모든 컴포넌트에서 값을 사용할 수 있게 합니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - provide / inject](/guide/components/provide-inject.html)

## 반응형 이팩트 (Reactive Effect) {#reactive-effect}

반응형 이팩트는 Vue의 반응성 시스템의 일부입니다. 이는 함수의 종속성(dependency)을 추적하고, 해당 종속성의 값이 변경될 때마다 해당 함수를 다시 실행하는 과정을 의미합니다.

`watchEffect()`는 반응형 이팩트를 직접적으로 생성하는 가장 간단한 방법입니다. Vue의 다양한 다른 부분들도 내부적으로 이팩트를 사용합니다. 예를 들어, 컴포넌트 렌더링 업데이트, `computed()`와 `watch()` 등이 있습니다.

Vue는 반응형 종속성을 반응형 이팩트 내부에서만 추적할 수 있습니다. 만약 속성의 값을 반응형 이팩트 외부에서 읽는다면, 해당 속성이 이후에 변경되어도 Vue는 무엇을 해야 할지 모를 것입니다. 이런 의미에서 속성은 '반응성'을 '잃게' 됩니다.

이 용어는 '부작용(side effect)'에서 유래되었습니다. 이팩트 함수를 호출하는 것은 속성 값이 변경되는 것의 부작용입니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 깊이 있는 반응성](/guide/extras/reactivity-in-depth.html)

## 반응성(Reactivity) {#reactivity}

일반적으로, *반응성(reactivity)*는 데이터 변경에 대한 자동 동작 수행 능력을 나타냅니다. 예를 들어, 데이터 값이 변경될 때 DOM을 업데이트하거나 네트워크 요청을 수행할 수 있습니다.

Vue의 문맥에서 반응성은 여러 기능을 설명하는 데 사용됩니다. 이러한 기능은 *반응성 시스템(reactivity system)*을 형성하며, [반응성 API(Reactivity API)](#reactivity-api)를 통해 노출됩니다.

반응성 시스템은 다양한 방식으로 구현될 수 있습니다. 예를 들어, 코드의 종속성을 정적 분석하여 수행할 수 있습니다. 그러나 Vue는 그러한 형태의 반응성 시스템을 사용하지 않습니다.

대신, Vue의 반응성 시스템은 런타임에서 속성 접근을 추적합니다. 이를 위해 Proxy 래퍼와 getter/setter 함수를 사용합니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 반응성 기본](/guide/essentials/reactivity-fundamentals.html)
- [가이드 - 깊이 있는 반응성](/guide/extras/reactivity-in-depth.html)

## 반응성 API (Reactivity API) {#reactivity-api}

반응성 API(Reactivity API)는 [반응성(reactivity)](#reactivity)와 관련된 핵심 Vue 함수들의 모음입니다. 이는 컴포넌트와 독립적으로 사용할 수 있습니다. `ref()`, `reactive()`, `computed()`, `watch()`, `watchEffect()`와 같은 함수들을 포함합니다.

반응성 API는 Composition API의 일부입니다.

자세한 내용은 다음을 참조하세요:
- [반응성 API: Core](/api/reactivity-core.html)
- [반응성 API: 유틸리티](/api/reactivity-utilities.html)
- [반응성 API: 고급](/api/reactivity-advanced.html)

## ref {#ref}

> 이 항목은 반응성에 대한 `ref`의 사용에 대해 다룹니다. 템플릿에서 사용되는 `ref` 속성에 대해서는 [템플릿 ref](#template-ref)를 참조하세요.

`ref`는 Vue의 반응성 시스템의 일부입니다. 이는 `value`라는 하나의 반응형 속성을 가진 객체입니다.

다양한 유형의 ref가 있습니다. 예를 들어, `ref()`, `shallowRef()`, `computed()`, `customRef()`를 사용하여 ref를 생성할 수 있습니다. `isRef()` 함수를 사용하여 객체가 ref인지 확인하고, `isReadonly()`를 사용하여 ref가 직접 값을 재할당할 수 있는지 확인할 수 있습니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 반응성 기본](/guide/essentials/reactivity-fundamentals.html)
- [반응성 API: Core](/api/reactivity-core.html)
- [반응성 API: 유틸리티](/api/reactivity-utilities.html)
- [반응성 API: 고급](/api/reactivity-advanced.html)

## 렌더 함수 (Render Function) {#render-function}

*렌더 함수*는 컴포넌트의 일부로서, 렌더링 중에 사용되는 VNode을 생성하는 역할을 합니다. 템플릿은 렌더 함수로 컴파일됩니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 렌더 함수 및 JSX](/guide/extras/render-function.html)

## 스케줄러 (Scheduler) {#scheduler}

*스케줄러*는 Vue의 내부에서 [반응형 효과](#reactive-effect)가 실행되는 타이밍을 제어하는 부분입니다.

반응형 상태가 변경되면 Vue는 즉시 렌더링 업데이트를 트리거하지 않습니다. 대신, 큐(queue)를 사용하여 업데이트를 일괄 처리합니다. 이는 기반이 되는 데이터에 대해 여러 변경이 이루어져도 컴포넌트가 한 번만 다시 렌더링되도록 보장합니다.

[워쳐(Watcher)](/guide/essentials/watchers.html)도 스케줄러 큐를 사용하여 일괄 처리됩니다. `flush: 'pre'` (기본값)를 가진 워쳐는 컴포넌트 렌더링 전에 실행되며, `flush: 'post'`를 가진 워쳐는 컴포넌트 렌더링 후에 실행됩니다.

스케줄러의 작업은 [라이프사이클 훅](#lifecycle-hooks)을 트리거하거나 [템플릿 ref](#template-ref)를 업데이트하는 등 다양한 내부 작업에도 사용됩니다.

## 스코프드 슬롯 (Scoped Slot) {#scoped-slot}

"스코프드 슬롯(scoped slot)"이라는 용어는 [슬롯(slot)](#slot)이 [프롭(props)](#prop)을 받는 것을 가리킵니다.

과거에는 Vue에서 스코프드 슬롯과 비스코프드 슬롯 사이에 큰 차이가 있었습니다. 어느 정도로는 두 가지 독립적인 기능으로 간주될 수 있었으나, 공통된 템플릿 구문 뒤에 통합되었습니다.

Vue 3에서는 슬롯 API가 단순화되어 모든 슬롯이 스코프드 슬롯처럼 동작하도록 변경되었습니다. 그러나 스코프드 슬롯과 비스코프드 슬롯의 사용 사례는 종종 다르므로 스코프드 슬롯이 슬롯에 프롭을 가지는 것을 가리키는 용어로서 여전히 유용합니다.

슬롯에 전달된 프롭은 부모 템플릿의 특정 영역 내에서만 사용할 수 있습니다. 이 템플릿 영역은 프롭에 대한 변수 범위(variable scope)처럼 동작하므로 '스코프드 슬롯'이라는 이름이 지어졌습니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 슬롯 - 스코프드 슬롯](/guide/components/slots.html#scoped-slots)

## SFC {#sfc}

참고 [Single-File Component](#single-file-component).

## 부작용 (Side Effect) {#side-effect}

"부작용(side effect)"이라는 용어는 Vue에만 국한되지 않습니다. 이 용어는 로컬 범위를 넘어서 어떤 작업 또는 함수가 무언가를 수행하는 것을 설명하는 데 사용됩니다.

예를 들어, `user.name = null`과 같이 속성을 설정하는 경우, `user.name`의 값이 변경될 것으로 기대됩니다. 그러나 Vue의 반응성 시스템을 트리거하는 등의 추가 작업을 수행한다면, 이를 부작용이라고 설명합니다. 이것이 Vue 내에서 "반응형 효과"라는 용어가 사용되는 이유입니다.

함수에 부작용이 있다고 설명할 때는, 함수가 값만 반환하는 것 외에도 함수 외부에서 관찰 가능한 동작을 수행한다는 의미입니다. 이는 상태의 값을 업데이트하거나 네트워크 요청을 트리거하는 등의 작업을 수행할 수 있습니다.

이 용어는 렌더링이나 계산된 속성을 설명할 때 자주 사용됩니다. 렌더링은 부작용이 없어야 하는 것이 일반적으로 권장되는 사례입니다. 마찬가지로, 계산된 속성의 getter 함수도 부작용이 없어야 합니다.

## 싱글 파일 컴포넌트 (Single-File Component) {#single-file-component}

"싱글 파일 컴포넌트(Single-File Component)" 또는 SFC는 Vue 컴포넌트를 위해 일반적으로 사용되는 `.vue` 파일 형식을 가리킵니다.

참고:
- [가이드 - 싱글 파일 컴포넌트](/guide/scaling-up/sfc.html)
- [SFC 구문 명세](/api/sfc-spec.html)

## 슬롯 (Slot) {#slot}

슬롯(Slot)은 자식 컴포넌트로 콘텐츠를 전달하는 데 사용됩니다. 프롭스(props)은 데이터 값을 전달하는 데 사용되는 반면, 슬롯은 HTML 요소와 다른 Vue 컴포넌트로 이루어진 보다 풍부한 콘텐츠를 전달하는 데 사용됩니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 슬롯](/guide/components/slots.html)

## 템플릿 ref (Template Ref) {#template-ref}

"템플릿 ref"라는 용어는 템플릿 내에서 태그의 `ref` 속성을 사용하는 것을 가리킵니다. 컴포넌트가 렌더링된 후에는 이 속성을 사용하여 템플릿의 해당 태그에 해당하는 HTML 요소 또는 컴포넌트 인스턴스를 해당 속성으로 채우게 됩니다.

옵션 API를 사용하는 경우, `$refs` 객체의 속성으로서 ref가 노출됩니다.

Composition API를 사용하는 경우, 템플릿 ref는 동일한 이름을 가진 반응형 [ref](#ref)에 채워집니다.

템플릿 ref는 Vue의 반응성 시스템에서 찾을 수 있는 반응형 ref와 혼동되지 않아야 합니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 템플릿 Refs](/guide/essentials/template-refs.html)

## VDOM {#vdom}

참고 [가상 DOM](#virtual-dom).

## 가상 DOM (Virtual DOM) {#virtual-dom}

"가상 DOM(Virtual DOM)"이라는 용어는 Vue에만 국한되지 않습니다. 이는 UI 업데이트를 관리하기 위해 여러 웹 프레임워크에서 사용하는 일반적인 접근 방식입니다.

브라우저는 페이지의 현재 상태를 나타내는 노드 트리를 사용합니다. 이 트리와 해당 트리와 상호작용하기 위해 사용되는 JavaScript API는 "문서 객체 모델(Document Object Model)" 또는 "DOM"이라고 합니다.

DOM을 직접 조작하는 것은 주요한 성능 병목 현상입니다. 가상 DOM은 이를 관리하기 위한 한 가지 전략을 제공합니다.

Vue 컴포넌트는 직접 DOM 노드를 생성하는 대신에 DOM 노드에 대한 설명을 생성합니다. 이러한 설명은 VNode(가상 DOM 노드)라고 불리는 일반적인 JavaScript 객체입니다. VNode 생성은 비교적 저렴합니다.

컴포넌트가 다시 렌더링될 때마다 새로운 VNode 트리가 이전의 VNode 트리와 비교되고, 차이점이 실제 DOM에 적용됩니다. 변경사항이 없는 경우에는 DOM을 변경할 필요가 없습니다.

Vue는 [컴파일러 기반 가상 DOM](/guide/extras/rendering-mechanism.html#compiler-informed-virtual-dom)이라는 하이브리드 접근 방식을 사용합니다. Vue의 템플릿 컴파일러는 템플릿의 정적 분석을 기반으로 성능 최적화를 적용할 수 있습니다. 컴포넌트의 이전 VNode 트리와 새로운 VNode 트리를 런타임에서 전체적으로 비교하는 대신, Vue는 컴파일러에서 추출한 정보를 사용하여 변경 가능한 트리의 일부만 비교하도록 줄일 수 있습니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - 렌더링 메커니즘](/guide/extras/rendering-mechanism.html)
- [가이드 - 렌더 함수 및 JSX](/guide/extras/render-function.html)

## VNode {#vnode}

*VNode*은 *가상 DOM 노드(Virtual DOM node)*입니다. [`h()`](/api/render-function.html#h) 함수를 사용하여 생성할 수 있습니다.

더 자세한 정보는 [가상 DOM](#virtual-dom)을 참조하세요.

## 웹 컴포넌트 (Web Component) {#web-component}

*웹 컴포넌트(Web Component)* 표준은 현대 웹 브라우저에서 구현된 기능의 모음입니다.

Vue 컴포넌트는 웹 컴포넌트가 아닙니다. 그러나 `defineCustomElement()`를 사용하여 Vue 컴포넌트에서 [사용자 정의 요소(custom element)](#custom-element)를 생성할 수 있습니다. 또한 Vue는 Vue 컴포넌트 내에서 사용자 정의 요소의 사용을 지원합니다.

자세한 내용은 다음을 참조하세요:
- [가이드 - Vue와 웹 컴포넌트](/guide/extras/web-components.html)
