# 시작하기 {#getting-started}

Vue 튜토리얼에 오신 것을 환영합니다!

이 튜토리얼의 목표는 브라우저에서 바로 Vue로 작업하는 경험을 빠르게 제공하는 것입니다. 이 튜토리얼은 포괄적인 내용을 다루지 않으며, 모든 내용을 완벽히 이해하지 않아도 다음 단계로 넘어갈 수 있습니다. 하지만 튜토리얼을 완료한 후에는 각 주제를 더 자세히 다루는 <a target="_blank" href="/guide/introduction.html">가이드</a>도 꼭 읽어보시기 바랍니다.

## 사전 준비 사항 {#prerequisites}

이 튜토리얼은 HTML, CSS, JavaScript에 대한 기본적인 이해를 전제로 합니다. 프론트엔드 개발이 완전히 처음이라면, 프레임워크를 바로 시작하는 것보다는 기초를 먼저 익히고 다시 돌아오는 것이 좋습니다! 다른 프레임워크 경험이 있다면 도움이 되겠지만, 필수는 아닙니다.

## 이 튜토리얼을 사용하는 방법 {#how-to-use-this-tutorial}

코드를 <span class="wide">오른쪽</span><span class="narrow">아래</span>에서 수정하면 결과가 즉시 업데이트되는 것을 볼 수 있습니다. 각 단계에서는 Vue의 핵심 기능을 소개하며, 데모가 동작하도록 코드를 완성해야 합니다. 막히는 경우 "Show me!" 버튼을 눌러 동작하는 코드를 확인할 수 있습니다. 하지만 너무 자주 의존하지 마세요 - 스스로 해결해보는 것이 더 빠르게 배울 수 있는 방법입니다.

Vue 2 또는 다른 프레임워크에서 오신 경험 많은 개발자라면, 이 튜토리얼을 최대한 활용할 수 있도록 몇 가지 설정을 조정할 수 있습니다. 초보자라면 기본 설정을 사용하는 것이 좋습니다.

<details>
<summary>튜토리얼 설정 상세</summary>

- Vue는 두 가지 API 스타일을 제공합니다: Options API와 Composition API. 이 튜토리얼은 두 가지 모두에 맞춰 설계되어 있으며, 상단의 **API Preference** 스위치를 통해 원하는 스타일을 선택할 수 있습니다. <a target="_blank" href="/guide/introduction.html#api-styles">API 스타일에 대해 더 알아보기</a>.

- SFC 모드와 HTML 모드 간 전환도 가능합니다. SFC 모드는 <a target="_blank" href="/guide/introduction.html#single-file-components">싱글 파일 컴포넌트</a> (SFC) 형식의 코드 예제를 보여주며, 대부분의 개발자가 빌드 단계를 거쳐 Vue를 사용할 때 이 방식을 사용합니다. HTML 모드는 빌드 단계 없이 사용하는 방법을 보여줍니다.

<div class="html">

:::tip
직접 만든 애플리케이션에서 빌드 단계 없이 HTML 모드를 사용하려면, import를 다음과 같이 변경해야 합니다:

```js
import { ... } from 'vue/dist/vue.esm-bundler.js'
```

스크립트 내부에서 위와 같이 작성하거나, 빌드 도구에서 `vue`를 올바르게 해석하도록 설정해야 합니다. [Vite](https://vitejs.dev/)의 예시 설정:

```js
// vite.config.js
export default {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
}
```

자세한 내용은 [Tooling 가이드의 해당 섹션](/guide/scaling-up/tooling.html#note-on-in-browser-template-compilation)을 참고하세요.
:::

</div>

</details>

준비되셨나요? "Next"를 클릭하여 시작하세요.
