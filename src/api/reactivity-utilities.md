# 반응성 API: 유틸리티 {#reactivity-api-utilities}

## isRef() {#isref}

값이 ref 객체인지 확인합니다.

- **타입**

  ```ts
  function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
  ```

  반환 타입이 [타입 프레디케이트](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)임에 유의하세요. 즉, `isRef`는 타입 가드로 사용할 수 있습니다:

  ```ts
  let foo: unknown
  if (isRef(foo)) {
    // foo의 타입이 Ref<unknown>으로 좁혀집니다
    foo.value
  }
  ```

## unref() {#unref}

인자가 ref이면 내부 값을 반환하고, 그렇지 않으면 인자 자체를 반환합니다. 이는 `val = isRef(val) ? val.value : val`의 축약 함수입니다.

- **타입**

  ```ts
  function unref<T>(ref: T | Ref<T>): T
  ```

- **예시**

  ```ts
  function useFoo(x: number | Ref<number>) {
    const unwrapped = unref(x)
    // unwrapped는 이제 number임이 보장됩니다
  }
  ```

## toRef() {#toref}

값 / ref / getter를 ref로 정규화하는 데 사용할 수 있습니다 (3.3+).

또한 소스 반응형 객체의 속성에 대한 ref를 생성하는 데 사용할 수도 있습니다. 생성된 ref는 소스 속성과 동기화됩니다: 소스 속성을 변경하면 ref가 업데이트되고, 그 반대도 마찬가지입니다.

- **타입**

  ```ts
  // 정규화 시그니처 (3.3+)
  function toRef<T>(
    value: T
  ): T extends () => infer R
    ? Readonly<Ref<R>>
    : T extends Ref
    ? T
    : Ref<UnwrapRef<T>>

  // 객체 속성 시그니처
  function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K,
    defaultValue?: T[K]
  ): ToRef<T[K]>

  type ToRef<T> = T extends Ref ? T : Ref<T>
  ```

