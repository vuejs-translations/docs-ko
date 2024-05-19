# 슬롯 {#slots}

> 이 페이지에서는 [컴포넌트 기초](/guide/essentials/component-basics)를 이미 읽었다고 가정합니다. 컴포넌트를 처음 사용하는 경우, 그 문서를 먼저 읽으십시오.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-component-slots" title="Free Vue.js Slots Lesson"/>

## 슬롯 컨텐츠와 아울렛 {#slot-content-and-outlet}

우리는 컴포넌트의 props가 모든 유형의 JavaScript 값을 받을 수 있다는 것을 배웠습니다. 그러나 템플릿 컨텐츠는 어떻습니까? 어떤 경우에는 템플릿 조각을 자식 컴포넌트에 전달하고 자식 컴포넌트가 자체 템플릿 내에서 조각을 렌더링하도록 할 수 있습니다.

예를 들어 다음과 같은 사용법을 지원하는 `<FancyButton>` 컴포넌트가 있을 수 있습니다:

```vue-html{2}
<FancyButton>
  클릭하기! <!-- 슬롯 컨텐츠 -->
</FancyButton>
```

`<FancyButton>`의 템플릿은 다음과 같습니다:

```vue-html{2}
<button class="fancy-btn">
  <slot></slot> <!-- 슬롯 아울렛 -->
</button>
```

`<slot>` 엘리먼트는 부모가 제공한 **슬롯 컨텐츠**가 렌더링되어야 하는 위치를 나타내는 **슬롯 아울렛**(outlet)입니다.

![슬롯 다이어그램](./images/slots.png)

<!-- https://www.figma.com/file/LjKTYVL97Ck6TEmBbstavX/slot --><!-- https://www.figma.com/file/PuKXOMrFPmfnrtMa3tKL5G/slot-(ko-kr) -->

최종적으로 렌더링된 DOM은:

```html
<button class="fancy-btn">클릭하기!</button>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNpdkbtOwzAUhl/lYIQKUtPQG5cQKsHAU2RxEyeKSGzLdlCrqgMSLEwslRAsZUEMIBgYKvFGNH0HbAdVKVvOl/NfjjxBZ5y3rgqCPOTLUKRcgSSq4IOApjlnQsEFpuH4vFCKUYgFy6HRcmvMiBsB9d1KrXV6UCTnGVZETwB+bdsCgNX11/LlfTV7+Fl8gr/lOFDevS2fP6D8fl3d3peLOTiO2Q2UXw/TyHfX5qiJ/hUxV2xmD6viYYalPA1QbPadoaIBsv+1v8yYcgebLWY35eNiOX+qWpgSlc9mvj1VqnFmPltra5gY55BlTHiwHcfxiZmHOLxMBCto5EGWUoKFkwgcpYSq3W67H5GkCdu9TtQ97kCnv6OHg94hieO9Ss1ERLQdZZRYwHEUpTTxoM9H0N7nI0tzLJKUWliTOSankB4c/eGwENKU4yyligjNpvYF7Slo+gvDasNv)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNpdkbtOwzAUhl/lYIQKUtPQG5cQKsHAU2RxEyeKSGzLdlCrqgMSLEwslRAsZUEMIBgYKvFGNH0HbAdVKVvOl/NfjjxBZ5y3rgqCPOTLUKRcgSSq4IOApjlnQsEFpuH4vFCKUYgFy6HRcmvMiBsB9d1KrXV6UCTnGVZETwB+bdsCgNX11/LlfTV7+Fl8gr/lOFDevS2fP6D8fl3d3peLOTiO2Q2UXw/TyHfX5qiJ/hUxV2xmD6viYYalPA1QbPadoaIBsv+1v8yYcgebLWY35eNiOX+qWpgSlc9mvj1VqnFmPltra5gY55BlTHiwHcfxiZmHOLxMBCto5EGWUoKFkwgcpYSq3W67H5GkCdu9TtQ97kCnv6OHg94hieO9Ss1ERLQdZZRYwHEUpTTxoM9H0N7nI0tzLJKUWliTOSankB4c/eGwENKU4yyligjNpvYF7Slo+gvDasNv)

</div>

슬롯을 사용 시, `<FancyButton>`이 `<button>`(및 멋진 스타일 지정)을 렌더링하고, 내부 컨텐츠를 자식 컴포넌트에게 제공합니다.

슬롯을 이해하는 또 다른 방법은 슬롯을 JavaScript 함수와 비교하는 것입니다:

```js
// 슬롯 컨텐츠를 전달하는 부모 컴포넌트
FancyButton('클릭하기!')

// FancyButton은 자체 템플릿에서 슬롯 컨텐츠를 렌더링합니다.
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
      ${slotContent}
    </button>`  
}
```

