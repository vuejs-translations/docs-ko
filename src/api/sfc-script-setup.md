# \<script setup> {#script-setup}

`<script setup>`은 싱글 파일 컴포넌트(SFC) 내에서 Composition API를 사용할 때의 컴파일 타임 문법 설탕입니다. SFC와 Composition API를 모두 사용하는 경우 권장되는 문법입니다. 일반 `<script>` 문법에 비해 여러 가지 장점이 있습니다:

- 보일러플레이트(boilerplate)가 적고 더 간결한 코드
- 순수 TypeScript로 props와 emit 이벤트 선언 가능
- 더 나은 런타임 성능(템플릿이 중간 프록시(proxy) 없이 동일한 스코프의 렌더 함수로 컴파일됨)
- 더 나은 IDE 타입 추론 성능(코드에서 타입을 추출하는 언어 서버의 작업량 감소)

## 기본 문법 {#basic-syntax}

이 문법을 사용하려면 `<script>` 블록에 `setup` 속성을 추가하세요:

```vue
<script setup>
console.log('hello script setup')
</script>
```

내부 코드는 컴포넌트(component)의 `setup()` 함수의 내용으로 컴파일됩니다. 즉, 일반 `<script>`와 달리, `<script setup>` 내부의 코드는 **컴포넌트 인스턴스(instance)가 생성될 때마다 실행**됩니다(일반 `<script>`는 컴포넌트가 처음 import될 때 한 번만 실행됨).

### 최상위 바인딩은 템플릿에 노출됨 {#top-level-bindings-are-exposed-to-template}

`<script setup>`을 사용할 때, `<script setup>` 내부에 선언된 모든 최상위 바인딩(변수, 함수 선언, import 등)은 템플릿(template)에서 직접 사용할 수 있습니다:

```vue
<script setup>
// 변수
const msg = 'Hello!'

// 함수
function log() {
  console.log(msg)
}
</script>

<template>
  <button @click="log">{{ msg }}</button>
</template>
```

import도 동일하게 노출됩니다. 즉, import한 헬퍼 함수를 `methods` 옵션을 통해 노출하지 않고도 템플릿 표현식에서 직접 사용할 수 있습니다:

```vue
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

## 반응성(reactivity) {#reactivity}

반응형 상태는 [반응성 API](./reactivity-core)를 사용해 명시적으로 생성해야 합니다. `setup()` 함수에서 반환된 값과 마찬가지로, ref는 템플릿에서 참조할 때 자동으로 언래핑됩니다:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## 컴포넌트 사용하기 {#using-components}

`<script setup>`의 스코프 내 값은 커스텀 컴포넌트 태그 이름으로도 직접 사용할 수 있습니다:

```vue
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

`MyComponent`를 변수로 참조한다고 생각하면 됩니다. JSX를 사용해본 적이 있다면 비슷한 개념입니다. 케밥 케이스의 `<my-component>`도 템플릿에서 동작하지만, 일관성을 위해 PascalCase 컴포넌트 태그 사용을 강력히 권장합니다. 또한 네이티브 커스텀 엘리먼트와 구분하는 데 도움이 됩니다.

### 동적 컴포넌트 {#dynamic-components}

컴포넌트가 문자열 키로 등록되는 것이 아니라 변수로 참조되기 때문에, `<script setup>` 내부에서 동적 컴포넌트를 사용할 때는 동적 `:is` 바인딩(binding)을 사용해야 합니다:

```vue
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

삼항 연산자에서 컴포넌트를 변수처럼 사용할 수 있다는 점에 주목하세요.

### 재귀 컴포넌트 {#recursive-components}

SFC는 파일 이름을 통해 암묵적으로 자신을 참조할 수 있습니다. 예를 들어, `FooBar.vue`라는 파일은 템플릿에서 `<FooBar/>`로 자신을 참조할 수 있습니다.

이 기능은 import된 컴포넌트보다 우선순위가 낮습니다. 컴포넌트의 추론된 이름과 충돌하는 이름의 import가 있다면, import에 별칭을 지정할 수 있습니다:

```js
import { FooBar as FooBarChild } from './components'
```

### 네임스페이스 컴포넌트 {#namespaced-components}

`<Foo.Bar>`처럼 점이 포함된 컴포넌트 태그를 사용해 객체 속성에 중첩된 컴포넌트를 참조할 수 있습니다. 이는 하나의 파일에서 여러 컴포넌트를 import할 때 유용합니다:

```vue
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

## 커스텀 디렉티브 사용하기 {#using-custom-directives}

