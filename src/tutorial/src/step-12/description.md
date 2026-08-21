# Props {#props}

자식 컴포넌트(component)는 **props**를 통해 부모로부터 입력을 받을 수 있습니다. 먼저, 자식 컴포넌트는 자신이 받을 props를 선언해야 합니다:

<div class="composition-api">
<div class="sfc">

```vue [ChildComp.vue]
<script setup>
const props = defineProps({
  msg: String
})
</script>
```

`defineProps()`는 컴파일 타임 매크로이므로 import할 필요가 없습니다. 선언이 완료되면 `msg` prop을 자식 컴포넌트의 템플릿(template)에서 사용할 수 있습니다. 또한 `defineProps()`가 반환하는 객체를 통해 JavaScript에서도 접근할 수 있습니다.

</div>

<div class="html">

```js
// 자식 컴포넌트에서
export default {
  props: {
    msg: String
  },
  setup(props) {
    // props.msg에 접근
  }
}
```

선언이 완료되면, `msg` prop은 `this`에 노출되며 자식 컴포넌트의 템플릿에서 사용할 수 있습니다. 받은 props는 첫 번째 인자로 `setup()`에 전달됩니다.

</div>

</div>

<div class="options-api">

```js
// 자식 컴포넌트에서
export default {
  props: {
    msg: String
  }
}
```

선언이 완료되면, `msg` prop은 `this`에 노출되며 자식 컴포넌트의 템플릿에서 사용할 수 있습니다.

</div>

부모는 props를 속성처럼 자식에게 전달할 수 있습니다. 동적 값을 전달하려면 `v-bind` 문법을 사용할 수도 있습니다:

<div class="sfc">

```vue-html
<ChildComp :msg="greeting" />
```

</div>
<div class="html">

```vue-html
<child-comp :msg="greeting"></child-comp>
```

</div>

이제 에디터에서 직접 시도해 보세요.
