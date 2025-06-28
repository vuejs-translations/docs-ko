# 속성 바인딩 {#attribute-bindings}

Vue에서 머스태시는 텍스트 보간에만 사용됩니다. 속성을 동적 값에 바인딩하려면 `v-bind` 디렉티브를 사용합니다:

```vue-html
<div v-bind:id="dynamicId"></div>
```

**디렉티브**는 `v-` 접두사로 시작하는 특별한 속성입니다. 이들은 Vue의 템플릿 문법의 일부입니다. 텍스트 보간과 마찬가지로, 디렉티브의 값은 컴포넌트의 상태에 접근할 수 있는 JavaScript 표현식입니다. `v-bind`와 디렉티브 문법의 전체 내용은 <a target="_blank" href="/guide/essentials/template-syntax.html">가이드 - 템플릿 문법</a>에서 다룹니다.

콜론(`:id`) 뒤의 부분은 디렉티브의 "인자"입니다. 여기서, 엘리먼트의 `id` 속성은 컴포넌트 상태의 `dynamicId` 속성과 동기화됩니다.

`v-bind`는 매우 자주 사용되기 때문에, 전용 축약 문법이 있습니다:

```vue-html
<div :id="dynamicId"></div>
```

이제, `<h1>`에 동적 `class` 바인딩을 추가해 보세요. 값으로는 `titleClass` <span class="options-api">data 속성</span><span class="composition-api">ref</span>를 사용하세요. 바인딩이 올바르게 되었다면, 텍스트가 빨간색으로 변해야 합니다.
