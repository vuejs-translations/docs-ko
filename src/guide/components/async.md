# 비동기 컴포넌트 {#async-components}

## 기본 사용법 {#basic-usage}

거대한 앱에서는 앱을 더 작게 조각내어 나누고, 필요할 때만 서버에서 컴포넌트를 로드해야 할 수 있습니다.
이를 구현하기 위해 [`defineAsyncComponent`](/api/general#defineasynccomponent) 함수를 제공합니다:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...서버에서 컴포넌트를 로드하는 로직
    resolve(/* 로드 된 컴포넌트 */)
  })
})
// ... 일반 컴포넌트처럼 `AsyncComp`를 사용 
```

위 예제처럼 `defineAsyncComponent`는 Promise를 반환하는 로더 함수를 사용합니다.
Promise의 `resolve` 콜백을 호출해 서버에서 가져온 정의되어 있는 컴포넌트를 반환합니다.
로드가 실패했음을 나타내기 위해 `reject(reason)`를 호출할 수도 있습니다.

[ES 모듈 동적으로 가져오기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)도 Promise를 반환하므로, 대부분의 경우 `defineAsyncComponent`와 함께 사용합니다.
Vite 및 webpack과 같은 번들러에서도 이 문법을 지원하므로 Vue SFC를 가져오는 데 사용할 수 있습니다.

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

반환된 `AsyncComp`는 페이지에서 실제로 렌더링될 때만 로더 함수를 호출하는 래퍼 컴포넌트입니다.
또한 모든 props를 내부 컴포넌트에 전달하므로, 기존 구현된 컴포넌트를 비동기 래퍼 컴포넌트로 문제없이 교체하여 지연(lazy) 로드를 구현할 수 있습니다.

일반 컴포넌트 처럼, 비동기 컴포넌트도  `app.component()`를 통해  [전역 등록이 가능합니다](/guide/components/registration#global-registration):

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

<div class="options-api">

[컴포넌트를 로컬로 등록](/guide/components/registration#local-registration)할 때 `defineAsyncComponent`를 사용할 수도 있습니다:

```vue
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

</div>

<div class="composition-api">

부모 컴포넌트 안에서 직접 선언될수 있습니다.  

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

</div>

## 로딩 및 에러 상태 {#loading-and-error-states}

비동기 작업에는 필연적으로 로드 및 에러 상태가 포함됩니다.
`defineAsyncComponent()`는 고급 옵션을 통해 이러한 상태 처리를 지원합니다:

```js
const AsyncComp = defineAsyncComponent({
  // 로더 함수
  loader: () => import('./Foo.vue'),

  // 비동기 컴포넌트가 로드되는 동안 사용할 로딩 컴포넌트입니다.
  loadingComponent: LoadingComponent,
  // 로딩 컴포넌트를 표시하기 전에 지연할 시간. 기본값: 200ms
  delay: 200,

  // 로드 실패 시 사용할 에러 컴포넌트
  errorComponent: ErrorComponent,
  // 시간 초과 시, 에러 컴포넌트가 표시됩니다. 기본값: 무한대
  timeout: 3000
})
```

로딩 컴포넌트가 제공되면 내부 컴포넌트가 로딩되는 동안 먼저 표시됩니다.
로딩 컴포넌트가 표시되기 전에 기본 200ms 지연시간이 있습니다.
이는 빠른 네트워크에서 인스턴트 로딩 상태가 너무 빨리 교체되어 깜박임처럼 보일 수 있기 때문입니다.

에러 컴포넌트가 제공되면 로더 함수의 Promise가 reject로 반환될 때 표시됩니다.
요청이 너무 오래 걸릴 때 에러 컴포넌트를 표시하도록 시간 초과를 지정할 수도 있습니다.

# 지연 하이드레이션 <sup class="vt-badge" data-text="3.5+" /> {#lazy-hydration}

> 이 섹션은  [Server-Side Rendering](/guide/scaling-up/ssr) 에서만 적용됩니다. 

Vue 3.5 이상에서는 비동기 컴포넌트가 하이드레이션 전략을 제공하여 하이드레이션 시점을 제어할 수 있습니다.

- Vue는 여러 가지 내장된 하이드레이션 전략을 제공합니다. 이러한 내장 전략은 개별적으로 가져와야 하며, 사용되지 않는 경우 트리 쉐이킹될 수 있습니다.
- 
- 이 설계는 유연성을 위해 의도적으로 저수준으로 만들어졌습니다. 향후 컴파일러 문법 설탕(Syntax Sugar)이 핵심(Vue Core)이나 상위 수준 솔루션(예: Nuxt)에서 추가적으로 구축될 가능성이 있습니다.

### 유휴 상태일때 하이드레이션 (Hydrate on Idle) {#hydrate-on-idle}

`requestIdleCallback` 를 이용한 하이드레이션:

```js
import { defineAsyncComponent, hydrateOnIdle } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnIdle(/* 옵션으로 최대 타입아읏 시간을 줄수있다. */)
})
```

### 보여질때 하이드레이션 {#hydrate-on-visible}

`IntersectionObserver`를 이용하여 요소가 보여질때 하이드레이션:

```js
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnVisible()
})
```

옵저버에 대한 옵션 객체 값을 선택적으로 전달할 수 있습니다.


```js
hydrateOnVisible({ rootMargin: '100px' })
```

### 미디어 쿼리를 통한 하이드레이션 {#hydrate-on-media-query}

특정 미디어 쿼리가 일치할 때 하이드레이션:

```js
import { defineAsyncComponent, hydrateOnMediaQuery } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnMediaQuery('(max-width:500px)')
})
```

### 상호 작용이 있을때 하이드레이션 {#hydrate-on-interaction}

지정된 이벤트가 컴포넌트 요소에서 트리거될 때 하이드레이션이 수행됩니다. 또한, 하이드레이션이 완료된 후 해당 이벤트가 다시 실행됩니다.

```js
import { defineAsyncComponent, hydrateOnInteraction } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnInteraction('click')
})
```

여러 개의 이벤트 유형 목록으로도 사용할 수 있습니다:

```js
hydrateOnInteraction(['wheel', 'mouseover'])
```

### 커스텀 전략 {#custom-strategy}

```ts
import { defineAsyncComponent, type HydrationStrategy } from 'vue'

const myStrategy: HydrationStrategy = (hydrate, forEachElement) => {
  // forEachElement는 컴포넌트의 하이드레이션되지 않은 DOM에서 모든 루트 요소를 순회하는 보조 함수(helper)입니다. 이는 루트가 단일 요소가 아닌 프래그먼트(fragment)일 수도 있기 때문입니다.
  forEachElement(el => {
    // ...
  })
  //  준비되면 `hydrate`이 호출됩니다. 
  hydrate()
  return () => {
    // 정리 함수가 필요하면 리턴합니다. 
  }
}

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: myStrategy
})
```


## 지연(suspense) 사용하기 {#using-with-suspense}

비동기 컴포넌트는 내장 컴포넌트인 `<Suspense>`와 함께 사용할 수 있습니다.
`<Suspense>`와 비동기 컴포넌트 간의 상호 작용은 [`<Suspense>`](/guide/built-ins/suspense)에 설명되어 있습니다.