슬롯 컨텐츠는 텍스트에만 국한되지 않습니다. 모든 유효한 템플릿 컨텐츠일 수 있습니다. 예를 들어 여러 엘리먼트 또는 다른 컴포넌트를 전달할 수 있습니다:

```vue-html
<FancyButton>
  <span style="color:red">클릭하기!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNp1UstKw0AU/ZVrRFQwrVbrI0ZBF4L/0M00mYRgMjPMTNQiXdStiCuhSAsKIrYodNFFF/ozLk2Kv+BMUktacJd7cs89j+TKOGKsdB5jwzJs4fCASRBYxuywRoKIUS7hBBGncRxLSQl4nEawXCoXME1eni4fXWBBI3zqFJYL2GTZLudSSkQNEkcsRBKrCcAunM4AgHFrmLy8j+/b36PBgoJq0i4a+I9mC4YICNkI8UHNcGhIueU0EKkZhzMXlRm1+EcqBijnp+fE7PLUsLFmzDWha5zNU8+bc0IkhPLh6X2zLrUN/V6FESGVWkrnyrdnVbKSshzqsTQ9AFean+eCRc/z9vVcR86Zz2lMXAvCgGDETZ8jN8BErmxuVF3sr8HiVsXd3KtApbqkhu2tHex5qzmbcherc4QSnAEMuW5AfAuq7BI21tllhkaI+wHJwALN1DqxsGB3AjsxF9ocowGRmCusmX37LIrqbu7H0N0tmCYkt4Ok/wpJv5c+ttLOR/LUgbQ7VNj4ZpB+tiG9fksfemCauqdpTV/d55/RXfHrNH8BmKYTZA==)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNptUl1r1EAU/Su3KVKFza7ddv2IsVAfBP9DXmYnkxBMZoaZie6y9KG+ivgkFGlBQcQWhX3oQx/0z/hosvgXemfShtmlkIfcwz33nnPuLIJDKYdvahZEQaypKqQ5SHhRSaEMvCSczl/UxggOmRIV7AxHHmZpO33z4VumRcVeUa/Zw26aARLOZo6QsozUpYGFRanAKZxxoyNY+IsHa4OPEo5fPOqVYmFYJUtiGFYAsUd1AMDq+LL5/mv16eTf1RKRxMS+CTfjTl6sJeGgzbxkz5OAilKoiM4JT4IDf+QWqsHGW5KvdtRJ2lgXj3rFwSDYyNOeYd3QtMuflkRr1JHZ/nBqrAwXp4l1KYxdZZ113etbXErOB/4O+wG3wVtfsJ1l2TNbTwl9nStR8zSCsuCMqDBXJC3wNPf3dicpywewvT9O956OYTy5h8Wj/ccsyx50bKFShuM43tIBkqRpwfMIJnIGuw/lzKEVUXnBHejRQrunxgfw5AamtdJWnBQFN0wh1h3fWcHsNp6XzW4rDKH5sGwufkBzcd5+OW5PfzdfT6E9u0Rs9X7Z/jmB9t3P9vM5hKHNqY/p79m3/1cf/escXQMFqisO)

</div>

슬롯을 사용하면 `<FancyButton>`이 더 유연하고 재사용 가능하게 할 수 있습니다. 이제 내부 내용은 다르지만 모두 동일한 멋진 스타일로 다른 장소에서 사용할 수 있습니다.

Vue 컴포넌트의 슬롯 메커니즘은 [네이티브 웹 컴포넌트 `<slot>` 엘리먼트](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)에서 영감을 얻었고, 나중에 추가 기능에 대해 설명하겠습니다.

## 렌더링 범위 {#render-scope}

슬롯 컨텐츠는 부모 컴포넌트에 정의되어 있으므로 부모 컴포넌트의 데이터 범위에 접근할 수 있습니다. 예를 들어:

```vue-html
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

여기서 두 <span v-pre>`{{ message }}`</span> 이중 중괄호 문법은 동일한 컨텐츠를 렌더링합니다.

슬롯 콘텐츠에는 하위 컴포넌트의 데이터에 대한 액세스 권한이 **없습니다**. Vue 템플릿의 표현식은 JavaScript의 어휘 범위와 일치하도록 정의된 범위에만 액세스할 수 있습니다. 다시 말해

> 상위 템플릿의 표현식은 상위 범위에만 액세스할 수 있고 하위 템플릿의 표현식은 하위 범위에만 액세스할 수 있습니다.

## 대체 컨텐츠 {#fallback-content}

슬롯에 대체(fallback) 컨텐츠를 지정하여, 컨텐츠가 제공되지 않을 때만 렌더링되도록 하는 것이 유용한 경우가 있습니다. 예를 들어 `<SubmitButton>` 컴포넌트에서:

