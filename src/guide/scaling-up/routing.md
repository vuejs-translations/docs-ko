# 라우팅 {#routing}

## 클라이언트 측 라우팅과 서버 측 라우팅 비교 {#client-side-vs-server-side-routing}

서버 측 라우팅은 사용자가 방문하는 URL 경로에 기반하여 서버가 응답을 보내는 것을 의미합니다. 전통적인 서버 렌더링 웹 앱에서 링크를 클릭하면, 브라우저는 서버로부터 HTML 응답을 받고 새 HTML로 전체 페이지를 다시 로드합니다.

그러나 [싱글 페이지 애플리케이션](https://developer.mozilla.org/en-US/docs/Glossary/SPA)(SPA)에서는 클라이언트 측 자바스크립트가 탐색을 가로채고 새 데이터를 동적으로 가져와 전체 페이지를 다시 로드하지 않고 현재 페이지를 업데이트할 수 있습니다. 이는 일반적으로 사용자가 오랜 시간 동안 많은 상호 작용을 수행해야 하는 실제 "애플리케이션"과 유사한 사용 사례에서 보다 빠른 사용자 경험을 제공합니다.

이러한 SPA에서 '라우팅'은 브라우저의 클라이언트 측에서 수행됩니다. 클라이언트 측 라우터는 [히스토리 API](https://developer.mozilla.org/en-US/docs/Web/API/History) 또는 [`hashchange` 이벤트](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)와 같은 브라우저 API를 사용하여 애플리케이션의 렌더링된 View를 관리할 책임이 있습니다.

## 공식 라우터 {#official-router}

대부분의 싱글 페이지 앱(SPA)의 경우 공식적으로 지원되는 [vue-router 라이브러리](https://github.com/vuejs/router)를 사용하는 것이 좋습니다.
자세한 내용은 vue-router의 [문서](https://router.vuejs.kr/)를 참조하십시오.

## 간단한 라우팅 구성하기 {#simple-routing-from-scratch}

매우 간단한 라우팅만 필요하여 모든 기능을 갖춘 라우터 라이브러리를 포함하지 않으려면 [동적인 컴포넌트](/guide/essentials/component-basics.html#dynamic-components)를 사용하고,
브라우저 [`hashchange` 이벤트](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)를 수신하거나 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History)를 사용하여 현재 컴포넌트 상태를 업데이트할 수 있습니다.

다음은 기본적인 예입니다:

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
  <a href="#/non-existent-path">잘못된 링크</a>
  <component :is="currentView" />
</template>
```

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNptU8FK5EAQ/ZUie0gGxmQFT0Mm4GGXPSzLnvay2UNv0prApLvpdGaEmQEFEVEQb85BPSmCePCgB1H8GK+J/2B1JhMzmlNSXe/Vq3pdPTbWhbCHGTV6hpsGMhYKUqoy4fksTgSXCsYg6UYXAp6ITNEQprAheQImkswa9IMntDq3HR3omu/p9f88U3W+jJYBv7j6zjMW1pjFQQXzWcBZqkAik6bQh7HPAEzH7JXS3XlEdGE8KgV8Nn3nBZmUlKnfREVIxoGsUcxCPrIHPCAq5syOSBp1NKFKkDD8NkTKzzhVlFFpmRoRRIRtUrMLVgf63ryLRm17SAYZRYW26thQKbDU0Z+YjhC/cNdq1JV4D5JVI//9pGKngzig1moHJhPtxD/9Xdg213Kd+ZXiZWKgaCIGRFGMAFwCEdrQ940vjm942kTXIR5MPiZLTxFRetoOYZyt0K3SJ7UisEGEF+ez/PoxPz6F/GrndedGM0uenpQzREIvTpHe8ME3wEGQ69SdGl1jsUx6QZcniFartvHnI6tesVZaNUsLr7l2rdS1r2sVEWPhvR7NirO74mo7v3yC4va5ONuFYn8GxclecXCfH+7nhxc2vMweXEc/qabY9A3Sg0LH)

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
  <a href="#/non-existent-path">잘못된 링크</a>
  <component :is="currentView" />
</template>
```

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNptUk1r1EAY/isv8ZBd2CYWegrZQA+KBxFPXoyHMZk1A5uZYTLpFroLFkSKBfHmHqwnpSAePOhBWvpjek36H/rO5KPbbS7JvDPP8z7P+3Hk7EvpHZTUCZywSBSTOoo5y6VQGp6JnMJMiRxczzeBAbr98/5bUer+3Ub3AS+EfipKnvaY7qKFxTwRvNCgkEkLmMJRzAFc3w2s9KSJiEmMV1Yg5ivDo4dWIKUzUs51w0uJJqNxcwZQVJeKdxFAUipFuX5JdBbAgvFULLy5SIhmgnsZKbIGiNnxY5UTkUv0lQZdkjbFK0YXdzq9UlPEa52xwtsQ84o5S+hodwzLpSntjfl3fXigmeMtSt6lb52SNH1ygBmfs0JTTtXINZaTjPB31J0A4qeRocQ61gDbHrCzwxUb+Gps5W1jQ79fAQw0zeWcaIoRQEggU3Q2jZ1HfuxEZj6hTyJYbj/acSHCjmsYwgXfoYe2FL0j0SDC6+/r6tdF9eUbVOfHN8e/DdPyzBgERyQErED6xhRiB3wEhX7v1Jk43Z6ahb5fQbbb2sbDNqvf3kFaW8sAb3OjB6l7j/daIsYyuvm8rs/+1ufvq5+XUP+5qs8+QH2yhvrrx/rTv+r0pDr94cH1+n/oyy2x1S1LDU0k)

</div>
