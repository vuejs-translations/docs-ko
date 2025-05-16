# Watchers {#watchers}

## 기본 예제 {#basic-example}

계산 속성은 선언적으로 파생 값을 계산할 수 있게 해줍니다. 그러나 상태 변경에 반응하여 "부수 효과"를 수행해야 하는 경우가 있습니다. 예를 들어, DOM을 변경하거나 비동기 작업 결과에 따라 다른 상태를 변경하는 경우가 그렇습니다.

<div class="options-api">

Options API를 사용하면 반응형 속성이 변경될 때마다 함수를 트리거하는 [`watch` 옵션](/api/options-state#watch)을 사용할 수 있습니다:

```js
export default {
  data() {
    return {
      question: '',
      answer: '질문에는 보통 물음표가 포함됩니다. ;-)',
      loading: false
    }
  },
  watch: {
    // question이 변경될 때마다 이 함수가 실행됩니다
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.loading = true
      this.answer = '생각 중...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = '오류! API에 도달할 수 없습니다. ' + error
      } finally {
        this.loading = false
      }
    }
  }
}
```

```vue-html
<p>
  예/아니오 질문을 하세요:
  <input v-model="question" :disabled="loading" />
</p>
<p>{{ answer }}</p>
```

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNp9VEtP20AQ/itTX5yoYKviFgUQrTjQQ6GPoy+WvSamztr1rklQFAlUVKUEqSA1JQciUclVW4lDRKnUA/1D2c1/6PiZQBGSJe889pv55rEdZS0ItN2IKDWlzqzQDfiKQUk78EMONnHMyOPQMSiAbXKzUs3OACHhUUgLCeBdRBh3fVoDVV0olCZlLRKiSn7vics/8uxEHH0GOboR46G8OJDnN+LrOYjLGzk6np6eT8b7MP10OR38ECc/Rb8n+rE2A/N803bpdg0c02MkV3eTXzcVWia3GrUiI12HPOjoGsSv/cnVX3FyAWJwLFDdjzGLa8BIsjdMwsp+PP3ysQybYRScKpS0XubnBfA9uxDKagC4Dsy7aS61SXvTqairahVWYPHJnC8Ab7hM2yZ8LS1QpVpYUjq3WDUJb/g2K3mZbI9aMHd1BpuC5lWCZeBhRG6Zsm6gRZXvR5PxAcj4VNM0tXQK9+ZztHzKOPaZ4Q2zZbocHIIVrqgNzgNW0/U9wqivtbijm4GrlhzuRqtklxFI22FYzGq1tC1jLoiiwiqo4jBWIRmVwSH2QA7jMq8uWElroULC0A//r+Mcr2Esvg0fwdrWBs4ayLPx5Go8HVwAdhmlD/Lodz5WoMJjSPFmURyXmp53qwZ3SppO3r29Mih+db1cIBQ4aQaeyQlKAPUg/QHIYU8vKeYjWstMdZcGEYfdxaZvE2/ZUIr5MxTQMxQ9g0G0TiffLuh2M3VdLyMqCwpn2D/H3U5rjrudkjIUy28GrkfCzSABZoZSDpahIHm/9TzVJbOTbxjeaRDr7T36HdZOdIayhb0l4S4xlNLGzRBnNDOvv35B2ngujcgv8tD7AeMrwnwvysgnbk8jamPac35pthvN5J3C5rxh621OKCtIFcOfLZGh4AP37AHqs3SXtKWioUr3H/+H2xc=)

`watch` 옵션은 점으로 구분된 경로를 키로 지원합니다:

```js
export default {
  watch: {
    // 참고: 단순 경로만 지원합니다. 표현식은 지원되지 않습니다.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

Composition API를 사용하면 반응형 상태가 변경될 때마다 콜백을 트리거하는 [`watch` 함수](/api/reactivity-core#watch)를 사용할 수 있습니다:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('질문에는 보통 물음표가 포함됩니다. ;-)')
const loading = ref(false)

// watch는 ref에 직접 작동합니다
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = '생각 중...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = '오류! API에 도달할 수 없습니다. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <p>
    예/아니오 질문을 하세요:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNplkkGPmzAQhf/KKxdA3Rj1mpJUUdVDT22lHrlYxDRuYOzaJjRC/PcdxyGr3b2A7PfmmzcMc3awVlxGlW2z2rdO2wCvwmj3DenBGhcww6nuCZMM7QkLOmcG5FyRN9RQa8gH/BuVD9oQdtFb5Hm5KpL8pNx6/+vu8xj9KPv+CnYFqQnyhTFIdxb4vCkjpaFb32JVnyD9lVoUpKaVVmK3x9wQoLtXgtB0VP9/cOMveYk9Np/K5MM9l7jIflScLv990nTW9EcIwXNFR3DX1YwYk4dxyrNXTlIHdCrGyk8hWL+tqqvyZMQUukpaHYOnujdtilTLHPHXGyrKUiRH8i9obx+5UM4Z98j6Pu23qH/AVzP2R5CJRMl14aRw+PldIMdH3Bh3bnzxY+FcdZW2zPvlQ1CD7WVQfALquPToP/gzL4RHqsg89rJNWq3JjgGXzWCOqt812ao3GaqEqRKHcfO8/gDLkq7r6tEyW54Bf5TTlg==)

### Watch 소스 타입 {#watch-source-types}

`watch`의 첫 번째 인수는 다양한 유형의 반응형 "소스"가 될 수 있습니다: ref(계산된 ref 포함), 반응형 객체, [getter 함수](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description), 또는 여러 소스의 배열이 될 수 있습니다:

```js
const x = ref(0)
const y = ref(0)

// 단일 ref
watch(x, (newX) => {
  console.log(`x는 ${newX}입니다`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`x와 y의 합은: ${sum}입니다`)
  }
)

// 여러 소스의 배열
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x는 ${newX}이고 y는 ${newY}입니다`)
})
```

반응형 객체의 속성을 다음과 같이 감시할 수 없습니다:

```js
const obj = reactive({ count: 0 })

// 이것은 작동하지 않습니다. watch()에 숫자를 전달하고 있기 때문입니다.
watch(obj.count, (count) => {
  console.log(`Count는: ${count}입니다`)
})
```

대신, getter를 사용하십시오:

```js
// 대신, getter를 사용하십시오:
watch(
  () => obj.count,
  (count) => {
    console.log(`Count는: ${count}입니다`)
  }
)
```

</div>

## 깊은 감시자 {#deep-watchers}

<div class="options-api">

`watch`는 기본적으로 얕습니다: 콜백은 감시된 속성에 새로운 값이 할당될 때만 트리거됩니다 - 중첩된 속성 변경에는 트리거되지 않습니다. 모든 중첩된 변경에 대해 콜백이 실행되기를 원한다면, 깊은 감시자를 사용해야 합니다:

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // 참고: 객체 자체가 교체되지 않는 한,
        // 중첩된 변경 시 `newValue`는
        // `oldValue`와 동일합니다.
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

반응형 객체에서 직접 `watch()`를 호출하면 암시적으로 깊은 감시자가 생성됩니다 - 콜백은 모든 중첩된 변경에 대해 트리거됩니다:

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 중첩된 속성 변경 시 실행됩니다
  // 참고: `newValue`는 여기서 `oldValue`와 동일합니다.
  // 두 값 모두 동일한 객체를 가리키기 때문입니다!
})

