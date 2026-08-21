# 리스트 렌더링(rendering) {#list-rendering}

`v-for` 디렉티브(directive)를 사용하여 소스 배열을 기반으로 요소 목록을 렌더링할 수 있습니다:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

여기서 `todo`는 현재 반복 중인 배열 요소를 나타내는 지역 변수입니다. 함수의 스코프와 유사하게, `v-for`가 선언된 요소 자체 또는 그 내부에서만 접근할 수 있습니다.

각 todo 객체에 고유한 `id`를 부여하고, 이를 각 `<li>`의 <a target="_blank" href="/api/built-in-special-attributes.html#key">특수 `key` 속성</a>으로 바인딩(binding)하는 것에 주목하세요. `key`는 Vue가 각 `<li>`를 배열에서 해당 객체의 위치에 맞게 정확하게 이동시킬 수 있도록 해줍니다.

목록을 업데이트하는 방법에는 두 가지가 있습니다:

1. 소스 배열에 [변경 메서드](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating)를 호출하는 방법:

   <div class="composition-api">

   ```js
   todos.value.push(newTodo)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos.push(newTodo)
   ```

   </div>

2. 배열을 새 배열로 교체하는 방법:

   <div class="composition-api">

   ```js
   todos.value = todos.value.filter(/* ... */)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos = this.todos.filter(/* ... */)
   ```

   </div>

여기 간단한 todo 리스트가 있습니다 - 작동하도록 `addTodo()`와 `removeTodo()` 메서드의 로직을 구현해 보세요!

`v-for`에 대한 자세한 내용: <a target="_blank" href="/guide/essentials/list.html">가이드 - 리스트 렌더링</a>
