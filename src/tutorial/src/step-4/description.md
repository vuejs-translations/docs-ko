# 이벤트 리스너 {#event-listeners}

`v-on` 디렉티브를 사용하여 DOM 이벤트를 감지할 수 있습니다:

```vue-html
<button v-on:click="increment">{{ count }}</button>
```

자주 사용되기 때문에, `v-on`에는 축약 문법도 있습니다:

```vue-html
<button @click="increment">{{ count }}</button>
```

<div class="options-api">

여기서 `increment`는 `methods` 옵션을 사용하여 선언된 함수를 참조합니다:

<div class="sfc">

```js{7-12}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // 컴포넌트 상태 업데이트
      this.count++
    }
  }
}
```

</div>
<div class="html">

```js{7-12}
createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // 컴포넌트 상태 업데이트
      this.count++
    }
  }
})
```

</div>

메서드 내부에서 `this`를 사용하여 컴포넌트 인스턴스에 접근할 수 있습니다. 컴포넌트 인스턴스는 `data`에서 선언된 데이터 속성들을 노출합니다. 이러한 속성들을 변경하여 컴포넌트 상태를 업데이트할 수 있습니다.

</div>

<div class="composition-api">

<div class="sfc">

여기서 `increment`는 `<script setup>`에서 선언된 함수를 참조합니다:

```vue{6-9}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // 컴포넌트 상태 업데이트
  count.value++
}
</script>
```

</div>

<div class="html">

여기서 `increment`는 `setup()`에서 반환된 객체의 메서드를 참조합니다:

```js{$}
setup() {
  const count = ref(0)

  function increment(e) {
    // 컴포넌트 상태 업데이트
    count.value++
  }

  return {
    count,
    increment
  }
}
```

</div>

함수 내부에서 ref를 변경하여 컴포넌트 상태를 업데이트할 수 있습니다.

</div>

이벤트 핸들러는 인라인 표현식도 사용할 수 있으며, 수식어를 통해 일반적인 작업을 간소화할 수 있습니다. 이러한 세부 사항은 <a target="_blank" href="/guide/essentials/event-handling.html">가이드 - 이벤트 핸들링</a>에서 다룹니다.

이제 직접 `increment` <span class="options-api">메서드</span><span class="composition-api">함수</span>를 구현하고, `v-on`을 사용하여 버튼에 바인딩해 보세요.
