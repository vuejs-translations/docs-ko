# 반응성 변환 {#reactivity-transform}

:::danger 실험적 기능 제거됨
반응성 변환(reactivity transform)은 실험적 기능이었으며, 최신 3.4 릴리스에서 제거되었습니다. [관련 논의와 이유를 여기서 확인하세요](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028).

그래도 계속 사용하고 싶다면, 이제 [Vue Macros](https://vue-macros.sxzz.moe/features/reactivity-transform.html) 플러그인(plugin)을 통해 사용할 수 있습니다.
:::

:::tip Composition-API 전용
반응성 변환은 Composition API 전용 기능이며 빌드 단계가 필요합니다.
:::

## ref와 반응형 변수 {#refs-vs-reactive-variables}

Composition API가 도입된 이후로, 주요하게 해결되지 않은 질문 중 하나는 ref와 반응형 객체의 사용입니다. 반응형 객체를 구조 분해 할당할 때 반응성을 잃기 쉽고, ref를 사용할 때는 `.value`를 여기저기서 써야 해서 번거롭습니다. 또한, 타입 시스템을 사용하지 않으면 `.value`를 빼먹기 쉽습니다.

[Vue 반응성 변환](https://github.com/vuejs/core/tree/main/packages/reactivity-transform)은 컴파일 타임 변환으로, 다음과 같이 코드를 작성할 수 있게 해줍니다:

```vue
<script setup>
let count = $ref(0)

console.log(count)

function increment() {
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

여기서 `$ref()` 메서드는 **컴파일 타임 매크로**입니다. 런타임에 실제로 호출되는 메서드가 아닙니다. 대신 Vue 컴파일러가 이를 힌트로 사용하여 결과로 나오는 `count` 변수를 **반응형 변수**로 처리합니다.

반응형 변수는 일반 변수처럼 접근하고 재할당할 수 있지만, 이러한 연산들은 `.value`가 붙은 ref로 컴파일됩니다. 예를 들어, 위 컴포넌트(component)의 `<script>` 부분은 다음과 같이 컴파일됩니다:

```js{5,8}
import { ref } from 'vue'

let count = ref(0)

console.log(count.value)

function increment() {
  count.value++
}
```

ref를 반환하는 모든 반응성 API는 `$`로 시작하는 매크로 버전이 있습니다. 이 API에는 다음이 포함됩니다:

- [`ref`](/api/reactivity-core#ref) -> `$ref`
- [`computed`](/api/reactivity-core#computed) -> `$computed`
- [`shallowRef`](/api/reactivity-advanced#shallowref) -> `$shallowRef`
- [`customRef`](/api/reactivity-advanced#customref) -> `$customRef`
- [`toRef`](/api/reactivity-utilities#toref) -> `$toRef`

이 매크로들은 Reactivity Transform이 활성화되어 있으면 전역적으로 사용할 수 있으며, 더 명확하게 하고 싶다면 `vue/macros`에서 임포트할 수도 있습니다:

```js
import { $ref } from 'vue/macros'

let count = $ref(0)
```

## `$()`를 이용한 구조 분해 할당 {#destructuring-with}

컴포지션 함수가 ref 객체를 반환하고, 구조 분해 할당으로 이 ref들을 가져오는 경우가 흔합니다. 이를 위해 반응성 변환은 **`$()`** 매크로를 제공합니다:

```js
import { useMouse } from '@vueuse/core'

const { x, y } = $(useMouse())

console.log(x, y)
```

컴파일된 결과:

```js
import { toRef } from 'vue'
import { useMouse } from '@vueuse/core'

const __temp = useMouse(),
  x = toRef(__temp, 'x'),
  y = toRef(__temp, 'y')

console.log(x.value, y.value)
```

`x`가 이미 ref라면, `toRef(__temp, 'x')`는 그대로 반환하며 추가 ref가 생성되지 않습니다. 구조 분해된 값이 ref가 아니면(예: 함수), 그래도 동작합니다. 값이 ref로 감싸져 나머지 코드가 예상대로 동작하게 됩니다.

`$()` 구조 분해는 반응형 객체 **및** ref를 포함한 일반 객체 모두에서 동작합니다.

## 기존 ref를 반응형 변수로 변환하기 - `$()` {#convert-existing-refs-to-reactive-variables-with}

경우에 따라 ref를 반환하는 래핑 함수가 있을 수 있습니다. 하지만 Vue 컴파일러는 함수가 ref를 반환할지 미리 알 수 없습니다. 이런 경우, `$()` 매크로를 사용해 기존 ref를 반응형 변수로 변환할 수 있습니다:

```js
function myCreateRef() {
  return ref(0)
}

let count = $(myCreateRef())
```

## 반응형 props 구조 분해 {#reactive-props-destructure}

현재 `<script setup>`에서 `defineProps()`를 사용할 때 두 가지 불편함이 있습니다:

1. `.value`와 마찬가지로, 항상 props를 `props.x`로 접근해야 반응성을 유지할 수 있습니다. 즉, `defineProps`를 구조 분해 할당하면 결과 변수는 반응형이 아니어서 업데이트되지 않습니다.

2. [타입 전용 props 선언](/api/sfc-script-setup#type-only-props-emit-declarations)을 사용할 때, props의 기본값을 선언하는 쉬운 방법이 없습니다. 이를 위해 `withDefaults()` API를 도입했지만, 여전히 사용이 번거롭습니다.

이 문제들은 `defineProps`를 구조 분해 할당과 함께 사용할 때 컴파일 타임 변환을 적용함으로써 해결할 수 있습니다. 이는 앞서 본 `$()`와 유사합니다:

```html
<script setup lang="ts">
  interface Props {
    msg: string
    count?: number
    foo?: string
  }

  const {
    msg,
    // 기본값도 잘 동작합니다
    count = 1,
    // 지역 별칭도 잘 동작합니다
    // 여기서는 `props.foo`를 `bar`로 별칭 처리합니다
    foo: bar
  } = defineProps<Props>()

  watchEffect(() => {
    // props가 변경될 때마다 로그가 출력됩니다
    console.log(msg, count, bar)
  })
</script>
```

위 코드는 다음과 같은 런타임 선언으로 컴파일됩니다:

```js
export default {
  props: {
    msg: { type: String, required: true },
    count: { type: Number, default: 1 },
    foo: String
  },
  setup(props) {
    watchEffect(() => {
      console.log(props.msg, props.count, props.foo)
    })
  }
}
```

## 함수 경계를 넘는 반응성 유지 {#retaining-reactivity-across-function-boundaries}

반응형 변수는 `.value`를 여기저기서 쓰지 않아도 되게 해주지만, 반응형 변수를 함수 경계를 넘어 전달할 때 "반응성 손실" 문제가 발생할 수 있습니다. 이는 두 가지 경우에 발생할 수 있습니다:

### 인자로 함수에 전달할 때 {#passing-into-function-as-argument}

ref를 인자로 받는 함수가 있다고 가정해봅시다. 예:

```ts
function trackChange(x: Ref<number>) {
  watch(x, (x) => {
    console.log('x changed!')
  })
}

let count = $ref(0)
trackChange(count) // 동작하지 않음!
```

위 코드는 다음과 같이 컴파일됩니다:

```ts
let count = ref(0)
trackChange(count.value)
```

여기서 `count.value`가 숫자로 전달되지만, `trackChange`는 실제 ref를 기대합니다. 이럴 때는 전달 전에 `$$()`로 감싸주면 됩니다:

```diff
let count = $ref(0)
- trackChange(count)
+ trackChange($$(count))
```

위 코드는 다음과 같이 컴파일됩니다:

```js
import { ref } from 'vue'

let count = ref(0)
trackChange(count)
```

보시다시피, `$$()`는 **이스케이프 힌트** 역할을 하는 매크로입니다. `$$()` 안의 반응형 변수는 `.value`가 붙지 않습니다.

### 함수 스코프 내에서 반환할 때 {#returning-inside-function-scope}

반응형 변수를 반환식에 직접 사용하면 반응성이 손실될 수 있습니다:

```ts
function useMouse() {
  let x = $ref(0)
  let y = $ref(0)

  // mousemove 리스너...

  // 동작하지 않음!
  return {
    x,
    y
  }
}
```

위 반환문은 다음과 같이 컴파일됩니다:

```ts
return {
  x: x.value,
  y: y.value
}
```

반응성을 유지하려면, 반환 시점의 값이 아니라 실제 ref를 반환해야 합니다.

이럴 때도 `$$()`를 사용할 수 있습니다. 이 경우, 반환 객체에 직접 `$$()`를 사용하면, 내부의 반응형 변수 참조가 ref로 유지됩니다:

```ts
function useMouse() {
  let x = $ref(0)
  let y = $ref(0)

  // mousemove 리스너...

  // 수정됨
  return $$({
    x,
    y
  })
}
```

### 구조 분해된 props에 `$$()` 사용하기 {#using-on-destructured-props}

구조 분해된 props도 반응형 변수이므로 `$$()`가 동작합니다. 컴파일러는 효율성을 위해 `toRef`로 변환합니다:

```ts
const { count } = defineProps<{ count: number }>()

passAsRef($$(count))
```

컴파일 결과:

```js
setup(props) {
  const __props_count = toRef(props, 'count')
  passAsRef(__props_count)
}
```

## TypeScript 통합 <sup class="vt-badge ts" /> {#typescript-integration}

Vue는 이 매크로들에 대한 타입 정의(전역적으로 사용 가능)를 제공합니다. 모든 타입이 예상대로 동작합니다. 표준 TypeScript 의미와의 비호환성은 없으므로, 기존 모든 툴링과 함께 문법이 동작합니다.

즉, 이 매크로들은 Vue SFC 내부뿐 아니라 유효한 JS/TS가 허용되는 모든 파일에서 사용할 수 있습니다.

매크로가 전역적으로 제공되므로, 타입을 명시적으로 참조해야 합니다(예: `env.d.ts` 파일에서):

```ts
/// <reference types="vue/macros-global" />
```

매크로를 `vue/macros`에서 명시적으로 임포트하면, 글로벌 선언 없이 타입이 동작합니다.

## 명시적 옵트인 {#explicit-opt-in}

:::danger 더 이상 코어에서 지원하지 않음
다음 내용은 Vue 3.3 이하 버전에만 해당됩니다. Vue 코어 3.4 이상, `@vitejs/plugin-vue` 5.0 이상에서는 지원이 제거되었습니다. 변환을 계속 사용하려면 [Vue Macros](https://vue-macros.sxzz.moe/features/reactivity-transform.html)로 마이그레이션하세요.
:::

### Vite {#vite}

- `@vitejs/plugin-vue@>=2.0.0` 필요
- SFC 및 js(x)/ts(x) 파일에 적용됩니다. 매크로를 사용하지 않는 파일에는 성능 저하가 없도록, 변환 적용 전 빠른 사용 여부 체크가 수행됩니다.
- `reactivityTransform`은 이제 SFC뿐 아니라 전체에 영향을 주므로, 플러그인 루트 옵션입니다(`script.refSugar` 내부가 아님).

```js [vite.config.js]
export default {
  plugins: [
    vue({
      reactivityTransform: true
    })
  ]
}
```

### `vue-cli` {#vue-cli}

- 현재 SFC에만 적용됩니다
- `vue-loader@>=17.0.0` 필요

```js [vue.config.js]
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          reactivityTransform: true
        }
      })
  }
}
```

### 순수 `webpack` + `vue-loader` {#plain-webpack-vue-loader}

- 현재 SFC에만 적용됩니다
- `vue-loader@>=17.0.0` 필요

```js [webpack.config.js]
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          reactivityTransform: true
        }
      }
    ]
  }
}
```
