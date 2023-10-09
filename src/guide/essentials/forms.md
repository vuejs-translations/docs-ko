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
</script>

# Form 입력 바인딩 {#form-input-bindings}

프론트엔드에서 폼을 처리할 때, 폼 입력 엘리먼트의 상태를 JavaScript의 상태와 동기화해야 하는 경우가 많습니다.
값 바인딩을 수동으로 연결하고 이벤트 리스너를 변경하는 것은 번거로운 작업입니다:

```vue-html
<input
  :value="text"
  @input="event => text = event.target.value">
```

`v-model` 디렉티브는 위의 내용을 다음과 같이 단순화하는 데 도움이 됩니다:

```vue-html
<input v-model="text">
```

또한 `v-model`은 다른 유형의 입력인 `<textarea>` 및 `<select>` 엘리먼트에 사용할 수 있습니다.
사용되는 엘리먼트에 따라 자동으로 다른 DOM 속성 및 이벤트 쌍으로 확장됩니다.

- 텍스트 유형의 `<input>`과 `<textarea>` 경우, `value` 속성과 `input` 이벤트를 사용합니다.
- `<input type="checkbox">`과 `<input type="radio">` 경우, `checked` 속성과 `change` 이벤트를 사용합니다.
- `<select>`는 `value`를 속성으로 사용하고 `change`를 이벤트로 사용합니다.

::: tip 참고
`v-model`은 모든 폼 엘리먼트에서 감지되는 초기 `value`, `checked` 또는 `selected` 속성 값을 무시합니다.
항상 현재 바인딩된 JavaScript 상태를 유효한 값으로 취급합니다.
<span class="options-api">[`data`](/api/options-state.html#data) 옵션을</span><span class="composition-api">[reactivity API](/api/reactivity-core.html#reactivity-api-core)를</span> 사용하여 JavaScript에서 초기 값을 선언해야 합니다.
:::

## 기본 사용법 {#basic-usage}

### 텍스트 {#text}

```vue-html
<p>메세지: {{ message }}</p>
<input v-model="message" placeholder="메세지 입력하기" />
```

<div class="demo">
  <p>메세지 내용: {{ message }}</p>
  <input v-model="message" placeholder="메세지 입력하기" />
</div>

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNpFzT0KwkAQhuGrDNtEC00vq+A9tpE40UD2h91NmhAQ0RsoiIXYiKSzsMiZTLyDE5RYzvDyfAWbGzPOM2QTxl1kE+PBoc/MTKhEGm09FGAxhhJiqyUElAZCCRVp5TxIdG6xQph2zSAIhkLx8MsQQIdHadKFR7oAuJk11aHd1e19A8322Z6rCRRFr5QlD7thKhNlMg/5SOolplPBfolgQFyEa50u0dL/77WXfXO9vY+nV/2gLCSHh/08Kz/PXl3u)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNpFjU0KwjAQha8yZFNdaPclFrxHN6EdtdCfkKZFCAERvYGCuBA3It25cNEz2XgHI7UVhpl5j8f3FJlzPq1KJB6hRShiLv0gwzXPhYQIF6xMJKggA4iYZKNx9wMIlKXIegWQYlGwJXrgOJ2lv8cuO9QdwFZITHnCJFoFQLnf1geza8x9A+32ac61B0r1ONCaurxLxhkvJVSTNI8wmQXkFwkIWFyIqzyJUFj/zzOXfXu9vY+nV/OwMddyqDvUE/0B/txhxQ==)

</div>

