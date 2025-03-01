# 텔레포트 {#teleport}

`<Teleport>`는 컴포넌트 템플릿의 일부를 해당 컴포넌트의 DOM 계층 외부의 DOM 노드로 "이동"할 수 있게 해주는 빌트인 컴포넌트입니다.

## 기본 사용법 {#basic-usage}

때때로 컴포넌트의 템플릿 일부가 논리적으로는 해당 컴포넌트에 속하지만, 시각적으로는 DOM의 다른 위치, 심지어 Vue 애플리케이션 바깥에 표시되어야 할 수도 있습니다.

가장 일반적인 예는 풀스크린 모달을 만들 때입니다. 이상적으로는 모달을 여닫는 버튼과 모달 자체의 코드가 같은 싱글 파일 컴포넌트(SFC) 내에 작성되는 것이 좋습니다. 둘 다 모달의 열림/닫힘 상태와 관련이 있기 때문입니다. 하지만 이렇게 하면 모달이 버튼과 함께 애플리케이션의 DOM 계층 깊숙이 렌더링되므로, CSS를 이용해 모달의 위치를 조정할 때 어려운 문제가 발생할 수 있습니다.

다음 HTML 구조를 고려하십시오.

```vue-html
<div class="outer">
  <h3>Vue Teleport Example</h3>
  <div>
    <MyModal />
  </div>
</div>
```

다음은 `<MyModal>`의 구현입니다:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">모달 열기</button>

  <div v-if="open" class="modal">
    <p>짜자잔~ 모달입니다!</p>
    <button @click="open = false">닫기</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<template>
  <button @click="open = true">모달 열기</button>

  <div v-if="open" class="modal">
    <p>짜자잔~ 모달입니다!</p>
    <button @click="open = false">닫기</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>

컴포넌트에는 모달의 열기를 트리거하는 `<button>`과 `.modal` 클래스가 있는 `<div>`가 포함되어 있으며,
여기에는 모달의 컨텐츠와 닫기 버튼이 포함됩니다.

초기 HTML 구조 내에서 이 컴포넌트를 사용할 때, 여러 가지 잠재적인 문제가 있습니다:

- `position: fixed`는 부모 엘리먼트에 `transform`, `perspective` 또는 `filter` 속성이 설정되지 않은 경우에만 뷰포트를 기준으로 엘리먼트를 배치합니다.
  예를 들어 CSS 트랜지션으로 조상 `<div class="outer">`에 애니메이션을 적용하려는 경우 모달 레이아웃이 깨집니다!

- 모달의 `z-index`는 모달을 포함하는 엘리먼트에 의해 제한됩니다.
  `<div class="outer">`와 겹치고 `z-index`가 더 높은 또 다른 엘리먼트가 있으면 모달을 덮을 것입니다.

`<Teleport>`는 중첩된 DOM 구조에서 벗어날 수 있도록 하여 이러한 문제를 해결할 수 있는 깔끔한 방법을 제공합니다. `<Teleport>`를 사용하도록 `<MyModal>`을 수정해 보겠습니다:

```vue-html{3,8}
<button @click="open = true">모달 열기</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>짜자잔~ 모달입니다!</p>
    <button @click="open = false">닫기</button>
  </div>
</Teleport>
```

`<Teleport>`의 `to` 대상은 CSS 셀렉터 문자열 또는 실제 DOM 노드여야 합니다.
여기서 우리는 Vue에게 이 템플릿 조각을 **`body`** 태그로 **이동**하도록 지시합니다.

아래 버튼을 클릭하고 브라우저의 개발자도구를 통해 `<body>` 태그를 확인해 봅시다:

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo">
  <button @click="open = true">모달 열기</button>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="open" class="demo modal-demo">
        <p style="margin-bottom:20px">짜자잔~ 모달입니다!</p>
        <button @click="open = false">닫기</button>
      </div>
    </Teleport>
  </ClientOnly>
</div>

