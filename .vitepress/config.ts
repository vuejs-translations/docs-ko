import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme, type Plugin } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
// import llmstxt from 'vitepress-plugin-llms'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from 'vitepress-plugin-group-icons'

const nav: ThemeConfig['nav'] = [
  {
    text: '문서',
    activeMatch: `^/(guide|tutorial|examples|api|glossary|error-reference)/`,
    items: [
      { text: '빠른 시작', link: '/guide/quick-start' },
      { text: '가이드', link: '/guide/introduction' },
      { text: '튜토리얼', link: '/tutorial/' },
      { text: '예제', link: '/examples/' },
      { text: 'API', link: '/api/' },
      // { text: '스타일 가이드', link: '/style-guide/' },
      { text: '용어집', link: '/glossary/' },
      { text: '에러 참조', link: '/error-reference/' },
      {
        text: 'Vue 2 문서',
        link: 'https://v2.vuejs.org'
      },
      {
        text: 'Vue 2에서 마이그레이션',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: '플레이그라운드',
    link: 'https://play.vuejs.org'
  },
  {
    text: '에코시스템',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: '리소스',
        items: [
          { text: '테마', link: '/ecosystem/themes' },
          { text: 'UI 컴포넌트', link: 'https://ui-libs.vercel.app/' },
          {
            text: '플러그인 모음',
            link: 'https://www.vue-plugins.org/'
          },
          {
            text: '인증서',
            link: 'https://certificates.dev/vuejs/?ref=vuejs-nav'
          },
          { text: '채용', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: '티셔츠 샵', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: '공식 라이브러리',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          { text: '툴링 가이드', link: '/guide/scaling-up/tooling.html' }
        ]
      },
      {
        text: '비디오 강좌',
        items: [
          {
            text: 'Vue Mastery',
            link: 'https://www.vuemastery.com/courses/'
          },
          {
            text: 'Vue School',
            link: 'https://vueschool.io/?friend=vuejs&utm_source=Vuejs.org&utm_medium=Link&utm_content=Navbar%20Dropdown'
          }
        ]
      },
      {
        text: '도움말',
        items: [
          {
            text: '디스코드 채팅',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'GitHub 토론',
            link: 'https://github.com/vuejs/core/discussions'
          },
          { text: 'DEV 커뮤니티', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: '뉴스',
        items: [
          { text: '블로그', link: 'https://blog.vuejs.org/' },
          { text: '트위터', link: 'https://x.com/vuejs' },
          { text: '이벤트', link: 'https://events.vuejs.org/' },
          { text: '뉴스레터', link: '/ecosystem/newsletters' }
        ]
      }
    ]
  },
  {
    text: '소개',
    activeMatch: `^/about/`,
    items: [
      { text: 'FAQ', link: '/about/faq' },
      { text: '팀', link: '/about/team' },
      { text: '릴리즈', link: '/about/releases' },
      {
        text: '커뮤니티 가이드',
        link: '/about/community-guide'
      },
      { text: '행동 강령', link: '/about/coc' },
      { text: '개인정보 처리방침', link: '/about/privacy' },
      {
        text: '다큐멘터리',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: '지원',
    activeMatch: `^/(sponsor|partners)/`,
    items: [
      { text: '스폰서', link: '/sponsor/' },
      { text: '파트너', link: '/partners/' }
    ]
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: '시작하기',
      items: [
        { text: '소개', link: '/guide/introduction' },
        {
          text: '빠른 시작',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: '필수',
      items: [
        {
          text: '애플리케이션 생성',
          link: '/guide/essentials/application'
        },
        {
          text: '템플릿 문법',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: '반응성 기초(Reactivity)',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: '계산된 속성(Computed)',
          link: '/guide/essentials/computed'
        },
        {
          text: '클래스 및 스타일 바인딩',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: '조건부 렌더링',
          link: '/guide/essentials/conditional'
        },
        { text: '리스트 렌더링', link: '/guide/essentials/list' },
        {
          text: '이벤트 처리',
          link: '/guide/essentials/event-handling'
        },
        { text: '폼 입력 바인딩', link: '/guide/essentials/forms' },
        { text: '감시자(Watchers)', link: '/guide/essentials/watchers' },
        { text: '템플릿 ref', link: '/guide/essentials/template-refs' },
        {
          text: '컴포넌트 기초',
          link: '/guide/essentials/component-basics'
        },
        {
          text: '생명주기 훅',
          link: '/guide/essentials/lifecycle'
        }
      ]
    },
    {
      text: '컴포넌트 심화',
      items: [
        {
          text: '등록',
          link: '/guide/components/registration'
        },
        { text: 'Props', link: '/guide/components/props' },
        { text: '이벤트', link: '/guide/components/events' },
        { text: '컴포넌트 v-model', link: '/guide/components/v-model' },
        {
          text: '폴스루 속성(Fallthrough)',
          link: '/guide/components/attrs'
        },
        { text: '슬롯', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: '비동기 컴포넌트',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: '재사용성',
      items: [
        {
          text: '컴포저블',
          link: '/guide/reusability/composables'
        },
        {
          text: '커스텀 디렉티브',
          link: '/guide/reusability/custom-directives'
        },
        { text: '플러그인', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: '내장 컴포넌트',
      items: [
        { text: 'Transition', link: '/guide/built-ins/transition' },
        {
          text: 'TransitionGroup',
          link: '/guide/built-ins/transition-group'
        },
        { text: 'KeepAlive', link: '/guide/built-ins/keep-alive' },
        { text: 'Teleport', link: '/guide/built-ins/teleport' },
        { text: 'Suspense', link: '/guide/built-ins/suspense' }
      ]
    },
    {
      text: '확장하기',
      items: [
        { text: '싱글 파일 컴포넌트', link: '/guide/scaling-up/sfc' },
        { text: '툴링', link: '/guide/scaling-up/tooling' },
        { text: '라우팅', link: '/guide/scaling-up/routing' },
        {
          text: '상태 관리',
          link: '/guide/scaling-up/state-management'
        },
        { text: '테스트', link: '/guide/scaling-up/testing' },
        {
          text: '서버 사이드 렌더링 (SSR)',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: '베스트 프랙티스',
      items: [
        {
          text: '프로덕션 배포',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: '성능',
          link: '/guide/best-practices/performance'
        },
        {
          text: '접근성',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: '보안',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'TypeScript',
      items: [
        { text: '개요', link: '/guide/typescript/overview' },
        {
          text: 'Composition API와 TS',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'Options API와 TS',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: '추가 주제',
      items: [
        {
          text: 'Vue 사용 방법',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'Composition API FAQ',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: '반응성 심화(Reactivity in Depth)',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: '렌더링 메커니즘',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: '렌더 함수 & JSX',
          link: '/guide/extras/render-function'
        },
        {
          text: 'Vue와 웹 컴포넌트',
          link: '/guide/extras/web-components'
        },
        {
          text: '애니메이션 기법',
          link: '/guide/extras/animation'
        }
        // {
        //   text: 'Vue용 라이브러리 만들기',
        //   link: '/guide/extras/building-a-library'
        // },
        // {
        //   text: 'React 개발자를 위한 Vue',
        //   link: '/guide/extras/vue-for-react-devs'
        // }
      ]
    }
  ],
  '/api/': [
    {
      text: '글로벌 API',
      items: [
        { text: '애플리케이션', link: '/api/application' },
        {
          text: '일반',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: '반응성(Reactivity): 코어',
          link: '/api/reactivity-core'
        },
        {
          text: '반응성(Reactivity): 유틸리티',
          link: '/api/reactivity-utilities'
        },
        {
          text: '반응성(Reactivity): 고급',
          link: '/api/reactivity-advanced'
        },
        {
          text: '생명주기 훅',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: '의존성 주입(Dependency Injection)',
          link: '/api/composition-api-dependency-injection'
        },
        {
          text: '헬퍼',
          link: '/api/composition-api-helpers'
        }
      ]
    },
    {
      text: 'Options API',
      items: [
        { text: '옵션: 상태', link: '/api/options-state' },
        { text: '옵션: 렌더링', link: '/api/options-rendering' },
        {
          text: '옵션: 생명주기',
          link: '/api/options-lifecycle'
        },
        {
          text: '옵션: 컴포지션',
          link: '/api/options-composition'
        },
        { text: '옵션: 기타', link: '/api/options-misc' },
        {
          text: '컴포넌트 인스턴스',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: '내장 기능',
      items: [
        { text: '디렉티브', link: '/api/built-in-directives' },
        { text: '컴포넌트', link: '/api/built-in-components' },
        {
          text: '특수 엘리먼트',
          link: '/api/built-in-special-elements'
        },
        {
          text: '특수 속성',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: '싱글 파일 컴포넌트',
      items: [
        { text: '문법 명세', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSS 기능', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: '고급 API',
      items: [
        { text: '커스텀 엘리먼트', link: '/api/custom-elements' },
        { text: '렌더 함수', link: '/api/render-function' },
        { text: '서버 사이드 렌더링', link: '/api/ssr' },
        { text: 'TypeScript 유틸리티 타입', link: '/api/utility-types' },
        { text: '커스텀 렌더러', link: '/api/custom-renderer' },
        { text: '컴파일 타임 플래그', link: '/api/compile-time-flags' }
      ]
    }
  ],
  '/examples/': [
    {
      text: '기본',
      items: [
        {
          text: '헬로 월드',
          link: '/examples/#hello-world'
        },
        {
          text: '사용자 입력 처리',
          link: '/examples/#handling-input'
        },
        {
          text: '속성 바인딩',
          link: '/examples/#attribute-bindings'
        },
        {
          text: '조건문과 반복문',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: '폼 바인딩',
          link: '/examples/#form-bindings'
        },
        {
          text: '간단한 컴포넌트',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: '실전',
      items: [
        {
          text: '마크다운 에디터',
          link: '/examples/#markdown'
        },
        {
          text: '데이터 가져오기',
          link: '/examples/#fetching-data'
        },
        {
          text: '정렬 및 필터가 있는 그리드',
          link: '/examples/#grid'
        },
        {
          text: '트리 뷰',
          link: '/examples/#tree'
        },
        {
          text: 'SVG 그래프',
          link: '/examples/#svg'
        },
        {
          text: '트랜지션이 있는 모달',
          link: '/examples/#modal'
        },
        {
          text: '트랜지션이 있는 리스트',
          link: '/examples/#list-transition'
        }
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 GUIs',
      items: [
        {
          text: '카운터',
          link: '/examples/#counter'
        },
        {
          text: '온도 변환기',
          link: '/examples/#temperature-converter'
        },
        {
          text: '항공권 예약',
          link: '/examples/#flight-booker'
        },
        {
          text: '타이머',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD',
          link: '/examples/#crud'
        },
        {
          text: '원 그리기',
          link: '/examples/#circle-drawer'
        },
        {
          text: '셀',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: '스타일 가이드',
      items: [
        {
          text: '개요',
          link: '/style-guide/'
        },
        {
          text: 'A - 필수',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B - 강력 권장',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C - 권장',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D - 주의해서 사용',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
// const i18n: ThemeConfig['i18n'] = {
// }

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  sitemap: {
    hostname: 'https://vuejs.org'
  },

  lang: 'ko-KR',
  title: 'Vue.js',
  description: 'Vue.js - 프로그래시브 자바스크립트 프레임워크',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://ko.vuejs.org/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vue.js' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Vue.js - 프로그래시브 자바스트립트 프레임워크'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://automation.vuejs.org'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/uwu.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/uwu.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'script',
      {
        src: 'https://media.bitterbrains.com/main.js?from=vuejs&type=top',
        async: 'true'
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,
    // Placeholder of the i18n config for @vuejs-translations.
    // i18n,

    localeLinks: [
      {
        link: 'https://vuejs.org',
        text: 'English',
        repo: 'https://github.com/vuejs/docs'
      },
      {
        link: 'https://cn.vuejs.org',
        text: '简体中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-cn'
      },
      {
        link: 'https://ja.vuejs.org',
        text: '日本語',
        repo: 'https://github.com/vuejs-translations/docs-ja'
      },
      {
        link: 'https://ua.vuejs.org',
        text: 'Українська',
        repo: 'https://github.com/vuejs-translations/docs-uk'
      },
      {
        link: 'https://fr.vuejs.org',
        text: 'Français',
        repo: 'https://github.com/vuejs-translations/docs-fr'
      },
      {
        link: 'https://de.vuejs.org',
        text: 'Deutsch',
        repo: 'https://github.com/vuejs-translations/docs-de'
      },
      {
        link: 'https://ko.vuejs.org',
        text: '한국어',
        repo: 'https://github.com/vuejs-translations/docs-ko'
      },
      {
        link: 'https://pt.vuejs.org',
        text: 'Português',
        repo: 'https://github.com/vuejs-translations/docs-pt'
      },
      {
        link: 'https://bn.vuejs.org',
        text: 'বাংলা',
        repo: 'https://github.com/vuejs-translations/docs-bn'
      },
      {
        link: 'https://it.vuejs.org',
        text: 'Italiano',
        repo: 'https://github.com/vuejs-translations/docs-it'
      },
      {
        link: 'https://fa.vuejs.org',
        text: 'فارسی',
        repo: 'https://github.com/vuejs-translations/docs-fa'
      },
      {
        link: 'https://ru.vuejs.org',
        text: 'Русский',
        repo: 'https://github.com/vuejs-translations/docs-ru'
      },
      {
        link: 'https://cs.vuejs.org',
        text: 'Čeština',
        repo: 'https://github.com/vuejs-translations/docs-cs'
      },
      {
        link: 'https://zh-hk.vuejs.org',
        text: '繁體中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-hk'
      },
      {
        link: 'https://pl.vuejs.org',
        text: 'Polski',
        repo: 'https://github.com/vuejs-translations/docs-pl'
      },
      {
        link: '/translations/',
        text: '번역에 참가하세요!',
        isTranslationsDesc: true
      }
    ],

    /** 주의: 한극 문서 사이트를 위한 설정입니다. 영어 원본 값을 사용하면 않됩니다.  **/
    algolia: {
      indexName: 'vuejs-korea',
      appId: 'MEIERGO63D',
      apiKey: '736f8ceee537a06dcd6ecea297cb7942'
      // searchParameters: {
      //   facetFilters: ['version:v3']
      // }
    },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://x.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/vue' }
    ],

    editLink: {
      repo: '/vuejs-translations/docs-ko',
      text: 'GitHub에서 이 페이지 편집'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} Evan You`
    }
  },

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin).use(groupIconMdPlugin)
      // .use(textAdPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    },
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          cypress: 'vscode-icons:file-type-cypress',
          'testing library': 'logos:testing-library'
        }
      }) as Plugin
    ]
  }
})