```vue-html
<button type="submit">
  <slot></slot>
</button>
```

부모가 슬롯 컨텐츠를 제공하지 않은 경우, "제출" 텍스트가 `<button>` 내부에 렌더링되기를 원할 수 있습니다. "제출"을 대체 컨텐츠로 지정하려면 `<slot>` 태그 사이에 배치하면 됩니다:

```vue-html{3}
<button type="submit">
  <slot>
    제출 <!-- 대체 컨텐츠 -->
  </slot>
</button>
```

이제 부모 컴포넌트 `<SubmitButton>`을 사용하여 슬롯에 컨텐츠를 제공하지 않습니다:

```vue-html
<SubmitButton />
```

그러면 대체 컨텐츠로 "제출"이 렌더링됩니다:

```html
<button type="submit">제출</button>
```

그러나 컨텐츠를 제공하는 경우:

```vue-html
<SubmitButton>저장</SubmitButton>
```

제공된 컨텐츠가 대신 렌더링됩니다:

```html
<button type="submit">저장</button>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqrVnIsKNArK01VslKyKU4uyiwoUShOLSktsIvJy8wtyC8qUQguTcrNLHEqLSnJz1NIK8rPVVDX00cWBGlXj8mz0YfoB+oEckpScwtyEktSgTwFBRtFXV2F1z0NbzZtUXjb2vuma8nbrh0Kb5rWvJm1UkFXF6IGxR59sBhcL0Tpm3kTFN4smPpm7gxkUxbMebV5K1ZT7N4saHgzb6kNimuBymz04a5T0lFC9wooJFBdnwRxU0llQaptjFIxWH2MEsifJUDZ4px8kJ8VgCCmBOiaN9vmoHj4ze4Vb1snvNmxAObGmBJgUEE0gZgQ09GcVQsAj6Sl3A==)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNptUE1LAzEU/CvPXHpxu/cSC/oXvObS1hQWdpOw+1aUUliEXopCL16klD0oKnjyi4L/SN/+B5MNLk0RcsibvJnMzIwdG9M/LyUbMF5M8sTgUKgkMzpHOC3HWYInJaJWMM11Br1+vAs6Yk8oAKHkRUs5k9NRmSLMHDrRVkdJhcXAAxBIOmQulD087r62A8rMpCOUdgLgB1EEP9cVvb5Ds7ih5X2z3AJdvdDdM0SR3wmMxi3Wcf0qbVZAjxXVt7sq9fr77eNflSHVFW0eeBDXrvG4c8cO2X4XrsTQ/dh7wksjjwQr2n3BXE60r0WqXWZXjEDrhj7XQWD6emoWK9rWfx4F2qo8yV29+p6t+S+Nv7rA)

</div>

## 이름이 있는 슬롯 {#named-slots}

단일 컴포넌트에 여러 개의 슬롯 아울렛이 있는 것이 유용한 경우가 있습니다. 예를 들어 `<BaseLayout>` 템플릿 컴포넌트에서:

```vue-html
<div class="container">
  <header>
    <!-- 우리는 여기에 헤더 컨텐츠를 원합니다. -->
  </header>
  <main>
    <!-- 우리는 여기에 메인 컨텐츠를 원합니다. -->
  </main>
  <footer>
    <!-- 우리는 여기에 푸터 컨텐츠를 원합니다. -->
  </footer>
</div>
```

이러한 경우, 슬롯에 고유 ID를 할당하는 데 사용할 수 있는 `name`이라는 특수 속성을 사용하여, 컨텐츠가 렌더링되어야 하는 위치를 `<slot>` 엘리먼트가 결정할 수 있도록 할 수 있습니다:

```vue-html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

`name`이 없는 `<slot>` 아울렛은 암시적으로 "default"라는 이름을 갖습니다.

`<BaseLayout>`을 사용하는 부모 컴포넌트에서 각각 다른 슬롯 아울렛를 대상으로 하는 여러 슬롯 컨텐츠 조각을 전달하는 방법이 필요합니다. 이럴 때 **이름이 있는 슬롯**이 사용됩니다.

이름이 있는 슬롯을 전달하려면, `<template>` 엘리먼트와 함께 `v-slot` 디렉티브를 사용하고, 슬롯 이름을 `v-slot`에 인자로 전달해야 합니다:

```vue-html
<BaseLayout>
  <template v-slot:header>
    <!-- 헤더 슬롯의 컨텐츠 -->
  </template>
</BaseLayout>
```

`v-slot`에는 전용 단축 문법인 `#`가 있으므로 `<template v-slot:header>`는 `<template #header>`로 단축할 수 있습니다. 이것은 자식 컴포넌트의 'header' 슬롯에서 이 템플릿 조각을 렌더링 한다는 것입니다.

