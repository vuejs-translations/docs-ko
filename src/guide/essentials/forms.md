---
outline: deep
---

<script setup>
import { ref } from 'vue'
const message = ref('')
const multilineText = ref('')
const checked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const multiSelected = ref([])
const dynamicSelected = ref('A')
const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
</script>

# 폼 입력 바인딩 {#form-input-bindings}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-inputs-vue-devtools-in-vue-3" title="Vue.js로 사용자 입력 다루기 무료 강의"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-inputs-in-vue" title="Vue.js로 사용자 입력 다루기 무료 강의"/>
</div>

프론트엔드에서 폼을 다룰 때, 우리는 종종 폼 입력 요소의 상태를 JavaScript의 해당 상태와 동기화해야 합니다. 값을 바인딩(binding)하고 변경 이벤트 리스너(listener)를 수동으로 연결하는 것은 번거로울 수 있습니다:

```vue-html
<input
  :value="text"
  @input="event => text = event.target.value">
```

`v-model` 디렉티브(directive)를 사용하면 위의 코드를 다음과 같이 간단하게 만들 수 있습니다:

```vue-html
<input v-model="text">
```

또한, `v-model`은 다양한 타입의 입력, `<textarea>`, `<select>` 요소에도 사용할 수 있습니다. 사용되는 요소에 따라 자동으로 다른 DOM 속성과 이벤트 쌍으로 확장됩니다:

- 텍스트 타입의 `<input>`과 `<textarea>` 요소는 `value` 속성과 `input` 이벤트를 사용합니다.
- `<input type="checkbox">`와 `<input type="radio">`는 `checked` 속성과 `change` 이벤트를 사용합니다.
- `<select>`는 `value`를 prop으로, `change`를 이벤트로 사용합니다.

