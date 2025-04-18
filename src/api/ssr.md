# 서버 사이드 렌더링 API {#server-side-rendering-api}

## renderToString() {#rendertostring}

- **Exported from `vue/server-renderer`**

- **타입**

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **예제**

  ```js
  import { createSSRApp } from 'vue'
  import { renderToString } from 'vue/server-renderer'

  const app = createSSRApp({
    data: () => ({ msg: 'hello' }),
    template: `<div>{{ msg }}</div>`
  })

  ;(async () => {
    const html = await renderToString(app)
    console.log(html)
  })()
  ```

  ### SSR Context {#ssr-context}

  선택적으로 컨텍스트 객체를 전달할 수 있으며, 이를 사용하여 렌더링 중 추가 데이터를 기록할 수 있습니다. 예를 들어, [Teleport의 콘텐츠에 접근](/guide/scaling-up/ssr#teleports)하는 데 활용할 수 있습니다.

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'teleported content' }
  ```

  이 페이지에 있는 대부분의 다른 SSR API도 선택적으로 컨텍스트 객체를 허용합니다. 컨텍스트 객체는 컴포넌트 코드에서 [useSSRContext](#usessrcontext) 헬퍼를 통해 액세스할 수 있습니다.
- 
- 이 페이지의 대부분의 다른 SSR API도 선택적으로 컨텍스트 객체를 받을 수 있습니다. 컨텍스트 객체는 컴포넌트 코드에서 [`useSSRContext`](#usessrcontext) 헬퍼를 통해 접근할 수 있습니다.

- **참고** [가이드 - Server-Side Rendering](/guide/scaling-up/ssr)

## renderToNodeStream() {#rendertonodestream}

입력을 [Node.js 읽기 가능한 스트림](https://nodejs.org/api/stream#stream_class_stream_readable)으로 렌더링합니다.

- **Exported from `vue/server-renderer`**

- **타입**

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **예제**

  ```js
  // inside a Node.js http handler
  renderToNodeStream(app).pipe(res)
  ```

  :::tip Note
  이 메서드는 Node.js 환경과 분리된 `vue/server-renderer`의 ESM 빌드에서는 지원되지 않습니다. 대신 [`pipeToNodeWritable`](#pipetonodewritable)을 사용하십시오.
  :::

## pipeToNodeWritable() {#pipetonodewritable}

렌더링하고 기존 [Node.js 쓰기 가능한 스트림](https://nodejs.org/api/stream#stream_writable_streams) 인스턴스로 파이프합니다.

- **Exported from `vue/server-renderer`**

- **타입**

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **예제**

  ```js
  // inside a Node.js http handler
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream() {#rendertowebstream}

입력을 [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)으로 렌더링합니다.

- **Exported from `vue/server-renderer`**

- **타입**

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **예제**

  ```js
  // ReadableStream을 지원하는 환경 내에서
  return new Response(renderToWebStream(app))
  ```

  :::tip Note
  글로벌 스코프에 `ReadableStream` 생성자가 노출되지 않는 환경에서는 [`pipeToWebWritable()`](#pipetowebwritable)을 대신 사용해야 합니다.
  :::

## pipeToWebWritable() {#pipetowebwritable}

렌더링하고 기존 [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) 인스턴스로 파이프합니다.

- **Exported from `vue/server-renderer`**

- **타입**

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **예제**

  이것은 일반적으로 [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream)과 함께 사용됩니다:
  
  ```js
  // TransformStream은 CloudFlare 워커와 같은 환경에서 사용할 수 있습니다.
  // Node.js에서 TransformStream은 'stream/web'에서 명시적으로 임포트해야 합니다.

  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream() {#rendertosimplestream}

간단한 가독성 인터페이스를 사용하여 스트리밍 모드에서 입력을 렌더링합니다.

- **Exported from `vue/server-renderer`**

- **타입**

  ```ts
  function renderToSimpleStream(
    input: App | VNode,
    context: SSRContext,
    options: SimpleReadable
  ): SimpleReadable

  interface SimpleReadable {
    push(content: string | null): void
    destroy(err: any): void
  }
  ```

- **예제**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // done
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // error encountered
      }
    }
  )
  ```

## useSSRContext() {#usessrcontext}


`renderToString()` 또는 다른 서버 렌더링 API에 전달된 컨텍스트 객체를 검색하는 데 사용되는 런타임 API입니다.

- **타입**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **예제**

  검색된 컨텍스트는 최종 HTML 렌더링에 필요한 정보(예: 헤드 메타데이터)를 첨부하는 데 사용할 수 있습니다.

  ```vue
  <script setup>
  import { useSSRContext } from 'vue'
  // SSR 중에만 호출해야 합니다.
  // https://vitejs.dev/guide/ssr#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...컨텍스트에 속성을 추가합니다.
  }
  </script>
  ```

# data-allow-mismatch <sup class="vt-badge" data-text="3.5+" /> {#data-allow-mismatch}

[하이드레이션 불일치(hydration mismatch)](/guide/scaling-up/ssr#hydration-mismatch) 경고를 억제하는 데 사용할 수 있는 특수 속성입니다.

- **예제**

  ```html
  <div data-allow-mismatch="text">{{ data.toLocaleString() }}</div>
  ```

  이 값은 허용할 불일치 유형을 특정 타입으로 제한할 수 있습니다. 사용할 수 있는 값은 다음과 같습니다:

  - `text`
  - `children` (직접적인 자식 요소에 대해서만 불일치를 허용합니다.)
  - `class`
  - `style`
  - `attribute`

  값을 제공하지 않으면 모든 유형의 불일치를 허용합니다.