obj.count++
```

반응형 객체를 반환하는 getter와는 차이가 있습니다 - 후자의 경우, getter가 다른 객체를 반환할 때만 콜백이 실행됩니다:

```js
watch(
  () => state.someObject,
  () => {
    // state.someObject가 교체될 때만 실행됩니다.
  }
)
```

그러나, `deep` 옵션을 명시적으로 사용하여 두 번째 경우를 깊은 감시자로 만들 수 있습니다:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 참고: state.someObject가 교체되지 않는 한,
    // 여기서 `newValue`는 `oldValue`와 동일합니다.
  },
  { deep: true }
)
```

</div>

Vue 3.5+에서는 `deep` 옵션이 숫자로 설정될 수도 있으며, 이는 최대 탐색 깊이(depth)를 의미합니다. 즉, Vue가 객체의 중첩된 속성을 몇 단계까지 탐색할지를 지정할 수 있습니다.

:::warning 주의해서 사용
깊은 감시는 감시된 객체의 모든 중첩된 속성을 순회해야 하므로, 대규모 데이터 구조에서 사용할 경우 비용이 많이 들 수 있습니다. 필요할 때만 사용하고 성능에 미치는 영향을 주의하십시오.
:::

## Eager 감시자 {#eager-watchers}

`watch`는 기본적으로 지연 모드입니다: 감시된 소스가 변경될 때까지 콜백이 호출되지 않습니다. 그러나 경우에 따라 동일한 콜백 로직을 즉시 실행하고 싶을 수 있습니다 - 예를 들어, 초기 데이터를 가져오고, 관련 상태가 변경될 때마다 데이터를 다시 가져오고 싶을 때가 그렇습니다.

