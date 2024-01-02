---
outline: deep
---

# 컴파일 타임 플래그(Compile-Time Flags) {#compile-time-flags}

:::tip
Compile-time 플래그는 Vue의 `esm-bundler` 빌드를 사용할 때만 적용됩니다 (즉, `vue/dist/vue.esm-bundler.js`).
:::

빌드 단계에서 Vue를 사용할 때, 특정 기능을 활성화/비활성화하기 위해 다양한 컴파일 타임 플래그를 설정할 수 있습니다. 컴파일 타임 플래그를 사용하는 이점은 이 방식으로 비활성화된 기능들이 트리 쉐이킹을 통해 최종 번들에서 제거될 수 있다는 것입니다.

이러한 플래그들이 명시적으로 설정되지 않더라도 Vue는 작동합니다. 그러나 가능한 경우 관련 기능이 제대로 제거될 수 있도록 항상 이들을 설정하는 것이 권장됩니다.

빌드 도구에 따라 이들을 어떻게 설정하는지에 대해서는 [설정 가이드](#configuration-guides)를 참조하세요.

## `__VUE_OPTIONS_API__` {#VUE_OPTIONS_API}

- **기본값:** `true`

  옵션 API 지원 활성화 / 비활성화. 이를 비활성화하면 번들 크기가 줄어들지만, 옵션 API에 의존하는 제3자 라이브러리와의 호환성에 영향을 미칠 수 있습니다.

## `__VUE_PROD_DEVTOOLS__` {#VUE_PROD_DEVTOOLS}

- **기본값:** `false`

  프로덕션 빌드에서 devtools 지원 활성화 / 비활성화. 이로 인해 번들에 더 많은 코드가 포함될 수 있으므로, 디버깅 목적으로만 이를 활성화하는 것이 권장됩니다.

## `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` <sup class="vt-badge" data-text="3.4+" /> {#VUE_PROD_HYDRATATION_MISMATCH_DETAILS}

- **기본값:** `false`

  프로덕션 빌드에서 수화 불일치에 대한 자세한 경고 활성화/비활성화. 이로 인해 번들에 더 많은 코드가 포함될 수 있으므로, 디버깅 목적으로만 이를 활성화하는 것이 권장됩니다.

## 설정 가이드 {#configuration-guides}

### Vite {#vite}

`@vitejs/plugin-vue`는 이러한 플래그들에 대해 자동으로 기본값을 제공합니다. 기본값을 변경하려면 Vite의 [`define` 구성 옵션](https://vitejs.dev/config/shared-options.html#define)을 사용하세요:

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    // 프로덕션 빌드에서 수화 불일치 세부사항 활성화
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  }
})
```

### vue-cli {#vue-cli}

`@vue/cli-service`는 이러한 플래그들 중 일부에 대해 자동으로 기본값을 제공합니다. 값을 설정/변경하려면:

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  }
}
```

### webpack {#webpack}

플래그는 webpack의 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)을 사용하여 정의해야 합니다:

```js
// webpack.config.js
module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    })
  ]
}
```

### Rollup {#rollup}

플래그는 [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace)를 사용하여 정의해야 합니다:

```js
// rollup.config.js
import replace from '@rollup/plugin-replace'

export default {
  plugins: [
    replace({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    })
  ]
}
```
