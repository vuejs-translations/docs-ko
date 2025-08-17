---
outline: deep
---

# 컴파일 타임 플래그 {#compile-time-flags}

:::tip
컴파일 타임 플래그는 `esm-bundler` 빌드의 Vue(즉, `vue/dist/vue.esm-bundler.js`)를 사용할 때만 적용됩니다.
:::

Vue를 빌드 단계와 함께 사용할 때, 여러 컴파일 타임 플래그를 설정하여 특정 기능을 활성화/비활성화할 수 있습니다. 컴파일 타임 플래그를 사용하면 비활성화된 기능이 트리 셰이킹을 통해 최종 번들에서 제거될 수 있다는 이점이 있습니다.

이 플래그들이 명시적으로 설정되지 않아도 Vue는 정상적으로 동작합니다. 그러나 관련 기능이 가능한 경우 제대로 제거될 수 있도록 항상 플래그를 설정하는 것이 권장됩니다.

빌드 도구에 따라 플래그를 설정하는 방법은 [설정 가이드](#configuration-guides)를 참고하세요.

## `__VUE_OPTIONS_API__` {#VUE_OPTIONS_API}

- **기본값:** `true`

  Options API 지원을 활성화/비활성화합니다. 비활성화하면 번들 크기가 더 작아지지만, Options API에 의존하는 서드파티 라이브러리와의 호환성에 영향을 줄 수 있습니다.

## `__VUE_PROD_DEVTOOLS__` {#VUE_PROD_DEVTOOLS}

- **기본값:** `false`

  프로덕션 빌드에서 devtools 지원을 활성화/비활성화합니다. 활성화하면 번들에 더 많은 코드가 포함되므로, 디버깅 목적일 때만 활성화하는 것이 권장됩니다.

## `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` {#VUE_PROD_HYDRATION_MISMATCH_DETAILS}

- **기본값:** `false`

  프로덕션 빌드에서 hydration 불일치에 대한 상세 경고를 활성화/비활성화합니다. 활성화하면 번들에 더 많은 코드가 포함되므로, 디버깅 목적일 때만 활성화하는 것이 권장됩니다.

- 3.4+ 버전에서만 사용 가능합니다.

## 설정 가이드 {#configuration-guides}

### Vite {#vite}

`@vitejs/plugin-vue`는 이 플래그들에 대한 기본값을 자동으로 제공합니다. 기본값을 변경하려면 Vite의 [`define` 설정 옵션](https://vitejs.dev/config/shared-options.html#define)을 사용하세요:

```js [vite.config.js]
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    // 프로덕션 빌드에서 hydration 불일치 상세 정보 활성화
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  }
})
```

### vue-cli {#vue-cli}

`@vue/cli-service`는 이 플래그들 중 일부에 대한 기본값을 자동으로 제공합니다. 값을 설정/변경하려면 다음과 같이 하세요:

```js [vue.config.js]
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

```js [webpack.config.js]
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

```js [rollup.config.js]
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