![이름이 있는 슬롯 다이어그램](./images/named-slots.png)

<!-- https://www.figma.com/file/2BhP8gVZevttBu9oUmUUyz/named-slot --><!-- https://www.figma.com/file/KQkd1odvlQeg8gl2r8KeaQ/named-slot-(ko-kr) -->

다음은 단축 문법을 사용하여 세 슬롯의 컨텐츠를 모두 `<BaseLayout>`에 전달하는 코드입니다:

```vue-html
<BaseLayout>
  <template #header>
    <h1>다음은 페이지 제목일 수 있습니다.</h1>
  </template>

  <template #default>
    <p>주요 내용에 대한 단락입니다.</p>
    <p>그리고 또 하나.</p>
  </template>

  <template #footer>
    <p>다음은 연락처 정보입니다.</p>
  </template>
</BaseLayout>
```

컴포넌트가 기본 슬롯과 이름이 있는 슬롯을 모두 허용하는 경우, 모든 최상위 비`<template>` 노드는 기본 슬롯의 컨텐츠로 암시적으로 처리됩니다. 따라서 위의 내용은 다음과 같이 쓸 수도 있습니다:

```vue-html
<BaseLayout>
  <template #header>
    <h1>다음은 페이지 제목일 수 있습니다.</h1>
  </template>

  <!-- implicit default slot -->
  <p>주요 내용에 대한 단락입니다.</p>
  <p>그리고 또 하나.</p>

  <template #footer>
    <p>다음은 연락처 정보입니다.</p>
  </template>
</BaseLayout>
```

이제 `<template>` 엘리먼트 내부의 모든 것이 해당 슬롯으로 전달됩니다. 최종 렌더링된 HTML은 다음과 같습니다:

```html
<div class="container">
  <header>
    <h1>다음은 페이지 제목일 수 있습니다.</h1>
  </header>
  <main>
    <p>주요 내용에 대한 단락입니다.</p>
    <p>그리고 또 하나.</p>
  </main>
  <footer>
    <p>다음은 연락처 정보입니다.</p>
  </footer>
</div>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNp9UstKw0AU/ZVLunCjjW6K1FjQtZ/QTUynGEgyQ2YqPhCKIBQr4sJikKYUFLXiQmxFF/WHOtN/8CbpI2nF5T2POfcxp9oOY/nDGtGKmsEt32YCOBE1Vip7tsuoL2DX5GTPPKY1AVWfurCS1+dQZF0pe4aeeNGFhSAuc0xBsAIw5uK4RmTKQ+6AmBXiT3BkDjZKsvmowisV1mF8HahwoJ7roLpt+dpT4RBUIwDVaajLT9lsoDRv6OiZvKungpeiKqRq1pxpD0ixknoYqvtbkOcDdd9Tdzcgr+rjVhtk80WGP6pzMcuI1jGzjb6+5dPbqN8FGdzAuBXI8yCl+b+NKqUiPTFLDazu3qPcDxyx25L9wV8dZF6Pysx6U6y2qmXPFF04663Yh2A5JufbZc2injBtj/hlbZq0eBzuUAGe6RKUJxxq8fIIz5rLeAwXX8z6F/UphbG4mnRewi3npTyGjvNkdxD/Ri6OnWTgRAyniXmf+tjqmqCsCBvsCDh17ArkLMvaSgQWdahfhFyhUJggVVzSGrdPSBHW85vEjeGz+PvHIdrZLxsKPjo=)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNp9Us1K5EAQfpUic/CyTtbLsGSzA7vnfYRcspkeDCTdTbpHdEUYBGFwRDw4GMTIgOIfHkRH9KAvZPe8g5VkfjqjCH2pr76vvqrq2rR+c15f6xDLsVwRJCGXTY+GMWeJhD++IH/9DdaR0E5YDEt1ew7loiWPepSsF+QWafudSMKmRwEChhUooVI4JQBGsTze8ig+155ZYiBJzCNfEowA3Dm/iBGZ5qG2SvwWSSY4ZlZXmqp/rrM9nXVhvJ/qbKQvu6CHJ+rmWmcvoHsp6NOe3n1U/R5S666Nmkld2zD+YDUZa+7Fm/rsRR8fgtoe6eNrfXQAaq87HpyA6l+p7FWf7sw8uCl7e3pWF7dvD0NQ6QGMB6naTg3O1220GZPmxNwYWB/d5b73OOJwoB5Gn3VQqZ6HlfUaWeubVf3j/DCq2la4BkHkC/HLswJGpR9SknjW1Gnxc0TEJFA/Jkgvc8jFn0d41lxF48ZYsapf5BsMd3E1pl+Z++hnaFwb56nuoLhGITeicuCSPL3jfyzBVpcl4w6s8HUQLApbUAuC4GdJCFjEEgdqjUZjgrRxScsi/E8c+F7/QeICLs+/MLG23gGkEFH1)

</div>

한 번 더 언급하자면, JavaScript 함수 비유를 사용하여 명명된 슬롯을 더 잘 이해도록 해봅시다:

```js
// 이름이 다른 여러 슬롯 조각 전달
BaseLayout({
  header: `...`,
  default: `...`,
  footer: `...`
})

