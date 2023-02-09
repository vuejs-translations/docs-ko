<script lang="ts">
const shuffleMembers = (members: Member[], pinTheFirstMember = false): void => {
  let offset = pinTheFirstMember ? 1 : 0
  // `i` is between `1` and `length - offset`
  // `j` is between `0` and `length - offset - 1`
  // `offset + i - 1` is between `offset` and `length - 1`
  // `offset + j` is between `offset` and `length - 1`
  let i = members.length - offset
  while (i > 0) {
    const j = Math.floor(Math.random() * i);
    [
      members[offset + i - 1],
      members[offset + j]
    ] = [
      members[offset + j],
      members[offset + i - 1]
    ]
    i--
  }
}
</script>

<script setup lang="ts">
import { VTLink } from '@vue/theme'
import membersCoreData from './members-core.json'
import membersEmeritiData from './members-emeriti.json'
import membersPartnerData from './members-partner.json'
import TeamHero from './TeamHero.vue'
import TeamList from './TeamList.vue'
import type { Member } from './Member'
shuffleMembers(membersCoreData as Member[], true)
shuffleMembers(membersEmeritiData as Member[])
shuffleMembers(membersPartnerData as Member[])
</script>

<template>
  <div class="TeamPage">
    <TeamHero>
      <template #title>팀과 만나기</template>
      <template #lead
        >Vue와 그 에코시스템의 개발은 국제적인 팀에 의해 주도되며, 그 중 일부에 대한 소개는 <span class="nowrap">아래에 있습니다</span>
        </template
      >

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
          >팀에 대해 자세히 알아보기</VTLink
        >
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>핵심 팀원</template>
      <template #lead
        >핵심 팀원은 하나 또는 그 이상의 핵심 프로젝트 유지 관리에 유지 관리에 적극적으로 참여하는 사람들입니다. 이들은 Vue 생태계에 장기적으로 헌신하며 프로젝트와 사용자의 성공을 위해 장기적으로 헌신하며 프로젝트와 사용자의 성공을 위해 장기간 헌신해 왔습니다.</template
      >
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>핵심 팀  Emeriti</template>
      <template #lead
        >여기에서는 더 이상 활동하지 않는 핵심 팀원 중 과거에 귀중한 공헌을 한 분들을  귀중한 공헌을 한 핵심 팀원들을 기리고자 합니다.</template
      >
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>커뮤니티 파트너</template>
      <template #lead
        >Vue 커뮤니티를 더욱 풍성하게 만들어준 일부 회원은 특별히 언급할 가치가 있습니다. 우리는 이러한 주요 파트너와 더욱 긴밀한 관계를 발전시켜 왔으며, 종종 향후 기능 및 뉴스에 대해 이들과 협력하고 있습니다.</template
      >
    </TeamList>
  </div>
</template>

<style scoped>
.TeamPage {
  padding-bottom: 16px;
}

@media (min-width: 768px) {
  .TeamPage {
    padding-bottom: 96px;
  }
}

.TeamList + .TeamList {
  padding-top: 64px;
}
</style>
