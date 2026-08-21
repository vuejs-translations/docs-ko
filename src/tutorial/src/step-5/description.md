# 폼 바인딩(binding) {#form-bindings}

`v-bind`와 `v-on`을 함께 사용하면 폼 입력 요소에서 양방향 바인딩을 만들 수 있습니다:

```vue-html
<input :value="text" @input="onInput">
```

<div class="options-api">

```js
methods: {
  onInput(e) {
    // v-on 핸들러는 네이티브 DOM 이벤트를
    // 인자로 받습니다.
    this.text = e.target.value
  }
}
```

</div>

<div class="composition-api">

```js
function onInput(e) {
  // v-on 핸들러는 네이티브 DOM 이벤트를
  // 인자로 받습니다.
  text.value = e.target.value
}
```

</div>

입력 상자에 타이핑해 보세요 - 입력할 때마다 `<p>`의 텍스트가 업데이트되는 것을 볼 수 있습니다.

양방향 바인딩을 더 간단하게 하기 위해, Vue는 `v-model`이라는 디렉티브(directive)를 제공합니다. 이는 본질적으로 위의 예시를 위한 문법적 설탕(syntactic sugar)입니다:

```vue-html
<input v-model="text">
```

`v-model`은 `<input>`의 값을 바인딩된 상태와 자동으로 동기화하므로, 더 이상 이벤트 핸들러를 사용할 필요가 없습니다.

`v-model`은 텍스트 입력뿐만 아니라 체크박스, 라디오 버튼, 셀렉트 드롭다운 등 다른 입력 타입에서도 동작합니다. 더 자세한 내용은 <a target="_blank" href="/guide/essentials/forms.html">가이드 - 폼 바인딩</a>에서 다룹니다.

이제 코드를 `v-model`을 사용하도록 리팩터링해 보세요.