<span id="vmodel-ime-tip"></span>
::: tip 참고
[IME](https://en.wikipedia.org/wiki/Input_method)가 필요한 언어(중국어, 일본어, 한국어 등)의 경우 IME 구성 중에 `v-model`이 업데이트되지 않는 것을 알 수 있습니다.
이러한 업데이트에도 응답하려면 `v-model`을 사용하는 대신 직접 구현한 `input` 이벤트 리스너와 `value` 바인딩을 사용해 기능을 구성해야 합니다.
:::

### 여러 줄 텍스트 {#multiline-text}

```vue-html
<span>여러 줄 메세지:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="여러 줄을 추가해보세요"></textarea>
```

<div class="demo">
  <span>여러 줄 메세지:</span>
  <p style="white-space: pre-line;">{{ multilineText }}</p>
  <textarea v-model="multilineText" placeholder="여러 줄을 추가해보세요"></textarea>
</div>

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNpFj01KxEAQha9S9Ca6iNnHTMB79KbJ1DiB/qO7Z1RCYBY5QkQQxI0gwiwEB/FMpr2D1To/y1f16nuvOnZl7cV6haxklW9cawN4DCtbc90qa1yADhwuoIeFMwoysmZcc90Y7QMo9F5cI8yS5yzLzrmuin8MAUgEVFaKgKQAKm+FruPDdnreQnwZYHob4/AVXzclXaXdn8uCD3cSZ5zdLNuAOW0aLME6zGWr8ZKzuuuO0X1fFaktHQa8DcKhgHWuzBwlEfYuzoBqNLg0co6O5qcS8WmA+Dl+v29+7nfTxy4VehwpoyoOPKInsf+E9b+0EHzV)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNpFT81KxEAMfpUwl9VD7b3Wgu8xl6GNbmE6HWbSdaUU9tBHqAiCeBFE2IPgIj6THd/B1G4VQpIvP1++tOLS2rNNgyIRqc9daSmTBre2dgQFXqlGE7TSABSK1MnpnAM4pMaZBQFU6L26xgRWq7nUTYEdWxr/ETMgrKxWhIwAUm+VycL9fnzaQ3juYXwdQv8ZXnYJb0293ykLnm41Xkhxsy4JI+7kfMs6jHRp8FyKrG0XDdB1aWznRcItKYcKNlFVF6iZ4TglBbCMHNe1LtBx/V9EeOwhfAxfb7vvu8P4fpgEPQx8I40XPmafwPET0f0AA6mArA==)

</div>

`<textarea>` 내부에 이중 중괄호 문법은 작동하지 않으므로 `v-model`을 사용해야 합니다.

```vue-html
<!-- 잘못된 사례 -->
<textarea>{{ text }}</textarea>

<!-- 올바른 사례 -->
<textarea v-model="text"></textarea>
```

### 체크박스 {#checkbox}

단일 체크박스는 불리언을 값을 사용합니다:

```vue-html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<div class="demo">
  <input type="checkbox" id="checkbox-demo" v-model="checked" />
  <label for="checkbox-demo">{{ checked }}</label>
</div>

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNpVjssKgzAURH/lko3tonVfotD/yEaTKw3Ni3gjLSH/3qhUcDnDnMNk9gzhviRkD8ZnGXUgmJFS6IXTNvhIkCHiBAWm6C00ddoIJ5z0biaQL5RvVNCtmwvFhFfheLuLqqIGQhvMQLgm4tqFREDfgJ1gGz36j2Cg1TkvN+sVmn+JqnbtrjDDiAYmH09En/PxphTebqsK8PY4wMoPslBUxQ==)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNpVjtEKgzAMRX8l9Gl72Po+OmH/0ZdqI5PVNnSpOEr/fVVREEKSc0kuN4sX0X1KKB5Cfbs4EDfa40whMljsTXIMWXsAa9hcrtsOEJFT9DsBdG/sPmgfwDHhJpZl1FZLycO6AuNIzjAuxGrwlBj4R/jUYrVpw6wFDPbM020MFt0uoq2a3CycadFBH+Lpo8l5jwWlKLle1QcljwCi/AH7gFic)

</div>

배열 또는 [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)에 여러 개의 체크박스 값을 바인딩할 수도 있습니다.

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
<div>체크된 이름: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="젝" v-model="checkedNames">
<label for="jack">젝</label>

<input type="checkbox" id="john" value="존" v-model="checkedNames">
<label for="john">존</label>

<input type="checkbox" id="mike" value="마이크" v-model="checkedNames">
<label for="mike">마이크</label>
```

