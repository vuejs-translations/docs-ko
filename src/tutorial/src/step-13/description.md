# Emits {#emits}

자식 컴포넌트는 props를 받을 뿐만 아니라 부모에게 이벤트를 발생시킬 수도 있습니다:

<div class="composition-api">
<div class="sfc">

```vue
<script setup>
// 발생시킬 이벤트 선언
const emit = defineEmits(['response'])

// 인자를 포함하여 이벤트 발생
emit('response', '자식으로부터 hello')
</script>
```

</div>

<div class="html">

```js
export default {
  // 발생시킬 이벤트 선언
  emits: ['response'],
  setup(props, { emit }) {
    // 인자를 포함하여 이벤트 발생
    emit('response', '자식으로부터 hello')
  }
}
```

</div>

</div>

<div class="options-api">

```js
export default {
  // 발생시킬 이벤트 선언
  emits: ['response'],
  created() {
    // 인자를 포함하여 이벤트 발생
    this.$emit('response', '자식으로부터 hello')
  }
}
```

</div>

<span class="options-api">`this.$emit()`</span><span class="composition-api">`emit()`</span>의 첫 번째 인자는 이벤트 이름입니다. 추가 인자들은 이벤트 리스너로 전달됩니다.

부모는 `v-on`을 사용하여 자식이 발생시킨 이벤트를 들을 수 있습니다. 아래 예시에서 핸들러는 자식의 emit 호출에서 전달된 추가 인자를 받아 로컬 상태에 할당합니다:

<div class="sfc">

```vue-html
<ChildComp @response="(msg) => childMsg = msg" />
```

</div>
<div class="html">

```vue-html
<child-comp @response="(msg) => childMsg = msg"></child-comp>
```

</div>

이제 에디터에서 직접 시도해 보세요.
