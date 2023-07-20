# Component v-model {#component-v-model}


`v-model`을 컴포넌트에서 사용하여 양방향 바인딩을 구현할 수 있습니다.

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
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

하지만 이 기능이 실제로 작동하려면 `<CustomInput>` 컴포넌트가 두 가지 작업을 수행해야 합니다:

1. 네이티브 `<input>` 앨리먼트의 `value` 속성을 `modelValue` 프로퍼티에 바인딩합니다.
2. 네이티브 `input` 이벤트가 트리거되면 새 값으로 `update:modelValue` 사용자 지정 이벤트를 내보냅니다.

실제로 작동하는 모습은 다음과 같습니다:

<div class="options-api">

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

</div>
<div class="composition-api">

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

</div>

이제 `v-model`이 이 컴포넌트와 완벽하게 작동합니다:

```vue-html
<CustomInput v-model="searchText" />
```

<div class="options-api">

[Try it in the Playground](https://play.vuejs.org/#eNqFkctqwzAQRX9lEAEn4Np744aWrvoD3URdiHiSGvRCHpmC8b93JDfGKYGCkJjXvTrSJF69r8aIohHtcA69p6O0vfEuELzFgZx5tz4SXIIzUFT1JpfGCmmlxe/c3uFFRU0wSQtwdqxh0dLQwHSnNJep3ilS+8PSCxCQYrC3CMDgMKgrNlB8odaOXVJ2TgdvvNp6vSwHhMZrRcgRQLs1G5+M61A/S/ErKQXUR5immwXMWW1VEKX4g3j3Mo9QfXCeKU9FtvpQmp/lM0Oi6RP/qYieebHZNvyL0acLLODNmGYSxCogxVJ6yW1c2iWz/QOnEnY48kdUpMIVGSllD8t8zVZb+PkHqPG4iw==)

</div>
<div class="composition-api">

[Try it in the Playground](https://play.vuejs.org/#eNp9j81qwzAQhF9lEQE7kNp344SW0kNvPfVS9WDidSrQH9LKF+N37yoOxoSQm7QzO9/sJN68r8aEohFtPAflCSJS8idplfEuEEwQcIAZhuAMFGwtVuk9RXLm0/pEN7mqN7Ocy2YAac/ORgKDMXYXhGOOLIs/1NoVe2nbekEzlD+ExuuOkH8A7ZYxvhjXoz5KcUuSAuoTTNOaPM85bU0QB3HX58GdPQ7K4ldwPpY/xZXw3Wmu/svVFvHDKMpi8j3HNneeZ/VVBucXQDPmjVx+XZdikV6vNpZ2yKTyAecAOxzRUkVduCCfkqf7Zb9m1Pbo+R9ZkqZn)

</div>

이 컴포넌트 내에서 `v-model`을 구현하는 또 다른 방법은 getter와 setter가 모두 있는 쓰기 가능한 `computed` 프로퍼티를 사용하는 것입니다. `get` 메서드는 `modelValue` 프로퍼티를 반환하고 `set` 메서드는 해당 이벤트를 발생시켜야 합니다:

<div class="options-api">

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
<div class="composition-api">

```vue
<!-- CustomInput.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="value" />
</template>
```

</div>

## `v-model` arguments {#v-model-arguments}

기본적으로 컴포넌트의 `v-model`은 `modelValue`를 프로퍼티로, `update:modelValue`를 이벤트로 사용합니다. `v-model`에 인자를 전달하여 이러한 이름을 수정할 수 있습니다:

```vue-html
<MyComponent v-model:title="bookTitle" />
```

이 경우 자식 컴포넌트는 `title` 프로퍼티를 예상하고 부모 값을 업데이트하는 `update:title` 이벤트를 발생시켜야 합니다:

<div class="composition-api">

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

</div>
<div class="options-api">

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


`v-model` 컴포넌트에 추가되는 수정자는 `modelModifiers` 프로퍼티를 통해 컴포넌트에 제공됩니다. 아래 예시에서는 기본적으로 빈 객체로 설정된 `modelModifiers` 프로퍼티를 포함하는 컴포넌트를 생성했습니다:

<div class="composition-api">

```vue{4,9}
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

defineEmits(['update:modelValue'])

console.log(props.modelModifiers) // { capitalize: true }
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

</div>
<div class="options-api">

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

</div>

컴포넌트의 `modelModifiers` 프로퍼티에 `capitalize`가 포함되어 있고 그 값은 `v-model` 바인딩 `v-model.capitalize="myText"`에 설정되어 있기 때문에 `true`인 것을 알 수 있습니다.


이제 prop이  설정되었으므로 `modelModifiers` 객체 키를 확인하고 발신된 값을 변경하는 핸들러를 작성할 수 있습니다. 아래 코드에서는 `<input />` 앨리먼트가 `input` 이벤트를 실행할 때마다 문자열을 대문자로 표시합니다.

<div class="composition-api">

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

[Try it in the Playground](https://play.vuejs.org/#eNp9Us1Og0AQfpUJF5ZYqV4JNTaNxyYmVi/igdCh3QR2N7tDIza8u7NLpdU0nmB+v5/ZY7Q0Jj10GGVR7iorDYFD6sxDoWRrtCU4gsUaBqitbiHm1ngqrfuV5j+Fik7ldH6R83u5uVCVVo6g7Tf4SbDw+0QcJ4XK5yMkg3FA2JqmJOQIYLOXDqQyHUFVGkllI7/QAR7Q9rSXage97oBB0Ga+P7/kcrht9Rab9Dy5KKIRvohgzgD5fEKLZtEfzle8GBUYq41jAVuspcJnH4mjRw9wb2XTYQYvZJnebEqv9VbWEq3L2EqeLLuGMhAJLB5AHIcEhkINbMYPCLbSmzRiPHHgxHvcmS1zzc448UcYqTtVkdQqTIWCwAQCpwbZCJ/hZZhSaXfI6nzCV2UNIshJf5O88Oy0B6Yt4ZtW+9IuSdwlKelXY9CuSocs5+ZUd42sUNwzPfDSIFATVxTMxgFu5LZ/nkI+PgPqjT8jjUfMwqw/67SQs4+hlbOTHVfuPXwD3nsMBg==)

</div>
<div class="options-api">

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

인자와 수정자가 모두 있는 `v-model` 바인딩의 경우, 생성된 prop 이름은 `arg + "수정자"`가 됩니다. 예를 들어

```vue-html
<MyComponent v-model:title.capitalize="myText">
```

해당 선언은 다음과 같아야 합니다:

<div class="composition-api">

```js
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }
```

</div>
<div class="options-api">

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
