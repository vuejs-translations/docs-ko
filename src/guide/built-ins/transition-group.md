<script setup>
import ListBasic from './transition-demos/ListBasic.vue'
import ListMove from './transition-demos/ListMove.vue'
import ListStagger from './transition-demos/ListStagger.vue'
</script>

# 트랜지션 그룹 {#transitiongroup}

`<TransitionGroup>`은 목록에서 렌더링되는 엘리먼트 또는 컴포넌트의 삽입, 제거 및 순서 변경을 애니메이션으로 만들기 위해 설계된 빌트인 컴포넌트입니다.

## `<Transition>`과의 차이점 {#differences-from-transition}

`<TransitionGroup>`은 `<Transition>`과 동일한 props, CSS 트랜지션 클래스 및 JavaScript 훅 리스너를 지원하지만, 다음과 같은 차이점이 있습니다:

- 기본적으로 래퍼 엘리먼트를 렌더링하지 않습니다. 그러나 `tag` prop으로 렌더링할 엘리먼트를 지정할 수 있습니다.

- [트랜지션 모드](./transition#transition-mode)는 더 이상 상호 배타적인 엘리먼트를 사용하지 않기 때문에 사용할 수 없습니다.

- 내부 엘리먼트는 고유한 `key` 속성을 **필수로 가져야** 합니다.

- CSS 트랜지션 클래스는 그룹/컨테이너 자체가 아닌 **목록의 개별 엘리먼트에 적용**됩니다.

:::tip
[in-DOM 템플릿](/guide/essentials/component-basics#in-dom-template-parsing-caveats)에서 사용할 때 `<transition-group>`으로 참조해야 합니다.
:::

## 진입/진출 트랜지션 {#enter-leave-transitions}

다음은 `<TransitionGroup>`을 사용하여 `v-for` 목록에 진입/진출 트랜지션을 적용하는 예제입니다:

```vue-html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

<ListBasic />

## 이동 트랜지션 {#move-transitions}

위의 데모에는 몇 가지 명백한 결함이 있습니다. 항목을 삽입하거나 제거할 때 주변 항목이 부드럽게 움직이지 않고 제자리에 즉시 "점프"합니다. 몇 가지 추가 CSS 규칙을 추가하여 이 문제를 해결할 수 있습니다:

```css{1,13-17}
.list-move, /* 움직이는 엘리먼트에 트랜지션 적용 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 이동 애니메이션을 올바르게 계산할 수 있도록
   레이아웃 흐름에서 나머지 항목을 꺼내기. */
.list-leave-active {
  position: absolute;
}
```

이제 훨씬 좋아 보입니다. 전체 목록이 섞일 때 부드럽게 애니메이션이 적용됩니다.

<ListMove />

[전체 예제](/examples/#list-transition)


###  커스텀 Custom TransitionGroup classes {#custom-transitiongroup-classes}

`<TransitionGroup>`에 `moveClass` 속성을 전달하여 이동하는 요소에 대한 사용자 지정 전환 클래스를 지정할 수도 있습니다. 이는 [`<Transition>`에서의 사용자 지정 전환 클래스](/guide/built-ins/transition.html#custom-transition-classes)와 동일한 방식으로 동작합니다.


## 시차가 있는 목록 트랜지션 {#staggering-list-transitions}

데이터 속성을 통해 JavaScript 트랜지션과 통신함으로써 목록에서 트랜지션을 시차가 있게 할 수도 있습니다. 먼저 목록의 인덱스를 DOM 엘리먼트의 `data-` 속성으로 렌더링합니다:

```vue-html{11}
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

그런 다음 JavaScript 훅에서 `data-` 속성을 기반으로 딜레이를 사용하여 엘리먼트에 애니메이션을 적용합니다. 다음 예제는 애니메이션을 위해  [GSAP 라이브러리](https://gsap.com/)를 사용합니다.: 

```js{5}
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
```

<ListStagger />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqlVMuu0zAQ/ZVRNklRm7QLWETtBW4FSFCxYkdYmGSSmjp28KNQVfl3xk7SFyvEponPGc+cOTPNOXrbdenRYZRHa1Nq3lkwaF33VEjedkpbOIPGeg6lajtnsYIeaq1aiOlSfAlqDOtG3L8SUchSSWNBcPrZwNdCAqVqTZND/KxdibBDjKGf3xIfWXngCNs9k4/Udu/KA3xWWnPz1zW0sOOP6CcnG3jv9ImIQn67SvrpUJ9IE/WVxPHsSkw97gbN0zFJZrB5grNPrskcLUNXac2FRZ0k3GIbIvxLSsVTq3bqF+otM5jMUi5L4So0SSicHplwOKOyfShdO1lariQo+Yy10vhO+qwoZkNFFKmxJ4Gp6ljJrRe+vMP3yJu910swNXqXcco1h0pJHDP6CZHEAAcAYMydwypYCDAkJRdX6Sts4xGtUDAKotIVs9Scpd4q/A0vYJmuXo5BSm7JOIEW81DVo77VR207ZEf8F23LB23T+X9VrbNh82nn6UAz7ASzSCeANZe0AnBctIqqbIoojLCIIBvoL5pJw31DH7Ry3VDKsoYinSii4ZyXxhBQM2Fwwt58D7NeoB8QkXfDvwRd2XtceOsCHkwc8KCINAk+vADJppQUFjZ0DsGVGT3uFn1KSjoPeKLoaYtvCO/rIlz3vH9O5FiU/nXny/pDT6YGKZngg0/Zg1GErrMbp6N5NHxJFi3N/4dRkj5IYf5ULxCmiPJpI4rIr4kHimhvbWfyLHOyOzQpNZZ57jXNy4nRGFLTR/0fWBqe7w==)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqtVE2P0zAQ/SujXNqgNmkPcIjaBbYCJKg4cSMcTDJNTB07+KNsVfW/M3aabNpyQltViT1vPPP8Zian6H3bJgeHURatTKF5ax9yyZtWaQuVYS3stGpg4peTXOayUNJYEJwea/ieS4ATNKbKYPKoXYGwRZzAeTYGPrNizxE2NZO30KZ2xR6+Kq25uTuGFrb81vrFyQo+On0kIJc/PCV8CmxL3DEnLJy8e8ksm8bdGkCjdVr2O4DfDvWRgtGN/JYC0SOkKVTTOotl1jv3hi3d+DngENILkey4sKinU26xiWH9AH6REN/Eqq36g3rDDE7jhMtCuBLN1NbcJIFEHN9RaNDWqjQDAyUfcac0fpA+CYoRCRSJsUeBiWpZwe2RSrK4w2rkVe2rdYG6LD5uH3EGpZI4iuurTdwDNBjpRJclg+UlhP914UnMZfIGm8kIKVEwciYivhoGLQlQ4hO8gkWyfD1yVHJDKgu0mAUmPXLuxRkYb5Ed8H8YL/7BeGx7Oa6hkLmk/yodBoo21BKtYBZpB7DikroKDvNGUeZ1HoVmyCNIO/ibZtJwy5X8pJVru9CWVeTpRB51+6wwhgw7Jgz2tnc/Q6/M0ZeWwKvmGZye0Wu78PIGexC6swdGxEnw/q6HOYUkt9DwMwhKxfS6GpY+KPHc45G8+6EYAV7reTjucf/uwUtSmvvTME1wDuISlVTwTqf0RiiyrtKR0tEs6r5l84b645dRkr5zoT8oXwBMHg2Tlke+jbwhj2prW5OlqZPtvkroYqnH3lK9nLgI46scnf8Cn22kBA==)

</div>

---

**관련 문서**

- [`<TransitionGroup>` API 참고](/api/built-in-components#transitiongroup)
