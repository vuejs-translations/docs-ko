<script setup>
import { ref } from 'vue'

const x = ref(0)

function onMousemove(e) {
  x.value = e.clientX
}
</script>

<template>
  <div
    @mousemove="onMousemove"
    :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
    class="demo movearea"
  >
    <p>이 div에서 마우스를 움직이세요...</p>
    <p>x: {{ x }}</p>
  </div>
</template>

<style>
.movearea {
  color: #fff;
  transition: 0.3s background-color ease;
  border: none;
}
</style>