<div class="demo">
  <div>체크된 이름: {{ checkedNames }}</div>

  <input type="checkbox" id="demo-jack" value="젝" v-model="checkedNames">
  <label for="demo-jack">젝</label>

  <input type="checkbox" id="demo-john" value="존" v-model="checkedNames">
  <label for="demo-john">존</label>

  <input type="checkbox" id="demo-mike" value="마이크" v-model="checkedNames">
  <label for="demo-mike">마이크</label>
</div>

이 경우 `checkedNames` 배열은 항상 현재 체크된 순서대로 값을 포함합니다.

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqdkT1Ow0AQha8y2iZQBPfRxhIX4AIshWOPlcXeH9lrC2S5QKKg5ABEggYaKuRb2dyBWRtCUjrl233ve6OZhl1ae1FXyFaMl3EhrYMSXWVDoaWypnDQQIEptJAWRsGCrAuhhY6NLh3EW4wzTK4ihSWsvfHs+uZcaB5MLKKQcKhsHjkkBcATWYfDV/f98Nk/v8Cw6/r3xxU0zTGsbXngnR5AIalt5cDdW1wLNho35k4wkAnpBJVZ3kZxRg91lFfeM7zuvFoqk2D+l/mFCzZNkkcbzCE1xTEjpCwPxs8Z9WarD+vfuhPqR0ZI2dn1SmZ4UN9/PNFiacXzh5hI4Z7wPwoP9odk7Q9II9R+)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqdkbFOwzAQhl/l5AmGkj0ykXgBXoAwuPFVDXFiK7WjoigDEgMjD0AlWGBhQnmrhHfgnNC0HVPJsv2f777/dK7ZjTFXlUMWMr5JytTYKC5wa3RpQeJKOGWhjgsAKay4uBzvACVaVxZ7BZCsMclQ3oocNyHc3Y/xxh+00eLBRCdhMTdKWCQFwGVaRf1P+/v03b2+Qb9ru8/nEOr6hApNwwOf6QFUlBbGWbCPBq9jNiQu9TZmkErSEnO9eBBJRoFKKOdz+vedV4tcS1T7mn94zMZOlFiigpUuTxkR1fJgeJxhr9fFsf1He4b9wIiodrZ9nmZ4ZN99vdBgacTzmxhJ0UQ4tMKD6SNZ8weGI9hV)

</div>

### 라디오 {#radio}

```vue-html
<div>선택한 것: {{ picked }}</div>

<input type="radio" id="one" value="하나" v-model="picked" />
<label for="one">하나</label>

<input type="radio" id="two" value="둘" v-model="picked" />
<label for="two">둘</label>
```

<div class="demo">
  <div>선택한 것: {{ picked }}</div>

  <input type="radio" id="one" value="하나" v-model="picked" />
  <label for="one">하나</label>

  <input type="radio" id="two" value="둘" v-model="picked" />
  <label for="two">둘</label>
