import partnerData from '../partners/partners.json'

const partnerName = 'Proxify'
const partner = partnerData.find(partner => partner.name === partnerName)

const websiteLabel = 'proxify.io'
const websiteUrl = 'https://proxify.io/'
const applyUrl = 'https://career.proxify.io/apply'
const hireUrl = 'https://proxify.io/hire-vuejs'
const vueArticleUrl = 'https://proxify.io/hire-vue-developers'
const imageStorageUrl = 'https://res.cloudinary.com/proxify-io/image/upload'

const partnerConfig = {
  // Partner information
  partnerName: partner?.name,
  logo: partner?.logo,
  flipLogo: partner?.flipLogo || false,

  // Partner website
  websiteUrl: websiteUrl,
  hireUsButtonUrl: hireUrl,

  // Image storage URL
  imageStorageUrl: imageStorageUrl,

  // Hero Section
  pageHeroBanner: {
    title: '귀하의 팀을 위한 최고의 Vue.js 개발자를 찾아보세요.',
    description1: '인증된 Vue.js 개발자를 찾아 다음 프로젝트에 활용하세요.',
    description2: 'Proxify는 검증 과정을 수행하여 최상의 품질과 신뢰성을 보장합니다.',
    hireButton: {
      url: hireUrl,
      label: '지금 바로 Vue.js 개발자를 찾아보세요.'
    },
    footer: "48시간 이내에 최상급 Vue.js 개발자와 매칭하세요.",
  },

  // Hero Section
  pageJoinSection: {
    title: '등록된 개발자가 되어보세요.',
    description: 'Vue.js 개발자를 찾는 기업에서 장기적인 파트타임 또는 풀타임 포지션을 확보하세요.',
    applyButton: {
      url: applyUrl,
      label: '가입 신청하기'
    }
  },

  // Footer Configuration
  pageFooter: {
    text: `이 신중하게 검증된 개발자는 Vue의 파트너가 제공합니다.:`,
    email: 'vue@proxify.io',
    phone: '+44 20 4614 2667',
    websiteVueLink: vueArticleUrl,
    websiteVueLabel: websiteLabel + '/hire-vue-developers'
  },

  // Diagram sections
  profileDiagram: {
    title: '지원자 프로필',
    prependText: '우리 개발자들이 해당 역할에서의 성공 가능성과 가장 밀접한 연관이 있는 평가 항목에서 어떻게 점수를 받았는지 확인하세요.'
  },

  scoreDiagram: {
    title: '엔지니어링 우수성 점수',
    prependText: '실제 점수 범위는 0에서 300까지입니다. 아래는 평가된 모든 Vue.js 개발자의 점수 분포이며, 여기에 귀하의 지원자가 획득한 점수가 표시되어 있습니다.',
    appendText: '3,661명의 평가된 Vue.js 개발자와 38,008명의 지원자로부터 수집된 데이터입니다.'
  },

  // Proficiency Section
  proficiencies: {
    skillsPerCard: 5
  }
}

export default partnerConfig
