# 내장 디렉티브 {#built-in-directives}

## v-text {#v-text}

요소의 텍스트 콘텐츠를 업데이트합니다.

- **기대값:** `string`

- **세부사항**

  `v-text`는 요소의 [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) 속성을 설정하여 동작하므로, 요소 내부의 기존 콘텐츠를 모두 덮어씁니다. `textContent`의 일부만 업데이트해야 한다면 [머스태시 보간법](/guide/essentials/template-syntax#text-interpolation)을 대신 사용해야 합니다.

- **예시**

  ```vue-html
  <span v-text="msg"></span>
  <!-- 아래와 동일 -->
  <span>{{msg}}</span>
  ```

- **참고** [템플릿 문법 - 텍스트 보간](/guide/essentials/template-syntax#text-interpolation)

## v-html {#v-html}

요소의 [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)을 업데이트합니다.

- **기대값:** `string`

- **세부사항**

  `v-html`의 내용은 일반 HTML로 삽입되며, Vue 템플릿 문법은 처리되지 않습니다. `v-html`을 사용해 템플릿을 조합하려고 한다면, 대신 컴포넌트를 사용하는 방식으로 해결책을 다시 생각해보세요.

  ::: warning 보안 주의
  웹사이트에서 임의의 HTML을 동적으로 렌더링하는 것은 매우 위험할 수 있습니다. 이는 쉽게 [XSS 공격](https://en.wikipedia.org/wiki/Cross-site_scripting)으로 이어질 수 있기 때문입니다. 신뢰할 수 있는 콘텐츠에만 `v-html`을 사용하고, **절대** 사용자로부터 제공된 콘텐츠에는 사용하지 마세요.
  :::

  [싱글 파일 컴포넌트](/guide/scaling-up/sfc)에서는, `scoped` 스타일이 `v-html` 내부의 콘텐츠에는 적용되지 않습니다. 이는 해당 HTML이 Vue의 템플릿 컴파일러에 의해 처리되지 않기 때문입니다. `v-html` 콘텐츠에 scoped CSS를 적용하려면 [CSS 모듈](./sfc-css-features#css-modules)이나 BEM과 같은 수동 스코핑 전략을 가진 추가적인 전역 `<style>` 요소를 사용할 수 있습니다.

- **예시**

  ```vue-html
  <div v-html="html"></div>
  ```

- **참고** [템플릿 문법 - Raw HTML](/guide/essentials/template-syntax#raw-html)

## v-show {#v-show}

표현식 값의 참/거짓에 따라 요소의 표시 여부를 토글합니다.

- **기대값:** `any`

- **세부사항**

  `v-show`는 인라인 스타일을 통해 `display` CSS 속성을 설정하여 동작하며, 요소가 보일 때 초기 `display` 값을 최대한 존중합니다. 또한 조건이 변경될 때 트랜지션을 트리거합니다.

- **참고** [조건부 렌더링 - v-show](/guide/essentials/conditional#v-show)

## v-if {#v-if}

표현식 값의 참/거짓에 따라 요소 또는 템플릿 조각을 조건부로 렌더링합니다.

- **기대값:** `any`

- **세부사항**

  `v-if` 요소가 토글될 때, 해당 요소와 그 안의 디렉티브/컴포넌트는 파괴되고 다시 생성됩니다. 초기 조건이 거짓이라면 내부 콘텐츠는 전혀 렌더링되지 않습니다.

  `<template>`에 사용할 수 있어, 텍스트만 포함하거나 여러 요소를 포함하는 조건부 블록을 나타낼 수 있습니다.

  이 디렉티브는 조건이 변경될 때 트랜지션을 트리거합니다.

  함께 사용할 때, `v-if`가 `v-for`보다 우선순위가 높습니다. 이 두 디렉티브를 하나의 요소에 함께 사용하는 것은 권장하지 않습니다. 자세한 내용은 [리스트 렌더링 가이드](/guide/essentials/list#v-for-with-v-if)를 참고하세요.

- **참고** [조건부 렌더링 - v-if](/guide/essentials/conditional#v-if)

## v-else {#v-else}

`v-if` 또는 `v-if` / `v-else-if` 체인의 "else 블록"을 나타냅니다.

- **표현식 없음**

- **세부사항**

  - 제한: 이전 형제 요소에 `v-if` 또는 `v-else-if`가 있어야 합니다.

  - `<template>`에 사용할 수 있어, 텍스트만 포함하거나 여러 요소를 포함하는 조건부 블록을 나타낼 수 있습니다.

- **예시**

  ```vue-html
  <div v-if="Math.random() > 0.5">
    Now you see me
  </div>
  <div v-else>
    Now you don't
  </div>
  ```

- **참고** [조건부 렌더링 - v-else](/guide/essentials/conditional#v-else)

## v-else-if {#v-else-if}

`v-if`의 "else if 블록"을 나타냅니다. 체이닝이 가능합니다.

- **기대값:** `any`

- **세부사항**

  - 제한: 이전 형제 요소에 `v-if` 또는 `v-else-if`가 있어야 합니다.

  - `<template>`에 사용할 수 있어, 텍스트만 포함하거나 여러 요소를 포함하는 조건부 블록을 나타낼 수 있습니다.

- **예시**

  ```vue-html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```

- **참고** [조건부 렌더링 - v-else-if](/guide/essentials/conditional#v-else-if)

## v-for {#v-for}

소스 데이터를 기반으로 요소 또는 템플릿 블록을 여러 번 렌더링합니다.

- **기대값:** `Array | Object | number | string | Iterable`

- **세부사항**

  디렉티브의 값은 현재 반복 중인 요소에 대한 별칭을 제공하기 위해 `alias in expression`이라는 특수 문법을 사용해야 합니다:

  ```vue-html
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```

  또는, 인덱스(또는 객체에서 사용할 경우 키)에 대한 별칭도 지정할 수 있습니다:

  ```vue-html
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  ```

  `v-for`의 기본 동작은 요소를 제자리에서 패치하려고 시도하며, 이동시키지 않습니다. 요소의 순서를 강제로 재정렬하려면 `key` 특수 속성으로 정렬 힌트를 제공해야 합니다:

  ```vue-html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```

  `v-for`는 [이터러블 프로토콜](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)을 구현한 값(네이티브 `Map` 및 `Set` 포함)에도 사용할 수 있습니다.

- **참고**
  - [리스트 렌더링](/guide/essentials/list)

## v-on {#v-on}

요소에 이벤트 리스너를 연결합니다.

- **축약형:** `@`

- **기대값:** `Function | 인라인 문장 | Object (인자 없이)`

- **인자:** `event` (Object 문법 사용 시 선택)

- **수식어**

  - `.stop` - `event.stopPropagation()` 호출
  - `.prevent` - `event.preventDefault()` 호출
  - `.capture` - 캡처 모드로 이벤트 리스너 추가
  - `.self` - 이벤트가 이 요소에서 발생한 경우에만 핸들러 트리거
  - `.{keyAlias}` - 특정 키에서만 핸들러 트리거
  - `.once` - 핸들러를 최대 한 번만 트리거
  - `.left` - 마우스 왼쪽 버튼 이벤트에서만 핸들러 트리거
  - `.right` - 마우스 오른쪽 버튼 이벤트에서만 핸들러 트리거
  - `.middle` - 마우스 가운데 버튼 이벤트에서만 핸들러 트리거
  - `.passive` - `{ passive: true }`로 DOM 이벤트 연결

- **세부사항**

  이벤트 타입은 인자로 표시됩니다. 표현식은 메서드 이름, 인라인 문장, 또는 수식어가 있을 경우 생략할 수 있습니다.

  일반 요소에 사용하면 [**네이티브 DOM 이벤트**](https://developer.mozilla.org/en-US/docs/Web/Events)만 리스닝합니다. 커스텀 엘리먼트 컴포넌트에 사용하면 해당 자식 컴포넌트에서 발생한 **커스텀 이벤트**를 리스닝합니다.

  네이티브 DOM 이벤트를 리스닝할 때, 메서드는 네이티브 이벤트를 유일한 인자로 받습니다. 인라인 문장을 사용할 경우, 특별한 `$event` 속성에 접근할 수 있습니다: `v-on:click="handle('ok', $event)"`.

  `v-on`은 인자 없이 이벤트/리스너 쌍의 객체에 바인딩하는 것도 지원합니다. 객체 문법을 사용할 때는 수식어를 지원하지 않습니다.

- **예시**

  ```vue-html
  <!-- 메서드 핸들러 -->
  <button v-on:click="doThis"></button>

  <!-- 동적 이벤트 -->
  <button v-on:[event]="doThis"></button>

  <!-- 인라인 문장 -->
  <button v-on:click="doThat('hello', $event)"></button>

  <!-- 축약형 -->
  <button @click="doThis"></button>

  <!-- 축약형 동적 이벤트 -->
  <button @[event]="doThis"></button>

  <!-- 이벤트 전파 중지 -->
  <button @click.stop="doThis"></button>

  <!-- 기본 동작 방지 -->
  <button @click.prevent="doThis"></button>

  <!-- 표현식 없이 기본 동작 방지 -->
  <form @submit.prevent></form>

  <!-- 수식어 체이닝 -->
  <button @click.stop.prevent="doThis"></button>

  <!-- keyAlias를 사용한 키 수식어 -->
  <input @keyup.enter="onEnter" />

  <!-- 클릭 이벤트가 최대 한 번만 트리거됨 -->
  <button v-on:click.once="doThis"></button>

  <!-- 객체 문법 -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  자식 컴포넌트에서 커스텀 이벤트를 리스닝(자식에서 "my-event"가 emit될 때 핸들러가 호출됨):

  ```vue-html
  <MyComponent @my-event="handleThis" />

  <!-- 인라인 문장 -->
  <MyComponent @my-event="handleThis(123, $event)" />
  ```

- **참고**
  - [이벤트 핸들링](/guide/essentials/event-handling)
  - [컴포넌트 - 커스텀 이벤트](/guide/essentials/component-basics#listening-to-events)

## v-bind {#v-bind}

하나 이상의 속성 또는 컴포넌트 prop을 표현식에 동적으로 바인딩합니다.

- **축약형:**
  - `:` 또는 `.` (`.prop` 수식어 사용 시)
  - 값 생략(속성과 바인딩 값의 이름이 같을 때, 3.4+ 필요)

- **기대값:** `any (인자 사용 시) | Object (인자 없이)`

- **인자:** `attrOrProp (선택)`

- **수식어**

  - `.camel` - 케밥 케이스 속성명을 camelCase로 변환
  - `.prop` - 바인딩을 DOM 속성으로 강제 설정 (3.2+)
  - `.attr` - 바인딩을 DOM 속성으로 강제 설정 (3.2+)

- **사용법**

  `class` 또는 `style` 속성에 바인딩할 때, `v-bind`는 Array 또는 Object와 같은 추가 값 타입을 지원합니다. 자세한 내용은 아래 가이드 섹션을 참고하세요.

  요소에 바인딩을 설정할 때, Vue는 기본적으로 `in` 연산자 체크를 통해 해당 키가 속성으로 정의되어 있는지 확인합니다. 속성이 정의되어 있으면, Vue는 값을 속성이 아닌 DOM 속성으로 설정합니다. 대부분의 경우 이 방식이 잘 동작하지만, `.prop` 또는 `.attr` 수식어를 명시적으로 사용하여 이 동작을 오버라이드할 수 있습니다. 특히 [커스텀 엘리먼트 작업 시](/guide/extras/web-components#passing-dom-properties) 필요할 수 있습니다.

  컴포넌트 prop 바인딩에 사용할 때, prop은 자식 컴포넌트에서 올바르게 선언되어 있어야 합니다.

  인자 없이 사용할 경우, 속성명-값 쌍을 포함하는 객체를 바인딩할 수 있습니다.

- **예시**

  ```vue-html
  <!-- 속성 바인딩 -->
  <img v-bind:src="imageSrc" />

  <!-- 동적 속성명 -->
  <button v-bind:[key]="value"></button>

  <!-- 축약형 -->
  <img :src="imageSrc" />

  <!-- 동일 이름 축약형 (3.4+), :src="src"로 확장됨 -->
  <img :src />

  <!-- 축약형 동적 속성명 -->
  <button :[key]="value"></button>

  <!-- 인라인 문자열 연결 -->
  <img :src="'/path/to/images/' + fileName" />

  <!-- 클래스 바인딩 -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]"></div>

  <!-- 스타일 바인딩 -->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>

  <!-- 속성 객체 바인딩 -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

  <!-- prop 바인딩. "prop"은 자식 컴포넌트에서 선언되어야 함 -->
  <MyComponent :prop="someThing" />

  <!-- 부모와 자식 컴포넌트에서 공통된 prop 전달 -->
  <MyComponent v-bind="$props" />

  <!-- XLink -->
  <svg><a :xlink:special="foo"></a></svg>
  ```

  `.prop` 수식어는 전용 축약형 `.`도 있습니다:

  ```vue-html
  <div :someProperty.prop="someObject"></div>

  <!-- 아래와 동일 -->
  <div .someProperty="someObject"></div>
  ```

  `.camel` 수식어는 in-DOM 템플릿에서 `v-bind` 속성명을 camelCase로 변환할 수 있습니다. 예: SVG `viewBox` 속성

  ```vue-html
  <svg :view-box.camel="viewBox"></svg>
  ```

  `.camel`은 문자열 템플릿을 사용하거나, 빌드 단계에서 템플릿을 미리 컴파일하는 경우 필요하지 않습니다.

- **참고**
  - [클래스 및 스타일 바인딩](/guide/essentials/class-and-style)
  - [컴포넌트 - Prop 전달 세부사항](/guide/components/props#prop-passing-details)

## v-model {#v-model}

폼 입력 요소 또는 컴포넌트에서 양방향 바인딩을 생성합니다.

- **기대값:** 폼 입력 요소의 값 또는 컴포넌트의 출력에 따라 다름

- **제한:**

  - `<input>`
  - `<select>`
  - `<textarea>`
  - 컴포넌트

- **수식어**

  - [`.lazy`](/guide/essentials/forms#lazy) - `input` 대신 `change` 이벤트 리스닝
  - [`.number`](/guide/essentials/forms#number) - 유효한 입력 문자열을 숫자로 변환
  - [`.trim`](/guide/essentials/forms#trim) - 입력값 트림

- **참고**

  - [폼 입력 바인딩](/guide/essentials/forms)
  - [컴포넌트 이벤트 - `v-model`과 함께 사용](/guide/components/v-model)

## v-slot {#v-slot}

props를 받을 것으로 예상되는 명명된 슬롯 또는 스코프 슬롯을 나타냅니다.

- **축약형:** `#`

- **기대값:** 함수 인자 위치에서 유효한 JavaScript 표현식(구조 분해 지원 포함). 선택 사항 - 슬롯에 props가 전달될 것으로 예상될 때만 필요.

- **인자:** 슬롯 이름(선택, 기본값은 `default`)

- **제한:**

  - `<template>`
  - [컴포넌트](/guide/components/slots#scoped-slots) (props가 있는 단일 기본 슬롯의 경우)

- **예시**

  ```vue-html
  <!-- 명명된 슬롯 -->
  <BaseLayout>
    <template v-slot:header>
      Header content
    </template>

    <template v-slot:default>
      Default slot content
    </template>

    <template v-slot:footer>
      Footer content
    </template>
  </BaseLayout>

  <!-- props를 받는 명명된 슬롯 -->
  <InfiniteScroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </InfiniteScroll>

  <!-- 구조 분해와 함께 props를 받는 기본 슬롯 -->
  <Mouse v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </Mouse>
  ```

- **참고**
  - [컴포넌트 - 슬롯](/guide/components/slots)

## v-pre {#v-pre}

이 요소와 모든 자식에 대한 컴파일을 건너뜁니다.

- **표현식 없음**

- **세부사항**

  `v-pre`가 있는 요소 내부에서는 모든 Vue 템플릿 문법이 그대로 보존되어 렌더링됩니다. 가장 일반적인 사용 사례는 원시 머스태시 태그를 표시하는 것입니다.

- **예시**

  ```vue-html
  <span v-pre>{{ this will not be compiled }}</span>
  ```

## v-once {#v-once}

요소와 컴포넌트를 한 번만 렌더링하고, 이후 업데이트를 건너뜁니다.

- **표현식 없음**

- **세부사항**

  이후 다시 렌더링될 때, 해당 요소/컴포넌트와 모든 자식은 정적 콘텐츠로 간주되어 건너뜁니다. 이는 업데이트 성능을 최적화하는 데 사용할 수 있습니다.

  ```vue-html
  <!-- 단일 요소 -->
  <span v-once>This will never change: {{msg}}</span>
  <!-- 자식이 있는 요소 -->
  <div v-once>
    <h1>Comment</h1>
    <p>{{msg}}</p>
  </div>
  <!-- 컴포넌트 -->
  <MyComponent v-once :comment="msg"></MyComponent>
  <!-- `v-for` 디렉티브 -->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```

  3.2부터는 [`v-memo`](#v-memo)를 사용해 무효화 조건과 함께 템플릿의 일부를 메모이즈할 수도 있습니다.

- **참고**
  - [데이터 바인딩 문법 - 보간](/guide/essentials/template-syntax#text-interpolation)
  - [v-memo](#v-memo)

## v-memo {#v-memo}

- 3.2+에서만 지원

- **기대값:** `any[]`

- **세부사항**

  템플릿의 서브 트리를 메모이즈합니다. 요소와 컴포넌트 모두에 사용할 수 있습니다. 디렉티브는 메모이제이션을 위해 비교할 고정 길이의 의존성 값 배열을 기대합니다. 배열의 모든 값이 마지막 렌더와 동일하다면, 전체 서브 트리에 대한 업데이트가 건너뜁니다. 예를 들어:

  ```vue-html
  <div v-memo="[valueA, valueB]">
    ...
  </div>
  ```

  컴포넌트가 다시 렌더링될 때, `valueA`와 `valueB`가 모두 동일하다면 이 `<div>`와 그 자식에 대한 모든 업데이트가 건너뜁니다. 실제로, 메모이즈된 서브 트리의 복사본을 재사용할 수 있으므로 Virtual DOM VNode 생성조차도 건너뜁니다.

  메모이제이션 배열을 올바르게 지정하는 것이 중요합니다. 그렇지 않으면 실제로 적용되어야 할 업데이트를 건너뛸 수 있습니다. 의존성 배열이 비어있는 `v-memo="[]"`는 기능적으로 `v-once`와 동일합니다.

  **`v-for`와 함께 사용하기**

  `v-memo`는 성능이 중요한 시나리오에서 마이크로 최적화를 위해 제공되며, 거의 필요하지 않습니다. 가장 일반적인 활용 사례는 대용량 `v-for` 리스트(길이 > 1000)를 렌더링할 때입니다:

  ```vue-html
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
    <p>...more child nodes</p>
  </div>
  ```

  컴포넌트의 `selected` 상태가 변경될 때, 대부분의 항목이 동일하더라도 많은 VNode가 생성됩니다. 여기서 `v-memo` 사용은 "이 항목이 선택됨/해제됨으로 변경된 경우에만 업데이트하라"는 의미입니다. 영향을 받지 않은 항목은 이전 VNode를 재사용하여 diffing을 완전히 건너뜁니다. 이때, Vue가 항목의 `:key`에서 자동으로 추론하므로 memo 의존성 배열에 `item.id`를 포함할 필요는 없습니다.

  :::warning
  `v-memo`를 `v-for`와 함께 사용할 때는 반드시 같은 요소에 사용해야 합니다. **`v-memo`는 `v-for` 내부에서는 동작하지 않습니다.**
  :::

  `v-memo`는 자식 컴포넌트 업데이트 체크가 비최적화된 특정 엣지 케이스에서 원치 않는 업데이트를 수동으로 방지하는 데도 사용할 수 있습니다. 하지만, 필요한 업데이트가 건너뛰어지지 않도록 올바른 의존성 배열을 지정하는 것은 개발자의 책임입니다.

- **참고**
  - [v-once](#v-once)

## v-cloak {#v-cloak}

컴파일되지 않은 템플릿을 준비될 때까지 숨기는 데 사용됩니다.

- **표현식 없음**

- **세부사항**

  **이 디렉티브는 빌드 단계가 없는 환경에서만 필요합니다.**

  in-DOM 템플릿을 사용할 때, "컴파일되지 않은 템플릿의 깜빡임"이 발생할 수 있습니다. 즉, 마운트된 컴포넌트가 렌더링된 콘텐츠로 교체되기 전까지 사용자가 원시 머스태시 태그를 볼 수 있습니다.

  `v-cloak`는 관련 컴포넌트 인스턴스가 마운트될 때까지 요소에 남아 있습니다. `[v-cloak] { display: none }`과 같은 CSS 규칙과 결합하여, 컴포넌트가 준비될 때까지 원시 템플릿을 숨기는 데 사용할 수 있습니다.

- **예시**

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```vue-html
  <div v-cloak>
    {{ message }}
  </div>
  ```

  컴파일이 완료될 때까지 `<div>`는 보이지 않습니다.
