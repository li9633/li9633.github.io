<template>
  <PageContainer>
    <!-- 头部标题区域 -->
    <div class="header-section">
      <HeaderTitle>
        <template #primary>XIN DEVELOPER</template>
      </HeaderTitle>
      <HeaderTitle>
        <template #primary>昕屿千行</template>
      </HeaderTitle>
    </div>

    <!-- 欢迎语区域 -->
    <DetailContext>
      <template #title>
        <el-text class="welcome-title" tag="b">{{
          getWelcomText
        }}</el-text>
      </template>
      <template #content>
        <el-text class="intro-text">{{ introduce }}</el-text>
      </template>
      <template #footer>
        <el-text size="small">最后更新: 2025年9月8日</el-text>
      </template>
    </DetailContext>

    <!-- 项目列表区域 -->
    <ProjectList :projects="itemList" />
  </PageContainer>
</template>

<script setup>
import { computed } from 'vue'
import HeaderTitle from '@/components/Header/HeaderTitle.vue'
import DetailContext from '@/components/MiddleContents/DetailContext.vue'
import PageContainer from '@/components/Layout/PageContainer.vue'
import ProjectList from '@/components/Project/ProjectList.vue'

const introduce =
  '欢迎来到我的个人博客。如果在使用中出现了问题，请进入仓库提交issue进行反馈。'

const itemList = [
  {
    icon: null,
    name: 'Auto7ZipCompressCLI',
    descEN:
      'Console program for batch generating compressed 7z file command lines',
    descCN: '批量生成7z压缩命令行控制台程序',
    url: 'https://github.com/li9633/Auto7ZipCompressCLI',
    issue: 'https://github.com/li9633/Auto7ZipCompressCLI/issues',
    release: 'https://github.com/li9633/Auto7ZipCompressCLI/releases'
  },
  {
    icon: null,
    name: 'Auto7ZipCompressGUI',
    descEN: 'Graphical 7zip automatic compression program',
    descCN: '图形化7zip自动压缩程序',
    url: 'https://github.com/li9633/Auto7ZipCompressGUI',
    issue: 'https://github.com/li9633/Auto7ZipCompressGUI/issues',
    release: 'https://github.com/li9633/Auto7ZipCompressGUI/releases'
  },
  {
    icon: null,
    name: 'DisableLGhubAutoUpdate',
    descEN: 'Disable automatic updates of Logitech LGhub software',
    descCN: '禁用Logitech LGhub软件自动更新',
    url: 'https://github.com/li9633/DisableLGhubAutoUpdate',
    issue: 'https://github.com/li9633/DisableLGhubAutoUpdate/issues',
    release:
      'https://github.com/li9633/DisableLGhubAutoUpdate/releases'
  }
]

const getWelcomText = computed(() => {
  if (getCurrentURL()) {
    return 'Welcome to ' + getCurrentURL()
  }
  return 'Welcome to my personal blog'
})

const getCurrentURL = () => {
  if (typeof window === 'undefined') return null
  try {
    return window.location.hostname
  } catch {
    return null
  }
}
</script>

<style lang="scss" scoped>
.header-section {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