<div class="options-api">

객체를 사용하여 감시자의 콜백을 선언하고 `immediate: true` 옵션을 설정하여 감시자의 콜백을 즉시 실행하도록 강제할 수 있습니다:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // 이는 컴포넌트 생성 시 즉시 실행됩니다.
      },
      // 콜백 즉시 실행 강제
      immediate: true
    }
  }
  // ...
}
```

핸들러 함수의 초기 실행은 `created` 훅 직전에 발생합니다. Vue는 이미 `data`, `computed`, `methods` 옵션을 처리했으므로, 첫 번째 호출 시 이러한 속성들을 사용할 수 있습니다.

</div>

<div class="composition-api">

`immediate: true` 옵션을 전달하여 감시자의 콜백을 즉시 실행하도록 강제할 수 있습니다:

```js
watch(
  source,
  (newValue, oldValue) => {
    // 즉시 실행된 후, `source`가 변경될 때 다시 실행됩니다.
  },
  { immediate: true }
)
```

</div>


## Once 감시자 <sup class="vt-badge" data-text="3.4+" /> {#once-watchers}

감시자의 콜백은 감시된 소스가 변경될 때마다 실행됩니다. 콜백이 소스가 변경될 때 한 번만 트리거되기를 원한다면, `once: true` 옵션을 사용하십시오.

<div class="options-api">
  
```js
export default {
  watch: {
    source: {
      handler(newValue, oldValue) {
        // `source`가 변경될 때 한 번만 트리거됩니다.
      },
      once: true
    }
  }
}
```

</div>

<div class="composition-api">

```js
watch(
  source,
  (newValue, oldValue) => {
    // `source`가 변경될 때 한 번만 트리거됩니다.
  },
  { once: true }
)
```

</div>

<div class="composition-api">

## `watchEffect()` {#watcheffect}

감시자 콜백이 소스와 동일한 반응형 상태를 사용하는 경우가 일반적입니다. 예를 들어, `todoId` ref가 변경될 때마다 원격 리소스를 로드하는 감시자를 고려해 보세요:

```js
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
```

특히, 감시자가 `todoId`를 두 번 사용하는 방법에 주목하세요, 한 번은 소스로, 그리고 다시 콜백 내에서 사용됩니다.

이것은 [`watchEffect()`](/api/reactivity-core#watcheffect)를 사용하여 간소화할 수 있습니다. `watchEffect()`는 콜백의 반응형 종속성을 자동으로 추적할 수 있게 해줍니다. 위의 감시자는 다음과 같이 다시 작성할 수 있습니다:

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

여기서 콜백은 즉시 실행되며, `immediate: true`를 지정할 필요가 없습니다. 실행 중에는 `todoId.value`를 종속성으로 자동으로 추적합니다(계산 속성과 유사). `todoId.value`가 변경될 때마다 콜백이 다시 실행됩니다. `watchEffect()`를 사용하면 소스 값으로 `todoId`를 명시적으로 전달할 필요가 없습니다.

`watchEffect()`와 반응형 데이터 가져오기 작업의 실제 예시는 [이 예제](/examples/#fetching-data)를 참고하세요.

이와 같은 예에서, 종속성이 하나만 있는 경우 `watchEffect()`의 이점은 상대적으로 적습니다. 그러나 종속성이 여러 개인 감시자의 경우, `watchEffect()`를 사용하면 종속성 목록을 수동으로 유지하는 부담을 덜 수 있습니다. 또한, 중첩된 데이터 구조에서 여러 속성을 감시해야 할 경우, `watchEffect()`는 콜백에서 사용된 속성만 추적하므로 깊은 감시자보다 더 효율적일 수 있습니다.

:::tip
`watchEffect`는 **동기적** 실행 동안에만 종속성을 추적합니다. 비동기 콜백과 함께 사용할 때는 첫 번째 `await` 틱 전에 접근한 속성만 추적됩니다.
:::

### `watch`와 `watchEffect` 비교 {#watch-vs-watcheffect}

`watch`와 `watchEffect`는 모두 반응형으로 부수 효과를 수행할 수 있게 해줍니다. 주요 차이점은 반응형 종속성을 추적하는 방식입니다:

- `watch`는 명시적으로 감시된 소스만 추적합니다. 콜백 내부에서 접근한 것은 추적하지 않습니다. 또한, 소스가 실제로 변경되었을 때만 콜백이 실행됩니다. `watch`는 종속성 추적을 부수 효과와 분리하여 콜백이 실행될 시기를 더 정확하게 제어할 수 있습니다.

- `watchEffect`는 종속성 추적과 부수 효과를 하나의 단계로 결합합니다. 동기적 실행 동안 접근한 모든 반응형 속성을 자동으로 추적합니다. 이는 더 편리하며 일반적으로 더 간결한 코드를 작성할 수 있게 해주지만, 반응형 종속성이 덜 명확합니다.

</div>


## 부작용 정리 {#side-effect-cleanup}

때때로 watcher에서 비동기 요청과 같은 부작용(side effects)을 수행할 수 있습니다:

<div class="composition-api">

```js
watch(id, (newId) => {
  fetch(`/api/${newId}`).then(() => {
    // callback logic
  })
})
```

</div>
<div class="options-api">

```js
export default {
  watch: {
    id(newId) {
      fetch(`/api/${newId}`).then(() => {
        // callback logic
      })
    }
  }
}
```

</div>

하지만 요청이 완료되기 전에 `id`가 변경되면 어떻게 될까요? 이전 요청이 완료되었을 때, 이미 오래된(stale) `id` 값을 가진 상태에서 콜백이 실행될 것입니다. 이상적으로는 `id`가 새로운 값으로 변경될 때, 이전의 유효하지 않은 요청을 취소할 수 있어야 합니다.

이를 위해, [`onWatcherCleanup()`](/api/reactivity-core#onwatchercleanup) <sup class="vt-badge" data-text="3.5+" /> API를 사용하여, watcher가 무효화(invalidate)되고 다시 실행되기 전에 호출될 정리(cleanup) 함수를 등록할 수 있습니다:

<div class="composition-api">

```js {10-13}
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // callback logic
  })

  onWatcherCleanup(() => {
    // abort stale request
    controller.abort()
  })
})
```

</div>
<div class="options-api">

```js {12-15}
import { onWatcherCleanup } from 'vue'