::: tip 참고
`v-model`은 폼 요소에 있는 초기 `value`, `checked` 또는 `selected` 속성을 무시합니다. 항상 현재 바인딩된 JavaScript 상태를 진실의 원천으로 간주합니다. 초기 값은 <span class="options-api">[`data`](/api/options-state.html#data) 옵션</span><span class="composition-api">[반응성 API](/api/reactivity-core.html#reactivity-api-core)</span>를 사용하여 JavaScript 쪽에서 선언해야 합니다.
:::

## 기본 사용법 {#basic-usage}

### 텍스트 {#text}

```vue-html
<p>메시지: {{ message }}</p>
<input v-model="message" placeholder="수정하세요" />
```

<div class="demo">
  <p>메시지: {{ message }}</p>
  <input v-model="message" placeholder="수정하세요" />
</div>

<div class="composition-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNo9jUEOgyAQRa8yYUO7aNkbNOkBegM2RseWRGACoxvC3TumxuX/+f+9ql5Ez31D1SlbpuyJoSBvNLjoA6XMUCHjAg2WnAJomWoXXZxSLAwBSxk/CP2xuWl9d9GaP0YAEhgDrSOjJABLw/s8+NJBrde/NWsOpWPrI20M+yOkGdfeqXPiFAhowm9aZ8zS4+wPv/RGjtZcJtV+YpNK1g==)

</div>
<div class="options-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNo9jdEKwjAMRX8l9EV90L2POvAD/IO+lDVqoetCmw6h9N/NmBuEJPeSc1PVg+i2FFS90nlMnngwEb80JwaHL1sCQzURwFm258u2AyTkkuKuACbM2b6xh9Nps9o6pEnp7ggWwThRsIyiADQNz40En3uodQ+C1nRHK8HaRyoMy3WaHYa7Uf8To0CCRvzMwWESH51n4cXvBNTd8Um1H0FuTq0=)

</div>

<span id="vmodel-ime-tip"></span>
::: tip 참고
[IME](https://ko.wikipedia.org/wiki/%EC%9E%85%EB%A0%A5_%EB%B0%A9%EC%8B%9D) (중국어, 일본어, 한국어 등)이 필요한 언어의 경우, IME 조합 중에는 `v-model`이 업데이트되지 않는다는 것을 알 수 있습니다. 이러한 업데이트에도 반응하고 싶다면, `v-model` 대신 직접 `input` 이벤트 리스너와 `value` 바인딩을 사용하세요.
:::

### 여러 줄 텍스트 {#multiline-text}

```vue-html
<span>여러 줄 메시지:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="여러 줄을 추가하세요"></textarea>
```

<div class="demo">
  <span>여러 줄 메시지:</span>
  <p style="white-space: pre-line;">{{ multilineText }}</p>
  <textarea v-model="multilineText" placeholder="여러 줄을 추가하세요"></textarea>
</div>

<div class="composition-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNo9jktuwzAMRK9CaON24XrvKgZ6gN5AG8FmGgH6ECKdJjB891D5LYec9zCb+SH6Oq9oRmN5roEEGGWlyeWQqFSBDSoeYYdjLQk6rXYuuzyXzAIJmf0fwqF1Prru02U7PDQq0CCYKHrBlsQy+Tz9rlFCDBnfdOBRqfa7twhYrhEPzvyfgmCvnxlHoIp9w76dmbbtDe+7HdpaBQUv4it6OPepLBjV8Gw5AzpjxlOJC1a9+2WB1IZQRGhWVqsdXgb1tfDcbvYbJDRqLQ==)

</div>
<div class="options-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNo9jk2OwyAMha9isenMIpN9hok0B+gN2FjBbZEIscDpj6LcvaZpKiHg2X6f32L+mX+uM5nO2DLkwNK7RHeesoCnE85RYHEJwKPg1/f2B8gkc067AhipFDxTB4fDVlrro5ce237AKoRGjihUldjCmPqjLgkxJNoxEEqnrtp7TTEUeUT6c+Z2CUKNdgbdxZmaavt1pl+Wj3ldbcubUegumAnh2oyTp6iE95QzoDEGukzRU9Y6eg9jDcKRoFKLUm27E5RXxTu7WZ89/G4E)

</div>

`<textarea>` 내부에서 보간(interpolation)은 동작하지 않습니다. 대신 `v-model`을 사용하세요.

```vue-html
<!-- 잘못된 예 -->
<textarea>{{ text }}</textarea>

<!-- 올바른 예 -->
<textarea v-model="text"></textarea>
```

### 체크박스 {#checkbox}

단일 체크박스, 불리언 값:

```vue-html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<div class="demo">
  <input type="checkbox" id="checkbox-demo" v-model="checked" />
  <label for="checkbox-demo">{{ checked }}</label>
</div>

<div class="composition-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNpVjssKgzAURH/lko3tonVfotD/yEaTKw3Ni3gjLSH/3qhUcDnDnMNk9gzhviRkD8ZnGXUgmJFS6IXTNvhIkCHiBAWm6C00ddoIJ5z0biaQL5RvVNCtmwvFhFfheLuLqqIGQhvMQLgm4tqFREDfgJ1gGz36j2Cg1TkvN+sVmn+JqnbtrjDDiAYmH09En/PxphTebqsK8PY4wMoPslBUxQ==)

</div>
<div class="options-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNpVjtEKgzAMRX8l9Gl72Po+OmH/0ZdqI5PVNnSpOEr/fVVREEKSc0kuN4sX0X1KKB5Cfbs4EDfa40whMljsTXIMWXsAa9hcrtsOEJFT9DsBdG/sPmgfwDHhJpZl1FZLycO6AuNIzjAuxGrwlBj4R/jUYrVpw6wFDPbM020MFt0uoq2a3CycadFBH+Lpo8l5jwWlKLle1QcljwCi/AH7gFic)

</div>

여러 개의 체크박스를 동일한 배열 또는 [Set](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set) 값에 바인딩할 수도 있습니다:

<div class="composition-api">

```js
const checkedNames = ref([])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      checkedNames: []
    }
  }
}
```

</div>

```vue-html
<div>선택된 이름: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

<div class="demo">
  <div>선택된 이름: {{ checkedNames }}</div>

  <input type="checkbox" id="demo-jack" value="Jack" v-model="checkedNames" />
  <label for="demo-jack">Jack</label>

  <input type="checkbox" id="demo-john" value="John" v-model="checkedNames" />
  <label for="demo-john">John</label>

  <input type="checkbox" id="demo-mike" value="Mike" v-model="checkedNames" />
  <label for="demo-mike">Mike</label>
</div>

이 경우, `checkedNames` 배열에는 현재 체크된 박스의 값들이 항상 포함됩니다.

<div class="composition-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNqVkUtqwzAURbfy0CTtoNU8KILSWaHdQNWBIj8T1fohyybBeO+RbOc3i2e+vHvuMWggHyG89x2SLWGtijokaDF1gQunbfAxwQARaxihjt7CJlc3wgmnvGsTqAOqBqsfabGFXSm+/P69CsfovJVXckhog5EJcwJgle7558yBK+AWhuFxaRwZLbVCZ0K70CVIp4A7Qabi3h8FAV3l/C9Vk797abpy/lrim/UVmkt/Gc4HOv+EkXs0UPt4XeCFZHQ6lM4TZn9w9+YlrjFPCC/kKrPVDd6Zv5e4wjwv8ELezIxeX4qMZwHduAs=)

