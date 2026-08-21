# SFC CSS 기능 {#sfc-css-features}

## Scoped CSS {#scoped-css}

`<style>` 태그에 `scoped` 속성이 있으면, 해당 CSS는 현재 컴포넌트(component)의 요소에만 적용됩니다. 이는 Shadow DOM에서 볼 수 있는 스타일 캡슐화와 유사합니다. 몇 가지 주의사항이 있지만, 별도의 폴리필(polyfill)이 필요하지 않습니다. PostCSS를 사용하여 다음과 같이 변환함으로써 구현됩니다:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

다음과 같이 변환됩니다:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### 자식 컴포넌트 루트 요소 {#child-component-root-elements}

`scoped`를 사용하면, 부모 컴포넌트의 스타일이 자식 컴포넌트로 누출되지 않습니다. 하지만, 자식 컴포넌트의 루트 노드는 부모의 scoped CSS와 자식의 scoped CSS 모두의 영향을 받습니다. 이는 부모가 레이아웃 목적으로 자식의 루트 요소를 스타일링할 수 있도록 의도된 동작입니다.

### 딥 셀렉터 {#deep-selectors}

`scoped` 스타일에서 셀렉터가 "딥"하게, 즉 자식 컴포넌트에까지 영향을 미치게 하려면 `:deep()` 의사 클래스(pseudo-class)를 사용할 수 있습니다:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

위 코드는 다음과 같이 컴파일됩니다:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
`v-html`로 생성된 DOM 콘텐츠는 scoped 스타일의 영향을 받지 않지만, 딥 셀렉터를 사용하여 여전히 스타일링할 수 있습니다.
:::

### 슬롯 셀렉터 {#slotted-selectors}

기본적으로, scoped 스타일은 `<slot/>`으로 렌더링(rendering)된 콘텐츠에 영향을 주지 않습니다. 이는 해당 콘텐츠가 전달한 부모 컴포넌트의 소유로 간주되기 때문입니다. 슬롯(slot) 콘텐츠를 명시적으로 타겟팅하려면 `:slotted` 의사 클래스를 사용하세요:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### 글로벌 셀렉터 {#global-selectors}

단일 규칙만 전역적으로 적용하고 싶다면, 별도의 `<style>`을 만들지 않고 `:global` 의사 클래스를 사용할 수 있습니다(아래 참고):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### 로컬 및 글로벌 스타일 혼합 {#mixing-local-and-global-styles}

동일한 컴포넌트 내에서 scoped 스타일과 non-scoped 스타일을 모두 포함할 수도 있습니다:

```vue
<style>
/* 글로벌 스타일 */
</style>

<style scoped>
/* 로컬 스타일 */
</style>
```

### Scoped 스타일 팁 {#scoped-style-tips}

- **Scoped 스타일이 클래스의 필요성을 없애지는 않습니다.** 브라우저가 다양한 CSS 셀렉터를 렌더링하는 방식 때문에, `p { color: red }`와 같은 셀렉터는 scoped(즉, 속성 셀렉터와 결합될 때)일 때 훨씬 느려집니다. 대신 `.example { color: red }`와 같이 클래스나 id를 사용하면 성능 저하를 사실상 없앨 수 있습니다.

- **재귀 컴포넌트에서 자손 셀렉터를 사용할 때 주의하세요!** `.a .b`와 같은 셀렉터가 있는 CSS 규칙에서, `.a`에 해당하는 요소가 재귀 자식 컴포넌트를 포함하면, 해당 자식 컴포넌트 내의 모든 `.b`가 이 규칙에 의해 매칭됩니다.

## CSS 모듈 {#css-modules}

`<style module>` 태그는 [CSS Modules](https://github.com/css-modules/css-modules)로 컴파일되며, 결과 CSS 클래스가 `$style` 키 아래의 객체로 컴포넌트에 노출됩니다:

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

결과 클래스는 충돌을 방지하기 위해 해시 처리되어, CSS가 현재 컴포넌트에만 적용되는 것과 동일한 효과를 얻습니다.

[CSS Modules 명세](https://github.com/css-modules/css-modules)에서 [글로벌 예외](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#exceptions) 및 [컴포지션](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#composition) 등 자세한 내용을 참고하세요.

### 커스텀 주입 이름 {#custom-inject-name}

`module` 속성에 값을 지정하여 주입된 클래스 객체의 프로퍼티(property) 키를 커스터마이즈할 수 있습니다:

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### Composition API와 함께 사용하기 {#usage-with-composition-api}

주입된 클래스는 `setup()` 및 `<script setup>`에서 `useCssModule` API를 통해 접근할 수 있습니다. 커스텀 주입 이름이 있는 `<style module>` 블록의 경우, `useCssModule`의 첫 번째 인자로 일치하는 `module` 속성 값을 전달합니다:

```js
import { useCssModule } from 'vue'

// setup() 범위 내에서...
// 기본값, <style module>의 클래스를 반환
useCssModule()

// 이름 지정, <style module="classes">의 클래스를 반환
useCssModule('classes')
```

- **예시**

```vue
<script setup lang="ts">
import { useCssModule } from 'vue'

const classes = useCssModule()
</script>

<template>
  <p :class="classes.red">red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

## CSS에서 `v-bind()` {#v-bind-in-css}

SFC `<style>` 태그는 `v-bind` CSS 함수를 사용하여 CSS 값을 동적 컴포넌트 상태에 연결하는 것을 지원합니다:

```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

이 문법은 [`<script setup>`](./sfc-script-setup)에서도 동작하며, JavaScript 표현식도 지원합니다(따옴표로 감싸야 함):

```vue
<script setup>
import { ref } from 'vue'
const theme = ref({
    color: 'red',
})
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

실제 값은 해시 처리된 CSS 커스텀 프로퍼티로 컴파일되므로 CSS는 여전히 정적입니다. 커스텀 프로퍼티는 인라인 스타일을 통해 컴포넌트의 루트 요소에 적용되며, 소스 값이 변경되면 반응적으로 업데이트됩니다.
