# 컴포지션 API: setup() {#composition-api-setup}

## 기본 사용법 {#basic-usage}

`setup()` 훅(hook)은 다음과 같은 경우 컴포지션 API를 컴포넌트(component)에서 사용할 수 있는 진입점 역할을 합니다:

1. 빌드 단계 없이 컴포지션 API를 사용할 때
2. 옵션 API 컴포넌트에서 컴포지션 API 기반 코드와 통합할 때

:::info 참고
싱글 파일 컴포넌트에서 컴포지션 API를 사용하는 경우, 더 간결하고 사용하기 쉬운 문법을 위해 [`<script setup>`](/api/sfc-script-setup) 사용을 강력히 권장합니다.
:::

[반응성 API](./reactivity-core)를 사용하여 반응형 상태를 선언하고, `setup()`에서 객체를 반환하여 템플릿(template)에 노출할 수 있습니다. 반환된 객체의 속성들은 (다른 옵션이 사용되는 경우) 컴포넌트 인스턴스(instance)에서도 사용할 수 있습니다:

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // 템플릿과 다른 옵션 API 훅에 노출
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

`setup`에서 반환된 [ref](/api/reactivity-core#ref)는 템플릿에서 접근할 때 [자동으로 얕게 언래핑](/guide/essentials/reactivity-fundamentals#deep-reactivity)되므로 `.value`를 사용할 필요가 없습니다. `this`에서 접근할 때도 동일하게 언래핑됩니다.

`setup()` 자체는 컴포넌트 인스턴스에 접근할 수 없습니다. `setup()` 내부에서 `this`는 `undefined` 값을 가집니다. 옵션 API에서는 컴포지션 API로 노출된 값에 접근할 수 있지만, 그 반대는 불가능합니다.

`setup()`은 _동기적으로_ 객체를 반환해야 합니다. `async setup()`은 컴포넌트가 [Suspense](../guide/built-ins/suspense) 컴포넌트의 하위 컴포넌트인 경우에만 사용할 수 있습니다.

## Props 접근하기 {#accessing-props}

`setup` 함수의 첫 번째 인자는 `props`입니다. 일반 컴포넌트에서 기대하는 것처럼, `setup` 함수 내부의 `props`는 반응형이며 새로운 props가 전달될 때 업데이트됩니다.

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

`props` 객체를 구조 분해 할당하면, 구조 분해된 변수는 반응성(reactivity)을 잃게 됩니다. 따라서 항상 `props.xxx` 형태로 props에 접근하는 것이 권장됩니다.

정말로 props를 구조 분해해야 하거나, 반응성을 유지한 채로 외부 함수에 prop을 전달해야 하는 경우, [toRefs()](./reactivity-utilities#torefs) 및 [toRef()](/api/reactivity-utilities#toref) 유틸리티 API를 사용할 수 있습니다:

```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // `props`를 ref 객체로 변환한 후 구조 분해
    const { title } = toRefs(props)
    // `title`은 `props.title`을 추적하는 ref입니다
    console.log(title.value)

    // 또는, `props`의 단일 속성을 ref로 변환
    const title = toRef(props, 'title')
  }
}
```

## Setup Context {#setup-context}

`setup` 함수에 전달되는 두 번째 인자는 **Setup Context** 객체입니다. 컨텍스트 객체는 `setup` 내부에서 유용할 수 있는 다른 값들을 노출합니다:

```js
export default {
  setup(props, context) {
    // 속성 (비반응형 객체, $attrs와 동일)
    console.log(context.attrs)

    // 슬롯 (비반응형 객체, $slots와 동일)
    console.log(context.slots)

    // 이벤트 발생 (함수, $emit과 동일)
    console.log(context.emit)

    // 공개 속성 노출 (함수)
    console.log(context.expose)
  }
}
```

컨텍스트 객체는 반응형이 아니며 안전하게 구조 분해할 수 있습니다:

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

`attrs`와 `slots`는 상태를 가지는 객체로, 컴포넌트 자체가 업데이트될 때마다 항상 업데이트됩니다. 따라서 이들을 구조 분해하지 말고 항상 `attrs.x` 또는 `slots.x`와 같이 속성에 접근해야 합니다. 또한, `props`와 달리 `attrs`와 `slots`의 속성은 **반응형이 아닙니다**. `attrs`나 `slots`의 변경에 따라 부수 효과를 적용하려면 `onBeforeUpdate` 라이프사이클(lifecycle) 훅 내부에서 처리해야 합니다.

### 공개 속성 노출하기 {#exposing-public-properties}

`expose`는 부모 컴포넌트가 [템플릿 ref](/guide/essentials/template-refs#ref-on-component)를 통해 컴포넌트 인스턴스에 접근할 때 노출되는 속성을 명시적으로 제한할 수 있는 함수입니다:

```js{5,10}
export default {
  setup(props, { expose }) {
    // 인스턴스를 "닫힌" 상태로 만듭니다 -
    // 즉, 부모에게 아무것도 노출하지 않음
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // 로컬 상태를 선택적으로 노출
    expose({ count: publicCount })
  }
}
```

## 렌더 함수와 함께 사용하기 {#usage-with-render-functions}

`setup`은 [렌더 함수](/guide/extras/render-function)를 반환할 수도 있으며, 이 렌더 함수는 동일한 스코프에서 선언된 반응형 상태를 직접 사용할 수 있습니다:

```js{6}
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

렌더 함수를 반환하면 다른 어떤 것도 반환할 수 없습니다. 내부적으로는 문제가 없지만, 이 컴포넌트의 메서드를 템플릿 ref를 통해 부모 컴포넌트에 노출하고 싶을 때 문제가 될 수 있습니다.

이 문제는 [`expose()`](#exposing-public-properties)를 호출하여 해결할 수 있습니다:

```js{8-10}
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

이제 `increment` 메서드는 템플릿 ref를 통해 부모 컴포넌트에서 사용할 수 있습니다.