</div>

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNUD1OwzAUvsqTl8AA3is3EifgAl5C/CJZOLblvAShKAvlAgyVOoDEGTgWJXfguVFgbLf3/UtvFHcx3g49io1QXZ1sJOiQ+lhqb9sYEsEICRuYoEmhhYKthfba18F3BNHWj2hgmy1Xxb3H4lp7JZcirmBA2EZXETICUMYO5c/r57z7mPfv8P2128A4rjXTpGQ25Bx7rY89AT1H3GqRKmODFmANg+CRz6FyfZbm/eH4csjETRsMOqaWQqbkMuuqB3TQhLSGyyWk5Ek5v0hP+VwXj2+Xz52SJSf+t5T8e4qYfgEfE4zM)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNUDFOAzEQ/MrKTaAA9ydzEi/gA9eYeCNZOLZl1gfodA3hAxSRUoDEG3gW4f7AOuZCSSTLnpndmZE8iOsYL/uMohHqfplspLbz+BhDIjC40tkRDJ0HMJr02XnFAAkpJz8zgGiXd2gaWNx4XFRxLA9ffJQ8RjMhXEenCZkBKGP79vvlY9q8T9s3+PrcNDAMv3kwjkqWheLjXetjJqCniFedSNrY0AmwhknwyLDXLpfRtN3tn3dFuFgHg46lGsiSrLVO36KDVUizua0mJQ+T/xvpocC5cf96et3B2bLjr0vJ46eI8QeXtpCj)

</div>

### 셀렉트 {#select}

단일 셀렉트:

```vue-html
<div>선택됨: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">다음 중 하나를 선택하세요</option>
  <option>가</option>
  <option>나</option>
  <option>다</option>
</select>
```

<div class="demo">
  <div>선택됨: {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">다음 중 하나를 선택하세요</option>
    <option>가</option>
    <option>나</option>
    <option>다</option>
  </select>
</div>

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNp1kLFqwzAURX/locXt0HoPiqH/ocW1X0AgS8KWvRhDabOlQwsthEKggwMZM2bIF8XKP+TZJgkZMl7O4Ui8mr1Y+1yVyCaMF0kurYMCXWkjoWVmTe6ghhxn0MAsNxkEpAZCC50YXfSqwsRhCtNeegiCR6F5OHaoQMNhZlXskBYAT2UV+fn/8WPVfW0mUNfXQtPwsMe9N7gjgeopMymqqWBnVbBBIsVYJ42GVBbxq6JGFasSySSjW7R+9Qm+/Ybj77J7X3brPYxP0/bznf/74eEYuM1Fh+3bHUKZe2TR3hA6wvBbGjy83IA1JzMCj3g=)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNp1kMFKxDAURX/lks3oQrsvseB/dBMnTyhk2tCmRSgF0dmNCwWFQRhwUcGlSxd+kc38g68NU5jFQEhycw8nIa24tvayqUnEQlbLMrMuSXO6s0XpoOlW1cahTXNAK6fOzsMeKMnVZX5IQEWGlo50jMUinHXjwhMPGc1mDo5W1ihHnACpsybx64/94254/orRtrMKXSejsR65iQ0NmotVoclcpeKApmKCGCmsy4ocOqvUjWFHo0xNTDIxbHq/e4LvX7B/2w4P2+HzF+Fqzn79499fZRQEx7rk7/v+RMOaU82mP2r4E6bXcpDR/Aei+wdlyJNP)

</div>

:::tip 참고
`v-model` 표현식의 초기 값이 옵션과 일치하지 않으면 `<select>` 엘리먼트가 "선택되지 않은" 상태로 렌더링됩니다.
iOS에서는 이 경우 변경 이벤트를 발생시키지 않기 때문에 사용자가 첫 번째 항목을 선택할 수 없게 됩니다.
따라서 위의 예에서 설명한 것처럼 비활성화된 옵션에 빈 값을 제공하는 것이 좋습니다.
:::

다중 선택(배열로 바인딩 됨):

```vue-html
<div>선택됨: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>가</option>
  <option>나</option>
  <option>다</option>
</select>
```

<div class="demo">
  <div>선택됨: {{ multiSelected }}</div>

  <select v-model="multiSelected" multiple>
    <option>가</option>
    <option>나</option>
    <option>다</option>
  </select>