전역 등록된 커스텀 디렉티브(directive)는 평소처럼 동작합니다. 로컬 커스텀 디렉티브는 `<script setup>`에서 명시적으로 등록할 필요가 없지만, `vNameOfDirective`라는 네이밍 규칙을 따라야 합니다:

```vue
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // 엘리먼트로 무언가를 수행
  }
}
</script>
<template>
  <h1 v-my-directive>이것은 제목입니다</h1>
</template>
```

다른 곳에서 디렉티브를 import하는 경우, 필요한 네이밍 규칙에 맞게 이름을 변경할 수 있습니다:

```vue
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

## defineProps() & defineEmits() {#defineprops-defineemits}

`props`와 `emits` 같은 옵션을 완전한 타입 추론 지원과 함께 선언하려면, `<script setup>` 내부에서 자동으로 사용할 수 있는 `defineProps`와 `defineEmits` API를 사용할 수 있습니다:

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup 코드
</script>
```

- `defineProps`와 `defineEmits`는 **컴파일러 매크로**로, `<script setup>` 내부에서만 사용할 수 있습니다. import할 필요가 없으며, `<script setup>`이 처리될 때 컴파일 과정에서 제거됩니다.

- `defineProps`는 `props` 옵션과 동일한 값을, `defineEmits`는 `emits` 옵션과 동일한 값을 받습니다.

- `defineProps`와 `defineEmits`는 전달된 옵션을 기반으로 올바른 타입 추론을 제공합니다.

- `defineProps`와 `defineEmits`에 전달된 옵션은 setup 바깥의 모듈 스코프로 호이스팅(hoisting)됩니다. 따라서 옵션은 setup 스코프에서 선언된 로컬 변수를 참조할 수 없습니다. 그렇게 하면 컴파일 에러가 발생합니다. 하지만 import된 바인딩은 모듈 스코프에 있으므로 참조할 수 있습니다.

### 타입 전용 props/emit 선언<sup class="vt-badge ts" /> {#type-only-props-emit-declarations}

props와 emits는 `defineProps` 또는 `defineEmits`에 리터럴 타입 인자를 전달하여 순수 타입 문법으로도 선언할 수 있습니다:

```ts
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: 더 간결한 대안 문법
const emit = defineEmits<{
  change: [id: number] // 명명된 튜플 문법
  update: [value: string]
}>()
```

- `defineProps` 또는 `defineEmits`는 런타임 선언 또는 타입 선언 중 하나만 사용할 수 있습니다. 둘을 동시에 사용하면 컴파일 에러가 발생합니다.

- 타입 선언을 사용할 때, 정적 분석을 통해 동등한 런타임 선언이 자동으로 생성되어 중복 선언 없이도 올바른 런타임 동작을 보장합니다.

  - 개발 모드에서는 컴파일러가 타입에서 해당 런타임 유효성 검사를 추론하려고 시도합니다. 예를 들어 여기서 `foo: string` 타입은 `foo: String`으로 추론됩니다. TypeScript가 peer dependency로 설치되어 있다면, import된 타입도 해석됩니다.

  - 프로덕션 모드에서는 번들 크기를 줄이기 위해 배열 형식 선언이 생성됩니다(여기서 props는 `['foo', 'bar']`로 컴파일됨).

- 3.2 이하 버전에서는 `defineProps()`의 제네릭 타입 파라미터가 타입 리터럴 또는 로컬 인터페이스 참조로 제한되었습니다.

  이 제한은 3.3에서 해결되었습니다. 최신 Vue 버전은 타입 파라미터 위치에서 import된 타입과 제한된 복합 타입 참조를 지원합니다. 하지만 타입에서 런타임으로의 변환이 여전히 AST 기반이기 때문에, 조건부 타입 등 실제 타입 분석이 필요한 일부 복합 타입은 지원되지 않습니다. 단일 prop의 타입으로 조건부 타입을 사용할 수는 있지만, 전체 props 객체에는 사용할 수 없습니다.

### 반응형 props 구조 분해 <sup class="vt-badge" data-text="3.5+" /> {#reactive-props-destructure}

Vue 3.5 이상에서는 `defineProps`의 반환값에서 구조 분해된 변수들이 반응형이 됩니다. Vue의 컴파일러는 동일한 `<script setup>` 블록 내에서 `defineProps`로 구조 분해된 변수를 접근할 때 자동으로 `props.`를 앞에 붙입니다:

```ts
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 3.5 이전에는 한 번만 실행됨
  // 3.5+에서는 "foo" prop이 변경될 때마다 재실행됨
  console.log(foo)
})
```

