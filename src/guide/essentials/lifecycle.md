# 라이프사이클 훅 {#lifecycle-hooks}

각 Vue 컴포넌트 인스턴스는 생성될 때 일련의 초기화 단계를 거칩니다. 예를 들어, 데이터 관찰을 설정하고, 템플릿(template)을 컴파일하며, 인스턴스(instance)를 DOM에 마운트(mount)하고, 데이터가 변경될 때 DOM을 업데이트해야 합니다. 이 과정에서 라이프사이클(lifecycle) 훅(hook)이라고 불리는 함수들이 실행되며, 사용자는 특정 단계에서 자신만의 코드를 추가할 수 있습니다.

## 라이프사이클 훅 등록하기 {#registering-lifecycle-hooks}

가령 <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span> 훅을 사용하면, 컴포넌트(component)가 초기 렌더링(rendering)을 마치고 DOM 노드를 생성한 후에 코드를 실행할 수 있습니다:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`컴포넌트가 이제 마운트되었습니다.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`컴포넌트가 이제 마운트되었습니다.`)
  }
}
```

</div>

인스턴스의 라이프사이클에서 각기 다른 단계에 호출되는 훅들도 있으며, 가장 일반적으로 사용되는 것은 <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle#onmounted), [`onUpdated`](/api/composition-api-lifecycle#onupdated), 그리고 [`onUnmounted`](/api/composition-api-lifecycle#onunmounted)</span><span class="options-api">[`mounted`](/api/options-lifecycle#mounted), [`updated`](/api/options-lifecycle#updated), 그리고 [`unmounted`](/api/options-lifecycle#unmounted)</span>입니다.

<div class="options-api">

모든 라이프사이클 훅은 해당 훅을 호출하는 현재 활성 인스턴스를 가리키는 `this` 컨텍스트로 호출됩니다. 즉, 라이프사이클 훅을 화살표 함수로 선언하면 `this`를 통해 컴포넌트 인스턴스에 접근할 수 없으므로, 화살표 함수 사용은 피해야 합니다.

</div>

<div class="composition-api">

`onMounted`를 호출할 때, Vue는 등록된 콜백(callback) 함수를 현재 활성 컴포넌트 인스턴스와 자동으로 연결합니다. 따라서 이러한 훅들은 컴포넌트 setup 중에 **동기적으로** 등록되어야 합니다. 예를 들어, 이렇게 하면 안 됩니다:

```js
setTimeout(() => {
  onMounted(() => {
    // 이 코드는 동작하지 않습니다.
  })
}, 100)
```

그렇다고 훅 호출 코드가 반드시 `setup()` 또는 `<script setup>` 내부에 문법적으로 위치해야 한다는 의미는 아닙니다. `onMounted()`는 호출 스택이 동기적이고 `setup()` 내부에서 시작된다면 외부 함수에서 호출할 수도 있습니다.

</div>

## 라이프사이클 다이어그램 {#lifecycle-diagram}

아래는 인스턴스 라이프사이클에 대한 다이어그램입니다. 지금 당장 모든 내용을 완전히 이해할 필요는 없지만, 더 많이 배우고 개발할수록 유용한 참고 자료가 될 것입니다.

![Vue 컴포넌트가 생성부터 소멸까지 거치는 전체 라이프사이클을 보여주는 다이어그램. 모든 주요 라이프사이클 훅과 함께 템플릿 컴파일, 마운트 같은 내부 과정도 포함되어 있습니다.](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

모든 라이프사이클 훅과 각각의 사용 사례에 대한 자세한 내용은 <span class="composition-api">[라이프사이클 훅 API 레퍼런스](/api/composition-api-lifecycle)</span><span class="options-api">[라이프사이클 훅 API 레퍼런스](/api/options-lifecycle)</span>를 참고하세요.