</div>

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoW10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PuyEoO2DneuQqDoge3sgbXVsdGlTZWxlY3RlZCB9fTwvZGl2PlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cIm11bHRpU2VsZWN0ZWRcIiBtdWx0aXBsZT5cbiAgICA8b3B0aW9uPuqwgDwvb3B0aW9uPlxuICAgIDxvcHRpb24+64KYPC9vcHRpb24+XG4gICAgPG9wdGlvbj7ri6Q8L29wdGlvbj5cbiAgPC9zZWxlY3Q+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG5zZWxlY3RbbXVsdGlwbGVdIHtcbiAgd2lkdGg6IDEwMHB4O1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6IFtdXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PuyEoO2DneuQqDoge3sgbXVsdGlTZWxlY3RlZCB9fTwvZGl2PlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cIm11bHRpU2VsZWN0ZWRcIiBtdWx0aXBsZT5cbiAgICA8b3B0aW9uPuqwgDwvb3B0aW9uPlxuICAgIDxvcHRpb24+64KYPC9vcHRpb24+XG4gICAgPG9wdGlvbj7ri6Q8L29wdGlvbj5cbiAgPC9zZWxlY3Q+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG5zZWxlY3RbbXVsdGlwbGVdIHtcbiAgd2lkdGg6IDEwMHB4O1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

셀렉트 옵션은 `v-for`로 동적으로 렌더링할 수 있습니다:

<div class="composition-api">

```js
const selected = ref('1')

const options = ref([
  { text: '하나', value: '1' },
  { text: '둘', value: '2' },
  { text: '셋', value: '3' }
])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      selected: '1',
      options: [
        { text: '하나', value: '1' },
        { text: '둘', value: '2' },
        { text: '셋', value: '3' }
      ]
    }
  }
}
```

</div>

```vue-html
<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>선택됨: {{ selected }}</div>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoJzEnKVxuXG5jb25zdCBvcHRpb25zID0gcmVmKFtcbiAgeyB0ZXh0OiAn7ZWY64KYJywgdmFsdWU6ICcxJyB9LFxuICB7IHRleHQ6ICfrkZgnLCB2YWx1ZTogJzInIH0sXG4gIHsgdGV4dDogJ+yFiycsIHZhbHVlOiAnMycgfVxuXSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxzZWxlY3Qgdi1tb2RlbD1cInNlbGVjdGVkXCI+XG4gICAgPG9wdGlvbiB2LWZvcj1cIm9wdGlvbiBpbiBvcHRpb25zXCIgOnZhbHVlPVwib3B0aW9uLnZhbHVlXCI+XG4gICAgICB7eyBvcHRpb24udGV4dCB9fVxuICAgIDwvb3B0aW9uPlxuICA8L3NlbGVjdD5cblxuXHQ8ZGl2PuyEoO2DneuQqDoge3sgc2VsZWN0ZWQgfX08L2Rpdj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6ICcxJyxcbiAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgeyB0ZXh0OiAn7ZWY64KYJywgdmFsdWU6ICcxJyB9LFxuICAgICAgICB7IHRleHQ6ICfrkZgnLCB2YWx1ZTogJzInIH0sXG4gICAgICAgIHsgdGV4dDogJ+yFiycsIHZhbHVlOiAnMycgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHNlbGVjdCB2LW1vZGVsPVwic2VsZWN0ZWRcIj5cbiAgICA8b3B0aW9uIHYtZm9yPVwib3B0aW9uIGluIG9wdGlvbnNcIiA6dmFsdWU9XCJvcHRpb24udmFsdWVcIj5cbiAgICAgIHt7IG9wdGlvbi50ZXh0IH19XG4gICAgPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuXG5cdDxkaXY+7ISg7YOd65CoOiB7eyBzZWxlY3RlZCB9fTwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

## 값 바인딩 하기 {#value-bindings}

라디오, 체크박스 및 셀렉트 옵션의 경우, `v-model`에 바인딩된 값은 일반적으로 정적 문자열(체크박스의 경우 불리언)입니다:

```vue-html
<!-- `picked`는 선택 시 문자열 "가"입니다. -->
<input type="radio" v-model="picked" value="가" />

