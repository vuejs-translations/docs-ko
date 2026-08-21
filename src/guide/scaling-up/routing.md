# 라우팅(routing) {#routing}

## 클라이언트 사이드 vs. 서버 사이드 라우팅 {#client-side-vs-server-side-routing}

서버 사이드 라우팅이란 사용자가 방문하는 URL 경로에 따라 서버가 응답을 보내는 것을 의미합니다. 전통적인 서버 렌더링 웹 앱에서 링크를 클릭하면, 브라우저는 서버로부터 HTML 응답을 받아 전체 페이지를 새로운 HTML로 다시 로드합니다.

하지만 [싱글 페이지 애플리케이션](https://developer.mozilla.org/ko/docs/Glossary/SPA) (SPA)에서는 클라이언트 사이드 JavaScript가 내비게이션을 가로채고, 동적으로 새로운 데이터를 가져와 전체 페이지를 새로 고침하지 않고 현재 페이지를 업데이트할 수 있습니다. 특히 사용자가 오랜 시간 동안 여러 상호작용을 수행하는 실제 "애플리케이션" 같은 사용 사례에서는, 이 방식이 더욱 빠른 사용자 경험을 제공합니다.

이러한 SPA에서 "라우팅"은 브라우저, 즉 클라이언트 사이드에서 이루어집니다. 클라이언트 사이드 라우터(router)는 [History API](https://developer.mozilla.org/ko/docs/Web/API/History)나 [`hashchange` 이벤트](https://developer.mozilla.org/ko/docs/Web/API/Window/hashchange_event)와 같은 브라우저 API를 사용하여 애플리케이션의 렌더링(rendering)된 뷰를 관리하는 역할을 합니다.

## 공식 라우터 {#official-router}

<!-- TODO update links -->
<div>
  <VueSchoolLink href="https://vueschool.io/courses/vue-router-4-for-everyone" title="무료 Vue Router 강좌">
    Vue School에서 무료 비디오 강좌 시청하기
  </VueSchoolLink>
</div>

Vue는 SPA를 구축하는 데 매우 적합합니다. 대부분의 SPA에서는 공식적으로 지원되는 [Vue Router 라이브러리](https://github.com/vuejs/router)를 사용하는 것이 권장됩니다. 자세한 내용은 Vue Router의 [문서](https://router.vuejs.org/)를 참고하세요.

## 간단한 라우팅 직접 구현하기 {#simple-routing-from-scratch}

아주 간단한 라우팅만 필요하고 기능이 풍부한 라우터 라이브러리를 도입하고 싶지 않다면, [동적 컴포넌트(component)](/guide/essentials/component-basics#dynamic-components)로 직접 구현할 수 있습니다. 브라우저의 [`hashchange` 이벤트](https://developer.mozilla.org/ko/docs/Web/API/Window/hashchange_event)를 감지하거나 [History API](https://developer.mozilla.org/ko/docs/Web/API/History)를 이용해 현재 컴포넌트 상태를 업데이트하는 방식입니다.

다음은 최소한의 예시입니다:

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

[Playground에서 실행해보기](https://play.vuejs.org/#eNptUk1vgkAQ/SsTegAThZp4MmhikzY9mKanXkoPWxjLRpgly6JN1P/eWb5Eywlm572ZN2/m5GyKwj9U6CydsIy1LAyUaKpiHZHMC6UNnEDjbgqxyovKYAIX2GmVg8sktwe9qhzbdz+wga15TW++VWX6fB3dAt6UeVEVJT2me2hhEcWKSgOamVjCCk4RAbiBu6xbT5tI2ML8VDeI6HLlxZXWSOZdmJTJPJB3lJSoo5+pWBipyE9FmU4soU2IJHk+MGUrS4OE2nMtIk4F/aA7BW8Cq3WjYlDbP4isQu4wVp0F1Q1uFH1IPDK+c9cb1NW8B03tyJ//uvhlJmP05hM4n60TX/bb2db0CoNmpbxMDgzmRSYMcgQQCkjZhlXkPASRs7YmhoFYw/k+WXvKiNrTcQgpmuFv7ZOZFSyQ4U9a7ZFgK2lvSTXFDqmIQbCUJTMHFkQOBAwKg16kM3W6O7K3eSs+nbeK+eee1V/XKK0dY4Q3vLhR6uJxMUK8/AFKaB6k)

</div>

<div class="options-api">

```vue
<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

[Playground에서 실행해보기](https://play.vuejs.org/#eNptUstO6zAQ/ZVR7iKtVJKLxCpKK3Gli1ggxIoNZmGSKbFoxpEzoUi0/87YeVBKNonHPmfOmcdndN00yXuHURblbeFMwxtFpm6sY7i1NcLW2RriJPWBB8bT8/WL7Xh6D9FPwL3lG9tROWHGiwGmqLDUMjhhYgtr+FQEEKdxFqRXfaR9YrkKAoqOnocfQaDEre523PNKzXqx7M8ADrlzNEYAReccEj9orjLYGyrtPtnZQrOxlFS6rXqgZJdPUC5s3YivMhuTDCkeDe6/dSalvognrkybnIgl7c4UuLhcwuHgS3v2/7EPvzRruRXJ7/SDU12W/98l451pGQndIvaWi0rTK8YrEPx64ymKFQOce5DOzlfs4cdlkA+NzdNpBSRgrJudZpQIINdQOdyuVfQnVdHGzydP9QYO549hXIII45qHkKUL/Ail8EUjBgX+z9k3JLgz9OZJgeInYElAkJlWmCcDUBGkAsrTyWS0isYV9bv803x1OTiWwzlrWtxZ2lDGDO90mWepV3+vZojHL3QQKQE=)

</div>
