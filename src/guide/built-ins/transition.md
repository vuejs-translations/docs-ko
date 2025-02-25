<script setup>
import Basic from './transition-demos/Basic.vue'
import SlideFade from './transition-demos/SlideFade.vue'
import CssAnimation from './transition-demos/CssAnimation.vue'
import NestedTransitions from './transition-demos/NestedTransitions.vue'
import JsHooks from './transition-demos/JsHooks.vue'
import BetweenElements from './transition-demos/BetweenElements.vue'
import BetweenComponents from './transition-demos/BetweenComponents.vue'
</script>

# 트랜지션 {#transition}

Vue는 상태 변화에 대응하기 위해 트랜지션 및 애니메이션 작업에 도움이 되는 두 가지 빌트인 컴포넌트를 제공합니다:

- 엘리먼트 또는 컴포넌트가 DOM에 들어오고 나갈 때 애니메이션을 적용하기 위한 `<Transition>`. 이 페이지에서 다룹니다.

- 엘리먼트 또는 컴포넌트가 `v-for` 리스트에 삽입, 제거 또는 이동할 때 애니메이션을 적용하기 위한 `<TransitionGroup>`. 이것은 [다음 장](/guide/built-ins/transition-group)에서 다룹니다.

이 두 가지 컴포넌트 외에도 CSS 클래스 트랜지션 또는 스타일 바인딩을 통한 상태 기반 애니메이션과 같은 기술을 사용하여 Vue에서 애니메이션을 적용할 수도 있습니다. 이러한 추가 기술은 [애니메이션 기법](/guide/extras/animation) 장에서 다룹니다.

## `<Transition>` 컴포넌트 {#the-transition-component}

`<Transition>`은 빌트인 컴포넌트이므로 등록하지 않고도 컴포넌트의 템플릿에서 사용할 수 있습니다. 기본 슬롯을 통해 전달된 엘리먼트 또는 컴포넌트에 진입(enter) 및 진출(leave) 애니메이션을 적용하는 데 사용할 수 있습니다. 해당 애니메이션은 다음 중 하나의 조건에 충족하면 발생합니다:

- `v-if`를 통한 조건부 렌더링
- `v-show`를 통한 조건부 표시
- 스페셜 엘리먼트 `<component>`를 통해 전환되는 동적 컴포넌트
- `key`라는 특수한 속성 값 변경

다음은 가장 기본적인 사용법 예제입니다:

```vue-html
<button @click="show = !show">토글</button>
<Transition>
  <p v-if="show">안녕</p>
</Transition>
```

```css
/* 이 클래스들이 무엇을 하는지 다음에 설명하겠습니다. */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

<Basic />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNpVkE1OwzAQha8yeFOQSNINm+BWcAeW3hhrIiwS27InQVUUiQ2IC3TPMTgTP3fArq2qXdlv/L5PI8/s3rl6GpG1jAfltSMISKPbCqMHZz3BDB47WKDzdoBVrK6EEUZZE2L1yb7AJhUuyY94JQxvsiXyMRAOrpeEMQHwx5HIGrhTvVbPG8EKfZFOwbZ/75/fX6+8ybWMPHhpgiZdcpw4mCrdFTpSv/uPn7c9b9LG8bk5I3hzskGMgXZ9utZThYbQV1KRnvD6MOlRTlgmMCcbHV0tWCeVph2s65sAKAPeCrMk6dGVPujURDZbCtnCOiPxiw5rsOUfkUGKGA==)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNpVkE1OwzAQha8yeAUSSbphE9wK7sAyG+NOhIVrW/bYUFWV2IC4QPccgzPxcwecOFSpZHnmPfl7mvGO3TpXp4isZTxIrxytOoPPznqCNfYiaoJdZwDWgsT5RekBPFL05l8BhAf71AL5iMXZDyVf+fDmmJsF4cZpQZgVAL+PRNbAjdRKPi47NsTAEs6G2rHV79vH1+cLb8qzgtx5YYIiNensOEiV6ic6Uz+H9+/XA29cAZoTgjezCbIMtNVDW6cKDaGvhCSV8HJ0NIqEk1N2pWNWC9YJqWgLi/oqAIqA1+O+s6ze2808iWxJmcgWFgXJXzSOwfZ/AwSN7w==)

</div>

:::tip
`<Transition>`은 슬롯 컨텐츠로 단일 엘리먼트 또는 컴포넌트만 지원합니다. 컨텐츠가 컴포넌트인 경우, 컴포넌트에는 단일 루트 엘리먼트만 있어야 합니다.
:::

`<Transition>` 컴포넌트 안에 엘리먼트가 삽입되거나 제거되면 다음과 같은 일이 일어납니다:

1. Vue는 대상 엘리먼트에 CSS 트랜지션 또는 애니메이션이 적용되었는지 여부를 자동으로 감지합니다. 그리고 적절한 타이밍에 여러 [CSS 트랜지션 클래스](#transition-classes)가 추가/제거됩니다.

2. [JavaScript 훅](#javascript-hook)에 대한 리스너가 있는 경우, 이 훅은 적절한 타이밍에 호출됩니다.

3. CSS 트랜지션/애니메이션이 감지되지 않고 JavaScript 훅이 제공되지 않으면, DOM 삽입/제거 작업이 브라우저의 다음 애니메이션 프레임에서 실행됩니다.

## CSS 기반 트랜지션 {#css-based-transitions}

### 트랜지션 클래스 {#transition-classes}

진입/진출 트랜지션에 적용되는 6개의 클래스가 있습니다.

![Transition Diagram](./images/transition-classes.png)

<!-- https://www.figma.com/file/rlOv0ZKJFFNA9hYmzdZv3S/Transition-Classes --><!-- https://www.figma.com/file/N6zVa8Wiw0R8i3dGOeJySs/Transition-Classes-(ko-kr) -->

1. `v-enter-from`: 진입 시작 상태. 엘리먼트가 삽입되기 전에 추가되고, 엘리먼트가 삽입되고 1 프레임 후 제거됩니다.

2. `v-enter-active`: 진입 활성 상태. 모든 진입 상태에 적용됩니다. 엘리먼트가 삽입되기 전에 추가되고, 트랜지션/애니메이션이 완료되면 제거됩니다. 이 클래스는 진입 트랜지션에 대한 지속 시간, 딜레이 및 이징(easing) 곡선을 정의하는 데 사용할 수 있습니다.

3. `v-enter-to`: 진입 종료 상태. 엘리먼트가 삽입된 후 1 프레임 후 추가되고(동시에 `v-enter-from`이 제거됨), 트랜지션/애니메이션이 완료되면 제거됩니다.

4. `v-leave-from`: 진출 시작 상태. 진출 트랜지션이 트리거되면 즉시 추가되고 1 프레임 후 제거됩니다.

5. `v-leave-active`: 진출 활성 상태. 모든 진출 상태에 적용됩니다. 진출 트랜지션이 트리거되면 즉시 추가되고, 트랜지션/애니메이션이 완료되면 제거됩니다. 이 클래스는 진출 트랜지션에 대한 지속 시간, 딜레이 및 이징 곡선을 정의하는 데 사용할 수 있습니다.

6. `v-leave-to`: 진출 종료 상태. 진출 트랜지션이 트리거된 후 1 프레임이 추가되고(동시에 `v-leave-from`이 제거됨), 트랜지션/애니메이션이 완료되면 제거됩니다.

`v-enter-active` 및 `v-leave-active`는 진입/진출 트랜지션에 대해 다른 이징 곡선을 지정할 수 있는 기능을 제공합니다. 이에 대한 예는 다음 섹션에서 볼 수 있습니다.

### 트랜지션 이름 지정하기 {#named-transitions}

트랜지션은 `name` prop을 통해 이름을 지정할 수 있습니다:

```vue-html
<Transition name="fade">
  ...
