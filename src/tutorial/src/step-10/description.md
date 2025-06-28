# Watchers {#watchers}

때때로 우리는 "부수 효과(side effects)"를 반응적으로 수행해야 할 필요가 있습니다. 예를 들어, 숫자가 변경될 때마다 콘솔에 로그를 남기는 경우가 있습니다. 이러한 작업은 watcher를 통해 달성할 수 있습니다:

<div class="composition-api">

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newCount) => {
  // 네, console.log()는 부수 효과입니다.
  console.log(`new count is: ${newCount}`)
})
```

`watch()`는 ref를 직접 감시할 수 있으며, `count`의 값이 변경될 때마다 콜백이 실행됩니다. `watch()`는 다른 유형의 데이터 소스도 감시할 수 있습니다. 자세한 내용은 <a target="_blank" href="/guide/essentials/watchers.html">가이드 - Watchers</a>에서 확인할 수 있습니다.

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  watch: {
    count(newCount) {
      // 네, console.log()는 부수 효과입니다.
      console.log(`new count is: ${newCount}`)
    }
  }
}
```

여기서는 `watch` 옵션을 사용하여 `count` 속성의 변화를 감시하고 있습니다. watch 콜백은 `count`가 변경될 때 호출되며, 새로운 값이 인자로 전달됩니다. 자세한 내용은 <a target="_blank" href="/guide/essentials/watchers.html">가이드 - Watchers</a>에서 확인할 수 있습니다.

</div>

콘솔에 로그를 남기는 것보다 더 실용적인 예시는 ID가 변경될 때마다 새로운 데이터를 가져오는 것입니다. 아래 코드는 컴포넌트가 마운트될 때 mock API에서 todos 데이터를 가져오고 있습니다. 또한, 가져올 todo ID를 증가시키는 버튼도 있습니다. 버튼을 클릭할 때마다 새로운 todo를 가져오도록 watcher를 구현해 보세요.
