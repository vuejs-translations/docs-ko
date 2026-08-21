# 선언적 렌더링(rendering) {#declarative-rendering}

<div class="sfc">

에디터에서 보이는 것은 Vue 싱글 파일 컴포넌트(SFC)입니다. SFC는 함께 묶여야 하는 HTML, CSS, JavaScript를 캡슐화한 재사용 가능한 독립형 코드 블록으로, `.vue` 파일 안에 작성됩니다.

</div>

Vue의 핵심 기능은 **선언적 렌더링**입니다. HTML을 확장한 템플릿(template) 문법을 사용하여, JavaScript 상태에 따라 HTML이 어떻게 보여야 하는지 설명할 수 있습니다. 상태가 변경되면 HTML도 자동으로 업데이트됩니다.

<div class="composition-api">

변경 시 업데이트를 트리거할 수 있는 상태는 **반응형**이라고 간주합니다. Vue의 `reactive()` API를 사용하여 반응형 상태를 선언할 수 있습니다. `reactive()`로 생성된 객체는 일반 객체처럼 동작하는 JavaScript [프록시(Proxy)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy)입니다:

```js
import { reactive } from 'vue'

const counter = reactive({
  count: 0
})

console.log(counter.count) // 0
counter.count++
```

`reactive()`는 객체(배열 및 `Map`, `Set`과 같은 내장 타입 포함)에만 동작합니다. 반면, `ref()`는 어떤 값 타입이든 받아 내부 값을 `.value` 속성으로 노출하는 객체를 생성할 수 있습니다:

```js
import { ref } from 'vue'

const message = ref('Hello World!')

console.log(message.value) // "Hello World!"
message.value = 'Changed'
```

`reactive()`와 `ref()`에 대한 자세한 내용은 <a target="_blank" href="/guide/essentials/reactivity-fundamentals.html">가이드 - 반응성(reactivity) 기초</a>에서 다룹니다.

<div class="sfc">

컴포넌트의 `<script setup>` 블록에서 선언된 반응형 상태는 템플릿에서 직접 사용할 수 있습니다. 이렇게 하면 `counter` 객체와 `message` ref의 값을 기반으로 동적 텍스트를 이중 중괄호(mustache) 문법으로 렌더링할 수 있습니다:

</div>

<div class="html">

`createApp()`에 전달되는 객체는 Vue 컴포넌트입니다. 컴포넌트의 상태는 `setup()` 함수 내부에서 선언하고, 객체로 반환해야 합니다:

```js{2,5}
setup() {
  const counter = reactive({ count: 0 })
  const message = ref('Hello World!')
  return {
    counter,
    message
  }
}
```

반환된 객체의 속성들은 템플릿에서 사용할 수 있게 됩니다. 이렇게 하면 `message`의 값을 기반으로 이중 중괄호(mustache) 문법을 사용해 동적 텍스트를 렌더링할 수 있습니다:

</div>

```vue-html
<h1>{{ message }}</h1>
<p>Count is: {{ counter.count }}</p>
```

템플릿에서 `message` ref에 접근할 때 `.value`를 사용할 필요가 없다는 점에 주목하세요. 더 간결하게 사용할 수 있도록 자동으로 언래핑됩니다.

</div>

<div class="options-api">

변경 시 업데이트를 트리거할 수 있는 상태는 **반응형**이라고 간주합니다. Vue에서 반응형 상태는 컴포넌트에 저장됩니다. <span class="html">예제 코드에서 `createApp()`에 전달되는 객체는 컴포넌트입니다.</span>

`data` 컴포넌트 옵션을 사용하여 반응형 상태를 선언할 수 있습니다. 이 옵션은 객체를 반환하는 함수여야 합니다:

<div class="sfc">

```js{3-5}
export default {
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
```

</div>
<div class="html">

```js{3-5}
createApp({
  data() {
    return {
      message: 'Hello World!'
    }
  }
})
```

</div>

`message` 속성은 템플릿에서 사용할 수 있게 됩니다. 이렇게 하면 `message`의 값을 기반으로 이중 중괄호(mustache) 문법을 사용해 동적 텍스트를 렌더링할 수 있습니다:

```vue-html
<h1>{{ message }}</h1>
```

</div>

이중 중괄호 내부의 내용은 식별자나 경로에만 국한되지 않습니다. 어떤 유효한 JavaScript 표현식도 사용할 수 있습니다:

```vue-html
<h1>{{ message.split('').reverse().join('') }}</h1>
```

<div class="composition-api">

이제 직접 반응형 상태를 만들어 보고, 이를 템플릿의 `<h1>`에 동적 텍스트 콘텐츠로 사용해 보세요.

</div>

<div class="options-api">

이제 직접 data 속성을 만들어 보고, 이를 템플릿의 `<h1>` 텍스트 콘텐츠로 사용해 보세요.

</div>
