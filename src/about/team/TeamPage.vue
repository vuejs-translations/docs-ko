<script lang="ts">
const shuffleMembers = (
  members: Member[],
  pinTheFirstMember = false
): void => {
  let offset = pinTheFirstMember ? 1 : 0
  // `i` is between `1` and `length - offset`
  // `j` is between `0` and `length - offset - 1`
  // `offset + i - 1` is between `offset` and `length - 1`
  // `offset + j` is between `offset` and `length - 1`
  let i = members.length - offset
  while (i > 0) {
    const j = Math.floor(Math.random() * i)
    ;[members[offset + i - 1], members[offset + j]] = [
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
      <template #title>팀을 만나 보세요</template>
      <template #lead>
        Vue와 그 생태계의 개발은 국제적인 팀에 의해 이루어지며, 그중 일부 팀원들은 <span class="nowrap">아래에 소개되었습니다.</span>
      </template>

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
        >
          팀에 대해 더 알아보기
        </VTLink>
      </template>
    </TeamHero>

    <TeamList :members="(membersCoreData as Member[])">
      <template #title>핵심 팀 멤버</template>
      <template #lead>
        핵심 팀 멤버(Core Team Members)는 하나 이상의 핵심 프로젝트를 적극적으로 유지 관리하는 사람들입니다.
        이들은 Vue 생태계에 중요한 기여를 했으며, 프로젝트와 사용자들의 성공을 위해 장기적인 헌신을 이어가고 있습니다.
      </template>
    </TeamList>

    <TeamList :members="(membersEmeritiData as Member[])">
      <template #title>Core Team Emeriti</template>
      <template #lead>
        여기에서는 과거에 소중한 기여를 했지만 현재는 더 이상 활동하지 않는 핵심 팀 멤버들을 기립니다.
      </template>
    </TeamList>

    <TeamList :members="(membersPartnerData as Member[])">
      <template #title>커뮤니티 파트너</template>
      <template #lead>
        Vue 커뮤니티의 일부 멤버들은 커뮤니티를 더욱 풍성하게 만드는 데 큰 기여를 하였으며, 특별한 언급이 필요할 정도로 중요한 역할을 해왔습니다.
        우리는 이러한 핵심 파트너들과 더욱 긴밀한 관계를 구축해 왔으며, 종종 새로운 기능이나 소식을 조율하는 과정에서 협력하고 있습니다.
      </template>
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