위 코드는 다음과 같이 동등하게 컴파일됩니다:

```js {5}
const props = defineProps(['foo'])

watchEffect(() => {
  // 컴파일러가 `foo`를 `props.foo`로 변환
  console.log(props.foo)
})
```

또한, JavaScript의 기본값 문법을 사용해 props의 기본값을 선언할 수 있습니다. 타입 기반 props 선언을 사용할 때 특히 유용합니다:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
```

### 타입 선언 사용 시 props 기본값 <sup class="vt-badge ts" /> {#default-props-values-when-using-type-declaration}

3.5 이상에서는 반응형 props 구조 분해를 사용할 때 기본값을 자연스럽게 선언할 수 있습니다. 하지만 3.4 이하에서는 반응형 props 구조 분해가 기본적으로 활성화되어 있지 않습니다. 타입 기반 선언으로 props 기본값을 선언하려면 `withDefaults` 컴파일러 매크로가 필요합니다:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

이 코드는 동등한 런타임 props `default` 옵션으로 컴파일됩니다. 또한, `withDefaults` 헬퍼는 기본값에 대한 타입 검사를 제공하고, 기본값이 선언된 속성에 대해 반환된 `props` 타입에서 선택적 플래그를 제거합니다.

:::info
`withDefaults`를 사용할 때 배열이나 객체와 같은 변경 가능한 참조 타입의 기본값은 함수로 감싸야 합니다. 이는 실수로 인한 수정 및 외부 부작용을 방지하기 위함입니다. 이렇게 하면 각 컴포넌트 인스턴스가 기본값의 고유한 복사본을 갖게 됩니다. 구조 분해를 사용할 때는 이 작업이 **필요하지 않습니다**.
:::

## defineModel() {#definemodel}

- 3.4+에서만 사용 가능

이 매크로는 부모 컴포넌트에서 `v-model`로 사용할 수 있는 양방향 바인딩 prop을 선언할 때 사용할 수 있습니다. 예시 사용법은 [컴포넌트 `v-model`](/guide/components/v-model) 가이드에서도 다룹니다.

내부적으로 이 매크로는 모델 prop과 해당 값 업데이트 이벤트를 선언합니다. 첫 번째 인자가 리터럴 문자열이면 prop 이름으로 사용되고, 그렇지 않으면 prop 이름은 기본값 `"modelValue"`가 됩니다. 두 경우 모두 prop 옵션과 모델 ref의 값 변환 옵션을 포함하는 추가 객체를 전달할 수 있습니다.

```js
// "modelValue" prop을 선언, 부모에서 v-model로 사용
const model = defineModel()
// 또는: 옵션이 있는 "modelValue" prop 선언
const model = defineModel({ type: String })

// 변경 시 "update:modelValue"를 emit
model.value = 'hello'

// "count" prop을 선언, 부모에서 v-model:count로 사용
const count = defineModel('count')
// 또는: 옵션이 있는 "count" prop 선언
const count = defineModel('count', { type: Number, default: 0 })

function inc() {
  // 변경 시 "update:count"를 emit
  count.value++
}
```

:::warning
`defineModel` prop에 `default` 값을 지정하고, 부모 컴포넌트에서 이 prop에 값을 제공하지 않으면 부모와 자식 컴포넌트 간 동기화가 깨질 수 있습니다. 아래 예시에서 부모의 `myRef`는 undefined이지만, 자식의 `model`은 1입니다:

```vue [Child.vue]
<script setup>
const model = defineModel({ default: 1 })
</script>
```

```vue [Parent.vue]
<script setup>
const myRef = ref()
</script>

<template>
  <Child v-model="myRef"></Child>
</template>
```

또한 `defineProps`에 `withDefaults`를 사용할 때와 마찬가지로, `defineModel`에서도 배열이나 객체 같은 변경 가능한 참조 타입의 기본값은 의도하지 않은 수정과 외부 부작용을 방지하기 위해 함수로 감싸서 지정해야 합니다.
:::

### 수정자와 변환기 {#modifiers-and-transformers}

`v-model` 디렉티브와 함께 사용된 수정자에 접근하려면, `defineModel()`의 반환값을 구조 분해할 수 있습니다:

```js
const [modelValue, modelModifiers] = defineModel()