// <BaseLayout>은 그것들을 각자 해당하는 위치에 렌더링합니다.
function BaseLayout(slots) {
  return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`
}
```

## 조건부 슬롯 {#conditional-slots}

때때로 슬롯이 있는지 여부에 따라 무언가를 렌더링하고 싶을 수 있습니다.

[$slots](/api/component-instance.html#slots) 속성과 [v-if](/guide/essentials/conditional.html#v-if)를 결합하여 이를 실현할 수 있습니다.

아래 예시에서는 `header`와 `footer`라는 두 개의 조건부 슬롯을 가진 Card 컴포넌트를 정의합니다.
헤더/푸터가 있을 때 추가 스타일을 제공하기 위해 이를 래핑하고자 합니다:

```vue-html
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div class="card-content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqFVD1v2zAQ/SsEWyBLIjVoJlcN0AYZ2qEt2oxaaOkkMaZIgqRcGYH/e4+kqFi26wAejvfevfu0XugXrbPtAHRFC1sZrh2x4AZ9X0rea2UceWCmJo1RPbnKcv/w9KtSFnnkIxMfDnotmAN8EVJ4WrDQTgh51wGrwUx+RLrb+6eOW4I/1wGJcJGjewrND1RP1Gpo2CB8+klOL9QqJR1IV+S+lbfVGqXcYW3QL9QiXOToPqPmn1PLCz+9ps5iIQ1vs2erJA75xbNLWqlecwHmp3ZcSVvSFQmIx5gQ6u/34HNmgOvkrzqoNmf8z3b0vpL+MmDBbKGkM+aYacFF+PHPDxjRnsFe1YNA9gXwN1glBl9jpH0dZI1lH/BCtd/CqXDZPtnHEcduU1O+UM/cB35J8XQeLrT+Wu7H7C7ElXKPU0xn5690Ofeab0klmLWfcUDIKmlakEe2N7xB4L0VytksHlhJFwE3yfu6e88mkvWAlDkmnxePwpN9kGkhOd3eieYbGstq48kdV5u856udY04zJevob1BYtxNxlplPkHaxVgb7XpFbPRI8AV6TtWDV5lNENatr3PaKfAgO3NIsMM1z1sGg1ig8G5yKUKhoN7u1GOBY6U6Pp1rTIJPYZXJs/v+JBW871xq2u5g6fNjCTOj+H/sTpqs=)

## 동적인 슬롯 이름 {#dynamic-slot-names}

[동적인 디렉티브의 인자](/guide/essentials/template-syntax.html#dynamic-arguments)는 `v-slot`에서도 작동하므로 동적 슬롯 이름을 정의할 수 있습니다:

```vue-html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 단축 문법 사용 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

표현식에는 디렉티브의 [동적인 인자 문법 제약 조건](/guide/essentials/template-syntax.md#dynamic-argument-syntax-constraints)이 적용됩니다.

## 범위가 지정된 슬롯 {#scoped-slots}

[렌더링 범위](#render-scope)에서 논의한 바와 같이 슬롯 컨텐츠는 자식 컴포넌트의 상태에 접근할 수 없습니다.

그러나 슬롯의 컨텐츠가 상위 범위와 하위 범위의 데이터를 모두 사용할 수 있는 경우, 유용할 수 있습니다. 이를 구현하려면 자식이 데이터를 렌더링할 때 슬롯에 데이터를 전달할 수 있는 방법이 필요합니다.

사실, 우리는 정확히 그렇게 할 수 있습니다. props를 컴포넌트에 전달하는 것처럼 속성을 슬롯 아울렛에 전달할 수 있습니다:

```vue-html
<!-- <MyComponent> 템플릿 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

슬롯 props을 받는 것은 단일 기본 슬롯을 사용할 때와 명명된 슬롯을 사용할 때 약간 다릅니다. 자식 컴포넌트 태그에 직접 `v-slot`을 사용하여 단일 기본 슬롯을 사용하여 props를 수신하는 방법을 먼저 보여줄 것입니다:

```vue-html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

![scoped slots diagram](./images/scoped-slots.svg)

<!-- https://www.figma.com/file/QRneoj8eIdL1kw3WQaaEyc/scoped-slot --><!-- https://www.figma.com/file/4MiKw8LEKRgyECRYxDRQUc/scoped-slot-(ko-kr) -->

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNp9kEEKwjAQRa8yZNONtrgtURDXggfIRupYCjYJybQoJUvBC3hKPYQTK6UWcZXMZP6f99OJtbVp26DIhfSFqyyBR2rsSumqtsYRbC8bwzeNmuDoTA1Jmo16UZwoLbNezTouCGt72hPGiuTYoZ37k6GlEvHYOWO9EjwFoKjrYGimhGeCEOCrWZiGLUKI83IMwQ4yG5aKmZgA/khXGO0JSodIlS636P2+RFhC8rzfHtf7v0i8/FC1H2oZ8SCPvJxq4qcE5G9oflpwULbk6f5Xst5jzB1er4qR4w==)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqFkFFKxDAQhq8y5KUK2uJriYL4vOAB8lLa2VJok5BMy0rJo+AF9pR6CCetLdlFWAgk82fyT75/Fq/W5tOIohTS166z9KJ0N1jjCA4fb4ZPGjXB0ZkBsrxItPgsU1ppPC3tDR6rsSeYlQaoty5frgKkdlEISvOSxT6VC8LB9hVhrEim86dH3xt6ViJu785YrwR3ASiaZ9jFnPBEEAJciLUZ2SLwOACZIrCDLPah4kFc4V2k8h9mU1F1d78ROqTR6a0CaB0idbo9oPdViyVkP+ev788zpxavl//ciIE/3HTTH6mMSFBGRk7iyl0JKBdQvnricNiSu9cki9UjZQ2/UAe12Q==)

</div>

자식이 슬롯에 전달한 props는 해당 '`v-slot'` 디렉티브의 값으로 사용할 수 있으며 슬롯 내부의 표현식에서 접근할 수 있습니다.

범위가 지정된 슬롯은 자식 컴포넌트에 전달되는 함수로 생각할 수 있습니다. 그런 다음 자식 컴포넌트가 이를 호출하고 props를 인자로 전달합니다:

```js
MyComponent({
  // 기본 슬롯을 함수로 전달합니다.
  default: (slotProps) => {
    return `${slotProps.text} ${slotProps.count}`
  }
})

function MyComponent(slots) {
  const greetingMessage = '안녕'
    return `<div>${
    // call the slot function with props!
    slots.default({ text: greetingMessage, count: 1 })
  }</div>`
}
```

사실 이것은 범위가 지정된 슬롯이 컴파일되는 방법과 수동 [렌더 함수](/guide/extras/render-function)에서 범위가 지정된 슬롯을 사용하는 방법에 매우 유사합니다.

`v-slot="slotProps"`가 슬롯 함수 특징과 어떻게 일치하는지 주목하십시오. 함수의 인자와 마찬가지로 `v-slot`에서 분해 할당을 사용할 수 있습니다:

```vue-html
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

### 이름이 있고 범위가 지정된 슬롯 {#named-scoped-slots}

이름이 있고 범위가 지정된 슬롯은 유사하게 작동합니다. 슬롯 props는 `v-slot` 디렉티브의 값인 `v-slot:name="slotProps"`로 접근할 수 있습니다. 단축 문법을 사용하면 다음과 같습니다:

```vue-html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

이름이 있는 슬롯에 props 전달:

```vue-html
<slot name="header" message="안녕"></slot>
```

슬롯의 `name`은 예약되어 있기 때문에 props에 포함되지 않습니다. 따라서 `headerProps`의 결과는 `{ message: '안녕' }`이 됩니다.

명명된 슬롯과 기본 범위 슬롯을 혼합하는 경우, 기본 슬롯에 명시적인 `<template>` 태그를 사용해야 합니다. 컴포넌트에 `v-slot` 지시어를 직접 배치하려고 하면 컴파일 오류가 발생합니다. 이는 기본 슬롯의 prop 범위에 대한 모호함을 피하기 위한 것입니다. 예를 들어

```vue-html
<!-- This template won't compile -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message belongs to the default slot, and is not available here -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>
```

기본 슬롯에 명시적인 `<template>` 태그를 사용하면 다른 슬롯에서 `message` prop을 사용할 수 없음을 명확히 알 수 있습니다:

```vue-html
<template>
  <MyComponent>
    <!-- Use explicit default slot -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```

### 멋진 목록 예제 {#fancy-list-example}

범위가 지정된 슬롯의 좋은 사용 사례가 무엇인지 궁금할 수 있습니다. 예를 들면 다음과 같습니다. 아이템 목록을 렌더링하는 `<FancyList>` 컴포넌트를 상상해 봅시다. 이 컴포넌트는 원격 데이터를 로드하고, 데이터를 사용하여 목록을 표시하거나, 페이지 분할이나 무한 스크롤과 같은 고급 기능을 포함할 수 있습니다. 그러나 각 아이템의 모양에 유연하게 조정하고, 각 아이템의 스타일을 해당 아이템을 소비하는 부모 컴포넌트에 맡기기를 원합니다. 따라서 원하는 사용법은 다음과 같을 수 있습니다:

```vue-html
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```

`<FancyList>` 내부에서 동일한 `<slot>`을 아이템 데이터로 여러 번 렌더링할 수 있습니다. (객체를 슬롯 props로 전달하기 위해 `v-bind`를 사용하고 있음을 주목하세요):

```vue-html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqFU2Fv0zAQ/StHJtROapNuZTBCNwnQQKBpTGxCQss+uMml8+bYlu2UlZL/zjlp0lQa40sU3/nd3Xv3vA7eax0uSwziYGZTw7UDi67Up4nkhVbGwScm09U5tw5yowoYhFEX8cBBImdRgyQMHRwWWjCHdAKYbdFM83FpxEkS0DcJINZoxpotkCIHkySo7xOixcMep19KrmGustUISotGsgJHIPgDWqg6DKEyvoRUMGsJ4HG9HGX16bqpAlU1izy5baqDFegYweYroMttMwLAHx/Y9Kyan36RWUTN2+mjXfpbrei8k6SjdSuBYFOlMaNI6AeAtcflSrqx5b8xhkl4jMU7H0yVUCaGvVeH8+PjKYWqWnpf5DQYBTtb+fc612Awh2qzzGaBiUyVpBVpo7SFE8gw5xIv/Wl4M9gsbjCCQbuywe3+FuXl9iiqO7xpElEEhUofKFQo2mTGiFiOLr3jcpFImuiaF6hKNxzuw8lpw7kuEy6ZKJGK3TR6NluLYXBVqwRXQjkLn0ueIc3TLonyZ0sm4acqKVovKIbDCVQjGsb1qvyg2telU4Yzz6eHv6ARBWdwjVqUNCbbFjqgQn6aW1J8RKfJhDg+5/lStG4QHJZjnpO5XjT0BMqFu+uZ81yxjEQJw7A1kOA76FyZjaWBy0akvu8tCQKeQ+d7wsy5zLpz1FlzU3kW1QP+x40ApWgWAySEJTv6/NitNMkllcTakwCaZZ5ADEf6cROas/RhYVQps5igEpkZLwzRROmG04OjDBcj7+Js+vYQDo9e0uH1qzeY5/s1vtaaqG969+vTTrsmBTMLLv12nuy7l+d5W673SBzxkzlfhPdWSXokdZMkSFWhuUDzTTtOnk6CuG2fBEwI9etrHXOmRLJUE0/vMH14In5vH30sCS4Nkr+WmARdztHQ6Jr02dUFPtJ/lyxUVgq6/UzyO1olSj9jc+0DcaWxe/fqab/UT51Uu7Znjw6lbUn5QWtR6vtJQM//4zPUt+NOw+lGzCqo/gLm1QS8)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNVMFq20AQ/ZWpQnECtuQ4SZuqjqGXnnosvUQ5rK2Vs0RaLatViOsaSgk9pC0EmhRDHUigNE0JxIQccugXRfI/dCRZslUCDQihmdn3ZmfejPraCyH03ZBqptYMOpIJ1bI484QvFbwkvNN7xQIFjvQ9qOhG4UkgFYtbnO6lR23qkNBV0Lc4QMdHPKdcBWbmgBlVYg4sjk/TKPKhoagnXKIoWgDNWWYiWC2U7oal4dvSwBRU1gTpUvQs1y0tPY+IHA8LDD8x2Ie2b/eqEAZUcuLRKrhshwaYPMcgyma70HFJECAgwc3FMCpa/YwFBoOmIUqhAuZRRRDW7gEezpMhAN4ljmnOQfYxT9I0MHl+e6Nc/qzPaJeCaAaq51IIOr6gNnr05AJZmx2fq1rA3lIT6vo69Z5nYri+NGFhtdFeX19BV9b6hKSlVbWSoqUhuE9ZIX2Bom5WprJUqlDJBalsVZMjNlFkcSnXXVIVSp5bAEmTE4KtzIF3wVeK8/yQK2rPoIYB0e9f8ckQ4u+Hd9cXEH0Zxyc3k/0x3I3fx6e38fDH3e04OxxQ9Zp51A/VIjJstGYZ1TYL9DQtbMDmTMJMWRMq0fVRPNpHSojPkfY4OhxBfHAZnV2leU5uoq8jrDOXFhHxp9PJ8Dg6/4zuVFcTGvVpGf+QvwkpTA5Gk4+n0c/L+NufMlH0YRhd3WJkRrSMRDlP3qQqeuv1pYetTujmQ+Uy2K0xB2f0UVq/7lLeVdtzMx6djaKjC13X8zF0WQns+HK6GMB4pt389gSuryAppdgexLQZtwvbKAZ8ytw00vv9Z6YBQjdX0MXZrKXxmuoJ7BrHX0s62TiOxLYZ75qwJvamrjbp7HQlzpJtIpRTImtdSWyGf6PFleU1m3aryS7YK88a0Fh7jMaT1afUcZZSfNp6LH2ae54fJS6SeER2GU/EujfvguM4OV2xaoO/NKbeKQ==)

</div>

### 렌더리스 컴포넌트 {#renderless-components}

위에서 논의한 `<FancyList>` 사용 사례는, 재사용 가능한 로직(데이터 가져오기, 페이지 매김 등)과 시각적 출력을 모두 포함하는 동시에, 시각적 출력의 일부를 범위가 지정된 슬롯을 통해 사용될 컴포넌트에 위임합니다.

이 개념을 조금 더 확장하면, 로직을 포함하기만 하고 자체적으로 아무 것도 렌더링하지 않는 컴포넌트를 생각해낼 수 있습니다. 시각적 출력은 범위가 지정된 슬롯인 사용될 컴포넌트에 완전히 위임됩니다. 이러한 유형의 컴포넌트를 **렌더리스 컴포넌트**라고 합니다.

렌더리스 컴포넌트의 예제로 현재 마우스 위치를 추적하는 로직을 포함하는 컴포넌트를 살펴봅시다:

```vue-html
<MouseTracker v-slot="{ x, y }">
  마우스 좌표: {{ x }}, {{ y }}
</MouseTracker>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNUcFKw0AQ/ZVhL0khJp5DWvDgTW8KCnsJzVSCze6yu0kTQu4iXryKJxG8+l/Wf3C2aUsSKHhYmHk77817TMsulAqrElnMErPUubJg0JZqwUVeKKktXMvS4I1Ol4+oYaVlAV4YDUFH97hIop5PTGosFmqdWnSdTUYa1ZlZSzvnrIU6gAY6zmgKgNufr6ft2/f2+RO2Hy+/r+8xtDQDXRe4gia7ndpoO1GT6LiNBWxq7XSyFjSuApCCKMJi5spbUfQNdPuwfTqyJ5ZSGEt+5o7nn88OSDNADlipMvJDH/QW0DqBOqzSdbnDQpU+4J0Dmwl4z4ULKY6mfH/mFDa5yOQmTLPsskJhr3JjUaD2PbJrsJAVesF+6YxsDIKMBfRu9l8aJw8KkLgLQlzTEWvOIG6oaDiLJsfo/gCRPdm0)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqVUU1Lw0AQ/SvDXtJCTDyHVPDgTW8eFPYSmqkNNrthdzZNKLmLePEqnkTw6v+y/gcnDU1N/YDCsszMznvzZt9KnBZFUDoUkYjt1GQFnUiV5YU2BBfaWbw0yfQWDcyMzsELwu/FFuhJJRVWG0CKs8QtCFZSAUw1syhUZKOuAAPCttJIxScO+8GcEObFIiFsM4oHEsoju9A0kWIFlQ81wwV3AUj6eLtbP72v719h/fLw+fjME7kHmsZvA+7kMcw2EM/QOOynCV/sbzb4kt82TBNKRuPtcgbJGbXNAKoIjv1tUnPSxayEr81DjjTX6e57XMGMOMKeEoDmmQ0qmAAGRXKDV4N63devf3JrpwjTnbxlplK9DJI0PSvZlPPMEio0I487Lea6RM/vaDsZ4x2XU3+xmQ3wEML/HQeIW4shqtjlSgqIag5qKcI9t5ovl2Xw7Q==)

</div>

흥미로운 패턴이지만 렌더리스 컴포넌트로 구현할 수 있는 대부분의 케이스는, 추가 컴포넌트 중첩에 의한 오버헤드를 발생시키지 않고 Composition API를 사용하여 보다 효율적인 방식으로 구현할 수 있습니다. 나중에 [컴포지블](/guide/reusability/composables)로 동일한 마우스 추적 기능을 구현하는 방법을 살펴보겠습니다.

결론적으로, 범위가 지정된 슬롯은 `<FancyList>` 예제와 같이 로직을 포함하고 시각적 출력을 구성해야 할 때에 여전히 유용합니다.
