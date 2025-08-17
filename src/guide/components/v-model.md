# 컴포넌트 v-model {#component-v-model}

<ScrimbaLink href="https://scrimba.com/links/vue-component-v-model" title="Free Vue.js Component v-model Lesson" type="scrimba">
  Watch an interactive video lesson on Scrimba
</ScrimbaLink>

<ScrimbaLink href="https://scrimba.com/links/vue-component-v-model" title="무료 Vue.js 컴포넌트 v-model 강의" type="scrimba">
  Scrimba에서 인터랙티브 비디오 강의 시청하기
</ScrimbaLink>

## 기본 사용법 {#basic-usage}

`v-model`은 컴포넌트에서 양방향 바인딩을 구현하는 데 사용할 수 있습니다.

```vue [Child.vue]
Vue 3.4부터, 이를 달성하는 권장 방법은 [`defineModel()`](/api/sfc-script-setup#definemodel) 매크로를 사용하는 것입니다:

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>부모에 바인딩된 v-model 값: {{ model }}</div>
  <button @click="update">증가</button>
</template>
```vue-html [Parent.vue]
부모는 `v-model`로 값을 바인딩할 수 있습니다:

```vue-html
<!-- Parent.vue -->
<Child v-model="countModel" />
```

`defineModel()`이 반환하는 값은 ref입니다. 이 ref는 다른 ref와 마찬가지로 접근하고 변경할 수 있지만, 부모 값과 로컬 값 사이의 양방향 바인딩 역할을 합니다:

- `.value`는 부모 `v-model`에 바인딩된 값과 동기화됩니다;
- 자식에서 변경되면, 부모에 바인딩된 값도 업데이트됩니다.

즉, 이 ref를 네이티브 input 요소에 `v-model`로 바인딩할 수도 있으므로, 네이티브 input 요소를 감싸면서 동일한 `v-model` 사용법을 제공하는 것이 간단해집니다:

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