export default {
  watch: {
    id(newId) {
      const controller = new AbortController()

      fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
        // callback logic
      })

      onWatcherCleanup(() => {
        // abort stale request
        controller.abort()
      })
    }
  }
}
```

</div>

참고로, `onWatcherCleanup`은 Vue 3.5+에서만 지원되며, `watchEffect`의 이펙트 함수 또는 `watch`의 콜백 함수가 동기적으로 실행되는 동안에만 호출할 수 있습니다.

즉, 비동기 함수 내에서 `await` 문 이후에 호출할 수 없습니다.

대안으로, watch 콜백 함수의 세 번째 인자로 `onCleanup` 함수가 전달되며, 
<span class="composition-api">watchEffect의 경우, 이펙트 함수의 첫 번째 인자로 전달됩니다.</span>

<div class="composition-api">

```js
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // cleanup logic
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // cleanup logic
  })
})
```

</div>
<div class="options-api">

```js
export default {
  watch: {
    id(newId, oldId, onCleanup) {
      // ...
      onCleanup(() => {
        // cleanup logic
      })
    }
  }
}
```

</div>

이 방법은 버전 3.5 이전에서도 동작합니다. 추가로, 함수 인자로 전달되는 `onCleanup`은 watcher 인스턴스에 바인딩되므로, `onWatcherCleanup`과 달리 **동기 실행 제한**(synchronous constraint)을 받지 않습니다.

## 콜백 플러시 타이밍 {#callback-flush-timing}

반응형 상태를 변경하면 Vue 컴포넌트 업데이트와 사용자가 생성한 감시자 콜백을 모두 트리거할 수 있습니다.

컴포넌트 업데이트와 유사하게, 사용자가 생성한 감시자 콜백은 중복 호출을 피하기 위해 배치됩니다. 예를 들어, 감시되는 배열에 항목을 동기적으로 1,000개 푸시할 때 감시자가 1,000번 실행되는 것은 원하지 않을 것입니다.

기본적으로, 감시자의 콜백은 부모 컴포넌트 업데이트 후(있는 경우), 소유자 컴포넌트의 DOM 업데이트 전 호출됩니다. 이는 감시 자 콜백 내부에서 소유자 컴포넌트의 DOM에 접근하려고 할 때, DOM이 업데이트 전 상태일 것임을 의미합니다.

### 후처리 감시자 {#post-watchers}

감시자 콜백에서 Vue가 DOM을 업데이트한 후 소유자 컴포넌트의 DOM에 접근하려면, `flush: 'post'` 옵션을 지정해야 합니다:

<div class="options-api">

```js{6}
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```

</div>

<div class="composition-api">

```js{2,6}
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