</div>
<div class="options-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNqVUc1qxCAQfpXBU3tovS9WKL0V2hdoenDjLGtjVNwxbAl592rMpru3DYjO5/cnOLLXEJ6HhGzHxKmNJpBsHJ6DjwQaDypZgrFxAFqRenisM0BEStFdEEB7xLZD/al6PO3g67veT+XIW16Cr+kZEPbBKsKMAIQ2g3yrAeBqwjjeRMI0CV5kxZ0dxoVEQL8BXxo2C/f+3DAwOuMf1XZ5HpRNhX5f4FPvNdqLfgnOBK+PsGqPFg4+rgmyOAWfiaK5o9kf3XXzArc0zxZZnJuae9PhVfPHAjc01wRZnP/Ngq8/xaY/yMW74g==)

</div>

### 라디오 {#radio}

```vue-html
<div>선택됨: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

<div class="demo">
  <div>선택됨: {{ picked }}</div>

  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
</div>

<div class="composition-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNqFkDFuwzAMRa9CaHE7tNoDxUBP0A4dtTgWDQiRJUKmHQSG7x7KhpMMAbLxk3z/g5zVD9H3NKI6KDO02RPDgDxSbaPvKWWGGTJ2sECXUw+VrFY22timODCQb8/o4FhWPqrfiNWnjUZvRmIhgrGn0DCKAjDOT/XfCh1gnnd+WYwukwJYNj7SyMBXwqNVuXE+WQXeiUgRpZyaMJaR5BX11SeHQfTmJi1dnNiE5oQBupR3shbC6LX9Posvpdyz/jf1OksOe85ayVqIR5bR9z+o5Qbc6oCk)

</div>
<div class="options-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNqNkEEOAiEMRa/SsFEXyt7gJJ5AFy5ng1ITIgLBMmomc3eLOONSEwJ9Lf//pL3YxrjqMoq1ULdTspGa1uMjhkRg8KyzI+hbD2A06fmi1gAJKSc/EkC0pwuaNcx2Hme1OZSHLz5KTtYMhNfoNGEhUsZ2zf6j7vuPEQyDkmVSBPzJ+pgJ6Blx04qkjQ2tAGsYgkcuO+1yGXF6oeU1GHTM1Y1bsoY5fUQH55BGZcMKJd/t31l0L+WYdaj0V9Zb2bDim6XktAcxvADR+YWb)

</div>

### 셀렉트 {#select}

단일 선택:

```vue-html
<div>선택됨: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">하나를 선택하세요</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>선택됨: {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">하나를 선택하세요</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNp1j7EOgyAQhl/lwmI7tO4Nmti+QJOuLFTPxASBALoQ3r2H2jYOjvff939wkTXWXucJ2Y1x37rBBvAYJlsLPYzWuAARHPaQoHdmhILQQmihW6N9RhW2ATuoMnQqirPQvFw9ZKAh4GiVDEgTAPdW6hpeW+sGMf4VKVEz73Mvs8sC5stoOlSVYF9SsEVGiLFhMBq6wcu3IsUs1YREEvFUKD1udjAaebnS+27dHOT3g/yxy+nHywM08PJ3KksfXwJ2dA==)

</div>
<div class="options-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNp1j1ELgyAUhf/KxZe2h633cEHbHxjstReXdxCYSt5iEP333XIJPQSinuN3jjqJyvvrOKAohAxN33oqa4tf73oCjR81GIKptgBakTqd4x6gRxp6uymAgAYbQl1AlkVvXhaeeMg8NbMg7LxRhKwAZPDKlvBK8WlKXTDPnFzOI7naMF46p9HcarFxtVgBRpyn1lnQbVBvwwWjMgMyycTToAr47wZnUeaR3mfL6sC/H/iPnc/vXS9gIfP0UTH/ACgWeYE=)

</div>

:::tip 참고
`v-model` 표현식의 초기 값이 옵션 중 어떤 것과도 일치하지 않으면, `<select>` 요소는 "선택되지 않음" 상태로 렌더링(rendering)됩니다. iOS에서는 이 경우 사용자가 첫 번째 항목을 선택할 수 없는데, 이는 iOS가 이 경우 change 이벤트를 발생시키지 않기 때문입니다. 따라서 위 예시처럼 값이 비어 있는 비활성화된 옵션을 제공하는 것이 좋습니다.
:::

