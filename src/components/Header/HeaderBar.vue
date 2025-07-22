<template>
  <el-header class="header-bar">
    <!-- 左侧返回首页 -->
    <div class="left-area" @click="goHomePage">
      <el-image :src="homeIcon" fit="contain" class="home-icon" />
    </div>

    <!-- 中间标题 -->
    <div class="title-area">
      <el-text class="title-text" tag="b">{{
        getPageMetaTitle
      }}</el-text>
    </div>

    <!-- 右侧操作区 -->
    <div class="action-area">
      <template v-for="(item, index) in actionItem" :key="index">
        <el-link
          v-if="item.title"
          :href="item.url"
          underline="never"
          class="action-item"
        >
          <!-- 修复图标使用方式 -->
          <img
            v-if="item.icon"
            :src="item.icon"
            class="action-icon-img"
          />
          <span class="action-title">{{ item.title }}</span>
        </el-link>
      </template>
    </div>
  </el-header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import homeIcon from '@/assets/img/default.svg'

const router = useRouter()
const route = useRoute()

defineProps({
  actionItem: {
    type: Array,
    required: true,
    default: () => []
  }
})

const getPageMetaTitle = computed(() => route.meta.title || '')
const goHomePage = () => router.push('/')
</script>

<style lang="scss" scoped>
.header-bar {
  @include flex-center;
  background: linear-gradient(135deg, #74c2f9 0%, #63ce8f 100%);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  height: 3rem;
  color: white;
  padding: 0 1rem;

  // 公共区域样式
  .left-area,
  .title-area,
  .action-area {
    @include flex-center;
    height: 100%;
  }

  // 左侧区域
  .left-area {
    width: 60px;
    cursor: pointer;
    .home-icon {
      width: 32px;
      height: 32px;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.15);
      }
    }
  }

  // 中间标题
  .title-area {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .title-text {
      font-size: 1.25rem;
      white-space: nowrap;
      color: white;
    }
  }

  // 右侧操作区
  .action-area {
    margin-left: auto;
    gap: 12px;
    .action-item {
      @include flex-center;
      color: white !important;
      transition: transform 0.2s ease;
      &:hover {
        transform: scale(1.15);
        .action-icon {
          color: var(--el-color-primary-light-3);
        }
      }
      .action-icon {
        margin-right: 4px;
        font-size: 1.2rem;
      }
      .action-title {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
