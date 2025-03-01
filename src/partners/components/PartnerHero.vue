<script setup lang="ts">
import PageHero from '@theme/components/PageHero.vue'

defineProps<{ title?: string }>()
</script>

<template>
  <PageHero>
    <template #title>{{ title || 'Vue Partners' }}</template>
    <template #lead>
      <p>
        Vue 파트너는 Vue 팀에서 인증한 에이전시로, 최상급의 Vue 컨설팅 및 개발 서비스를 제공합니다. 귀사의 파트너 등록에 관심이 있다면,
        <a class="link" href="https://airtable.com/shrCQhat57SApJI2l" target="_blank">여기에서 신청하세요</a>.

      </p>
    </template>
  </PageHero>
</template>