다중 선택(배열에 바인딩):

```vue-html
<div>선택됨: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>선택됨: {{ multiSelected }}</div>

  <select v-model="multiSelected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNp1kL2OwjAQhF9l5Ya74i7QBhMJeARKTIESIyz5Z5VsAsjyu7NOQEBB5xl/M7vaKNaI/0OvRSlkV7cGCTpNPVbKG4ehJYjQ6hMkOLXBwYzRmfLK18F3GbW6Jt3AKkM/+8Ov8rKYeriBBWmH9kiaFYBszFDtHpkSYnwVpCSL/JtDDE4+DH8uNNqulHiCSoDrLRm0UyWzAckEX61l8Xh9+psv/vbD563HCSxk8bY0y45u47AJ2D/HHyDm4MU0dC5hMZ/jdal8Gg8wJkS6A3nRew4=)

</div>
<div class="options-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNp1UEEOgjAQ/MqmJz0oeMVKgj7BI3AgdI1NCjSwIIbwdxcqRA4mTbsznd2Z7CAia49diyIQsslrbSlMSuxtVRMofGStIRiSEkBllO32rgaokdq6XBBAgwZzQhVAnDpunB6++EhvncyAsLAmI2QEIJXuwvvaPAzrJBhH6U2/UxMLHQ/doagUmksiFmEioOCU2ho3krWVJV2VYSS9b7Xlr3/424bn1LMDA+n9hGbY0Hs2c4J4sU/dPl5a0TOAk+/b/rwsYO4Q4wdtRX7l)

</div>

셀렉트 옵션은 `v-for`로 동적으로 렌더링할 수 있습니다:

<div class="composition-api">

```js
const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  }
}
```

</div>

```vue-html
<div>선택됨: {{ selected }}</div>

<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>
```
<div class="demo">
  <div>선택됨: {{ dynamicSelected }}</div>
  
  <select v-model="dynamicSelected">
    <option v-for="option in options" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</div>

<div class="composition-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNp9kj9vwjAQxb/KyUtaiYahGwpIgBjaoVSFre6AkguEOnZkOwEpynfv2flDqlZkyt37+fye7ZotiyKsSmQzFplYZ4UFg7YsFlxmeaG0hRo0ptBAqlUOAaEBl1zGShqHCowtJjB30EOwDB5voipsRj+d9skl0CyLVzuDYCsxmEB1ECVStQygmfzS9xc10ld/9ZPG8YQ1EVx+0e7RtI1BAaiwmBfiYNFVNkqyarHrLM+grm/+myaaOtUtAojaPlRPuUpQzDnrQc4IAfqiNh0hqdIEdGUm+9icwcy7G8TQl8MESlN3cOhSkYdu9LTteo7i+K2piKZDGjZh1tApp9kxPBsl6fZqR3MWq7zIBOpt74JytmM5OwihLq++Z3WJ/kT9mhPG3//0z+bqepy9azSoK/I+aPagj2hbebN7I/8jkU6tFETfET/QKFE6jy22KmVCtkecd/vi32Amj3uzuVqUpg/ljDqyfRec0btc34l+s/scPvt1XDas+QENov3B)

</div>
<div class="options-api">

[플레이그라운드에서 실행해보기](https://play.vuejs.org/#eNp9ksFuwjAMhl/FyoVNYuWwG+omAeKwHcY0uC07VK2BspBUiVuQKt59Tkq6Hjakqortz87/J2nFrKqSpkYxFanLbVnRs9R4rowlKHCb1YqglRqgyCi7u+/WABaptjpGAA4V5oTFFEaz0ThmTUWl0W4KnzED0ALhmZhbaRyNoclUjaELLn3fgNqczICa/0ftLQ6nLZiL2Fe3CDH/+EsnvVMOCI+Vygh9RGlRNs/r3kzb9s7gckknvuqbANIuD83D0RSonqSIoBSM+B3Tzj4jW2MZuIaljuciBUyD4r6YhLCfwA7bK5x4p6zhOnrSZQPHdsLWHKST3o0YC3K50dtylxyc0XzB4bakyM2xKhXaVVTBPruxUmRKmdNryJGt8XrW3LPH/PuP/MGdfU6Kd4sObcPa+xpldofUlZfrN9Y/KPKp1YrpG8UPdEbVXmOHzWtdsOwBF9S+HP1jLfVu45ZnQu2iKS80XHrgpeBXvrhh/VfuY/IYH4u4/AD+8ADR)

</div>

## 값 바인딩 {#value-bindings}

라디오, 체크박스, 셀렉트 옵션의 경우, `v-model` 바인딩 값은 보통 정적인 문자열(또는 체크박스의 경우 불리언)입니다:

```vue-html
<!-- 체크되면 `picked`는 문자열 "a"가 됩니다 -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle`은 true 또는 false입니다 -->
<input type="checkbox" v-model="toggle" />

<!-- 첫 번째 옵션이 선택되면 `selected`는 문자열 "abc"가 됩니다 -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

하지만 때로는 현재 활성 인스턴스(instance)의 동적 속성에 값을 바인딩하고 싶을 수 있습니다. 이럴 때는 `v-bind`를 사용할 수 있습니다. 또한, `v-bind`를 사용하면 입력 값을 문자열이 아닌 값에 바인딩할 수 있습니다.

### 체크박스 {#checkbox-1}

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```

