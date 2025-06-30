# 라이프사이클과 템플릿 ref {#lifecycle-and-template-refs}

지금까지 Vue는 반응성과 선언적 렌더링 덕분에 모든 DOM 업데이트를 자동으로 처리해주었습니다. 하지만, 결국에는 DOM을 수동으로 다루어야 하는 경우가 생기기 마련입니다.

**템플릿 ref** - 즉, 템플릿 내의 요소에 대한 참조 - 를 요청하려면 <a target="_blank" href="/api/built-in-special-attributes.html#ref">특수 `ref` 속성</a>을 사용할 수 있습니다:

```vue-html
<p ref="pElementRef">hello</p>
```

<div class="composition-api">

ref에 접근하려면, 동일한 이름의 ref를 선언<span class="html">하고 노출</span>해야 합니다:

<div class="sfc">

```js
const pElementRef = ref(null)
```

</div>
<div class="html">

```js
setup() {
  const pElementRef = ref(null)

  return {
    pElementRef
  }
}
```

</div>

ref가 `null` 값으로 초기화된 것에 주목하세요. 이는 <span class="sfc">`<script setup>`</span><span class="html">`setup()`</span>이 실행될 때 해당 요소가 아직 존재하지 않기 때문입니다. 템플릿 ref는 컴포넌트가 **마운트**된 후에만 접근할 수 있습니다.

마운트 후에 코드를 실행하려면 `onMounted()` 함수를 사용할 수 있습니다:

<div class="sfc">

```js
import { onMounted } from 'vue'

onMounted(() => {
  // 컴포넌트가 이제 마운트되었습니다.
})
```

</div>
<div class="html">

```js
import { onMounted } from 'vue'

createApp({
  setup() {
    onMounted(() => {
      // 컴포넌트가 이제 마운트되었습니다.
    })
  }
})
```

</div>
</div>

<div class="options-api">

해당 요소는 `this.$refs`의 `this.$refs.pElementRef`로 노출됩니다. 하지만, 컴포넌트가 **마운트**된 후에만 접근할 수 있습니다.

마운트 후에 코드를 실행하려면 `mounted` 옵션을 사용할 수 있습니다:

<div class="sfc">

```js
export default {
  mounted() {
    // 컴포넌트가 이제 마운트되었습니다.
  }
}
```

</div>
<div class="html">

```js
createApp({
  mounted() {
    // 컴포넌트가 이제 마운트되었습니다.
  }
})
```

</div>
</div>

이것을 **라이프사이클 훅**이라고 부릅니다 - 컴포넌트의 라이프사이클 중 특정 시점에 호출될 콜백을 등록할 수 있게 해줍니다. <span class="options-api">`created`와 `updated`</span><span class="composition-api">`onUpdated`와 `onUnmounted`</span>와 같은 다른 훅들도 있습니다. 자세한 내용은 <a target="_blank" href="/guide/essentials/lifecycle.html#lifecycle-diagram">라이프사이클 다이어그램</a>을 참고하세요.

이제, <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> 훅을 추가하고, <span class="options-api">`this.$refs.pElementRef`</span><span class="composition-api">`pElementRef.value`</span>를 통해 `<p>`에 접근하여, 해당 요소의 `textContent`를 변경하는 등 직접적인 DOM 조작을 해보세요.
