<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# KeepAlive {#keepalive}

`<KeepAlive>`는 여러 컴포넌트(component) 사이를 동적으로 전환할 때 컴포넌트 인스턴스(instance)를 조건부로 캐시할 수 있게 해주는 내장 컴포넌트입니다.

## 기본 사용법 {#basic-usage}

컴포넌트 기본 챕터에서 [동적 컴포넌트](/guide/essentials/component-basics#dynamic-components)에 대한 문법을 소개한 바 있습니다. `<component>` 특수 엘리먼트를 사용하는 방식입니다:

```vue-html
<component :is="activeComponent" />
```

기본적으로, 활성화된 컴포넌트 인스턴스는 전환 시 언마운트(unmount)됩니다. 이로 인해 해당 컴포넌트가 가지고 있던 변경된 상태는 모두 사라집니다. 다시 이 컴포넌트를 표시하면, 오직 초기 상태만을 가진 새로운 인스턴스가 생성됩니다.

아래 예시에서는 상태를 가진 두 개의 컴포넌트가 있습니다. A는 카운터를, B는 `v-model`을 통해 입력값과 동기화된 메시지를 가지고 있습니다. 둘 중 하나의 상태를 변경한 뒤, 다른 컴포넌트로 전환했다가 다시 돌아와 보세요:

<SwitchComponent />

다시 전환해 돌아오면, 이전에 변경했던 상태가 초기화된 것을 확인할 수 있습니다.

전환 시마다 새로운 컴포넌트 인스턴스를 생성하는 것은 일반적으로 유용한 동작이지만, 이 경우에는 두 컴포넌트 인스턴스를 비활성 상태에서도 보존하고 싶을 수 있습니다. 이 문제를 해결하려면 동적 컴포넌트를 `<KeepAlive>` 내장 컴포넌트로 감싸주면 됩니다:

```vue-html
<!-- 비활성 컴포넌트가 캐시됩니다! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

이제 컴포넌트 전환 시에도 상태가 유지됩니다:

<SwitchComponent use-KeepAlive />

<div class="composition-api">

[Playground에서 직접 실행해보기](https://play.vuejs.org/#eNqtUsFOwzAM/RWrl4IGC+cqq2h3RFw495K12YhIk6hJi1DVf8dJSllBaAJxi+2XZz8/j0lhzHboeZIl1NadMA4sd73JKyVaozsHI9hnJqV+feJHmODY6RZS/JEuiL1uTTEXtiREnnINKFeAcgZUqtbKOqj7ruPKwe6s2VVguq4UJXEynAkDx1sjmeMYAdBGDFBLZu2uShre6ioJeaxIduAyp0KZ3oF7MxwRHWsEQmC4bXXDJWbmxpjLBiZ7DwptMUFyKCiJNP/BWUbO8gvnA+emkGKIgkKqRrRWfh+Z8MIWwpySpfbxn6wJKMGV4IuSs0UlN1HVJae7bxYvBuk+2IOIq7sLnph8P9u5DJv5VfpWWLaGqTzwZTCOM/M0IaMvBMihd04ruK+lqF/8Ajxms8EFbCiJxR8khsP6ncQosLWnWV6a/kUf2nqu75Fby04chA0iPftaYryhz6NBRLjdtajpHZTWPio=)

</div>
<div class="options-api">

[Playground에서 직접 실행해보기](https://play.vuejs.org/#eNqtU8tugzAQ/JUVl7RKWveMXFTIseofcHHAiawasPxArRD/3rVNSEhbpVUrIWB3x7PM7jAkuVL3veNJmlBTaaFsVraiUZ22sO0alcNedw2s7kmIPHS1ABQLQDEBAMqWvwVQzffMSQuDz1aI6VreWpPCEBtsJppx4wE1s+zmNoIBNLdOt8cIjzut8XAKq3A0NAIY/QNveFEyi8DA8kZJZjlGALQWPVSSGfNYJjVvujIJeaxItuMyo6JVzoJ9VxwRmtUCIdDfNV3NJWam5j7HpPOY8BEYkwxySiLLP1AWkbK4oHzmXOVS9FFOSM3jhFR4WTNfRslcO54nSwJKcCD4RsnZmJJNFPXJEl8t88quOuc39fCrHalsGyWcnJL62apYNoq12UQ8DLEFjCMy+kKA7Jy1XQtPlRTVqx+Jx6zXOJI1JbH4jejg3T+KbswBzXnFlz9Tjes/V/3CjWEHDsL/OYNvdCE8Wu3kLUQEhy+ljh+brFFu)

</div>

:::tip
[DOM 내 템플릿(template)](/guide/essentials/component-basics#in-dom-template-parsing-caveats)에서 사용할 때는 `<keep-alive>`로 참조해야 합니다.
:::

## 포함 / 제외 {#include-exclude}

기본적으로 `<KeepAlive>`는 내부의 모든 컴포넌트 인스턴스를 캐시합니다. `include`와 `exclude` prop을 통해 이 동작을 커스터마이즈할 수 있습니다. 두 prop 모두 쉼표로 구분된 문자열, `RegExp`, 또는 이 타입들을 포함하는 배열이 될 수 있습니다:

```vue-html
<!-- 쉼표로 구분된 문자열 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 정규식 (v-bind 사용) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 배열 (v-bind 사용) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

매칭은 컴포넌트의 [`name`](/api/options-misc#name) 옵션을 기준으로 이루어지므로, `KeepAlive`로 조건부 캐시가 필요한 컴포넌트는 반드시 `name` 옵션을 명시적으로 선언해야 합니다.

:::tip
3.2.34 버전부터는 `<script setup>`을 사용하는 단일 파일 컴포넌트의 경우 파일명을 기반으로 `name` 옵션이 자동으로 추론되므로, 직접 이름을 선언할 필요가 없습니다.
:::

## 최대 캐시 인스턴스 수 {#max-cached-instances}

`max` prop을 통해 캐시할 수 있는 컴포넌트 인스턴스의 최대 개수를 제한할 수 있습니다. `max`가 지정되면, `<KeepAlive>`는 [LRU 캐시](<https://ko.wikipedia.org/wiki/%EC%BA%90%EC%8B%9C_%EA%B5%90%EC%B2%B4_%EC%A0%95%EC%B1%85#%EC%B5%9C%EA%B7%BC_%EC%B5%9C%EC%86%8C_%EC%82%AC%EC%9A%A9_(LRU)>)처럼 동작합니다. 캐시된 인스턴스의 수가 지정한 최대 개수를 초과하려고 하면, 가장 오랫동안 접근하지 않은 캐시 인스턴스가 파괴되어 새로운 인스턴스를 위한 공간이 확보됩니다.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## 캐시된 인스턴스의 라이프사이클(lifecycle) {#lifecycle-of-cached-instance}

컴포넌트 인스턴스가 DOM에서 제거될 때, `<KeepAlive>`로 캐시된 컴포넌트 트리의 일부라면 언마운트되는 대신 **비활성화(deactivated)** 상태로 전환됩니다. 캐시된 트리의 일부로 DOM에 다시 삽입되면 **활성화(activated)** 됩니다.

<div class="composition-api">

캐시된 컴포넌트는 [`onActivated()`](/api/composition-api-lifecycle#onactivated)와 [`onDeactivated()`](/api/composition-api-lifecycle#ondeactivated)를 사용해 이 두 상태에 대한 라이프사이클 훅(hook)을 등록할 수 있습니다:

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 최초 마운트 시 호출됨
  // 그리고 캐시에서 다시 삽입될 때마다 호출됨
})

onDeactivated(() => {
  // DOM에서 캐시로 이동할 때 호출됨
  // 그리고 언마운트될 때도 호출됨
})
</script>
```

</div>
<div class="options-api">

캐시된 컴포넌트는 [`activated`](/api/options-lifecycle#activated)와 [`deactivated`](/api/options-lifecycle#deactivated) 훅을 사용해 이 두 상태에 대한 라이프사이클 훅을 등록할 수 있습니다:

```js
export default {
  activated() {
    // 최초 마운트 시 호출됨
    // 그리고 캐시에서 다시 삽입될 때마다 호출됨
  },
  deactivated() {
    // DOM에서 캐시로 이동할 때 호출됨
    // 그리고 언마운트될 때도 호출됨
  }
}
```

</div>

다음 사항에 유의하세요:

- <span class="composition-api">`onActivated`</span><span class="options-api">`activated`</span>는 마운트(mount) 시에도 호출되며, <span class="composition-api">`onDeactivated`</span><span class="options-api">`deactivated`</span>는 언마운트 시에도 호출됩니다.

- 두 훅 모두 `<KeepAlive>`로 캐시된 루트 컴포넌트뿐만 아니라, 캐시된 트리 내의 하위 컴포넌트에도 적용됩니다.
---

**관련 문서**

- [`<KeepAlive>` API 레퍼런스](/api/built-in-components#keepalive)
