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
        <el-text size="small">最后更新: 2025年7月21日</el-text>
      </template>
    </DetailContext>

    <!-- 项目列表区域 -->
    <div class="project-grid">
      <el-card
        v-for="(item, index) in itemList"
        :key="index"
        class="project-card"
        shadow="hover"
      >
        <div class="project-header">
          <el-text class="project-name" tag="b">{{
            item.name
          }}</el-text>
          <div class="project-links">
            <el-link
              v-if="item.url"
              :href="item.url"
              target="_blank"
              type="primary"
            >
              <el-icon><Link /></el-icon>
              <span> GitHub </span>
            </el-link>
            <el-link
              v-if="item.issue"
              :href="item.issue"
              target="_blank"
              type="warning"
            >
              <el-icon><Warning /></el-icon>
              <span>Issues </span>
            </el-link>
            <el-link
              v-if="item.release"
              :href="item.release"
              target="_blank"
              type="success"
            >
              <el-icon><Download /></el-icon>
              <span> Releases </span>
            </el-link>
          </div>
        </div>

        <el-divider />

        <div class="project-desc">
          <el-text class="desc-en">{{ item.descEN }}</el-text>
          <el-text class="desc-cn">{{ item.descCN }}</el-text>
        </div>
      </el-card>
    </div>
  </PageContainer>
</template>

<script setup>
import { computed } from 'vue'
import { Link, Download, Warning } from '@element-plus/icons-vue'
import HeaderTitle from '@/components/Header/HeaderTitle.vue'
import DetailContext from '@/components/MiddleContents/DetailContext.vue'
import PageContainer from '@/components/Layout/PageContainer.vue'

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

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 1.5rem;

  .project-card {
    @include card-hover-effect;
    height: 100%;
    border-radius: 10px;

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .project-name {
        font-size: 1.2rem;
        color: var(--el-text-color-primary);
        max-width: 60%;
      }

      .project-links {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: flex-end;

        .el-link {
          .el-icon {
            font-size: 1rem;
            line-height: 1;
            margin-right: 3px;
          }

          // 新增：文本节点特殊处理
          > :not(.el-icon) {
            line-height: 1.2;
            vertical-align: middle;
          }
        }
      }
    }

    .project-desc {
      margin-top: 1rem;

      .desc-en,
      .desc-cn {
        display: block;
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }

      .desc-en {
        color: var(--el-text-color-secondary);
        font-style: italic;
      }

      .desc-cn {
        color: var(--el-text-color-primary);
      }
    }
  }
}

@media (max-width: 992px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .project-grid {
    .project-card {
      .project-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;

        .project-name {
          max-width: 100%;
        }

        .project-links {
          width: 100%;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