</Transition>
```

이름이 지정된 트랜지션의 경우, 트랜지션 클래스에는 `v` 대신 이름이 접두사로 붙습니다. 예를 들어 위의 트랜지션에 적용된 클래스는 `v-enter-active` 대신 `fade-enter-active`가 됩니다. 페이드 트랜지션을 위한 CSS는 다음과 같아야 합니다:

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### CSS 트랜지션 {#css-transitions}

위의 기본 예제에서 볼 수 있듯이 일반적으로 `<Transition>`은 [네이티브 CSS 트랜지션](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)과 함께 사용됩니다. `transition` CSS 속성은 애니메이션을 적용해야 하는 속성, 트랜지션 기간 및 [이징 곡선](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)을 포함하여 트랜지션 관련된 여러 속성을 지정할 수 있게 해주는 약칭입니다.

다음은 다양한 진입/진출 트랜지션/애니메이션을 구현하기 위해 지속 시간 및 이징 곡선을 사용하는 고급 예제입니다:

```vue-html
<Transition name="slide-fade">
  <p v-if="show">안녕</p>
</Transition>
```

```css
/*
  진입/진출 애니메이션은 다른 지속 시간과
  타이밍 함수를 사용할 수 있습니다.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

<SlideFade />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqFkcFOAjEQhl9l3AsQWRY0JmRdiL6DBw97KWU2Nu62TTuLIiHxojEevBgSD5L4AB49ePCJBN7B1iXCgcRLOzP955uZziQ41bo1KjGIg8RyIzSBRSp1P5Wi0MoQTMBgBlPIjCqg5qS1VKaSK2md9EJdQc8L6mRKbKQyiSqKy3cOYaFzRug9SgYlkZJwwnPBL3tpsM7e83ca9Ff3b9+ftzEsH98X86/l/GPx/Ar7sHp6qewkqgAOBpCcGSatIOGAkhXocbkYYpixITqY1ziVhlEosnUtF17OHhZ3syTy87nnaENxgSTa7lcmlsa5N1sbcoiS0ISMkxghTDyE/hAxsDyHduvQAjKLoSrpOJVTz9pG5MhG+A+ia4GXA8HDAd4INPVO0wWP/NFtQqexC1t15rfU3FWP1FatTJkirkw/7nn9oK2vPRVAacYFjWNoV0XcQn+/IZj+ACmIzBs=)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqFkc9Kw0AQxl9lzKnFpmkVocRt0Xfw4KGXbTLBxSS7bCaxtRS8KOLBixQ8WPABPHrw4BPZ9h3c7WpboSAs8+c7/L7ZmbF3qlSzKtELPVZEWijq9XMcKqkJYkx4mRKM+zlAzInX6q4G0Eilzn87gOJCXoVAukSnTGwywTwWrLmmIcxUygltR2xQEskcTqJURJfdvmcx0IU9m/teb3n3+vVxE8Li4W0++1zM3udPL7APy8dnV7PAAQwMgJ1pnheChAHmPEOLS0WMfsJjNDA3GFNQ+SL58TLyYno/v52yQDlIsKEYgQXb8+asoFFqy+aG7GNOqH0ekajQLYTWiBB4mkKreVgA8gJ9WdLxail/ESnyCv9BdAqIyoGI/AFeC9S1dsOIRzZ0GtCu78K6yRIts8YuP5JbXonUmT2gKe13z2sHLTW0VACpeCRoFELLmZiDrtbgTb4BN4vP8g==)

</div>

### CSS 애니메이션 {#css-animations}

[네이티브 CSS 애니메이션](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)은 CSS 트랜지션과 동일한 방식으로 적용되지만, 엘리먼트가 삽입된 직후에 `*-enter-from`이 제거되지 않고, `animationend` 이벤트에서 제거된다는 차이점이 있습니다.

대부분의 CSS 애니메이션의 경우 `*-enter-active` 및 `*-leave-active` 클래스에서 간단히 선언할 수 있습니다. 다음은 예제입니다:

```vue-html
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    안녕! 여기에 탄력적인 텍스트가 있어요!
  </p>
</Transition>
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

<CssAnimation />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNks1K60AUx1/lNHBRF2mj0E0axfsOd5nNGE68g8lkmDmJSikofiCC4MIPEJQudOfChYs+U52+g2eaol2JEDiZ5Pf7c85JhsFfrbtNjUEcJDYzUhNYpFpvpUqWujIEQzCYwwhyU5WwwuhKqlKVVcoy+r/ah00PrJKpcS1VSa9NYZ8PhKUuBKE/UbJTE1UKtrNCZnubabCwO76mwdbsfDydHCW9FmMFIPlnhLKSJGtKlMjSTlWrDBn375nQ0IQyX6SlAVg6LDxXCrMrVUiVjmEj0gcDIDygUBRyV8WQoSI0g68YAHd78XF22wF3/zqdvLn7a5idnH6MX9z42D1OYHZ25S6fZ5eT6dsRuKcLd/fuHm46iyZ6fl++fvfLD5Le8vwqmbfGt912hnDeQygykg3C0AcIXrrwdgwLRiqIun07SNXoWyxQNPg7kb9Ng8ZiG7C9h4e54UXaJWweEP1pKwD5EfLKlDHYTBS4Gq2xDMA6QP8Hbr270V9C16Of2C+QL/5n5psJRp993vAW)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNUs1Kw0AQfpVpQNBDmij0kkbRd/CYyxqnuphsls0kVkRQ/EEKggdrQVB60JuHHjz0mdrtO7jJtrWnIiy7O8P3ffvNzF46B1I2ywKdwAnzWHFJe5HArswUwTF2WJEQXEYC4JgR29yydwCFVCixiADy0+w8AFIF2sxVdZjNrNBb6pqAMJUJI6wiCo8KokzAfpzw+Gw3cioZ2IVGdUbO3uxhOBlfh56FGQpAeKiYyDlxQxMsRUM6ygoRo4Hbp0MJpcs7c7XIgZwukgqXMnXChUuZDGDHl902EHbJZQk/EQHEKAhVeykDoPuP0/t+A/TgezIe6cEzzG7vpsMvPbzR72OY3T/p3uesN56MrkF/POrXH/320pib8KS16/35NYnQW61fhLU1c23aGtzag8ti4iXa5jLBU1axA5hjuAC/2crbdXMXxARZif8jmtmVqHK0AvtneNFRppH5CqwW8DcW46WqhE6m0gDymCW46W8Z8nzIrTW47eZOawW67a/DLoH2z9Sdca5+AQgk8+0=)

</div>

### 커스텀 트랜지션 클래스 {#custom-transition-classes}

아래 나열된 `<Transition>` props에 커스텀 트랜지션 클래스를 정의하여 전달할 수도 있습니다:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

이들은 기존의 클래스 이름을 재정의합니다. 이는 Vue의 트랜지션 시스템을 [Animate.css](https://daneden.github.io/animate.css/)와 같은 기존 CSS 애니메이션 라이브러리와 결합하려는 경우에 특히 유용합니다.

```vue-html
<!-- Animate.css가 페이지에 포함되어 있다고 가정합니다. -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">안녕</p>
</Transition>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNUTtOAzEQvYpxEyiyViSq4EThBEiI0lLkeL3EwT/Z4wCKItGAuEB6jsGZ+NyB2ewSKOPG83lv/N54Qy9jrNZF0zHlWSUTgWQNJU6FNy6GBGRDkm7IljQpODJA6EB44VXwGaHLcE8mLeAUUtFnwnPWTUE+JqBdtBJ0mwFfFIDgyUxZo+4mgvbsk/YWdPr98vbx/sRZB0MKIfwmSZ8NmIDTCB4vnUamKhmCGyorc9ZZ0K6pPeg0lArMWnc9hEr0gQrm8z6oyaECspa/XKslko7nLkLxSl8VuDa3S+im7CWj6EjWQ9P0BtHY1+7183nHWbtUbLM/U1jg7P+SPM/waNtw1q9f0CVAzGPGVO1XuVI2lLqxMulKBcfkSj4waxaZ9dIqlTM7r0bV6FBxxrdVQS/2/7N/gG5/ALF+t38=)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNUUtOAzEMvYrJChadCIlVSatyAiTEcqQqzbg0JZNEiVOKqkpsQFyge47BmfjcgcykLSyRosR+9rP94g278r5aJWRDJqIK2tO4trj2LhA0OJfJEGxqC9BIkqdnxQYISCnYgwcQF+5hCBQSFmTbPfnKR/Bj3ewQtt5Iws4jMUtEzsJEGa3uRzXrysAITrq3ZuPvl7eP9yfBS1qmAIjbIG3UpF2u1nWyssXMVCmSawfKyBgx1qwE0RKGgVSkV1hiOVVa3eYJptO90cARIdnIA9egzKT/c2cuWYXXiW703YJKlX7kPLSH1UDP9wKzsK/d6+fzTnBfNPFfURkQ/O8nWRHp0XTmRLf9Wmq2IPJxyLlq7DJWyrjUzI0MWCnXcrmUa270LPL9aJWKkV9U59X5EWm17dCaXfb76Ruw7Q8DWrtW)

</div>

### 트랜지션과 애니메이션을 같이 사용하기 {#using-transitions-and-animations-together}

Vue는 트랜지션이 종료된 시점을 알기 위해 이벤트 리스너를 연결해야 합니다. 리스너는 적용된 CSS 규칙 유형에 따라 `transitionend` 또는 `animationend`가 될 수 있습니다. 둘 중 하나만 사용하는 경우, Vue는 올바른 유형을 자동으로 감지할 수 있습니다.

그러나 경우에 따라 하나의 엘리먼트에 Vue에 의해 트리거된 CSS 애니메이션과 hover에 대한 CSS 트랜지션 효과가 같이 있을 수 있습니다. 이러한 경우에는 `type` prop을 사용하여 `animation` 또는 `transition` 값을 전달하여 Vue에서 처리할 유형을 명시적으로 선언해야 합니다:

```vue-html
<Transition type="animation">...</Transition>
```

### 중첩된 트랜지션과 지속시간 설정하기 {#nested-transitions-and-explicit-transition-durations}

트랜지션 클래스는 `<Transition>`의 직접적인 자식 엘리먼트에만 적용되지만, 중첩된 CSS 선택기를 사용하여 중첩된 엘리먼트를 트랜지션할 수 있습니다:

```vue-html
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      안녕
    </div>
  </div>
</Transition>
```

```css
/* 중첩 엘리먼트를 대상으로 하는 규칙 */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* ... 다른 필요한 CSS들은 생략합니다... */
```

진입 시 중첩된 엘리먼트에 트랜지션 딜레이를 추가하여, 시차가 있는 진입 애니메이션 순서를 생성할 수도 있습니다:

```css{3}
/* 시차를 둔 중첩 엘리먼트의 딜레이된 진입 효과 */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

