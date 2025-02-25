<script setup>
import { ref } from 'vue'
const items = ref([1, 2, 3, 4, 5])
let nextNum = items.value.length + 1

function add() {
  items.value.splice(randomIndex(), 0, nextNum++)
}

function remove() {
  items.value.splice(randomIndex(), 1)
}

function randomIndex() {
  return Math.floor(Math.random() * items.value.length)
}

function shuffle(array) {
  let currentIndex = array.length
  let randomIndex
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }
  return array
}
</script>

<template>
  <div class="demo">
    <button @click="add">무작위 인덱스에 추가</button>
    <button @click="remove">무작위 인덱스에서 제거</button>
    <TransitionGroup name="list" tag="ul" style="margin-top: 20px">
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </TransitionGroup>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
