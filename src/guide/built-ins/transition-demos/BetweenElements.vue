<script setup>
import { ref } from 'vue'

defineProps(['mode'])

const docState = ref('saved')
</script>

<template>
  <div class="demo transition-demo">
    <span style="margin-right: 20px">클릭 시 상태 변경:</span>
    <div class="btn-container">
      <Transition name="slide-up" :mode="mode">
        <button v-if="docState === 'saved'" @click="docState = 'edited'">
          수정
        </button>
        <button v-else-if="docState === 'edited'" @click="docState = 'editing'">
          저장
        </button>
        <button v-else-if="docState === 'editing'" @click="docState = 'saved'">
          취소
        </button>
      </Transition>
    </div>
  </div>
</template>

<style>
.transition-demo {
  display: flex;
  align-items: center;
}

.transition-demo .btn-container {
  display: inline-block;
  position: relative;
  height: 36px;
}

.transition-demo button {
  position: absolute;
}

.transition-demo button + button {
  margin: 0;
}

.transition-demo .slide-up-enter-active,
.transition-demo .slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