그러나 이것은 작은 문제를 만듭니다. 기본적으로 `<Transition>` 컴포넌트는 루트 트랜지션 엘리먼트에서 첫 번째 `transitionend` 또는 `animationend` 이벤트를 수신하여 트랜지션이 완료된 시점을 자동으로 파악하려고 시도합니다. 중첩 트랜지션을 사용하면 모든 내부 엘리먼트의 트랜지션이 완료될 때까지 원하는 동작이 대기해야 합니다.

이러한 경우 `<transition>` 컴포넌트의 `duration` prop을 사용하여 명시적 트랜지션 지속 시간(밀리초 단위)을 지정할 수 있습니다. 총 지속 시간은 딜레이에 내부 엘리먼트의 트랜지션 지속 시간을 더한 값과 일치해야 합니다:

```vue-html
<Transition :duration="550">...</Transition>
```

<NestedTransitions />

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNVVtPE0EU/ivH9UFAuq0STFyr8RIf9EGN+qDJvizbabuw3d3szBYIIWlIayqQiAkNDQHSB5BLeGiIYB/4Rcz0P3hmZ2nLRSQ87Mw53/nOdy5M57QXQaCXI6IZWpbaoRMwoIRFwTPTc0qBHzKYg5DkYR7yoV+Cewi9Z3qmZ/seRWjRn4anEjDEwogMm142rVgwHi+MlALXYgRvANmJiDHfg+e269hTT00tib4jv6b2rPutddapZNMKpkI+h5ZHHeZgmJGLQkueMHJ8PGNq4FklghePUEZySCAjMCbnlKGccvJJBgTarkUpXv2IkbAHTKDnTsfz+k6TyT/RqPNao4dOI/w8Se+cTfc1oiGbHqgZr5TNuvKox7lHQY/TwBw62YRlTxVCP/JyBtwlhDyRfIGVyzlewYCxTDATW0qOlyoSp1BkBjzIKOu8dCBrwoZHgAt0tm0PwFSLUsRDDSnLZk6ZoJTE6hKrTBKrEsZ6FRlguS5k9DEKxKIkhVKwEMWcHgF+UuEHeyDWmvzXId877S52xGYTxG5FrLX5ygaequJkA0bSfRGX0wH006VyxLVmDUz4cJyqLJfVyzUcvczG/AGmvB+WDHWUc/g6JDs5HLfSDyzbYTLBOTkWIbZ/iqN9ELUKb33vVtt85xTEwqFY3+82mmLtMAEMia0VsbQ5fKFaiZWfrQ1Zc63ZbbRA1Jv8RxXEVl0sHvOlOl/a1i90YHAMyUJcqeiCNxnwrceiBGP/r9V8dUJbtf/pu7wXtxzUv6rDefV5rx/bl4GxpUfUf12vLly8erd+yA9qstODAxCb2PkjWawcBW8sw6siCiHw+BHwo+rZnw50G7/Pjtr4OdYVrbKftStydKLViBMsbfOdDvDOMt88Fett0arwhWaP7PF9sbYiqht8cRWJqmJ9Ve7KLjI0FvtTl/SysYOLp2cyD1TD8KmMHwdtVGMU39O8U9Anqe/hUxx3xdRsvxQ4LgnfB7Ln1NQM1S/pwwXwp9/GNvn0YouV3S4Se+oa+ySdkTZT+xASSsIyMbWej1lhgTDlfv3pHZnBc89Z8nORi+gbnB8J9d1IalSwl/gGoewBXKz2TfyDgo/bZ/p6hhFcpaQoKVQi52O8qeGPzKsbSu/LHdPH4jjspzb/FyrhuqM=)

