<template>
  <div>
    <HeaderTitle>
      <template #primary>XIN DEVELOPER</template>
    </HeaderTitle>
    <HeaderTitle>
      <template #primary>昕屿千行</template>
    </HeaderTitle>
    <DetailContext>
      <template #title>{{ getWelcomText }}</template>
      <template #content>{{ introduce }}</template>
      <template #action>
        <svg width="32" height="32">
          <path
            d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z"
          ></path>
        </svg>
      </template>
    </DetailContext>
    <MiddleContext :itemList="itemList" />
  </div>
</template>

<script setup>
import HeaderTitle from '@/components/Header/HeaderTitle.vue'
import MiddleContext from '@/components/MiddleContents/MiddleContext.vue'
import DetailContext from '@/components/MiddleContents/DetailContext.vue'
import { computed } from 'vue'
const introduce =
  '欢迎来到我的个人博客。如果在使用中出现了问题，请进入仓库提交issue进行反馈。'
const itemList = [
  {
    icon: null,
    name: 'Auto7ZipCompressCLI',
    descEN:
      'Console program for batch generating compressed 7z file command lines',
    descCN: '批量生成7z压缩命令行控制台程序',
    baseUrl: 'https://github.com/li9633/Auto7ZipCompressCLI',
    issue: 'https://github.com/li9633/Auto7ZipCompressCLI/issues',
    release: 'https://github.com/li9633/Auto7ZipCompressCLI/releases'
  },
  {
    icon: null,
    name: 'Auto7ZipCompressGUI',
    descEN: 'Graphical 7zip automatic compression program',
    descCN: '图形化7zip自动压缩程序',
    url: 'https://github.com/li9633/Auto7ZipCompressGUI'
  },
  {
    icon: null,
    name: 'DisableLGhubAutoUpdate',
    descEN: 'Disable automatic updates of Logitech LGhub software',
    descCN: '禁用Logitech LGhub软件自动更新',
    url: 'https://github.com/li9633/DisableLGhubAutoUpdate'
  },
  {
    icon: null,
    name: 'SampleRepository',
    descEN: 'This is a sample repository',
    descCN: '这是一个示例仓库',
    url: null
  }
]

const getWelcomText = computed(() => {
  if (getCurrentURL()) {
    return 'Welcome to ' + getCurrentURL()
  }
  return 'Welcome to my personal blog'
})

const getCurrentURL = () => {
  if (typeof window === 'undefined') {
    return null
  }
  let getHostname = null
  try {
    getHostname = window.location.hostname
  } catch {
    getHostname = null
  }

  return getHostname
}
</script>

<style></style>
