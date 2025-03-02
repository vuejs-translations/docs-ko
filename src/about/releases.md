---
outline: deep
---

<script setup>
import { ref, onMounted } from 'vue'

const version = ref()

onMounted(async () => {
  const res = await fetch('https://api.github.com/repos/vuejs/core/releases/latest')
  version.value = (await res.json()).name
})
</script>

# 릴리즈 {#releases}

<p v-if="version">
현재 Vue의 최신 안정 버전은 <strong>{{ version }}</strong>입니다.
</p>
<p v-else>
최신 버전 확인 중...
</p>

지난 릴리즈의 전체 변경 로그는 [GitHub](https://github.com/vuejs/core/blob/main/CHANGELOG.md)에서 확인할 수 있습니다.

## 버전 3.5 (현재 버전) {#3-5}
- Vue 3.5은 2024년 9월 3일에 릴리스되었습니다.
- 실제 3.5 릴리즈 내역은 [여기](https://github.com/vuejs/core/blob/main/CHANGELOG.md)에서 확인할수 있습니다.
- Reactivity: 버전 카운팅·이중 연결 리스트로 구조를 재설계해 성능을 높이고, 배열 추적을 최적화했습니다. 새 API(예: `onEffectCleanup`)와 워치(`watch`) 일시중지·재개 기능도 추가되었습니다.
- SSR: `useId()`와 `app.config.idPrefi`x로 ID 관리가 유연해졌으며, 일부 컴포넌트의 지연(lazy) 하이드레이션과 `data-allow-mismatch` 지원이 도입되었습니다.
- Custom Element: `useHost()`, `useShadowRoot()` 등으로 커스텀 엘리먼트 호스트·섀도우 루트 접근이 쉬워졌으며, `defineCustomElement()` 관련 설정 옵션이 크게 확장되었습니다.
- Teleport: 텔레포트 시점을 늦출 수 있는 Deferred Teleport가 추가되고, Transition 안에 Teleport를 직접 배치해 트랜지션을 결합할 수 있게 되었습니다.
- Misc: `useTemplateRef()`, `app.onUnmount()` 등이 새로 도입되었고, `app.config.throwUnhandledErrorInProduction`으로 프로덕션 에러 처리를 세밀하게 제어할 수 있습니다.
- Internals: `CustomRefs`의 값 캐시 로직 도입으로 내부 성능이 향상되었고, 언어 툴을 위한 추가 타입 옵션이 마련되었습니다.

## 버전 3.4 {#3-4}
- Vue 3.4은 2023년 12월 29일에 릴리스되었습니다.
- 실제 3.4 릴리즈 내역은 [여기](https://github.com/vuejs/core/blob/main/changelogs/CHANGELOG-3.4.md)에서 확인할수 있습니다.
- `defineModel`의 `propDefaults` 지원. `defineModel`에서 `propDefaults`를 사용할 수 있도록 개선되어, 기본값을 명시적으로 지정할 수 있습니다. 컴파일러에서 `defineProps`를 위한 `$default` 추가
- `defineProps`의 기본값을 보다 직관적으로 설정할 수 있도록 `$default` 키워드가 추가되었습니다.
- `useAttrs` 반환 값이 Proxy로 변경. `useAttrs()`의 반환 값이 Proxy로 변경되어, 반응형 속성 감지를 개선하고 확장성을 높였습니다.
- 서버 사이드 렌더링(SSR)에서 `v-once` 최적화 지원.  SSR에서 `v-once`를 사용할 경우, 정적인 렌더링을 더욱 효과적으로 활용할 수 있도록 개선되었습니다.
- `@vue/reactivity-transform` 제거.

## 버전 3.3 {#3-3}
- Vue 3.3은 2023년 5월 1일에 릴리스되었습니다.
- 실제 3.3 릴리즈 내역은 [여기](https://github.com/vuejs/core/blob/main/changelogs/CHANGELOG-3.3.md)에서 확인할수 있습니다.
- `defineModel` 매크로가 추가되어, `v-model`을 더욱 간편하게 선언하고 사용할 수 있습니다.
- `defineProps`, `defineEmits`, `defineExpose`, `defineSlots` 등 SFC Script Setup 매크로들이 전반적으로 개선되었습니다.
- `<script setup>` 사용 시 타입 추론 및 정의가 보다 유연해졌습니다.
- 새로운 매크로와 기능들이 DevTools와 더 긴밀하게 연동될 수 있도록 업데이트되었습니다.
- SSR 환경에서의 동작 방식을 좀 더 유연하게 다룰 수 있는 개선 사항들이 반영되었습니다.

## 버전 3.2 {#3-2}
- Vue 3.2은 2021년 8월 9일에 릴리스되었습니다.
- 실제 3.2 릴리즈 내역은 [여기](https://github.com/vuejs/core/blob/main/changelogs/CHANGELOG-3.2.md)에서 확인할수 있습니다.
- `<script setup>` 정식 지원.  SFC 내부에서 setup() 로직을 보다 간결하게 작성할 수 있으며, 자동으로 컴파일 단계에서 분리되는 방식을 제공합니다.
- SFC Script Setup 매크로. `defineProps`, `defineEmits`, `defineExpose` 등의 매크로를 통해, props, 이벤트, 컴포넌트 인터페이스를 명시적으로 선언할 수 있습니다.
- 동적 스타일 바인딩 (`v-bind`) `<style>` 블록 안에서 변수를 바인딩해 테마 변경이나 조건부 스타일을 간편하게 적용할 수 있도록 지원합니다.
- 새로운 디렉티브 `v-memo`. 동일한 값(또는 props)인 경우 렌더링을 최소화하여, 컴포넌트의 불필요한 재렌더링을 줄입니다.
- `v-model` 확장. 여러 개의 v-model을 한 컴포넌트에서 동시에 제어할 수 있게 되어, 복합 폼 요소나 사용자 입력 처리 시 유연성이 높아졌습니다.
- DevTools 개선. 새롭게 추가된 `<script setup>` 구조나 매크로들이 DevTools에서 구분되어 표시되며, 컴포넌트 상태 추적이 더욱 직관적입니다.
- SSR(서버 사이드 렌더링) 기능 강화. Suspense, Teleport 같은 고급 기능의 SSR 적용이 더 수월해졌으며, 부분적인 하이드레이션 등 추가 기능도 점진적으로 지원하고 있습니다.
- `defineAsyncComponent` 개선. 비동기 컴포넌트를 선언할 때 로딩 지연 처리, 에러 핸들링이 간소화되어, 코드 분할(코드 스플리팅)이 좀 더 유연해졌습니다.
- TypeScript 호환성 강화. SFC의 `<script setup>`에서 타입 정의, 컴포넌트 옵션 추론 등이 개선되어, IDE 자동 완성과 타입 검증 정확도가 높아졌습니다.

## 버전 3.1 {#3-1}
- Vue 3.1은 2021년 6월 7일에 릴리스되었습니다.
- 실제 3.1 릴리즈 내역은 [여기](https://github.com/vuejs/core/blob/main/changelogs/CHANGELOG-3.1.md)에서 확인할수 있습니다.
- 컴포지션 API 개선: 기존 Composition API의 활용성을 높이는 기능들이 추가되어, setup() 내부에서 상태를 다루고 재사용하는 방식이 한층 편리해졌습니다.
- `emits` 옵션 확장: 컴포넌트에서 `props`처럼 명시적으로 `emits`를 선언할 수 있으며, 이벤트 타입을 보다 직관적으로 관리할 수 있게 되었습니다.
- DevTools 연동 향상: 새롭게 적용된 API 변경 사항이 DevTools에서도 원활히 표시되도록 기능이 보강되었습니다.
- SSR 측면 업데이트: 서버사이드 렌더링 시 일부 새로운 기능 및 옵션이 제공되어, 동적 콘텐츠 처리와 성능 제어가 더욱 유연해졌습니다.
- TypeScript 지원 강화: Vue 내부 타입 정의가 개선되어 에디터 자동 완성 및 타입 체킹 환경이 보다 정교해졌습니다.

## 버전 3.0 {#3-0}
- Vue 3.0은 2020년 9월 18일에 릴리스되었습니다.
- 실제 3.0 릴리즈 내역은 [여기](https://github.com/vuejs/core/blob/main/changelogs/CHANGELOG-3.0.md)에서 확인할수 있습니다.
- Composition API 도입: `setup()` 함수를 통해 더 유연한 컴포넌트 구성 및 코드 재사용이 가능해졌습니다.
- 새로운 반응성 시스템: 내부 구조가 개선되어 더 가볍고 빠른 반응성 처리가 제공됩니다.
- Fragments 지원: 컴포넌트에서 루트 요소 없이 여러 자식을 반환할 수 있습니다.
- Teleport: 특정 DOM 위치로 컴포넌트 콘텐츠를 렌더링하는 기능이 추가되었습니다.
- Suspense: 비동기 컴포넌트 렌더링 시 로딩 상태를 보다 쉽게 처리할 수 있습니다.
- 새로운 전역 API(createApp): 전역 설정과 마운트 과정을 보다 명확하게 분리할 수 있게 되었습니다.
- `v-model` 개선: 인자 방식이 간소화되는 등 양방향 데이터 바인딩의 사용성이 높아졌습니다.
- TypeScript 통합 강화: Vue 3.0 구조에 맞춘 타입 정의로 개발자 경험이 향상되었습니다.



## 릴리즈 주기 {#release-cycle}

Vue에는 고정된 릴리스 주기가 없습니다.

- 패치 릴리스는 필요에 따라 릴리스됩니다.

- 마이너 릴리스에는 항상 새로운 기능이 포함되며, 일반적으로 3~6개월의 간격이 있습니다. 마이너 릴리스는 항상 베타 사전 릴리스 단계를 거칩니다.

- 주요 릴리스는 미리 발표되며, 초기 논의 단계와 알파/베타 사전 릴리스 단계를 거칩니다.

## 시맨틱 버전 관리 예외 사례 {#semantic-versioning-edge-cases}

Vue 릴리스는 몇 가지 예외 케이스와 함께 [시맨틱 버전 관리](https://semver.org/)를 따릅니다.

### 타입스크립트 정의 {#typescript-definitions}

**마이너** 버전 간에 TypeScript 정의에 호환되지 않는 변경 사항이 적용될 수 있습니다. 그 이유는 다음과 같습니다:

1. TypeScript 자체에서 마이너 버전 간에 호환되지 않는 변경 사항을 제공하는 경우가 있으며, 최신 버전의 TypeScript를 지원하기 위해 유형을 조정해야 할 수도 있습니다.

2. 최신 버전의 TypeScript에서만 사용할 수 있는 기능을 도입해야 하는 경우가 있어 최소 요구되는 TypeScript 버전이 높아질 수 있습니다.

TypeScript를 사용하는 경우 현재 부 버전을 잠그는 semver 범위를 사용하고 새로운 부 버전의 Vue가 릴리스될 때 수동으로 업그레이드할 수 있습니다.

### 이전 런타임과의 컴파일된 코드 호환성 {#compiled-code-compatibility-with-older-runtime}

최신 **부** 버전의 Vue 컴파일러는 이전 부 버전에서 Vue 런타임과 호환되지 않는 코드를 생성할 수 있습니다. 예를 들어, Vue 3.2 컴파일러에서 생성된 코드가 Vue 3.1의 런타임에서 사용되는 경우 완전히 호환되지 않을 수 있습니다.

이는 애플리케이션에서 컴파일러 버전과 런타임 버전이 항상 동일하기 때문에 라이브러리 작성자에게만 해당되는 문제입니다. 버전 불일치는 사전 컴파일된 Vue 컴포넌트 코드를 패키지로 출시하고 소비자가 이전 버전의 Vue를 사용하는 프로젝트에서 해당 코드를 사용하는 경우에만 발생할 수 있습니다. 따라서 패키지에 필요한 최소 부 버전을 명시적으로 선언해야 할 수 있습니다.

## 사전 릴리스 {#pre-releases}

부 릴리스는 일반적으로 고정되지 않은 수의 베타 릴리스를 거칩니다. 주요 릴리스는 알파 단계와 베타 단계를 거칩니다.

추가로, 우리는 매주 GitHub의 `main` 및 `minor` 브랜치에서 캐나리 릴리스를 발행합니다. 안정된 채널의 npm 메타데이터가 불필요하게 커지지 않도록 다른 패키지로 발행됩니다. 각각 `npx install-vue@canary` 또는 `npx install-vue@canary-minor`를 통해 설치할 수 있습니다.

사전 릴리스는 통합/안정성 테스트와 얼리 어답터가 불안정한 기능에 대한 피드백을 제공하기 위한 것입니다. 사전 릴리스는 프로덕션 환경에서 사용하지 마세요. 모든 사전 릴리스는 불안정한 것으로 간주되며 그 사이에 중요한 변경 사항이 적용될 수 있으므로 사전 릴리스를 사용할 때는 항상 정확한 버전으로 고정하세요.

## 사용 중단 {#deprecations}

더 나은 새 대체 기능이 있는 기능은 마이너 릴리스에서 주기적으로 사용 중단될 수 있습니다. 사용 중단된 기능은 계속 작동하며 사용 중단 상태로 전환된 후 다음 주요 릴리스에서 제거됩니다.

## RFC {#rfcs}

API 표면이 상당히 넓고 Vue에 주요 변경 사항이 있는 새로운 기능은 **의견 요청**(RFC) 프로세스를 거치게 됩니다. RFC 프로세스는 새로운 기능이 프레임워크에 진입할 수 있는 일관되고 통제된 경로를 제공하고 사용자가 디자인 프로세스에 참여하고 피드백을 제공할 수 있는 기회를 제공하기 위한 것입니다.

RFC 프로세스는 GitHub의 [vuejs/rfcs](https://github.com/vuejs/rfcs) 리포지토리에서 진행됩니다.

## 실험적 기능 {#experimental-features}

일부 기능은 안정된 버전의 Vue에서 제공되고 문서화되지만 실험적이라고 표시되어 있습니다. 실험적 기능은 일반적으로 문서상으로는 대부분의 디자인 문제가 해결되었지만 실제 사용에 대한 피드백이 아직 부족한 관련 RFC 토론이 있는 기능입니다.

실험적 기능의 목표는 사용자가 불안정한 버전의 Vue를 사용하지 않고도 프로덕션 환경에서 테스트하여 피드백을 제공할 수 있도록 하는 것입니다. 실험적 기능 자체는 불안정한 것으로 간주되며, 기능이 릴리스 유형 간에 변경될 수 있음을 예상하고 통제된 방식으로만 사용해야 합니다.