필요한 경우 객체를 사용하여 진입/출 지속 시간에 대해 별도의 값을 지정할 수도 있습니다:

```vue-html
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

### 성능 고려사항 {#performance-considerations}

위에 표시된 애니메이션은 대부분 `transform` 및 `opacity`와 같은 속성을 사용하고 있음을 알 수 있습니다. 이러한 속성은 다음과 같은 이유로 애니메이션에 효율적입니다:

1. 애니메이션 진행중에 문서 레이아웃에 영향을 미치지 않으므로 모든 애니메이션 프레임에서 값비싼 CSS 레이아웃 계산을 트리거하지 않습니다.

2. 대부분의 최신 브라우저는 `transform`에 애니메이션을 적용할 때 GPU 하드웨어 가속을 활용할 수 있습니다.

이에 비해 `height`나 `margin` 같은 속성은 CSS 레이아웃을 트리거하므로 애니메이션하기에 훨씬 비용이 많이 들며, 신중하게 사용해야 합니다.

## JavaScript 훅 {#javascript-hooks}

`<Transition>` 컴포넌트의 이벤트를 수신하여 JavaScript로 트랜지션 프로세스에 연결할 수 있습니다:

```html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

<div class="composition-api">

```js
// 엘리먼트가 DOM에 삽입되기 전에 호출됩니다.
// 이것을 사용하여 엘리먼트의 "enter-from" 상태를 설정합니다.
function onBeforeEnter(el) {}

// 엘리먼트가 삽입되고 1 프레임 후 호출됩니다.
// 진입 애니메이션을 시작하는 데 사용합니다.
function onEnter(el, done) {
  // CSS와 함께 사용되는 경우, 선택적으로 
  // 트랜지션 종료를 나타내기 위해 done 콜백을 호출합니다.
  done()
}

// 진입 트랜지션이 완료되면 호출됩니다.
function onAfterEnter(el) {}

// 진입 트랜지션 취소가 완료되기 전 호출됩니다.
function onEnterCancelled(el) {}

// 진출 훅 전에 호출됩니다.
// 대부분의 경우 그냥 진출 훅을 사용해야 합니다.
function onBeforeLeave(el) {}

// 진출 트랜지션이 시작될 때 호출됩니다.
// 진출 애니메이션을 시작하는 데 사용합니다.
function onLeave(el, done) {
  // CSS와 함께 사용되는 경우, 선택적으로 
  // 트랜지션 종료를 나타내기 위해 done 콜백을 호출합니다.
  done()
}

// 진출 트랜지션이 완료되고,
// 엘리먼트가 DOM에서 제거된 후 호출됩니다.
function onAfterLeave(el) {}

// v-show 트랜지션에서만 사용 가능합니다.
function onLeaveCancelled(el) {}
```

