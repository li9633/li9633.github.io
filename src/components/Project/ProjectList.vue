<template>
  <div class="project-grid">
    <el-card
      v-for="(item, index) in projectsWithDetails"
      :key="index"
      class="project-card"
      shadow="hover"
    >
      <div class="project-header">
        <el-text class="project-name" tag="b">{{
          item.name
        }}</el-text>
        <div class="project-stats" v-if="item.repoInfo">
          <el-tooltip
            v-if="item.repoInfo.stargazers_count !== undefined"
            :content="`Stars: ${item.repoInfo.stargazers_count}`"
            placement="top"
          >
            <div class="stat-item">
              <el-icon><Star /></el-icon>
              <span>{{ item.repoInfo.stargazers_count }}</span>
            </div>
          </el-tooltip>

          <el-tooltip
            v-if="item.repoInfo.forks_count !== undefined"
            :content="`Forks: ${item.repoInfo.forks_count}`"
            placement="top"
          >
            <div class="stat-item">
              <el-icon><Share /></el-icon>
              <span>{{ item.repoInfo.forks_count }}</span>
            </div>
          </el-tooltip>

          <el-tooltip
            v-if="item.contributorsCount !== undefined"
            :content="`Contributors: ${item.contributorsCount}`"
            placement="top"
          >
            <div class="stat-item">
              <el-icon><User /></el-icon>
              <span>{{ item.contributorsCount }}</span>
            </div>
          </el-tooltip>
        </div>
        <!-- 加载指示器 -->
        <div class="loading-stats" v-else>
          <el-icon class="is-loading"><Loading /></el-icon>
        </div>
      </div>

      <!-- 贡献者列表 -->
      <div
        class="contributors-section"
        v-if="item.repoInfo && item.repoInfo.contributors"
      >
        <div class="contributors-list">
          <el-tooltip
            v-for="contributor in item.repoInfo.contributors.slice(
              0,
              5
            )"
            :key="contributor.id"
            :content="contributor.login"
            placement="top"
          >
            <img
              :src="contributor.avatar_url"
              :alt="contributor.login"
              class="contributor-avatar"
            />
          </el-tooltip>
          <div
            class="more-contributors"
            v-if="item.repoInfo.contributors.length > 5"
          >
            +{{ item.repoInfo.contributors.length - 5 }}
          </div>
        </div>
      </div>

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

      <el-divider />

      <div class="project-desc">
        <el-text class="desc-en">{{ item.descEN }}</el-text>
        <el-text class="desc-cn">{{ item.descCN }}</el-text>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Link,
  Download,
  Warning,
  Star,
  Share,
  User,
  Loading
} from '@element-plus/icons-vue'
import { getRepoDetails } from '@/api/modules/github'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
    default: () => []
  }
})

const repoDetails = ref({})

// 解析GitHub URL获取owner和repo名称
const parseGithubUrl = (url) => {
  if (!url) return null

  // 匹配GitHub仓库URL格式
  const match = url.match(/github\.com\/([^\\/]+)\/([^\\/]+)/)
  if (match) {
    return {
      owner: match[1],
      repo: match[2]
    }
  }
  return null
}

// 获取仓库详细信息
const fetchRepoDetails = async (project) => {
  const repoInfo = parseGithubUrl(project.url)
  if (!repoInfo) return null

  try {
    const details = await getRepoDetails(
      repoInfo.owner,
      repoInfo.repo
    )
    return {
      ...details,
      contributorsCount: details.contributors
        ? details.contributors.length
        : 0
    }
  } catch (error) {
    console.error('获取仓库详情失败:', error)
    return null
  }
}

// 带详细信息的项目列表
const projectsWithDetails = computed(() => {
  return props.projects.map((project) => {
    const key = project.url
    return {
      ...project,
      repoInfo: key ? repoDetails.value[key] : null,
      contributorsCount:
        key && repoDetails.value[key]
          ? repoDetails.value[key].contributorsCount
          : 0
    }
  })
})

// 初始化时获取所有仓库信息
onMounted(async () => {
  // 并行获取所有仓库信息
  const fetchPromises = props.projects.map(async (project) => {
    if (project.url) {
      const details = await fetchRepoDetails(project)
      if (details) {
        repoDetails.value[project.url] = details
      }
    }
  })

  await Promise.allSettled(fetchPromises)
})
</script>

<style lang="scss" scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  .project-card {
    @include card-hover-effect;
    height: 100%;
    border-radius: 10px;

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .project-name {
        font-size: 1.2rem;
        color: var(--el-text-color-primary);
        max-width: 60%;
      }

      .project-stats {
        display: flex;
        gap: 12px;

        .stat-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.9rem;
          color: var(--el-text-color-secondary);

          .el-icon {
            font-size: 1rem;
          }
        }
      }

      .loading-stats {
        .el-icon {
          font-size: 1rem;
          color: var(--el-color-primary);
        }
      }
    }

    .contributors-section {
      margin-bottom: 1rem;

      .contributors-list {
        display: flex;
        align-items: center;
        gap: 5px;

        .contributor-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        }

        .more-contributors {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--el-color-info-light-5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: var(--el-color-info);
        }
      }
    }

    .project-links {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 1rem;

      .el-link {
        .el-icon {
          font-size: 1rem;
          line-height: 1;
          margin-right: 3px;
        }

        > :not(.el-icon) {
          line-height: 1.2;
          vertical-align: middle;
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

        .project-stats {
          align-self: flex-end;
        }
      }

      .project-links {
        width: 100%;
        justify-content: flex-start;
      }
    }
  }
}
</style>
