# 자주 묻는 질문 {#자주 묻는 질문}

## Vue는 누가 유지 관리하나요? {#who-maintains-vue}

Vue는 독립적인 커뮤니티 중심 프로젝트입니다. 2014년에 [Evan You](https://twitter.com/youyuxi)가 개인 부업 프로젝트로 만들었습니다. 현재 Vue는 [전 세계의 정규직 및 자원 봉사자들로 구성된 팀](/about/team)에 의해 활발하게 유지 관리되고 있으며, Evan은 프로젝트 리더로 활동하고 있습니다. 이 [다큐멘터리](https://www.youtube.com/watch?v=OrxmtDw4pVI)에서 Vue에 대한 자세한 이야기를 확인할 수 있습니다.

Vue의 개발은 주로 후원을 통해 이루어지며, 2016년부터 재정적으로 지속 가능한 상태로 유지되고 있습니다. 귀하 또는 귀하의 비즈니스가 Vue의 혜택을 받는다면 [후원](/sponsor/)을 통해 Vue의 개발을 지원하는 것을 고려해 보세요!

## Vue 2와 Vue 3의 차이점은 무엇인가요? {#what-s-the-difference-between-vue-2-and-vue-3}

Vue 3는 Vue의 최신 주 버전입니다. 여기에는 텔레포트, 서스펜스 및 템플릿당 여러 루트 앨리먼트와 같이 Vue 2에는 없는 새로운 기능이 포함되어 있습니다. 또한 Vue 2와 호환되지 않는 중요한 변경 사항도 포함되어 있습니다. 자세한 내용은 [Vue 3 마이그레이션 가이드](https://v3-migration.vuejs.org/)에 문서화되어 있습니다.

차이점에도 불구하고 대부분의 Vue API는 두 주요 버전 간에 공유되므로 대부분의 Vue 2 지식은 Vue 3에서도 계속 작동합니다. 특히 컴포지션 API는 원래 Vue 3 전용 기능이었지만 이제 Vue 2로 백포트되어 [Vue 2.7](https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01)에서 사용할 수 있습니다.

일반적으로 Vue 3는 더 작은 번들 크기, 더 나은 성능, 더 나은 확장성 및 더 나은 TypeScript/IDE 지원을 제공합니다. 오늘 새 프로젝트를 시작하는 경우 Vue 3를 권장합니다. 현재로서는 Vue 2를 고려해야 하는 몇 가지 이유가 있습니다:

- IE11을 지원해야 합니다. Vue 3는 최신 JavaScript 기능을 활용하며 IE11을 지원하지 않습니다.

- Nuxt 또는 Vuetify와 같은 주요 에코시스템 프로젝트가 Vue 3의 안정적인 버전을 출시하기를 기다리고 있습니다. 베타 단계의 소프트웨어를 사용하고 싶지 않다면 이는 합리적인 선택입니다. 하지만 이미 안정된 다른 Vue 3 컴포넌트 라이브러리인 [Quasar](https://quasar.dev/), [Naive UI](https://www.naiveui.com/), [Element Plus](https://element-plus.org/)가 있다는 점에 유의하세요.

기존 Vue 2 앱을 Vue 3로 마이그레이션하려는 경우 [마이그레이션 가이드](https://v3-migration.vuejs.org/)를 참조하세요.

## Vue 2가 계속 지원되나요? {#is-vue-2-still-supported}

2022년 7월에 출시된 Vue 2.7은 Vue 2 버전 범위의 마지막 마이너 릴리스입니다. Vue 2는 이제 유지 관리 모드로 전환되어 더 이상 새로운 기능을 제공하지 않지만 2.7 릴리스 날짜부터 18개월 동안 중요한 버그 수정 및 보안 업데이트가 계속 제공됩니다. 즉, **Vue 2는 2023년 12월 31일에 수명이 종료됩니다**.

이를 통해 대부분의 생태계가 Vue 3로 마이그레이션할 수 있는 충분한 시간을 확보할 수 있을 것으로 생각합니다. 하지만 보안 및 규정 준수 요건을 충족해야 하는 상황에서 이 일정까지 업그레이드할 수 없는 팀이나 프로젝트가 있을 수 있다는 점도 잘 알고 있습니다. 이러한 요구 사항이 있는 팀을 위해 업계 전문가와 협력하여 Vue 2에 대한 연장 지원을 제공하고 있습니다. 2023년 말 이후에도 Vue 2를 사용해야 하는 팀이라면 미리 계획을 세우고 [Vue 2 Extended LTS](https://v2.vuejs.org/lts/)에 대해 자세히 알아보세요.

## Vue는 어떤 라이선스를 사용하나요? {#what-license-does-vue-use}

Vue는 [MIT 라이선스](https://opensource.org/licenses/MIT)에 따라 공개된 무료 오픈소스 프로젝트입니다.

## Vue는 어떤 브라우저를 지원하나요? {#what-browsers-does-vue-support}

최신 버전의 Vue(3.x)는 [기본 ES2015를 지원하는 브라우저](https://caniuse.com/es6)만 지원합니다. IE11은 제외됩니다. Vue 3.x는 레거시 브라우저에서 폴리필링할 수 없는 ES2015 기능을 사용하므로 레거시 브라우저를 지원해야 하는 경우 대신 Vue 2.x를 사용해야 합니다.

## Vue는 신뢰할 수 있나요? {#is-vue-reliable}

Vue는 성숙하고 수많은 테스트를 거친 프레임워크입니다. 오늘날 프로덕션 환경에서 가장 널리 사용되는 자바스크립트 프레임워크 중 하나로, 전 세계 150만 명 이상의 사용자가 사용 중이며 npm에서 한 달에 천만 번 가까이 다운로드됩니다.

Vue는 위키미디어 재단, NASA, Apple, Google, Microsoft, GitLab, Zoom, Tencent, Weibo, Bilibili, Kuaishou 등 전 세계의 유명 조직에서 다양한 규모로 프로덕션에 사용되고 있습니다.

## Vue가 빠르나요? {#is-vue-fast}

Vue 3는 가장 성능이 뛰어난 메인스트림 프론트엔드 프레임워크 중 하나이며 대부분의 웹 애플리케이션 사용 사례를 수동으로 최적화할 필요 없이 쉽게 처리합니다.

스트레스 테스트 시나리오에서 Vue는 [js-framework-benchmark](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html)에서 React 및 Angular를 상당한 차이로 능가합니다. 또한 벤치마크에서 가장 빠른 프로덕션 수준의 비-Virtual-DOM 프레임워크와도 나란히 경쟁합니다.

위와 같은 합성 벤치마크는 전용 최적화가 적용된 원시 렌더링 성능에 중점을 두므로 실제 성능 결과를 완전히 대표하지 못할 수 있습니다. 페이지 로드 성능에 대해 더 자세히 알고 싶으시다면 [WebPageTest](https://www.webpagetest.org/lighthouse) 또는 [PageSpeed Insights](https://pagespeed.web.dev/)를 사용하여 바로 이 웹사이트를 테스트해 보시기 바랍니다. 이 웹사이트는 SSG 사전 렌더링, 전체 페이지 하이드레이션 및 SPA 클라이언트 측 탐색 기능을 갖춘 Vue 자체로 구동됩니다. 느린 4G 네트워크에서 4배 CPU 스로틀링으로 에뮬레이트된 Moto G4에서 성능 100점을 받았습니다.

[렌더링 메커니즘](/guide/extras/rendering-mechanism.html) 섹션에서 Vue가 런타임 성능을 자동으로 최적화하는 방법에 대해 자세히 알아볼 수 있으며, 특히 까다로운 경우 Vue 앱을 최적화하는 방법은 [성능 최적화 가이드](/guide/best-practices/performance.html)에서 확인할 수 있습니다.

## Vue는 가볍나요? {#is-vue-lightweight}

빌드 도구를 사용할 때 Vue의 많은 API는 ["트리 흔들기 가능"](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)입니다. 예를 들어, 기본 제공 `<Transition>` 컴포넌트를 사용하지 않으면 최종 프로덕션 번들에 포함되지 않습니다.

최소한의 API만 사용하는 헬로 월드 Vue 앱의 기본 크기는 축소 및 브로틀리 압축을 통해 약 **16KB**에 불과합니다. 애플리케이션의 실제 크기는 프레임워크에서 사용하는 선택적 기능의 수에 따라 달라집니다. 드물지만 앱이 Vue가 제공하는 모든 기능을 사용하는 경우 총 런타임 크기는 약 **27KB**입니다.

빌드 도구 없이 Vue를 사용하면 트리 흔들림이 사라질 뿐만 아니라 템플릿 컴파일러를 브라우저로 전송해야 합니다. 이렇게 하면 크기가 약 **41KB**로 부풀어 오릅니다. 따라서 빌드 단계 없이 주로 점진적 개선을 위해 Vue를 사용하는 경우 [petite-vue](https://github.com/vuejs/petite-vue)(**6KB**에 불과)를 대신 사용하는 것이 좋습니다.

Svelte와 같은 일부 프레임워크는 단일 컴포넌트 시나리오에서 매우 가벼운 출력을 생성하는 컴파일 전략을 사용합니다. 그러나 [우리의 연구](https://github.com/yyx990803/vue-svelte-size-analysis)에 따르면 애플리케이션의 컴포넌트 수에 따라 크기 차이가 크게 달라지는 것으로 나타났습니다. Vue는 기준 크기가 더 무겁지만 컴포넌트당 생성되는 코드가 더 적습니다. 실제 시나리오에서는 Vue 앱이 더 가벼워질 수 있습니다.


## Vue는 확장되나요? {#does-vue-scale}

예. Vue는 단순한 사용 사례에만 적합하다는 일반적인 오해에도 불구하고 대규모 애플리케이션을 완벽하게 처리할 수 있습니다:

- [싱글 파일 컴포넌트](/guide/scaling-up/sfc)는 애플리케이션의 여러 부분을 개별적으로 개발할 수 있는 모듈화된 개발 모델을 제공합니다.

- [컴포지션 API](/가이드/재사용성/컴포저블)는 최고 수준의 TypeScript 통합을 제공하며 복잡한 로직을 구성, 추출 및 재사용할 수 있는 깔끔한 패턴을 지원합니다.

- [포괄적인 툴링 지원](/guide/scaling-up/tooling.html)은 애플리케이션이 성장함에 따라 원활한 개발 환경을 보장합니다.

- 진입 장벽이 낮고 문서화가 우수하여 신규 개발자의 온보딩 및 교육 비용을 절감할 수 있습니다.

## Vue에 기여하려면 어떻게 해야 하나요? {#how-do-i-contribute-to-vue}

관심을 가져 주셔서 감사합니다! [커뮤니티 가이드](/about/community-guide.html)를 확인하시기 바랍니다.

## 옵션 API와 컴포지션 API 중 어떤 것을 사용해야 하나요? {#should-i-use-options-api-or-composition-api}

Vue를 처음 사용하는 경우 두 스타일 간의 개략적인 비교를 제공합니다 [여기](/guide/introduction.html#which-to-chose).

이전에 옵션 API를 사용했고 현재 컴포지션 API를 평가 중인 경우 [이 FAQ](/guide/extras/composition-api-faq)를 확인하세요.

## Vue에서 자바스크립트 또는 타입스크립트를 사용해야 하나요? {#should-i-use-javascript-or-typescript-with-vue}

Vue 자체는 TypeScript로 구현되어 있고 최고 수준의 TypeScript 지원을 제공하지만, 사용자가 TypeScript를 사용해야 하는지에 대한 의견을 강요하지는 않습니다.

TypeScript 지원은 Vue에 새로운 기능이 추가될 때 중요한 고려 사항입니다. TypeScript를 염두에 두고 설계된 API는 일반적으로 TypeScript를 직접 사용하지 않더라도 IDE와 린터가 더 쉽게 이해할 수 있습니다. 모두가 이깁니다. 또한 Vue API는 JavaScript와 TypeScript 모두에서 가능한 한 동일한 방식으로 작동하도록 설계되었습니다.

TypeScript를 채택하려면 온보딩 복잡성과 장기적인 유지보수성 향상 사이에서 절충점을 찾아야 합니다. 이러한 절충안이 정당화될 수 있는지 여부는 팀의 배경과 프로젝트 규모에 따라 달라질 수 있지만 Vue는 실제로 이러한 결정을 내리는 데 영향을 미치는 요인이 아닙니다.

## Vue는 웹 컴포넌트와 어떻게 비교하나요? {#how-does-vue-compare-to-web-components}

Vue는 웹 컴포넌트가 기본적으로 제공되기 전에 만들어졌으며, Vue 디자인의 일부 측면(예: 슬롯)은 웹 컴포넌트 모델에서 영감을 얻었습니다.

웹 컴포넌트 사양은 사용자 정의 앨리먼트를 정의하는 데 중점을 두기 때문에 상대적으로 낮은 수준입니다. 프레임워크인 Vue는 효율적인 DOM 렌더링, 반응형 상태 관리, 툴링, 클라이언트 측 라우팅 및 서버 측 렌더링과 같은 추가적인 상위 수준의 문제를 해결합니다.

Vue는 네이티브 사용자 정의 앨리먼트를 사용하거나 내보내는 기능도 완벽하게 지원합니다. 자세한 내용은 [Vue 및 웹 컴포넌트 가이드](/guide/extras/web-components)를 참조하세요.


<!-- ## TODO How does Vue compare to React? -->

<!-- ## TODO How does Vue compare to Angular? -->