<!-- `toggle`은 true 또는 false입니다. -->
<input type="checkbox" v-model="toggle" />

<!-- `selected`는 첫 번째 옵션이 선택될 때 문자열 "한글"입니다. -->
<select v-model="selected">
  <option value="한글">한글</option>
</select>
```

그러나 때로는 현재 활성 인스턴스의 동적 속성에 값을 바인딩하고 싶을 수도 있습니다.
이것을 구현하기 위해서는 `v-bind`를 사용해야 합니다.
또한 `v-bind`를 사용하면 입력 값을 문자열이 아닌 값에 바인딩할 수 있습니다.

### Checkbox {#checkbox-1}

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  true-value="네"
  false-value="아니오" />
```

`true-value` 및 `false-value` 속성은 `v-model`을 사용하는 경우에만 작동하는 Vue 전용 속성입니다.
여기에서 `toggle` 속성의 값은 체크박스가 선택되면 `네`로 설정되고 선택되지 않을 때는 `아니오`로 설정됩니다.
이 전용 속성에 `v-bind`(`:`)를 사용하여 동적인 값을 바인딩할 수도 있습니다.

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

:::tip Tip
브라우저는 폼 제출 시 체크되지 않은 상자는 포함하지 않기 때문에,
`true-value`와 `false-value` 속성은 입력의 `value` 속성에 영향을 주지 않습니다.
두 값 중 하나가 폼으로 제출되도록 하려면(예: "네" 또는 "아니오") 체크박스 대신 라디오로 구현해야 합니다.
:::

### 라디오 {#radio-1}

```vue-html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

`pick`는 첫 번째 라디오 입력이 확인되면 `first` 값으로 설정되고 두 번째 라디오 입력이 확인되면 `second` 값으로 설정됩니다.

### 셀렉트 옵션 {#select-options}

```vue-html
<select v-model="selected">
  <!-- 인라인 객체 리터럴 -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model`은 문자열이 아닌 값의 바인딩도 지원합니다!
위의 예에서 옵션이 선택되면 `selected`는 `{ number: 123 }` 객체 값으로 설정됩니다.

## 수식어 {#modifiers}

### `.lazy` {#lazy}

기본적으로 `v-model`은 각 `input` 이벤트 이후 데이터와 입력을 동기화합니다([위에 언급된 IME 구성 제외](#vmodel-ime-tip)).
대신 `change` 이벤트 이후에 동기화하기 위해 `.lazy` 수식어를 추가할 수 있습니다.

```vue-html
<!-- "input" 대신 "change" 이벤트 후에 동기화됨 -->
<input v-model.lazy="msg" />
```

### `.number` {#number}

사용자 입력이 자동으로 숫자로 유형 변환되도록 하려면, `v-model` 수식어로 `.number`를 추가하면 됩니다:

```vue-html
<input v-model.number="age" />
```

값을 `parseFloat()`로 파싱할 수 없으면 원래 값이 대신 사용됩니다.

인풋에 `type="number"`가 있으면 `.number` 수식어가 자동으로 적용됩니다.

### `.trim` {#trim}

사용자 입력의 공백이 자동으로 트리밍되도록 하려면 `v-model` 수식어로 `.trim`을 추가하면 됩니다:

```vue-html
<input v-model.trim="msg" />
```

## 컴포넌트에 `v-model` 사용하기 {#v-model-with-components}

> Vue의 컴포넌트에 아직 익숙하지 않은 경우, 지금은 건너뛰어도 됩니다.

HTML의 기본 입력 유형이 항상 사용자의 요구를 충족하는 것은 아닙니다. 다행히도 Vue 컴포넌트를 사용하면 완전히 사용자 정의된 동작으로 재사용 가능한 입력을 구축할 수 있습니다. 이러한 입력은 `v-model`에서도 작동합니다! 자세한 내용은 컴포넌트 가이드의 [`v-model`과 함께 사용하기](/guide/components/v-model)를 참조하세요.