후처리 `watchEffect()`에는 편리한 별칭인 `watchPostEffect()`가 있습니다:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* Vue 업데이트 후 실행됨 */
})
```

</div>

### 동기 감시자 {#sync-watchers}

Vue 관리 업데이트 이전에 동기적으로 실행되는 감시자를 만들 수도 있습니다:

<div class="options-api">

```js{6}
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'sync'
    }
  }
}
```

</div>

<div class="composition-api">

```js{2,6}
watch(source, callback, {
  flush: 'sync'
})

watchEffect(callback, {
  flush: 'sync'
})
```

동기 `watchEffect()`에는 편리한 별칭인 `watchSyncEffect()`가 있습니다:

```js
import { watchSyncEffect } from 'vue'

watchSyncEffect(() => {
  /* 반응형 데이터 변경 시 동기적으로 실행됨 */
})
```

</div>

:::warning 주의해서 사용
동기 감시자는 배치가 없으며 반응형 변이가 감지될 때마다 트리거됩니다. 간단한 불리언 값을 감시할 때는 사용해도 괜찮지만, 배열과 같이 동기적으로 여러 번 변경될 수 있는 데이터 소스에 사용하지 마십시오.
:::

<div class="options-api">

## `this.$watch()` {#this-watch}

[`$watch()` 인스턴스 메서드](/api/component-instance#watch)를 사용하여 명령형으로 감시자를 만들 수도 있습니다:

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

이것은 감시자를 조건부로 설정해야 하거나 사용자 상호작용에 응답하여 무언가를 감시해야 할 때 유용합니다. 또한 감시를 조기에 중지할 수도 있습니다.

</div>

## 감시자 중지 {#stopping-a-watcher}

<div class="options-api">

`watch` 옵션이나 `$watch()` 인스턴스 메서드를 사용하여 선언된 감시자는 소유자 컴포넌트가 마운트 해제될 때 자동으로 중지되므로, 대부분의 경우 감시자를 직접 중지할 필요가 없습니다.

소유자 컴포넌트가 마운트 해제되기 전에 감시자를 중지해야 하는 드문 경우, `$watch()` API는 이를 위한 함수를 반환합니다:

```js
const unwatch = this.$watch('foo', callback)

// ...감시자가 더 이상 필요하지 않을 때:
unwatch()
```

</div>

<div class="composition-api">

`setup()`이나 `<script setup>` 내에서 동기적으로 선언된 감시자는 소유자 컴포넌트 인스턴스에 바인딩되며, 소유자 컴포넌트가 마운트 해제될 때 자동으로 중지됩니다. 대부분의 경우 감시자를 직접 중지할 필요가 없습니다.

여기서 중요한 점은 감시자가 **동기적으로** 생성되어야 한다는 것입니다: 감시자가 비동기 콜백 내에서 생성되면 소유자 컴포넌트에 바인딩되지 않으며, 메모리 누수를 피하기 위해 수동으로 중지해야 합니다. 다음은 예시입니다:

```vue
<script setup>
import { watchEffect } from 'vue'

// 이 감시자는 자동으로 중지됩니다.
watchEffect(() => {})

// ...이 감시자는 중지되지 않습니다!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

감시자를 수동으로 중지하려면 반환된 핸들 함수를 사용하십시오. 이는 `watch`와 `watchEffect` 모두에 대해 작동합니다:

```js
const unwatch = watchEffect(() => {})

// ...나중에, 더 이상 필요하지 않을 때
unwatch()
```

비동기적으로 감시자를 생성해야 하는 경우는 매우 드물며, 가능하면 동기적 생성을 선호해야 합니다. 비동기 데이터를 기다려야 하는 경우, 감시 로직을 조건부로 만들 수 있습니다:

```js
// 비동기적으로 로드될 데이터
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 데이터가 로드될 때 무언가를 수행합니다.
  }
})
```

</div>
