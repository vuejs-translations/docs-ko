---
sidebar: false
ads: false
editLink: false
sponsors: false
---

<script setup>
import SponsorsGroup from '@theme/components/SponsorsGroup.vue'
import { load, data } from '@theme/components/sponsors'
import { onMounted } from 'vue'

onMounted(load)
</script>

# Vue.js 스폰서 되기 {#become-a-vue-js-sponsor}

Vue.js는 MIT 라이선스를 받은 오픈 소스 프로젝트이며 완전히 무료로 사용할 수 있습니다.
대규모 에코시스템을 유지하고 프로젝트를 위한 새로운 기능을 개발하는 데 필요한 엄청난 노력은 후원자의 관대한 재정적 지원 덕분에 지속 가능합니다.

## 후원 방법 {#how-to-sponsor}

Vue.js를 후원하려면 [GitHub Sponsors](https://github.com/sponsors/yyx990803) 또는 [OpenCollective](https://opencollective.com/vuejs)를 통해 후원할 수 있습니다. GitHub의 결제 시스템을 통해 후원에 대한 청구서를 받을 수도 있습니다. 월 정기 후원과 1회성 기부 모두 가능합니다. 정기 후원자는 [후원 등급](#tier-benefits)에 따라 로고 노출 혜택을 받을 수 있습니다.

후원 등급, 결제 방식, 후## 비즈니스 후원 {#sponsoring-vue-as-a-business}

Vue를 후원하면 웹사이트와 GitHub 프로젝트 README를 통해 전 세계 **200만 명 이상의** Vue 개발자에게 브랜드를 노출할 수 있습니다. 이는 직접적인 리드 생성뿐만 아니라, 오픈 소스를 지원하는 기업으로서의 브랜드 인지도를 높이는 데에도 도움이 됩니다. 특히, 개발자를 대상으로 제품을 만드는 기업에게는 이러한 브랜드 인지도 향상이 전환율을 높이는 중요한 자산이 됩니다.

Vue를 활용하여 수익을 창출하는 제품을 개발하고 있다면, Vue 개발을 후원하는 것이 비즈니스적으로도 합리적인 선택입니다. **이는 귀사의 제품이 의존하는 프로젝트가 건강하게 유지되고 적극적으로 관리될 수 있도록 보장합니다.** 또한, Vue 커뮤니티에서의 브랜드 노출과 긍정적인 이미지 형성은 우수한 Vue 개발자를 유치하고 채용하는 데에도 도움이 됩니다.

만약 개발자를 주요 고객으로 하는 제품을 만들고 있다면, Vue 후원을 통해 높은 품질의 트래픽을 확보할 수 있습니다. Vue 커뮤니티의 방문자는 모두 개발자이므로, 후원을 통한 노출은 브랜드 인지도를 높이고 전환율을 개선하는 데 효과적입니다.

## 개인 후원 {#sponsoring-vue-as-an-individual}

Vue를 사용하며 생산성이 향상되었다고 느끼셨다면, 감사의 의미로 기부를 고려해 보세요. 마치 가끔 커피 한 잔을 사주는 것과 같습니다. Vue 팀의 많은 멤버들이 GitHub Sponsors를 통해 후원 및 기부를 받고 있습니다. Vue [팀 페이지](/about/team)에서 각 팀원의 프로필에 있는 "Sponsor" 버튼을 찾아보세요.

또한, 다니고 있는 회사가 Vue를 비즈니스 차원에서 후원하도록 설득해 볼 수도 있습니다. 쉽지는 않겠지만, 비즈니스 후원이 개인 기부보다 오픈 소스 프로젝트의 지속 가능성에 훨씬 더 큰 영향을 미칩니다. 만약 회사 후원을 성사시킨다면, Vue 프로젝트에 훨씬 더 큰 도움이 될 것입니다.


## 등급 혜택 {#tier-benefits}

- **글로벌 스페셜 스폰서**:
  - 전 세계에서 **단 한 곳의** 후원사만 가능합니다. <span v-if="!data?.special">현재 공석입니다. [문의하기](mailto:sponsor@vuejs.org?subject=Vue.js%20special%20sponsor%20inquiry)!</span><span v-else>(현재 후원사가 있습니다)</span>
  - (독점) [vuejs.org](/) 홈페이지 상단(Above the fold)에 로고 배치.
  - (독점) [Vue 공식 X 계정](https://twitter.com/vuejs) (팔로워 32만 명)에서 특별 언급 및 주요 제품 출시 시 정기적인 리트윗.
  - 하위 등급에서 제공되는 모든 노출 위치 중 가장 눈에 띄는 로고 배치.
  - 
- **플래티넘(USD$2,000/월)**:
  - [vuejs.org](/)의 첫 페이지에 눈에 잘 띄는 로고 배치.
  - 모든 콘텐츠 페이지의 사이드바에 눈에 잘 띄는 로고 배치.
  - [`vuejs/core`](https://github.com/vuejs/core) 및 [`vuejs/vue`](https://github.com/vuejs/core)의 README에 눈에 잘 띄는 로고 배치.
- **골드(USD$500/월)**:
  - [vuejs.org](/)의 첫 페이지에 대형 로고 배치.
  - `vuejs/core` 및 `vuejs/vue`의 README에 대형 로고 배치.
- **실버(USD$250/월)**:
  - `vuejs/core` 및 `vuejs/vue`의 `BACKERS.md` 파일에 중간 크기의 로고 배치.
- **브론즈(USD$100/월)**:
  - `vuejs/core` 및 `vuejs/vue`의 `BACKERS.md` 파일에 작은 로고 배치.
- **관대한 후원자(USD$50/월)**:
  - 다른 개인 후원자보다 `vuejs/core` 및 `vuejs/vue`의 `BACKERS.md` 파일에 기재된 이름입니다.
- **개인 후원자 (USD$5/월)**:
  - `vuejs/core` 및 `vuejs/vue`의 `BACKERS.md` 파일에 기재된 이름.

## 현재 스폰서 {#current-sponsors}

### 글로벌 스페셜 스폰서 {#special-global-sponsor}

<SponsorsGroup tier="special" placement="page" />

### 플래티넘 {#platinum}

<SponsorsGroup tier="platinum" placement="page" />

### 플래티넘 (China) {#platinum-china}

<SponsorsGroup tier="platinum_china" placement="page" />

### 골드 {#gold}

<SponsorsGroup tier="gold" placement="page" />

### 실버 {#silver}

<SponsorsGroup tier="silver" placement="page" />
