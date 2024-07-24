<script setup>
import { ref, onMounted } from 'vue'
import { data } from './errors.data.ts'
import ErrorsTable from './ErrorsTable.vue'

const highlight = ref()
onMounted(() => {
  highlight.value = location.hash.slice(1)
})
</script>

# 프로덕션 에러 코드 참조 {#error-reference}

## 런타임 에러 {#runtime-errors}

프로덕션 빌드에서는 에러 핸들러 API의 세 번째 인자에 전체 정보 문자열 대신 짧은 코드가 전달됩니다.

- [`app.config.errorHandler`](/api/application#app-config-errorhandler)
- [`onErrorCaptured`](/api/composition-api-lifecycle#onerrorcaptured) (Composition API)
- [`errorCaptured`](/api/options-lifecycle#errorcaptured) (Options API)

다음 표는 코드와 원래의 전체 정보 문자열을 매핑합니다.

<ErrorsTable kind="runtime" :errors="data.runtime" :highlight="highlight" />

## 컴파일러 에러 {#compiler-errors}

다음 표는 프로덕션 컴파일러 오류 코드와 원래 메시지 간의 매핑을 제공합니다.

<ErrorsTable kind="compiler" :errors="data.compiler" :highlight="highlight" />