</div>
<div class="options-api">

```js
export default {
  // ...
  methods: {
    // 엘리먼트가 DOM에 삽입되기 전에 호출됩니다.
    // 이것을 사용하여 엘리먼트의 "enter-from" 상태를 설정합니다.
    onBeforeEnter(el) {},

    // 엘리먼트가 삽입되고 1 프레임 후 호출됩니다.
    // 진입 애니메이션을 시작하는 데 사용합니다.
    onEnter(el, done) {
      // CSS와 함께 사용되는 경우, 선택적으로 
      // 트랜지션 종료를 나타내기 위해 done 콜백을 호출합니다.
      done()
    },

    // 진입 트랜지션이 완료되면 호출됩니다.
    onAfterEnter(el) {},

    // 진입 트랜지션 취소가 완료되기 전 호출됩니다.
    onEnterCancelled(el) {},

    // 진출 훅 전에 호출됩니다.
    // 대부분의 경우 그냥 진출 훅을 사용해야 합니다.
    onBeforeLeave(el) {},

    // 진출 트랜지션이 시작될 때 호출됩니다.
    // 진출 애니메이션을 시작하는 데 사용합니다.
    onLeave(el, done) {
      // CSS와 함께 사용되는 경우, 선택적으로 
      // 트랜지션 종료를 나타내기 위해 done 콜백을 호출합니다.
      done()
    },

    // 진출 트랜지션이 완료되고,
    // 엘리먼트가 DOM에서 제거된 후 호출됩니다.
    onAfterLeave(el) {},

    // v-show 트랜지션에서만 사용 가능합니다.
    onLeaveCancelled(el) {}
  }
}
```

</div>

이 훅은 CSS 트랜지션/애니메이션과 함께 사용하거나 단독으로 사용할 수 있습니다.

JavaScript 전용 트랜지션을 사용할 때 일반적으로 `:css="false"` prop을 추가하는 것이 좋습니다. 이것은 Vue가 CSS 트랜지션을 자동으로 감지하는 것을 건너뛰도록 명시적으로 지시합니다. 성능이 약간 향상되는 것 외에도 CSS 규칙이 실수로 트랜지션을 방해하는 것을 방지합니다.

```vue-html{3}
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```

