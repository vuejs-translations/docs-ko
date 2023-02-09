<template>
  <div class="divider"></div>
  <div class="join-container">
    <h2>Vue로 비즈니스 성장하기</h2>
    <p>
      새로운 프로젝트에 대한 리드를 생성하고, 고객에 대한 신뢰도를 높이며, Vue.js 및 ts 에코시스템의 장기적인 지속 가능성을 지원하세요.
    </p>
    <a
      class="join"
      href="https://airtable.com/shrCQhat57SApJI2l"
      target="_blank"
      >파트너 등록</a
    >
  </div>
</template>

<style scoped>
.divider {
  width: 100px;
  margin: 0px auto;
  border-top: 1px solid var(--vt-c-divider-light);
}

.join-container {
  max-width: 688px;
  padding: 28px 28px 96px;
  text-align: center;
  margin: 0 auto;
}

.lead {
  color: var(--vt-c-text-2);
  font-weight: 500;
  font-size: 18px;
}

h2 {
  font-weight: 600;
  letter-spacing: -0.5px;
  font-size: 34px;
  line-height: 1.2;
  margin: 0.5em 0 1em;
}

p {
  color: var(--vt-c-text-2);
}

.join {
  margin-top: 2em;
  display: inline-block;
  text-align: center;
  background-color: var(--vt-c-bg-mute);
  color: var(--vt-c-text-code);
  padding: 12px 24px;
  font-weight: 600;
  border-radius: 6px;
  transition: background-color 0.5s, color 0.5s;
}

.join:hover {
  background-color: var(--vt-c-gray-light-4);
}

.dark .join:hover {
  background-color: var(--vt-c-gray-dark-3);
}
</style>
