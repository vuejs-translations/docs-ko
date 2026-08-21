# 조건부 렌더링(rendering) {#conditional-rendering}

`v-if` 디렉티브(directive)를 사용하여 요소를 조건부로 렌더링할 수 있습니다:

```vue-html
<h1 v-if="awesome">Vue는 멋져요!</h1>
```

이 `<h1>`은 `awesome`의 값이 [참 같은 값(truthy)](https://developer.mozilla.org/ko/docs/Glossary/Truthy)일 때만 렌더링됩니다. 만약 `awesome`이 [거짓 같은 값(falsy)](https://developer.mozilla.org/ko/docs/Glossary/Falsy)으로 변경되면, DOM에서 제거됩니다.

또한, `v-else`와 `v-else-if`를 사용하여 조건의 다른 분기를 나타낼 수 있습니다:

```vue-html
<h1 v-if="awesome">Vue는 멋져요!</h1>
<h1 v-else>오 안돼 😢</h1>
```

현재 데모에서는 두 개의 `<h1>`이 동시에 표시되고, 버튼은 아무 동작도 하지 않습니다. 이 두 `<h1>`에 `v-if`와 `v-else` 디렉티브를 추가하고, 버튼으로 두 요소를 전환할 수 있도록 `toggle()` 메서드를 구현해 보세요.

`v-if`에 대한 자세한 내용: <a target="_blank" href="/guide/essentials/conditional.html">가이드 - 조건부 렌더링</a>