`:css="false"`를 사용하면 트랜지션이 끝나는 시점 제어에 대한 전적인 책임을 가집니다. 이 경우 `@enter` 및 `@leave` 훅에 `done` 콜백이 필요합니다. 그렇지 않으면 훅이 동기적으로 호출되고 트랜지션이 즉시 완료됩니다.

다음은 [GSAP 라이브러리](https://gsap.com/)를 사용하여 애니메이션을 수행하는 데모입니다. 물론 [Anime.js](https://animejs.com/)나 [Motion One](https://motion.dev/)과 같은 다른 애니메이션 라이브러리를 사용할 수도 있습니다:

<JsHooks />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNVM2O0zAQfpXBCLWVmp/tUrEK2WUBcUPiwgGkXBzHaU0T27KdbldVJU48B4/BMyHxDozzQxMOu3uK55vxfJ+/GeVI3mod7htOEpJaZoR2YLlr9E0mRa2VcXAEw0s4QWlUDTMsnf1LbSzVPe6PmMgkU9Jij626g2t/c+5Mwxc+UzaSOaEkKPmOl8rwD9JxM+fVAo6ZhLZbiOSILDsEwDJa8S8JxOFqvRxBXyeQ0pQJd5/AhY9PyHbyhwnlQLaEQkk+pnRqzFg0hvor2GxMiBomMQoY4jN7D3BqeQIzXlHrBAuF/NS4+SpcL+FiMRsuyfeq1hV3WOkFjYRPZH/kdM+nsjP3oOw4fPVE4YcELuP4KaIHdY84hiPpuxXYBx2J8f5/Jg18DxiQRt0m4g5i4DiWUccxAkjzxjk05pZVgu2uM9Iv2jP/zcjNnx8/f//6nkZdWdsAL302VFrhNXbct3m7fwH3O4FNJguZkb7onJ3ilR9Ji7fDGfCEWYtoSSvbY61ipC/EHhj66tPevyBXh4zAPhBl/wJUnkZY1r0xOutFII1GDmBo3X3lj+HQqptDTtluY1QjiwSev1zlV1eXrz1eU7MRMnBKJ7CK9aEF70Thtn76fbzlYrN1IyBXpuAmMLQQjU1gHb9AuBtNT0+WpPsLBDVuxDerJP5CWiVZn7AZSYYd6R7ugYxsndM2iaJG6t0mZKqOfO5NrYqm6p1DphM5/QXubYCe)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqNVMGO0zAQ/ZUhCHUrtUm2S8UqdJcFxA2JCweQfHESpzFN7MiedLtaVeLEd/AZfBMS/8DYSbYJh2Wlqsm8Gc97fp74PnjbNOG+FUESbGxmZIPXTMm60QZha3kDhdE1zNzrjCmmxMGnclHwtkK4Zwog58jP5t07gBHYGjVEALbUtwmgaUWHHN3juHD/tcBS5zZxxQwZavVOFNqIDwqF8RUAWk2jj4LvfSfqQz+milZlKLWi3Gj1mah6RU56aAUSshhU2YxX4ksCcbha95099HUC6YZnEu8SOPd8c08IMKEcyBaQayXGlKjHjHlruFtCzcaEpGESk4AhPrH3gOBWJDATFbcos1CqTy2ercL1As7nswd/3uu6qQRSpRM0Ej6R7V2cymb4qOw4fPVE4YcELuL4KaIHdf9xjI6k75ZTH3IkpvX/mDTwPWLAJnoYcApQUBlHQRHAJm2Rpg9uskpmuysWuKGFK3jmniy4/vPj5+9f3zdRV+Yb0KLPhisrncaO+yb187cUbiaoyWQgWdAXnbJTvHJH4vFuxHs8yawltOCV7TGvmOhzuYeMfHVp598y1QcWwH4pi34HpHwTUVm3x+ikl4BNNHKAQot3lXsNh1bdOaQ8222NblWewPOXq/Ty8uK1/3S52Uq1RN0ksIqbgwdvZY6lO/0+LoXcljgCUm1yYZaG57Klz34dvyC4O5qePlgE3e2zrGkivlmt6GbySlifsCzwF4bzoNu4A1hQIjY2iaJWNbttmOk6crk3tc7bqnfOXRnB8S+8j5vu)

</div>

## 재사용 가능한 트랜지션 {#reusable-transitions}

Vue의 컴포넌트 시스템을 통해 트랜지션을 재사용할 수 있습니다. 재사용 가능한 트랜지션을 만들기 위해 `<Transition>` 컴포넌트를 래핑하고 슬롯 컨텐츠를 전달하는 컴포넌트를 만들 수 있습니다:

```vue{5}
<!-- MyTransition.vue -->
<script>
// JavaScript 훅 로직...
</script>

<template>
  <!-- 빌트인 트랜지션 컴포넌트 래핑 -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- 슬롯 컨텐츠 전달 -->
  </Transition>
</template>

<style>
/*
  필요한 CSS 정의...
  참고: 슬롯 컨텐츠에 적용되지 않으므로,
  여기에서 <style scoped>를 사용하지 마십시오.
*/
</style>
```

이제 빌트인 버전처럼 `MyTransition`을 가져와서 사용할 수 있습니다:

```vue-html
<MyTransition>
  <div v-if="show">안녕</div>
</MyTransition>
```

## 등장 트랜지션 {#transition-on-appear}

노드의 초기 렌더링에도 트랜지션을 적용하려면 `appear` prop을 추가할 수 있습니다:

```vue-html
<Transition appear>
  ...
</Transition>
```

## 엘리먼트 간 트랜지션 {#transition-between-elements}

`v-if` / `v-show`로 앨리먼트를 토글하는 것 외에도, 특정 순간에 표시되는 앨리먼트가 하나만 있는지 확인하는 한 `v-if`/`v-else`/`v-else-if`를 사용하여 두 앨리먼트 사이를 전환할 수도 있습니다:

```vue-html
<Transition>
  <button v-if="docState === 'saved'">수정</button>
  <button v-else-if="docState === 'edited'">저장</button>
  <button v-else-if="docState === 'editing'">취소</button>
</Transition>
```

<BetweenElements />

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqdk89uEzEQxl9ltJe0EpsNRVyWTQTPABekvTi7TmLVa1v27EIVRWpVCSHBFYlDhXoBceECSJx4Ibp9B8Z20qRQpFKf/Oeb32fPjJfJE2OGXcuTPClcZYVBcBxbMymVaIy2CEuwfAYrmFndwICkg1KVqtLKIdS6eooMOYy9aG/gWMfrwX6piizCCEML5I2RJPMrLJxhChweST4uk4bZuVCpFfMF5nAwMi/LZHJ58v3i0xfo35xBf3pyeXoGF9+Of339mROWggkDUNSig0oy54gyRZXSjZAJxS0BvA85PbNMOYFCK1Cs8XZOipqnrQkaCKOYtoik6FIxI8X2SeMxrB9UJhvxZjyupKgOr8lhwGuBQT3pX7/vz98VWUTfYMWl4zf5XSFubSjUPDieH/cfPt7RMTJuZblJyKT/8bl/9fYPwyLbpjxWKaMy0azIdntAFaH8NB1eqxwsfUwtHCmPchBK0m46lbo6fORPjI7onLqNWKLjYXvBY/fc5w2tV95g/ezA20axqdOyxRj1YkGpTqmfKp6DsX4zhA43PZJyhdymrPJG93YPJKcsrA+iB149m1ykhNHw4KEDzijnusV/ocOXCvGariGQ3jwKdwu4mbZNHqc+cc/3HtDv2P+bFW+D+j9I6Q6K/lQoRrL6DbMka5E=)

