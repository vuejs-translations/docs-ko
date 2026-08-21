# 계산된 속성(Computed Property) {#computed-property}

이전 단계의 할 일 목록을 계속 확장해 봅시다. 여기서는 이미 각 할 일에 토글 기능을 추가했습니다. 이 기능은 각 할 일 객체에 `done` 속성을 추가하고, 이를 체크박스에 `v-model`로 바인딩(binding)하는 방식으로 구현되어 있습니다:

```vue-html{2}
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

다음으로 추가할 개선점은 이미 완료된 할 일을 숨길 수 있는 기능입니다. 데모에는 `hideCompleted` 상태를 토글하는 버튼이 미리 준비되어 있습니다. 하지만 그 상태에 따라 다른 목록 항목을 어떻게 렌더링(rendering)할 수 있을까요?

<div class="options-api">

<a target="_blank" href="/guide/essentials/computed.html">계산된 속성</a>을 소개합니다. `computed` 옵션을 사용하여 다른 속성으로부터 반응적으로 계산되는 속성을 선언할 수 있습니다:

<div class="sfc">

```js
export default {
  // ...
  computed: {
    filteredTodos() {
      // `this.hideCompleted`에 따라 필터링된 할 일 목록을 반환합니다.
    }
  }
}
```

</div>
<div class="html">

```js
createApp({
  // ...
  computed: {
    filteredTodos() {
      // `this.hideCompleted`에 따라 필터링된 할 일 목록을 반환합니다.
    }
  }
})
```

</div>

</div>
<div class="composition-api">

<a target="_blank" href="/guide/essentials/computed.html">`computed()`</a>를 소개합니다. 다른 반응형 데이터 소스를 기반으로 `.value`를 계산하는 계산 ref를 만들 수 있습니다:

<div class="sfc">

```js{8-11}
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // `todos.value`와 `hideCompleted.value`에 따라
  // 필터링된 할 일 목록을 반환합니다.
})
```

</div>
<div class="html">

```js{10-13}
import { createApp, ref, computed } from 'vue'

createApp({
  setup() {
    const hideCompleted = ref(false)
    const todos = ref([
      /* ... */
    ])

    const filteredTodos = computed(() => {
      // `todos.value`와 `hideCompleted.value`에 따라
      // 필터링된 할 일 목록을 반환합니다.
    })

    return {
      // ...
    }
  }
})
```

</div>

</div>

```diff
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

계산된 속성은 계산에 사용된 다른 반응형 상태를 의존성으로 추적합니다. 결과를 캐시하고, 의존성이 변경될 때 자동으로 업데이트합니다.

이제 `filteredTodos` 계산된 속성을 추가하고, 그 계산 로직을 구현해 보세요! 올바르게 구현했다면, 완료된 항목 숨기기 상태에서 할 일을 체크하면 즉시 해당 항목이 숨겨져야 합니다.