// v-model.trim에 해당
if (modelModifiers.trim) {
  // ...
}
```

수정자가 있을 때는 값을 읽거나 부모에 동기화할 때 값을 변환해야 할 수 있습니다. `get`과 `set` 변환기 옵션을 사용해 이를 구현할 수 있습니다:

```js
const [modelValue, modelModifiers] = defineModel({
  // get()은 여기서 필요 없으므로 생략
  set(value) {
    // .trim 수정자가 사용된 경우, trim된 값을 반환
    if (modelModifiers.trim) {
      return value.trim()
    }
    // 그렇지 않으면 값을 그대로 반환
    return value
  }
})
```

### TypeScript와 함께 사용하기 <sup class="vt-badge ts" /> {#usage-with-typescript}

`defineProps`와 `defineEmits`처럼, `defineModel`도 모델 값과 수정자의 타입을 지정하는 타입 인자를 받을 수 있습니다:

```ts
const modelValue = defineModel<string>()
//    ^? Ref<string | undefined>

// 옵션이 있는 기본 모델, required는 undefined 가능성을 제거
const modelValue = defineModel<string>({ required: true })
//    ^? Ref<string>

const [modelValue, modifiers] = defineModel<string, 'trim' | 'uppercase'>()
//                 ^? Record<'trim' | 'uppercase', true | undefined>
```

## defineExpose() {#defineexpose}

`<script setup>`을 사용하는 컴포넌트는 **기본적으로 닫혀 있습니다**. 즉, 템플릿 ref나 `$parent` 체인을 통해 가져온 컴포넌트의 public 인스턴스는 `<script setup>` 내부에 선언된 바인딩을 **노출하지 않습니다**.

`<script setup>` 컴포넌트에서 속성을 명시적으로 노출하려면 `defineExpose` 컴파일러 매크로를 사용하세요:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

부모가 템플릿 ref를 통해 이 컴포넌트의 인스턴스를 가져오면, 반환된 인스턴스는 `{ a: number, b: number }` 형태가 됩니다(ref는 일반 인스턴스처럼 자동으로 언래핑됨).

## defineOptions() {#defineoptions}

- 3.3+에서만 지원

이 매크로를 사용하면 별도의 `<script>` 블록 없이 `<script setup>` 내부에서 컴포넌트 옵션을 직접 선언할 수 있습니다:

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
  customOptions: {
    /* ... */
  }
})
</script>
```

- 이 매크로는 옵션을 모듈 스코프로 호이스팅하며, 리터럴 상수가 아닌 `<script setup>` 내 로컬 변수에는 접근할 수 없습니다.

## defineSlots()<sup class="vt-badge ts"/> {#defineslots}

- 3.3+에서만 지원

이 매크로는 슬롯(slot) 이름과 props 타입 체크를 위한 IDE 타입 힌트를 제공하는 데 사용할 수 있습니다.

`defineSlots()`는 타입 파라미터만 받고 런타임 인자는 받지 않습니다. 타입 파라미터는 속성 키가 슬롯 이름이고, 값 타입이 슬롯 함수인 타입 리터럴이어야 합니다. 함수의 첫 번째 인자는 슬롯이 받을 props이며, 이 타입이 템플릿에서 슬롯 props로 사용됩니다. 반환 타입은 현재 무시되며 any가 될 수 있지만, 향후 슬롯 내용 체크에 활용될 수 있습니다.

또한, `setup` 컨텍스트에 노출되거나 `useSlots()`로 반환되는 `slots` 객체와 동일한 `slots` 객체를 반환합니다.

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
}>()
</script>
```

## `useSlots()` & `useAttrs()` {#useslots-useattrs}

템플릿에서는 `$slots`와 `$attrs`로 직접 접근할 수 있으므로, `<script setup>` 내부에서 `slots`와 `attrs`를 사용할 일은 비교적 드뭅니다. 드물게 필요할 경우 각각 `useSlots`와 `useAttrs` 헬퍼를 사용하세요:

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots`와 `useAttrs`는 실제 런타임 함수로, 각각 `setupContext.slots`와 `setupContext.attrs`와 동일한 값을 반환합니다. 일반 Composition API 함수에서도 사용할 수 있습니다.

## 일반 `<script>`와 함께 사용하기 {#usage-alongside-normal-script}

`<script setup>`은 일반 `<script>`와 함께 사용할 수 있습니다. 일반 `<script>`가 필요한 경우는 다음과 같습니다:

- `<script setup>`에서 표현할 수 없는 옵션 선언(예: `inheritAttrs` 또는 플러그인(plugin)으로 활성화된 커스텀 옵션, 3.3+에서는 [`defineOptions`](/api/sfc-script-setup#defineoptions)로 대체 가능)
- 명명된 export 선언
- 한 번만 실행되어야 하는 부수 효과 실행 또는 객체 생성

```vue
<script>
// 일반 <script>, 모듈 스코프에서 한 번만 실행됨
runSideEffectOnce()

// 추가 옵션 선언
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// setup() 스코프에서 실행(각 인스턴스마다)
</script>
```

동일 컴포넌트에서 `<script setup>`과 `<script>`를 조합하는 것은 위에서 설명한 시나리오에 한정됩니다. 구체적으로:

- 이미 `<script setup>`에서 정의할 수 있는 옵션(예: `props`, `emits`)을 별도의 `<script>` 섹션에서 선언하지 마세요.
- `<script setup>` 내부에서 생성된 변수는 컴포넌트 인스턴스의 속성으로 추가되지 않으므로 Options API에서 접근할 수 없습니다. 이런 방식의 API 혼용은 강력히 권장하지 않습니다.

지원되지 않는 시나리오에 해당한다면, `<script setup>` 대신 명시적인 [`setup()`](/api/composition-api-setup) 함수를 사용하는 것을 고려하세요.

## 최상위 `await` {#top-level-await}

최상위 `await`는 `<script setup>` 내부에서 사용할 수 있습니다. 결과 코드는 `async setup()`으로 컴파일됩니다:

```vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

또한, await된 표현식은 `await` 이후에도 현재 컴포넌트 인스턴스 컨텍스트가 유지되는 형식으로 자동 컴파일됩니다.

:::warning 참고
`async setup()`은 [`Suspense`](/guide/built-ins/suspense.html)와 함께 사용해야 하며, 현재는 실험적 기능입니다. 향후 릴리스에서 공식화 및 문서화할 예정이지만, 지금 궁금하다면 [테스트](https://github.com/vuejs/core/blob/main/packages/runtime-core/__tests__/components/Suspense.spec.ts)를 참고해 동작 방식을 확인할 수 있습니다.
:::

## import 구문 {#imports-statements}

Vue의 import 구문은 [ECMAScript 모듈 명세](https://nodejs.org/api/esm.html)를 따릅니다.
또한, 빌드 도구 설정에 정의된 별칭을 사용할 수 있습니다:

```vue
<script setup>
import { ref } from 'vue'
import { componentA } from './Components'
import { componentB } from '@/Components'
import { componentC } from '~/Components'
</script>
```

## 제네릭 <sup class="vt-badge ts" /> {#generics}

제네릭 타입 파라미터는 `<script>` 태그의 `generic` 속성을 사용해 선언할 수 있습니다:

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

`generic`의 값은 TypeScript에서 `<...>` 사이의 파라미터 리스트와 동일하게 동작합니다. 예를 들어, 여러 파라미터, `extends` 제약, 기본 타입, import된 타입 참조 등을 사용할 수 있습니다:

```vue
<script
  setup
  lang="ts"
  generic="T extends string | number, U extends Item"
>
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

타입을 추론할 수 없는 경우, `@vue-generic` 디렉티브를 사용해 명시적으로 타입을 전달할 수 있습니다:

```vue
<template>
  <!-- @vue-generic {import('@/api').Actor} -->
  <ApiSelect v-model="peopleIds" endpoint="/api/actors" id-prop="actorId" />

  <!-- @vue-generic {import('@/api').Genre} -->
  <ApiSelect v-model="genreIds" endpoint="/api/genres" id-prop="genreId" />
</template>
```

제네릭 컴포넌트 참조를 `ref`에서 사용하려면 [`vue-component-type-helpers`](https://www.npmjs.com/package/vue-component-type-helpers) 라이브러리를 사용해야 하며, `InstanceType`은 동작하지 않습니다.

```vue
<script
  setup
  lang="ts"
>
import componentWithoutGenerics from '../component-without-generics.vue';
import genericComponent from '../generic-component.vue';

import type { ComponentExposed } from 'vue-component-type-helpers';

// 제네릭이 없는 컴포넌트에는 동작함
ref<InstanceType<typeof componentWithoutGenerics>>();

ref<ComponentExposed<typeof genericComponent>>();
```

## 제약 사항 {#restrictions}

- 모듈 실행 방식의 차이로 인해, `<script setup>` 내부 코드는 SFC의 컨텍스트에 의존합니다. 외부 `.js` 또는 `.ts` 파일로 이동하면 개발자와 도구 모두 혼란을 초래할 수 있습니다. 따라서 **`<script setup>`**은 `src` 속성과 함께 사용할 수 없습니다.
- `<script setup>`은 In-DOM 루트 컴포넌트 템플릿을 지원하지 않습니다.([관련 논의](https://github.com/vuejs/core/issues/8391))