`true-value`와 `false-value`는 `v-model`에서만 동작하는 Vue 전용 속성입니다. 여기서 체크박스가 체크되면 `toggle` 속성의 값이 `'yes'`로, 체크 해제되면 `'no'`로 설정됩니다. 동적 값에 바인딩하려면 `v-bind`를 사용할 수도 있습니다:

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

:::tip 팁
`true-value`와 `false-value` 속성은 입력의 `value` 속성에 영향을 주지 않습니다. 브라우저는 체크되지 않은 박스를 폼 제출에 포함하지 않기 때문입니다. 폼에서 두 값 중 하나(예: "yes" 또는 "no")가 반드시 제출되도록 하려면, 라디오 입력을 사용하세요.
:::

### 라디오 {#radio-1}

```vue-html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

첫 번째 라디오 입력이 체크되면 `pick`은 `first`의 값으로, 두 번째가 체크되면 `second`의 값으로 설정됩니다.

### 셀렉트 옵션 {#select-options}

```vue-html
<select v-model="selected">
  <!-- 인라인 객체 리터럴 -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model`은 문자열이 아닌 값의 바인딩도 지원합니다! 위 예시에서 옵션이 선택되면, `selected`는 `{ number: 123 }` 객체 리터럴 값으로 설정됩니다.

## 수식어 {#modifiers}

### `.lazy` {#lazy}

기본적으로, `v-model`은 각 `input` 이벤트 후에 입력과 데이터를 동기화합니다([위에서 언급한 IME 조합 제외](#vmodel-ime-tip)). 대신 `change` 이벤트 후에 동기화하려면 `lazy` 수식어(modifier)를 추가할 수 있습니다:

```vue-html
<!-- "input" 대신 "change" 후에 동기화됨 -->
<input v-model.lazy="msg" />
```

### `.number` {#number}

사용자 입력을 자동으로 숫자 타입으로 변환하려면, `v-model`이 적용된 입력에 `number` 수식어를 추가할 수 있습니다:

```vue-html
<input v-model.number="age" />
```

값이 `parseFloat()`로 파싱될 수 없으면, 원래(문자열) 값이 대신 사용됩니다. 특히 입력이 비어 있으면(예: 사용자가 입력 필드를 지운 경우), 빈 문자열이 반환됩니다. 이 동작은 [DOM 속성 `valueAsNumber`](https://developer.mozilla.org/ko/docs/Web/API/HTMLInputElement#valueasnumber)와 다릅니다.

입력에 `type="number"`가 있으면 `number` 수식어가 자동으로 적용됩니다.

### `.trim` {#trim}

사용자 입력의 공백을 자동으로 제거하려면, `v-model`이 적용된 입력에 `trim` 수식어를 추가할 수 있습니다:

```vue-html
<input v-model.trim="msg" />
```

## 컴포넌트에서의 `v-model` {#v-model-with-components}

> Vue의 컴포넌트(component)에 익숙하지 않다면, 이 부분은 지금은 건너뛰어도 됩니다.

HTML의 내장 입력 타입만으로는 항상 요구사항을 충족할 수 없습니다. 다행히도, Vue 컴포넌트를 사용하면 완전히 커스텀된 동작을 가진 재사용 가능한 입력을 만들 수 있습니다. 이러한 입력도 `v-model`과 함께 동작합니다! 더 자세한 내용은 컴포넌트 가이드의 [v-model과 함께 사용하기](/guide/components/v-model)를 참고하세요.
