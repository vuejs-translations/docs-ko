# 렌더 함수 API {#render-function-apis}

## h() {#h}

가상 DOM 노드(vnode)를 생성합니다.

- **타입**

  ```ts
  // 전체 시그니처
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // props 생략
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > 타입은 가독성을 위해 단순화되었습니다.

- **세부사항**

  첫 번째 인자는 문자열(네이티브 엘리먼트용) 또는 Vue 컴포넌트 정의가 될 수 있습니다. 두 번째 인자는 전달할 props이고, 세 번째 인자는 자식(children)입니다.

  컴포넌트 vnode를 생성할 때, 자식은 슬롯 함수로 전달되어야 합니다. 컴포넌트가 기본 슬롯만 기대한다면 단일 슬롯 함수를 전달할 수 있습니다. 그렇지 않으면 슬롯을 슬롯 함수 객체로 전달해야 합니다.

  편의를 위해, children이 슬롯 객체가 아닐 때는 props 인자를 생략할 수 있습니다.

- **예시**

  네이티브 엘리먼트 생성:

  ```js
  import { h } from 'vue'

  // type을 제외한 모든 인자는 선택 사항입니다.
  h('div')
  h('div', { id: 'foo' })

  // props에서 속성과 프로퍼티 모두 사용할 수 있습니다.
  // Vue는 자동으로 올바른 할당 방식을 선택합니다.
  h('div', { class: 'bar', innerHTML: 'hello' })

  // class와 style은 템플릿에서처럼
  // 객체/배열 값을 지원합니다.
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // 이벤트 리스너는 onXxx로 전달해야 합니다.
  h('div', { onClick: () => {} })

  // children은 문자열이 될 수 있습니다.
  h('div', { id: 'foo' }, 'hello')

  // props가 없을 때는 생략할 수 있습니다.
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // children 배열에는 vnode와 문자열이 혼합될 수 있습니다.
  h('div', ['hello', h('span', 'hello')])
  ```

  컴포넌트 생성:

  ```js
  import Foo from './Foo.vue'

  // props 전달
  h(Foo, {
    // some-prop="hello"와 동일
    someProp: 'hello',
    // @update="() => {}"와 동일
    onUpdate: () => {}
  })

  // 단일 기본 슬롯 전달
  h(Foo, () => 'default slot')

  // 명명된 슬롯 전달
  // 슬롯 객체가 props로 처리되지 않도록
  // `null`이 필요합니다.
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **참고** [가이드 - 렌더 함수 - VNode 생성](/guide/extras/render-function#creating-vnodes)

## mergeProps() {#mergeprops}

특정 props에 대해 특별한 처리를 하며 여러 props 객체를 병합합니다.

- **타입**

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **세부사항**

  `mergeProps()`는 다음과 같은 props에 대해 특별한 처리를 하며 여러 props 객체를 병합할 수 있습니다:

  - `class`
  - `style`
  - `onXxx` 이벤트 리스너 - 동일한 이름의 여러 리스너는 배열로 병합됩니다.

  병합 동작이 필요 없고 단순히 덮어쓰기를 원한다면, 네이티브 객체 스프레드를 대신 사용할 수 있습니다.

- **예시**

  ```js
  import { mergeProps } from 'vue'

  const one = {
    class: 'foo',
    onClick: handlerA
  }

  const two = {
    class: { bar: true },
    onClick: handlerB
  }

  const merged = mergeProps(one, two)
  /**
   {
     class: 'foo bar',
     onClick: [handlerA, handlerB]
   }
   */
  ```

## cloneVNode() {#clonevnode}

vnode를 복제합니다.

- **타입**

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **세부사항**

  원본과 병합할 추가 props와 함께 복제된 vnode를 반환합니다.

  vnode는 한 번 생성되면 불변으로 간주되어야 하며, 기존 vnode의 props를 변경해서는 안 됩니다. 대신, 다른/추가 props로 복제해야 합니다.

  vnode는 특별한 내부 속성을 가지고 있으므로, 단순한 객체 스프레드로 복제할 수 없습니다. `cloneVNode()`는 대부분의 내부 로직을 처리합니다.

- **예시**

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## isVNode() {#isvnode}

값이 vnode인지 확인합니다.

- **타입**

  ```ts
  function isVNode(value: unknown): boolean
  ```

## resolveComponent() {#resolvecomponent}

등록된 컴포넌트를 이름으로 수동으로 해석할 때 사용합니다.

- **타입**

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **세부사항**

  **참고: 컴포넌트를 직접 import할 수 있다면 이 함수를 사용할 필요가 없습니다.**

  `resolveComponent()`는 올바른 컴포넌트 컨텍스트에서 해석하기 위해<span class="composition-api"> `setup()` 또는</span> 렌더 함수 내부에서 호출되어야 합니다.

  컴포넌트를 찾을 수 없으면 런타임 경고가 발생하고, 이름 문자열이 반환됩니다.

- **예시**

  <div class="composition-api">

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    setup() {
      const ButtonCounter = resolveComponent('ButtonCounter')

      return () => {
        return h(ButtonCounter)
      }
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```

  </div>

- **참고** [가이드 - 렌더 함수 - 컴포넌트](/guide/extras/render-function#components)

## resolveDirective() {#resolvedirective}

등록된 디렉티브를 이름으로 수동으로 해석할 때 사용합니다.

- **타입**

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **세부사항**

  **참고: 디렉티브를 직접 import할 수 있다면 이 함수를 사용할 필요가 없습니다.**

  `resolveDirective()`는 올바른 컴포넌트 컨텍스트에서 해석하기 위해<span class="composition-api"> `setup()` 또는</span> 렌더 함수 내부에서 호출되어야 합니다.

  디렉티브를 찾을 수 없으면 런타임 경고가 발생하고, 함수는 `undefined`를 반환합니다.

- **참고** [가이드 - 렌더 함수 - 커스텀 디렉티브](/guide/extras/render-function#custom-directives)

## withDirectives() {#withdirectives}

vnode에 커스텀 디렉티브를 추가할 때 사용합니다.

- **타입**

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Directive, value, argument, modifiers]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **세부사항**

  기존 vnode를 커스텀 디렉티브로 감쌉니다. 두 번째 인자는 커스텀 디렉티브의 배열입니다. 각 커스텀 디렉티브는 `[Directive, value, argument, modifiers]` 형태의 배열로 표현됩니다. 배열의 마지막 요소들은 필요하지 않으면 생략할 수 있습니다.

- **예시**

  ```js
  import { h, withDirectives } from 'vue'

  // 커스텀 디렉티브
  const pin = {
    mounted() {
      /* ... */
    },
    updated() {
      /* ... */
    }
  }

  // <div v-pin:top.animate="200"></div>
  const vnode = withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
  ```

- **참고** [가이드 - 렌더 함수 - 커스텀 디렉티브](/guide/extras/render-function#custom-directives)

## withModifiers() {#withmodifiers}

이벤트 핸들러 함수에 내장 [`v-on` 수식어](/guide/essentials/event-handling#event-modifiers)를 추가할 때 사용합니다.

- **타입**

  ```ts
  function withModifiers(fn: Function, modifiers: ModifierGuardsKeys[]): Function
  ```

- **예시**

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // v-on:click.stop.prevent와 동일
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **참고** [가이드 - 렌더 함수 - 이벤트 수식어](/guide/extras/render-function#event-modifiers)