- **예시**

  정규화 시그니처 (3.3+):

  ```js
  // 기존 ref는 그대로 반환합니다
  toRef(existingRef)

  // getter를 .value 접근 시 호출하는 readonly ref를 생성합니다
  toRef(() => props.foo)

  // 함수가 아닌 값에서 일반 ref를 생성합니다
  // ref(1)과 동일합니다
  toRef(1)
  ```

  객체 속성 시그니처:

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // 원본 속성과 동기화되는 양방향 ref
  const fooRef = toRef(state, 'foo')

  // ref를 변경하면 원본도 업데이트됩니다
  fooRef.value++
  console.log(state.foo) // 2

  // 원본을 변경해도 ref가 업데이트됩니다
  state.foo++
  console.log(fooRef.value) // 3
  ```

  이는 다음과 다릅니다:

  ```js
  const fooRef = ref(state.foo)
  ```

  위의 ref는 `state.foo`와 **동기화되지 않습니다**, 왜냐하면 `ref()`는 단순 숫자 값을 받기 때문입니다.

  `toRef()`는 prop의 ref를 컴포저블 함수에 전달하고 싶을 때 유용합니다:

  ```vue
  <script setup>
  import { toRef } from 'vue'

  const props = defineProps(/* ... */)

  // `props.foo`를 ref로 변환한 후
  // 컴포저블에 전달
  useSomeFeature(toRef(props, 'foo'))

  // getter 문법 - 3.3+에서 권장
  useSomeFeature(toRef(() => props.foo))
  </script>
  ```

  `toRef`를 컴포넌트 props와 함께 사용할 때는 props를 변경하는 일반적인 제한이 여전히 적용됩니다. ref에 새 값을 할당하려고 하면 prop을 직접 수정하려는 것과 동일하며 허용되지 않습니다. 이 경우 [`computed`](./reactivity-core#computed)의 `get`과 `set`을 사용하는 것을 고려할 수 있습니다. 자세한 내용은 [컴포넌트에서 `v-model` 사용하기](/guide/components/v-model) 가이드를 참고하세요.

  객체 속성 시그니처를 사용할 때, `toRef()`는 소스 속성이 현재 존재하지 않더라도 사용 가능한 ref를 반환합니다. 이를 통해 [`toRefs`](#torefs)로는 감지되지 않는 선택적 속성도 다룰 수 있습니다.

## toValue() {#tovalue}

- 3.3+에서만 지원

값 / ref / getter를 값으로 정규화합니다. 이는 [unref()](#unref)와 유사하지만, getter도 정규화한다는 점이 다릅니다. 인자가 getter라면 호출하여 반환값을 반환합니다.

이 함수는 [컴포저블](/guide/reusability/composables.html)에서 값, ref, getter 중 어떤 것이든 받을 수 있는 인자를 정규화할 때 사용할 수 있습니다.

- **타입**

  ```ts
  function toValue<T>(source: T | Ref<T> | (() => T)): T
  ```

- **예시**

  ```js
  toValue(1) //       --> 1
  toValue(ref(1)) //  --> 1
  toValue(() => 1) // --> 1
  ```

  컴포저블에서 인자 정규화하기:

  ```ts
  import type { MaybeRefOrGetter } from 'vue'

  function useFeature(id: MaybeRefOrGetter<number>) {
    watch(() => toValue(id), id => {
      // id 변경에 반응
    })
  }

  // 이 컴포저블은 다음 중 어떤 것도 지원합니다:
  useFeature(1)
  useFeature(ref(1))
  useFeature(() => 1)
  ```

## toRefs() {#torefs}

반응형 객체를 변환하여, 결과 객체의 각 속성이 원본 객체의 해당 속성을 가리키는 ref가 되도록 합니다. 각 ref는 [`toRef()`](#toref)를 사용해 생성됩니다.

- **타입**

  ```ts
  function toRefs<T extends object>(
    object: T
  ): {
    [K in keyof T]: ToRef<T[K]>
  }

  type ToRef = T extends Ref ? T : Ref<T>
  ```

- **예시**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  const stateAsRefs = toRefs(state)
  /*
  stateAsRefs의 타입: {
    foo: Ref<number>,
    bar: Ref<number>
  }
  */

  // ref와 원본 속성이 "연결"되어 있습니다
  state.foo++
  console.log(stateAsRefs.foo.value) // 2

  stateAsRefs.foo.value++
  console.log(state.foo) // 3
  ```

  `toRefs`는 컴포저블 함수에서 반응형 객체를 반환할 때, 소비하는 컴포넌트가 반환된 객체를 구조 분해/스프레드해도 반응성(reactivity)을 잃지 않도록 할 때 유용합니다:

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })

    // ...state에 대한 로직

    // 반환 시 ref로 변환
    return toRefs(state)
  }

  // 구조 분해해도 반응성을 잃지 않습니다
  const { foo, bar } = useFeatureX()
  ```

  `toRefs`는 호출 시점에 소스 객체에서 열거 가능한 속성에 대해서만 ref를 생성합니다. 아직 존재하지 않을 수 있는 속성에 대한 ref를 만들려면 [`toRef`](#toref)를 사용하세요.

## isProxy() {#isproxy}

객체가 [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](./reactivity-advanced#shallowreactive) 또는 [`shallowReadonly()`](./reactivity-advanced#shallowreadonly)로 생성된 프록시인지 확인합니다.

- **타입**

  ```ts
  function isProxy(value: any): boolean
  ```

## isReactive() {#isreactive}

객체가 [`reactive()`](./reactivity-core#reactive) 또는 [`shallowReactive()`](./reactivity-advanced#shallowreactive)로 생성된 프록시인지 확인합니다.

- **타입**

  ```ts
  function isReactive(value: unknown): boolean
  ```

## isReadonly() {#isreadonly}

전달된 값이 readonly 객체인지 확인합니다. readonly 객체의 속성은 변경될 수 있지만, 전달된 객체를 통해 직접 할당할 수는 없습니다.

[`readonly()`](./reactivity-core#readonly)와 [`shallowReadonly()`](./reactivity-advanced#shallowreadonly)로 생성된 프록시는 모두 readonly로 간주되며, `set` 함수가 없는 [`computed()`](./reactivity-core#computed) ref도 마찬가지입니다.

- **타입**

  ```ts
  function isReadonly(value: unknown): boolean
  ```

## isShallow() {#isshallow}

객체가 [`shallowRef`](./reactivity-advanced#shallowref), [`shallowReactive()`](./reactivity-advanced#shallowreactive) 또는 [`shallowReadonly()`](./reactivity-advanced#shallowreadonly)로 생성된 프록시인지 확인합니다.

- **타입**

  ```ts
  function isShallow(value: unknown): boolean
  ```
