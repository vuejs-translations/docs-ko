# 슬롯(slot) {#slots}

props를 통해 데이터를 전달하는 것 외에도, 부모 컴포넌트(component)는 **슬롯**을 통해 템플릿(template) 조각을 자식에게 전달할 수 있습니다:

<div class="sfc">

```vue-html
<ChildComp>
  이것은 슬롯 콘텐츠입니다!
</ChildComp>
```

</div>
<div class="html">

```vue-html
<child-comp>
  이것은 슬롯 콘텐츠입니다!
</child-comp>
```

</div>

자식 컴포넌트에서는 `<slot>` 엘리먼트를 아웃렛으로 사용하여 부모로부터 전달된 슬롯 콘텐츠를 렌더링(rendering)할 수 있습니다:

<div class="sfc">

```vue-html
<!-- 자식 템플릿에서 -->
<slot/>
```

</div>
<div class="html">

```vue-html
<!-- 자식 템플릿에서 -->
<slot></slot>
```

</div>

`<slot>` 아웃렛 내부의 콘텐츠는 "폴백(fallback)" 콘텐츠로 간주되어, 부모가 슬롯 콘텐츠를 전달하지 않은 경우에 표시됩니다:

```vue-html
<slot>폴백 콘텐츠</slot>
```

현재 우리는 `<ChildComp>`에 슬롯 콘텐츠를 전달하지 않았으므로, 폴백 콘텐츠가 표시되고 있을 것입니다. 이제 부모의 `msg` 상태를 활용하여 자식에게 슬롯 콘텐츠를 제공해 봅시다.