[플레이그라운드에서 직접 해보기](https://play.vuejs.org/#eNqFUtFKwzAU/ZWYl06YLbK30Q10DFSYigq+5KW0t11mmoQknZPSf/cm3eqEsT0l555zuefmpKV3WsfbBuiUpjY3XDtiwTV6ziSvtTKOLNZcFKQ0qiZRnATkG6JB0BIDJen2kp5iMlfSOlLbisw8P4oeQAhFPpURxVV0zWSa9PNwEgIHtRaZA0SEpOvbeduG5q5LE0Sh2jvZ3tSqADFjFHlGSYJkmhz10zF1FseXvIo3VklcrfX9jOaq1lyAedGOoz1GpyQwnsvQ3fdTqDnTwPhQz9eQf52ob+zO1xh9NWDBbIHRgXOZqcD19PL9GXZ4H0h03whUnyHfwCrReI+97L6RBdo+0gW3j+H9uaw+7HLnQNrDUt6oV3ZBzyhmsjiz+p/dSTwJfUx2+IpD1ic+xz5enwQGXEDJJaw8Gl2I1upMzlc/hEvdOBR6SNKAjqP1J6P/o6XdL11L5h4=)

### 내부 동작 방식 {#under-the-hood}

`defineModel`은 편의 매크로입니다. 컴파일러는 이를 다음과 같이 확장합니다:

- 로컬 ref의 값과 동기화되는 `modelValue`라는 prop;
```vue [Child.vue]
아래는 3.4 이전에 동일한 자식 컴포넌트를 구현하는 방법입니다:

```vue
<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```vue-html [Parent.vue]
그런 다음, 부모 컴포넌트에서 `v-model="foo"`는 다음과 같이 컴파일됩니다:

```vue-html
<!-- Parent.vue -->
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>
```

보다시피, 훨씬 더 장황합니다. 하지만 내부에서 무슨 일이 일어나는지 이해하는 데 도움이 됩니다.

`defineModel`이 prop을 선언하기 때문에, prop 옵션을 `defineModel`에 전달하여 선언할 수 있습니다:

```js
// v-model을 필수로 만들기
const model = defineModel({ required: true })

// 기본값 제공
const model = defineModel({ default: 0 })
```
```vue [Child.vue]
<script setup>

</script>
**자식 컴포넌트:**

```vue [Parent.vue]
<script setup>

</script>

<template>
  <Child v-model="myRef"></Child>
</template>
```

```html
<Child v-model="myRef"></Child>
```

:::

</div>

<div class="options-api">

먼저, 네이티브 요소에서 `v-model`이 어떻게 사용되는지 다시 살펴보겠습니다:

```vue-html
<input v-model="searchText" />
```

내부적으로, 템플릿 컴파일러는 `v-model`을 더 장황한 동등 코드로 확장합니다. 따라서 위 코드는 다음과 동일합니다:

```vue-html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

컴포넌트에서 사용될 때, `v-model`은 대신 다음과 같이 확장됩니다:

```vue-html
<CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
/>
```

이것이 실제로 동작하려면, `<CustomInput>` 컴포넌트는 두 가지를 해야 합니다:

1. 네이티브 `<input>` 요소의 `value` 속성을 `modelValue` prop에 바인딩
```vue [CustomInput.vue]
아래는 그 예시입니다:

```vue
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

이제 `v-model`이 이 컴포넌트에서 완벽하게 동작합니다:

```vue-html
<CustomInput v-model="searchText" />
```

```vue [CustomInput.vue]
이 컴포넌트 내에서 `v-model`을 구현하는 또 다른 방법은 getter와 setter가 모두 있는 쓰기 가능한 `computed` 속성을 사용하는 것입니다. `get` 메서드는 `modelValue` 속성을 반환하고, `set` 메서드는 해당 이벤트를 emit해야 합니다:

```vue
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <input v-model="value" />
</template>
## `v-model` Arguments {#v-model-arguments}

</div>

## `v-model` 인자 {#v-model-arguments}

컴포넌트의 `v-model`은 인자도 받을 수 있습니다:

```vue-html
<MyComponent v-model:title="bookTitle" />
```

```vue [MyComponent.vue]
자식 컴포넌트에서는, `defineModel()`의 첫 번째 인자로 문자열을 전달하여 해당 인자를 지원할 수 있습니다:

```vue
<!-- MyComponent.vue -->
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```

[플레이그라운드에서 직접 해보기](https://play.vuejs.org/#eNqFklFPwjAUhf9K05dhgiyGNzJI1PCgCWqUx77McQeFrW3aOxxZ9t+9LTAXA/q2nnN6+t12Db83ZrSvgE944jIrDTIHWJmZULI02iJrmIWctSy3umQRRaPOWhweNX0pUHiyR3FP870UZkyoTCuH7FPr3VJiAWzqSwfR/rbUKyhYatdV6VugTktTQHQjVBIfeYiEFgikpwi0YizZ3M2aplfXtklMWvD6UKf+CfrUVPBuh+AspngSd718yH+hX7iS4xihjUZYQS4VLPwJgyiI/3FLZSrafzAeBqFG4jgxeuEqGTo6OZfr0dZpRVxNuFWeEa4swL4alEQm+IQFx3tpUeiv56ChrWB41rMNZLsL+tbVXhP8zYIDuyeQzkN6HyBWb88/XgJ3ZxJ95bH/MN/B6aLyjMfYQ6VWhN3LBdqn8FdJtV66eY2g3HkoD+qTbcgLTo/jX+ra6D+449E47BOq5e039mr+gA==)

prop 옵션도 필요하다면, 모델 이름 뒤에 전달해야 합니다:

```js
const title = defineModel('title', { required: true })
```
```vue [MyComponent.vue]
<summary>3.4 이전 사용법</summary>

```vue
<!-- MyComponent.vue -->
<script setup>
defineProps({
  title: {
    required: true
  }
})
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[플레이그라운드에서 직접 해보기](https://play.vuejs.org/#eNp9kE1rwzAMhv+KMIW00DXsGtKyMXYc7D7vEBplM8QfOHJoCfnvk+1QsjJ2svVKevRKk3h27jAGFJWoh7NXjmBACu4kjdLOeoIJPHYwQ+ethoJLi1vq7fpi+WfQ0JI+lCstcrkYQJqzNQMBKeoRjhG4LcYHbVvsofFfQUcCXhrteix20tRl9sIuOCBkvSHkCKD+fjxN04Ka57rkOOlrMwu7SlVHKdIrBZRcWpc3ntiLO7t/nKHFThl899YN248ikYpP9pj1V60o6sG1TMwDU/q/FZRxgeIPgK4uGcQLSZGlamz6sHKd1afUxOoGeeT298A9bHCMKxBfE3mTSNjl1vud5x8qNa76)

</details>
</div>
```vue [MyComponent.vue]
이 경우, 기본 `modelValue` prop과 `update:modelValue` 이벤트 대신, 자식 컴포넌트는 `title` prop을 기대하고, 부모 값을 업데이트하기 위해 `update:title` 이벤트를 emit해야 합니다:

```vue
<!-- MyComponent.vue -->
<script>
export default {
  props: ['title'],
  emits: ['update:title']
}
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

## Multiple `v-model` Bindings {#multiple-v-model-bindings}

</div>

## 다중 `v-model` 바인딩 {#multiple-v-model-bindings}

[`v-model` 인자](#v-model-arguments)에서 배운 대로, 특정 prop과 이벤트를 지정하는 기능을 활용하여, 이제 하나의 컴포넌트 인스턴스에 여러 개의 `v-model` 바인딩을 만들 수 있습니다.

각 `v-model`은 별도의 prop과 동기화되며, 컴포넌트에 추가 옵션이 필요하지 않습니다:

```vue-html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

<div class="composition-api">

```vue
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

[플레이그라운드에서 직접 해보기](https://play.vuejs.org/#eNqFkstuwjAQRX/F8iZUAqKKHQpIfbAoUmnVx86bKEzANLEt26FUkf+9Y4MDSAg2UWbu9fjckVv6oNRw2wAd08wUmitLDNhGTZngtZLakpZoKIkjpZY1SdCadNK3Ab3IazhowzQ2/ES0MVFIYSwpucbvxA/qJXO5FsldlKr8qDxL8EKW7kEQAQsLtapyC1gRkq3vp217mOccwf8wwLksRSlYIoMvCNkOarmEahyODAT2J4yGgtFzhx8UDf5/r6c4NEs7CNqnpxkvbO0kcVjNhCyh5AJe/SW9pBPOV3DJGvu3dsKFaiyxf8qTW9gheQwVs4Z90BDm5oF47cF/Ht4aZC75argxUmD61g9ktJC14hXoN2U5ZmJ0TILitbyq5O889KxuoB/7xRqKnwv9jdn5HqPvGnDVWwTpNJvrFSCul2efi4DeiRigqdB9RfwAI6vGM+5tj41YIvaJL9C+hOfNxerLzHYWhImhPKh3uuBnFJ/A05XoR9zRcBTOMeGo+wcs+yse)

<details>
<summary>3.4 이전 사용법</summary>

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

[플레이그라운드에서 직접 해보기](https://play.vuejs.org/#eNqNUc1qwzAMfhVjCk6hTdg1pGWD7bLDGIydlh1Cq7SGxDaOEjaC332yU6cdFNpLsPRJ348y8idj0qEHnvOi21lpkHWAvdmWSrZGW2Qjs1Azx2qrWyZoVMzQZwf2rWrhhKVZbHhGGivVTqsOWS0tfTeeKBGv+qjEMkJNdUaeNXigyCYjZIEKhNY0FQJVjBXHh+04nvicY/QOBM4VGUFhJHrwBWPDutV7aPKwslbU35Q8FCX/P+GJ4oB/T3hGpEU2m+ArfpnxytX2UEsF71abLhk9QxDzCzn7QCvVYeW7XuGyWSpH0eP6SyuxS75Eb/akOpn302LFYi8SiO8bJ5PK9DhFxV/j0yH8zOnzoWr6+SbhbifkMSwSsgByk1zzsoABFKZY2QNgGpiW57Pdrx2z3JCeI99Svvxh7g8muf2x)

</details>
</div>
<div class="options-api">

```vue
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

## Handling `v-model` Modifiers {#handling-v-model-modifiers}

</div>

## `v-model` 수식어 처리 {#handling-v-model-modifiers}

폼 입력 바인딩에 대해 배울 때, `v-model`에는 [내장 수식어](/guide/essentials/forms#modifiers) - `.trim`, `.number`, `.lazy`가 있다는 것을 보았습니다. 경우에 따라, 커스텀 입력 컴포넌트의 `v-model`도 커스텀 수식어를 지원하길 원할 수 있습니다.

예시로, `v-model` 바인딩으로 전달된 문자열의 첫 글자를 대문자로 만드는 커스텀 수식어 `capitalize`를 만들어봅시다:

```vue-html
<MyComponent v-model.capitalize="myText" />
```

<div class="composition-api">

컴포넌트 `v-model`에 추가된 수식어는 자식 컴포넌트에서 `defineModel()` 반환값을 구조 분해 할당하여 접근할 수 있습니다:

```vue{4}
<script setup>
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
</script>

<template>
  <input type="text" v-model="model" />
</template>
```vue{4-6}

수식어에 따라 값을 읽거나 쓸 때 조건부로 조정하려면, `defineModel()`에 `get`과 `set` 옵션을 전달할 수 있습니다. 이 두 옵션은 모델 ref의 get/set 시 값을 받아 변환된 값을 반환해야 합니다. 아래는 `set` 옵션을 사용해 `capitalize` 수식어를 구현하는 방법입니다:

```vue{6-8}
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

[플레이그라운드에서 직접 해보기](https://play.vuejs.org/#eNp9UsFu2zAM/RVClzhY5mzoLUgHdEUPG9Bt2LLTtIPh0Ik6WRIkKksa5N9LybFrFG1OkvgeyccnHsWNc+UuoliIZai9cgQBKbpP0qjWWU9wBI8NnKDxtoUJUycDdH+4tXwzaOgMl/NRLNVlMoA0tTWBoD2scE9wnSoWk8lUmuW8a8rt+EHYOl0R8gtgtVUBlHGRoK6cokqrRwxAW4RGea6mkQg9HGwEboZ+kbKWY027961doy6f86+l6ERIAXNus5wPPcVMvNB+yZOaiZFw/cKYftI/ufEM+FCNQh/+8tRrbJTB+4QUxySWqxa7SkecQn4DqAaKIWekeyAAe0fRG8h5Zb2t/A0VH6Yl2d/Oob+tAhZTeHfGg1Y1Fh/Z6ZR66o5xhRTh8OnyXyy7f6CDSw5S59/Z3WRpOl91lAL70ahN+RCsYT/zFFIk95RG/92RYr+kWPTzSVFpbf9/zTHyEWd9vN5i/e+V+EPYp5gUPzwG9DuUYsCo8htkrQm++/Ut6x5AVh01sy+APzFYHZPGjvY5mjXLHvGy2i95K5TZrMLdntCEfqgkNDuc+VLwkqQNe2v0Z7lX5VX/M+L0BFEuPdc=)

<details>
<summary>3.4 이전 사용법</summary>

```vue{11-13}
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="props.modelValue" @input="emitValue" />
</template>
```

[플레이그라운드에서 직접 해보기](https://play.vuejs.org/#eNp9Us1Og0AQfpUJF5ZYqV4JNTaNxyYmVi/igdCh3QR2N7tDIza8u7NLpdU0nmB+v5/ZY7Q0Jj10GGVR7iorDYFD6sxDoWRrtCU4gsUaBqitbiHm1ngqrfuV5j+Fik7ldH6R83u5GaBQlVaOoO03+Emw8BtFHCeFyucjKMNxQNiapiTkCGCzlw6kMh1BVRpJZSO/0AEe0Pa0l2oHve6AYdBmvj+/ZHO4bfUWm/Q8uSiiEb6IYM4A+XxCi2bRH9ZX3BgVGKuNYwFbrKXCZx+Jo0cPcG9l02EGL2SZ3mxKr/VW1hKty9hMniy7hjIQCSweQByHBIZCDWzGDwi20ps0Yjxx4MR73Jktc83OOPFHGKk7VZHUKkyFgsAEAqcG2Qif4WWYUml3yOp8wldlDSLISX+TvPDstAemLeGbVvvSLkncJSnpV2PQrkqHLOfmVHeNrFDcMz3w0iBQE1cUzMYBbuS2f55CPj4D6o0/I41HzMKsP+u0kLOPoZWzkx1X7j18A8s0DEY=)

</details>
</div>

<div class="options-api">

컴포넌트 `v-model`에 추가된 수식어는 `modelModifiers` prop을 통해 컴포넌트에 전달됩니다. 아래 예시에서는, 기본값이 빈 객체인 `modelModifiers` prop을 가진 컴포넌트를 만들었습니다:

```vue{11}
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

컴포넌트의 `modelModifiers` prop에는 `capitalize`가 포함되어 있고, 값은 true입니다. 이는 `v-model.capitalize="myText"` 바인딩에 의해 설정된 것입니다.

prop이 준비되었으니, 이제 `modelModifiers` 객체의 키를 확인하고, emit되는 값을 변경하는 핸들러를 작성할 수 있습니다. 아래 코드에서는 `<input />` 요소가 `input` 이벤트를 발생시킬 때마다 문자열을 대문자로 만듭니다.

```vue{13-15}
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

### Modifiers for `v-model` with Arguments {#modifiers-for-v-model-with-arguments}

</div>

### 인자가 있는 `v-model`의 수식어 {#modifiers-for-v-model-with-arguments}

<div class="options-api">

인자와 수식어가 모두 있는 `v-model` 바인딩의 경우, 생성되는 prop 이름은 `arg + "Modifiers"`가 됩니다. 예를 들어:

```vue-html
<MyComponent v-model:title.capitalize="myText">
```

해당 선언은 다음과 같아야 합니다:

```js
export default {
  props: ['title', 'titleModifiers'],
  emits: ['update:title'],
  created() {
    console.log(this.titleModifiers) // { capitalize: true }
  }
}
```

</div>

다음은 여러 인자와 각각 다른 수식어를 가진 다중 `v-model`에서 수식어를 사용하는 또 다른 예시입니다:

```vue-html
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```

<div class="composition-api">

```vue
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true }
</script>
```

<details>
<summary>3.4 이전 사용법</summary>
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
firstName: String,
lastName: String,
firstNameModifiers: { default: () => ({}) },
lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true }
</script>
```

</details>
</div>
<div class="options-api">

```vue{15,16}
<script>
export default {
  props: {
    firstName: String,
    lastName: String,
    firstNameModifiers: {
      default: () => ({})
    },
    lastNameModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:firstName', 'update:lastName'],
  created() {
    console.log(this.firstNameModifiers) // { capitalize: true }
    console.log(this.lastNameModifiers) // { uppercase: true }
  }
}
</script>
```

</div>