<style>
.modal-demo {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: var(--vt-c-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>

`<Teleport>`를 [`<Transition>`](./transition)과 결합하여 애니메이션 모달을 만들 수 있습니다.
[예제](/examples/#modal)를 참고하세요.

:::tip
`<Teleport>` 컴포넌트가 `to` 대상으로 이동하여 마운트 되기 전, 대상은 이미 DOM에 있어야 합니다.
이상적으로는 전체 Vue 앱 외부의 엘리먼트여야 합니다.
Vue에서 렌더링한 다른 엘리먼트를 대상으로 하는 경우, `<Teleport>` 전에 해당 엘리먼트가 마운트되었는지 확인해야 합니다.
:::

## 컴포넌트와 함께 사용하기 {#using-with-components}

`<Teleport>`는 렌더링된 DOM 구조만 변경하며 컴포넌트의 논리적 계층 구조에는 영향을 주지 않습니다.
즉, `<Teleport>`에 컴포넌트가 포함되어 있으면, 해당 컴포넌트는 논리적으로 `<Teleport>`를 포함하는 부모 컴포넌트의 자식으로 유지됩니다.
Props 전달() 및 이벤트 발신(emit)은 계속 동일한 방식으로 작동합니다.

이것은 부모 컴포넌트로부터 주입되어 예상대로 작동함을 의미합니다.
또한 자식 컴포넌트는 실제 컨텐츠가 이동한 위치에 배치되지만, Vue 개발자도구에서는 부모 컴포넌트 내부에 위치합니다.

## 텔레포트 비활성화 {#disabling-teleport}

경우에 따라 `<Teleport>`를 조건부로 비활성화 할 수 있습니다.
예를 들어 컴포넌트를 데스크톱용 오버레이로 렌더링하지만 모바일에서는 인라인으로 렌더링할 수 있습니다.
`<Teleport>`는 동적으로 토글할 수 있는 `disabled` prop을 지원합니다:

```vue-html
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

미디어 쿼리 변경을 감지하여 `isMobile` 상태를 동적으로 업데이트할 수 있습니다.

## 같은 대상에 여러 텔레포트 사용 {#multiple-teleports-on-the-same-target}

일반적인 사용 사례는 여러 인스턴스가 동시에 활성화될 가능성이 있는 재사용 가능한 `<Modal>` 컴포넌트입니다.
이러한 종류의 시나리오에서는 여러 `<Teleport>` 컴포넌트의 컨텐츠를 동일한 대상 엘리먼트에 탑재할 수 있습니다.
순서는 단순히 추가한 순서대로 이므로, `<Teleport>` 컴포넌트 마운트는 대상 엘리먼트 내 이전 마운트 다음에 위치합니다.

다음과 같이 사용할 때:

```vue-html
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```

렌더링된 결과는 다음과 같습니다:

```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

##   지연된 텔레포트 <sup class="vt-badge" data-text="3.5+"/> {#deferred-teleport}

Vue 3.5 이상에서는 defer 속성을 사용하여 Teleport의 대상 요소 해결(target resolving)을 애플리케이션의 다른 부분이 마운트될 때까지 지연할 수 있습니다. 이를 통해 Teleport가 Vue에 의해 렌더링되지만, 컴포넌트 트리의 후반부에 생성되는 컨테이너 요소를 대상으로 지정할 수 있습니다.

```vue-html
<Teleport defer to="#late-div">...</Teleport>

<!-- somewhere later in the template -->
<div id="late-div"></div>
```

대상 요소는 Teleport와 동일한 마운트/업데이트 틱 내에서 렌더링되어야 합니다. 즉, `<div>`가 한참 뒤에 마운트된다면, Teleport는 여전히 오류를 발생시킵니다. `defer`는 mounted 라이프사이클 훅과 유사한 방식으로 작동합니다.

---

**관련 문서**

- [`<Teleport>` API 참고](/api/built-in-components#teleport)
- [SSR에서 텔레포트 핸들링](/guide/scaling-up/ssr#teleport)