## 트랜지션 모드 {#transition-modes}

이전 예제에서 진입 시 엘리먼트와 진출 시 엘리먼트는 동시에 애니메이션되며 두 엘리먼트가 DOM에 있을 때 레이아웃 문제를 피하기 위해 `position: absolute`로 만들어야 했습니다.

그러나 어떤 경우에는 이것이 선택가능한 옵션이 아니거나, 원하는 동작이 아닐수 있습니다. 진출 시 엘리먼트가 먼저 애니메이션 처리되고 진입 시 엘리먼트가 **진출 애니메이션이 완료된 이후에 삽입**되기를 원할 수 있습니다. 이러한 애니메이션을 수동으로 조정하는 것은 매우 복잡합니다. 운 좋게도 `<Transition>`에 `mode` prop을 전달하여 이 동작을 활성화할 수 있습니다.

```vue-html
<Transition mode="out-in">
  ...
</Transition>
```

다음은 `mode="out-in"`을 사용한 이전 데모입니다:

<BetweenElements mode="out-in" />

`<Transition>`은 자주 사용되지는 않지만 `mode="in-out"`도 지원합니다.

## 컴포넌트 간 트랜지션 {#transition-between-components}

`<Transition>`은 [동적 컴포넌트](/guide/essentials/component-basics#dynamic-components)에서도 사용할 수 있습니다:

```vue-html
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

<BetweenComponents />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqtkrFOwzAQhl/llKUgNUkXlpBWSngDxJjFTa5gybGt+BIUVd2YEBIvwsiAxCNB3wE7Sdu0IMRAptz5v++/s2/tJVoHTY1e5MUmr7gmMEi1XmSSl1pVBGswd0wIdX+NK9jAqlIlTGzFZK+4UqVOhoMg7CKHPBakR4J0EGQyDKE2OPYgBaxRvIDcCpVESbBELm+hQNSiBbU0WDVYZDJX0hCwnHiDjtqL5yPYWdfNeSbjsJ/OzmUDwlILRugiigVborC/YL+YS10TUKtxnnkVK7jKPGj8UhUobObEzJ5FDRO1E3dWmbeAxKHi8ID9T4fUOaTfHG4qJg0nriRIVjrxihVoix3WRqomn0tbOzRxuNuIm59cF3G41/QW4cHDJuJwfIkyNtQK9xs4X98WYeX30OkuKZA1OCRh7Zi0J0agNMs5tTALLgwgM3iZyY1Dj4luh054dl061lAfwawvtC/eteRN+5fZbfmobTtUwZvhShL4fH/dPr98PDxtH9/6ifvT0agDrFvf32Dpn2CbL4/sPjc=)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNqtks1KxDAQx19l6GUVtq0XL7UutL6Cx15iOwuBNAnptLgse/Mkgi/i0YPgI+m+g/nodj8U8SCUtjP5z++fyWQdFVonQ49RFuVdbbimRSV5q5UhuFGtLmBpVAuzJPWRk86OBOWRoBwFlcR7L2lwyXpBsK4kQG0VSqKkLoN1wM9HyGbuBA0jdnYexAAGqTdyFwGwmviATu8hGcw8wtq51Y372Jd98nRqxQaErRaM0EWUC3aHwv66kpxL3RPQSuN1FRnWcFVFMMStalDYzImhW2Oid1pvXEULKBwpT/fUfzQonUH5zeDWMNlx4kqCZK0TL1mDttZRbaR6irm0teMeplOHjHc/mS7ydNIEi3TvYRN5eniEMu9oJdxv4nxjW4QmDlA7xJAUyAYck2GANBEzUJrVnFZwkVx2gKzDKz+2Y6K7Vic8UoE11mdwEQrtvP2WonkYzO5CH2zbNtXwYTySAj7fX7fPLx8PT9vHt9BxWD1odYT5G/0brPwTbPMFgwUxwg==)

</div>

## 동적 트랜지션 {#dynamic-transitions}

`<Transition>` `name`과 같은 prop도 동적일 수 있습니다! 이를 통해 상태 변경에 따라 다른 트랜지션을 동적으로 적용할 수 있습니다:

```vue-html
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

이것은 Vue의 트랜지션 클래스 규칙을 사용하여 CSS 트랜지션/애니메이션을 정의하고 둘 사이를 트랜지션하려는 경우에 유용할 수 있습니다.

컴포넌트의 현재 상태를 기반으로 JavaScript 트랜지션 훅에서 다른 동작을 적용할 수도 있습니다. 마지막으로, 동적 트랜지션을 만드는 궁극적인 방법은 사용할 트랜지션의 특성을 변경하기 위해 prop을 허용하는 [재사용 가능한 트랜지션 컴포넌트](#reusable-transitions)를 사용하는 것입니다. 진부하게 들릴지 모르지만, 실제로 한계는 당신의 상상력뿐입니다.

## key 속성을 사용한 트렌지션 {#transitions-with-the-key-attribute}

때로는 트렌지션을 발생시키기 위해 DOM 엘리먼트를 강제로 다시 렌더링해야 할 필요가 있습니다.

예를 들어, 이 카운터 컴포넌트를 봅시다:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);

setInterval(() => count.value++, 1000);
</script>

<template>
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 1,
      interval: null 
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.count++;
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<template>
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```

</div>

`key` 속성(attribute)을 생략했다면, 텍스트 노드만 업데이트되고 트렌지션이 발생하지 않았을 것입니다. 그러나 `key` 속성을 사용함으로써, Vue는 `count`가 변경될 때마다 새로운 `span` 엘리먼트를 생성하고 `Transition` 컴포넌트는 두 개의 다른 엘리먼트 사이에서 트렌지션을 할 수 있습니다.

<div class="composition-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNp9UsFu2zAM/RVCl6Zo4nhYd/GcAtvQQ3fYhq1HXTSFydTKkiDJbjLD/z5KMrKgLXoTHx/5+CiO7JNz1dAja1gbpFcuQsDYuxtuVOesjzCCxx1MsPO2gwuiXnzkhhtpTYggbW8ibBJlUV/mBJXfmYh+EHqxuITNDYzcQGFWBPZ4dUXEaQnv6jrXtOuiTJoUROycFhEpAmi3agCpRQgbzp68cA49ZyV174UJKiprckxIcMJA84hHImc9oo7jPOQ0kQ4RSvH6WXW7JiV6teszfQpDPGqEIK3DLSGpQbazsyaugvqLDVx77JIhbqp5wsxwtrRvPFI7NWDhEGtYYVrQSsgELzOiUQw4I2Vh8TRgA9YJqeIR6upDABQh9TpTAPE7WN3HlxLp084Foi3N54YN1KWEVpOMkkO2ZJHsmp3aVw/BGjqMXJE22jml0X93STRw1pReKSe0tk9fMxZ9nzwVXP5B+fgK/hAOCePsh8dAt4KcnXJR+D3S16X07a9veKD3KdnZba+J/UbyJ+Zl0IyF9rk3Wxr7jJenvcvnrcz+PtweItKuZ1Np0MScMp8zOvkvb1j/P+776jrX0UbZ9A+fYSTP)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://play.vuejs.org/#eNp9U8tu2zAQ/JUFTwkSyw6aXlQ7QB85pIe2aHPUhZHWDhOKJMiVYtfwv3dJSpbbBgEMWJydndkdUXvx0bmi71CUYhlqrxzdVAa3znqCBtey0wT7ygA0kuTZeX4G8EidN+MJoLadoRKuLkdAGULfS12C6bSGDB/i3yFx2tiAzaRIjyoUYxesICDdDaczZq1uJrNETY4XFx8G5Uu4WiwW55PBA66txy8YyNvdZFNrlP4o/Jdpbq4M/5bzYxZ8IGydloR8Alg2qmcVGcKqEi9eOoe+EqnExXsvTVCkrBkQxoKTBspn3HFDmprp+32ODA4H9mLCKDD/R2E5Zz9+Ws5PpuBjoJ1GCLV12DASJdKGa2toFtRvLOHaY8vx8DrFMGdiOJvlS48sp3rMHGb1M4xRzGQdYU6REY6rxwHJGdJxwBKsk7WiHSyK9wFQhqh14gDyIVjd0f8Wa2/bUwOyWXwQLGGRWzicuChvKC4F8bpmrTbFU7CGL2zqiJm2Tmn03100DZUox5ddCam1ffmaMPJd3Cnj9SPWz6/gT2EbsUr88Bj4VmAljjWSfoP88mL59tc33PLzsdjaptPMfqP4E1MYPGOmfepMw2Of8NK0d238+JTZ3IfbLSFnPSwVB53udyX4q/38xurTuO+K6/Fqi8MffqhR/A==)

</div>

---

**관련 문서**

- [`<Transition>` API 참고](/api/built-in-components#transition)
