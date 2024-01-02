# Component v-model {#component-v-model}

## 기본 사용법 {#basic-usage}

`v-model`을 컴포넌트에서 사용하여 양방향 바인딩을 구현할 수 있습니다.

<div class="composition-api">

Vue 3.4부터는 [`defineModel()`](/api/sfc-script-setup#definemodel) 매크로를 사용하는 것이 권장되는 접근 방식입니다:

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>부모 바인딩 v-model은: {{ model }}</div>
</template>
```

부모는 `v-model`을 사용하여 값을 바인딩할 수 있습니다:

```vue-html
<!-- Parent.vue -->
<Child v-model="count" />
```

`defineModel()`에 의해 반환되는 값은 ref입니다. 다른 ref처럼 접근하고 변경할 수 있지만, 부모 값과 로컬 값 사이의 양방향 바인딩으로 작동합니다:

- `.value`는 부모 `v-model`에 의해 바인딩된 값과 동기화됩니다;
- 자식에 의해 변경되면 부모 바인딩 값도 업데이트됩니다.

따라서 이 ref를 네이티브 입력 엘리먼트의 `v-model`에 바인딩할 수도 있어, 네이티브 입력 엘리먼트를 래핑하면서 동일한 `v-model` 사용을 제공하는 것이 간단해집니다:

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNqFUtFKwzAU/ZWYl06YLbK30Q10DFSYigq+5KW0t11mmoQknZPSf/cm3eqEsT0l555zuefmpKV3WsfbBuiUpjY3XDtiwTV6ziSvtTKOLNZcFKQ0qiZRnATkG6JB0BIDJen2kp5iMlfSOlLbisw8P4oeQAhFPpURxVV0zWSa9PNwEgIHtRaZA0SEpOvbeduG5q5LE0Sh2jvZ3tSqADFjFHlGSYJkmhz10zF1FseXvIo3VklcrfX9jOaq1lyAedGOoz1GpyQwnsvQ3fdTqDnTwPhQz9eQf52ob+zO1xh9NWDBbIHRgXOZqcD19PL9GXZ4H0h03whUnyHfwCrReI+97L6RBdo+0gW3j+H9uaw+7HLnQNrDUt6oV3ZBzyhmsjiz+p/dSTwJfUx2+IpD1ic+xz5enwQGXEDJJaw8Gl2I1upMzlc/hEvdOBR6SNKAjqP1J6P/o6XdL11L5h4=)

### 내부 구조 {#under-the-hood}

`defineModel`은 편의성을 위한 매크로입니다. 컴파일러는 다음과 같이 확장합니다:

- 로컬 ref의 값과 동기화되는 `modelValue`라는 이름의 prop;
- 로컬 ref의 값이 변경될 때 발생하는 `update:modelValue`라는 이벤트.

3.4 이전에 위와 같은 자식 컴포넌트를 구현하는 방법은 다음과 같습니다:

```vue
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
```

보시다시피, 이것은 훨씬 더 장황합니다. 하지만 내부에서 무슨 일이 일어나는지 이해하는 것이 도움이 됩니다.

`defineModel`은 prop을 선언하므로, `defineModel`에 전달함으로써 기본 prop의 옵션을 선언할 수 있습니다:

```js
// v-model을 필수로 만들기
const model = defineModel({ required: true })

// 기본값 제공
const model = defineModel({ default: 0 })
```

</div>

<div class="options-api">

먼저 네이티브 엘리먼트에서 v-model이 어떻게 사용되는지 다시 살펴봅시다:

```vue-html
<input v-model="searchText" />
```

내부적으로 템플릿 컴파일러는 `v-model`을 좀 더 자세한 표현으로 확장합니다. 따라서 위의 코드는 다음과 같은 작업을 수행합니다:

```vue-html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

컴포넌트에 사용하면 `v-model`이 대신 이렇게 확장됩니다:

```vue-html
<CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
/>
```

하지만 이 기능이 실제로 작동하려면 `<CustomInput>` 컴포넌트가 두 가지 작업을 수행해야 합니다:

1. 네이티브 `<input>` 앨리먼트의 `value` 속성을 `modelValue` 프로퍼티에 바인딩합니다.
2. 네이티브 `input` 이벤트가 트리거되면 새 값으로 `update:modelValue` 사용자 지정 이벤트를 내보냅니다.

실제로 작동하는 모습은 다음과 같습니다:

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

이제 `v-model`이 이 컴포넌트와 완벽하게 작동합니다:

```vue-html
<CustomInput v-model="searchText" />
```

[Try it in the Playground](https://play.vuejs.org/#eNqFkctqwzAQRX9lEAEn4Np744aWrvoD3URdiHiSGvRCHpmC8b93JDfGKYGCkJjXvTrSJF69r8aIohHtcA69p6O0vfEuELzFgZx5tz4SXIIzUFT1JpfGCmmlxe/c3uFFRU0wSQtwdqxh0dLQwHSnNJep3ilS+8PSCxCQYrC3CMDgMKgrNlB8odaOXVJ2TgdvvNp6vSwHhMZrRcgRQLs1G5+M61A/S/ErKQXUR5immwXMWW1VEKX4g3j3Mo9QfXCeKU9FtvpQmp/lM0Oi6RP/qYieebHZNvyL0acLLODNmGYSxCogxVJ6yW1c2iWz/QOnEnY48kdUpMIVGSllD8t8zVZb+PkHqPG4iw==)

이 컴포넌트 내에서 `v-model`을 구현하는 또 다른 방법은 getter와 setter가 모두 있는 쓰기 가능한 `computed` 프로퍼티를 사용하는 것입니다. `get` 메서드는 `modelValue` 프로퍼티를 반환하고 `set` 메서드는 해당 이벤트를 발생시켜야 합니다:

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
```

</div>

## `v-model` 인수 {#v-model-arguments}

`v-model`은 컴포넌트에서 인수를 받을 수도 있습니다:

```vue-html
<MyComponent v-model:title="bookTitle" />
```

<div class="composition-api">

자식 컴포넌트에서는 `defineModel()`의 첫 번째 인수로 문자열을 전달하여 해당 인수를 지원할 수 있습니다:

```vue
<!-- MyComponent.vue -->
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNqFkl9PwjAUxb9K05dhglsMb2SQqOFBE9Soj31Zxh0Uu7bpHxxZ9t29LWOiQXzaes7p2a+9a+mt1unOA53S3JaGa0csOK/nTPJaK+NISwxUpCOVUTVJMJoM1nJ/r/BNgnS9nWYnWujFMCFMlkpaRxx3AsgsFI6S3XWtViBIYda+Dg3QFLUWkFwxmWcHFqTAhQPUCwe4IiTf3Mzbtq/qujzDddRPYfruaUzNGI1PRkmG0Twb+uiY/sI9cw0/0VdQcQnL0D5KovgfL5fa4/69jiDQOOTo+S6SOYtfrvg63VolkauNN0lLxOUCzLN2HMkYnZLoBK8QQn0+Rs0ZD+OjXm6g/Dijb20TNEZfDFgwOwQZPIdzAWQN9uLtKXIPJtL7gH3BfAWrhA+Mh9idlyvEPslF2of4J3G5freLxoG0x0MF0JDsYp5RHE6Y1F9H/8adpJO4j8mOdl/Hw/nf)

prop 옵션이 필요한 경우, 모델 이름 뒤에 전달해야 합니다:

```js
const title = defineModel('title', { required: true })
```

<details>
<summary>Pre 3.4 Usage</summary>

```vue
<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
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

[Try it in the Playground](https://play.vuejs.org/#eNp9UE1rwzAM/SvCFNJC17BrSMvG2HGw+7xDaJTNEH/gyKEl5L9PtkPJytjJ1tPT03uaxLNzhzGgqEQ9nL1yBANScCdplHbWE0zgsYMZOm81FEwtbq2364vln0FDS/tQrrCoy2RpztYMBKSoRzhGuW0xPmjbYg+N/wo6zuOl0a7HYidNXWYn7IELQsYbQq4A6u/H0zQtUvNcl1wnfG1l0a4S6yhFeqWAkql1edMTe3Fn9o8jtNgpg+/eumH7USSl4pM9ZvxVK4p4cC0r5oWp/V8EZVyg+AOgq0sG8UJSZKgamz6sXGf0KQ0xukFeuf29cA8bHGME4msiJ4kKuzx6n3n+AX48rro=)

</details>
</div>
<div class="options-api">

이 경우, 기본 `modelValue` prop과 `update:modelValue` 이벤트 대신, 자식 컴포넌트는 `title` prop을 기대하고 부모 값을 업데이트하기 위해 `update:title` 이벤트를 발생시켜야 합니다:

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

[Try it in the Playground](https://play.vuejs.org/#eNqFUNFqwzAM/BVhCm6ha9hryMrGnvcFdR9Mo26B2DGuHFJC/n2yvZakDAohtuTTne5G8eHcrg8oSlFdTr5xtFe2Ma7zBF/Xz45vFi3B2XcG5K6Y9eKYVFZZHBK8xrMOLcGoLMDphrqUMC6Ypm18rzXp9SZjATxS8PZWAVBDLZYg+xfT1diC9t/BxGEctHFtlI2wKR78468q7ttzQcgoTcgVQPXzuh/HzAnTVBVcp/58qz+lMqHelEinElAwtCrufGIrHhJYBPdfEs53jkM4yEQpj8k+miYmc5DBcRKYZeXxqZXGukDZPF1dWhQHUiK3yl63YbZ97r6nIe6uoup6KbmFFfbRCnHGyI4iwyaPPnqffgGMlsEM)

</div>

## Multiple `v-model` bindings {#multiple-v-model-bindings}

앞서 배운 것처럼 특정 prop과 이벤트를 타깃팅하는 기능을 [`v-model` 인자](#v-model-arguments)로 활용하면 이제 단일 컴포넌트 인스턴스에 여러 개의 `v-model` 바인딩을 생성할 수 있습니다.

각 `v-model`은 컴포넌트에서 추가 옵션 없이도 다른 prop에 동기화됩니다:

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

[Try it in the Playground](https://play.vuejs.org/#eNqFkstuwjAQRX/F8iZUAqKKHQpIfbAoUmnVx86bKEzANLEt26FUkf+9Y4MDSAg2UWbu9fjckVv6oNRw2wAd08wUmitLDNhGTZngtZLakpZoKIkjpZY1SdCadNK3Ab3IazhowzQ2/ES0MVFIYSwpucbvxA/qJXO5FsldlKr8qDxL8EKW7kEQAQsLtapyC1gRkq3vp217mOccwf8wwLksRSlYIoMvCNkOarmEahyODAT2J4yGgtFzhx8UDf5/r6c4NEs7CNqnpxkvbO0kcVjNhCyh5AJe/SW9pBPOV3DJGvu3dsKFaiyxf8qTW9gheQwVs4Z90BDm5oF47cF/Ht4aZC75argxUmD61g9ktJC14hXoN2U5ZmJ0TILitbyq5O889KxuoB/7xRqKnwv9jdn5HqPvGnDVWwTpNJvrFSCul2efi4DeiRigqdB9RfwAI6vGM+5tj41YIvaJL9C+hOfNxerLzHYWhImhPKh3uuBnFJ/A05XoR9zRcBTOMeGo+wcs+yse)

<details>
<summary>Pre 3.4 Usage</summary>

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

[Try it in the Playground](https://play.vuejs.org/#eNqNUc1qwzAMfhVjCk6hTdg1pGWD7bLDGIydlh1Cq7SGxDaOEjaC332yU6cdFNpLsPRJ348y8idj0qEHnvOi21lpkHWAvdmWSrZGW2Qjs1Azx2qrWyZoVMzQZwf2rWrhhKVZbHhGGivVTqsOWS0tfTeeKBGv+qjEMkJNdUaeNXigyCYjZIEKhNY0FQJVjBXHh+04nvicY/QOBM4VGUFhJHrwBWPDutV7aPKwslbU35Q8FCX/P+GJ4oB/T3hGpEU2m+ArfpnxytX2UEsF71abLhk9QxDzCzn7QCvVYeW7XuGyWSpH0eP6SyuxS75Eb/akOpn302LFYi8SiO8bJ5PK9DhFxV/j0yH8zOnzoWr6+SbhbifkMSwSsgByk1zzsoABFKZY2QNgGpiW57Pdrx2z3JCeI99Svvxh7g8muf2x)

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

[Try it in the Playground](https://play.vuejs.org/#eNqNkk1rg0AQhv/KIAETSJRexYYWeuqhl9JTt4clmSSC7i7rKCnif+/ObtYkELAiujPzztejQ/JqTNZ3mBRJ2e5sZWgrVNUYbQm+WrQfskE4WN1AmuXRwQmpUELh2Qv3eJBdTTAIBbDTLluhoraA4VpjXHNwL0kuV0EIYJE6q6IFcKhsSwWk7/qkUq/nq5be+aa5JztGfrmHu8t8GtoZhI2pJaGzAMrT03YYQk0YR3BnruSOZe5CXhKnC3X7TaP3WBc+ZaOc/1kk3hDJvYILRQGfQzx3Rct8GiJZJ7fA7gg/AmesNszMrUIXFpxbwCfZSh09D0Hc7tbN6sAWm4qZf6edcZgxrMHSdA3RF7PTn1l8lTIdhbXp1/CmhOeJRNHLupv4eIaXyItPdJEFD7R8NM0Ce/d/ZCTtESnzlVZXhP/vHbeZaT0tPdf59uONfx7mDVM=)

</div>

## `v-model` 수정자 처리하기 {#handling-v-model-modifiers}

Form 양식 입력 바인딩에 대해 배울 때 `v-model`에 `.trim`, `.number` 및 `.lazy`와 같은 [내장 수정자](/guide/essentials/forms.html#modifiers)가 있다는 것을 알았습니다. 경우에 따라 사용자 정의 입력 컴포넌트에서 `v-model`이 사용자 정의 수정자를 지원하도록 할 수도 있습니다.

`v-model` 바인딩에서 제공하는 문자열의 첫 글자를 대문자로 표시하는 사용자 지정 수정자 예제인 `capitalize`를 만들어 보겠습니다:

```vue-html
<MyComponent v-model.capitalize="myText" />
```

<div class="composition-api">

컴포넌트 `v-model`에 추가된 수정자(modifiers)는 자식 컴포넌트에서 `defineModel()` 반환값을 구조 분해하여 다음과 같이 접근할 수 있습니다:

```vue{4}
<script setup>
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

수정자에 기반하여 값을 어떻게 읽거나 쓸지 조건적으로 조정하려면, `defineModel()`에 `get`과 `set` 옵션을 전달할 수 있습니다. 이 두 옵션은 모델 ref의 get / set에서 값을 받아 변환된 값을 반환해야 합니다. 다음은 `set` 옵션을 사용하여 `capitalize` 수정자를 구현하는 방법입니다:

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

[Try it in the Playground](https://play.vuejs.org/#eNp9UsFu2zAM/RVClzhY5mzoLUgHdEUPG9Bt2LLTtIPh0Ik6WxIkyosb5N9LybFrFG1OkvgeyccnHsWNtXkbUKzE2pdOWQKPFOwnqVVjjSM4gsMKTlA508CMqbMRuu9uDd80ajrD+XISi3WZDCB1abQnaLoNHgiuY8VsNptLvV72TbkdPwgbWxeE/ALY7JUHpW0gKAurqKjVI3rAFl1He6V30JkA3AbdKvLXUzXt+8Zssc6fM6+l6NtLAUtusF6O3cRCvFB9yY2SiYFw+8KSYcY/qfEC+FCVQuf/8rxbrJTG+4hkxyiWq2ZtUQecQ3oDqAqyMWeieyQAu0bBaUh5ebkv3A1lH+Y5md/WorstPGZzeHfGfa1KzD6yxzH11B/TCjHC4dPlX1j3P0CdjQ5S79/Z3WhpPF91lDz7Uald/uCNZj/TFFJE91SN7rslxX5JsRrmk6Koa/P/a4qRC7gY4uUey3+vxB/8Icak+OHQo2tRihGjwu2QtUb47te3pHsEWXWomX0B/Ine1CFq7Gmfg96y7Akvqf2StoKXcePvDoTaD0NFocnhxJeClyRu2FujP8u9yq+GnxGnJxSEO+M=)

<details>
<summary>Pre 3.4 Usage</summary>

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
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9Us1Og0AQfpUJF5ZYqV4JNTaNxyYmVi/igdCh3QR2N7tDIza8u7NLpdU0nmB+v5/ZY7Q0Jj10GGVR7iorDYFD6sxDoWRrtCU4gsUaBqitbiHm1ngqrfuV5j+Fik7ldH6R83u5GaBQlVaOoO03+Emw8BtFHCeFyucjKMNxQNiapiTkCGCzlw6kMh1BVRpJZSO/0AEe0Pa0l2oHve6AYdBmvj+/ZHO4bfUWm/Q8uSiiEb6IYM4A+XxCi2bRH9ZX3BgVGKuNYwFbrKXCZx+Jo0cPcG9l02EGL2SZ3mxKr/VW1hKty9hMniy7hjIQCSweQByHBIZCDWzGDwi20ps0Yjxx4MR73Jktc83OOPFHGKk7VZHUKkyFgsAEAqcG2Qif4WWYUml3yOp8wldlDSLISX+TvPDstAemLeGbVvvSLkncJSnpV2PQrkqHLOfmVHeNrFDcMz3w0iBQE1cUzMYBbuS2f55CPj4D6o0/I41HzMKsP+u0kLOPoZWzkx1X7j18A8s0DEY=)

</details>
</div>

<div class="options-api">

컴포넌트 `v-model`에 추가된 수정자는 `modelModifiers` prop을 통해 컴포넌트에 제공됩니다. 아래 예제에서는 빈 객체로 기본 설정된 `modelModifiers` prop이 포함된 컴포넌트를 만들었습니다:

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

컴포넌트의 `modelModifiers` 프로퍼티에 `capitalize`가 포함되어 있고 그 값은 `v-model` 바인딩 `v-model.capitalize="myText"`에 설정되어 있기 때문에 `true`인 것을 알 수 있습니다.

이제 prop이  설정되었으므로 `modelModifiers` 객체 키를 확인하고 발신된 값을 변경하는 핸들러를 작성할 수 있습니다. 아래 코드에서는 `<input />` 앨리먼트가 `input` 이벤트를 실행할 때마다 문자열을 대문자로 표시합니다.

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

[Try it in the Playground](https://play.vuejs.org/#eNqFUk1vgzAM/SsWmgTVOrpdEZ1W9dzTul3GDhG4bSRIomCqsqr/fU5o+ZgqDSGC7edn+znnYGVMfGwwSIK0zq009JopWRltCTbtWvOfQkWws7qCMF6MfC4tzFSm8OThBe5EUxKcMwWQ31B1AucJ02Xu4oUgEc06LIBFaqy6WQBVu8UTJRAyv7Mv7uAPv+mib5MNwsqUgpAtgO1B1iCVaQhyYSSJUv5gDXhE29JBqj20ugHuAW3i8Om4reNTpQss4yFzmQVdH1kACy6QLvpqwTz4I8REv3uCGKuN06IbyNf6FGWDCbyT5d68KtfARhdyJ9EOeBasI0uAVVu+QnS+zMba+HSspNP7K2wM64vJUCX89oAK6aCLgdYl+HiE/S4ASmQ5nBeWgDEJu0ee0TluCLmDiBWt42m7I/FGdNCT+TPOD8KuKHqexaQ/jEG7FjXyVI/XeF3KHKOX63jXAd3jKz64nqM7E8679Ikq/92YtLst1Bq3bep2nXget/2enL1vHsreXrM71+LyC45aHrs=)

</div>

### 인자와 수정자가 있는 `v-model`에 대한 수정자들 {#modifiers-for-v-model-with-arguments}

<div class="options-api">

인자와 수정자가 모두 있는 `v-model` 바인딩의 경우, 생성된 prop 이름은 `arg + "수정자"`가 됩니다. 예를 들어

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

다음은 다른 인자를 가진 여러 `v-model`에 수정자를 사용한 예시입니다:

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
console.log(lastNameModifiers) // { uppercase: true}
</script>
```

<details>
<summary>Pre 3.4 Usage</summary>

```vue{5,6,10,11}
<script setup>
const props = defineProps({
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true}
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
    console.log(this.lastNameModifiers) // { uppercase: true}
  }
}
</script>
```

</div>
