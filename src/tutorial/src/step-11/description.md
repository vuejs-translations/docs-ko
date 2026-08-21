# 컴포넌트(component) {#components}

지금까지는 단일 컴포넌트만 다루었습니다. 실제 Vue 애플리케이션은 일반적으로 중첩된 컴포넌트로 만들어집니다.

부모 컴포넌트는 템플릿(template)에서 다른 컴포넌트를 자식 컴포넌트로 렌더링(rendering)할 수 있습니다. 자식 컴포넌트를 사용하려면 먼저 이를 import해야 합니다:

<div class="composition-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'
```

</div>
</div>

<div class="options-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  }
}
```

또한 `components` 옵션을 사용하여 컴포넌트를 등록해야 합니다. 여기서는 객체 속성 단축 표기법을 사용하여 `ChildComp` 컴포넌트를 `ChildComp` 키로 등록하고 있습니다.

</div>
</div>

<div class="sfc">

그런 다음, 템플릿에서 다음과 같이 컴포넌트를 사용할 수 있습니다:

```vue-html
<ChildComp />
```

</div>

<div class="html">

```js
import ChildComp from './ChildComp.js'

createApp({
  components: {
    ChildComp
  }
})
```

또한 `components` 옵션을 사용하여 컴포넌트를 등록해야 합니다. 여기서는 객체 속성 단축 표기법을 사용하여 `ChildComp` 컴포넌트를 `ChildComp` 키로 등록하고 있습니다.

템플릿을 DOM에서 작성하고 있기 때문에, 브라우저의 파싱 규칙이 적용되며, 태그 이름에 대해 대소문자를 구분하지 않습니다. 따라서 자식 컴포넌트를 참조할 때는 케밥 케이스(kebab-case) 이름을 사용해야 합니다:

```vue-html
<child-comp></child-comp>
```

</div>


이제 직접 시도해 보세요 - 자식 컴포넌트를 import하고 템플릿에서 렌더링해 보세요.
