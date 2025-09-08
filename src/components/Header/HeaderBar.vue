<template>
  <el-header class="header-bar">
    <!-- 左侧返回首页 -->
    <div class="left-area" @click="goHomePage">
      <el-image :src="homeIcon" fit="contain" class="home-icon" />
      <span class="home-title">昕屿千行</span>
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
          :class="{ active: isActiveRoute(item.url) }"
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

// 判断当前路由是否激活
const isActiveRoute = (url) => {
  if (!url) return false
  return route.path === url
}
</script>

<style lang="scss" scoped>
.header-bar {
  @include flex-center-y;
  @include theme-gradient(
    135deg,
    rgba($color-primary, 0.95),
    rgba($color-secondary, 0.95)
  );
  @include box-shadow(0 4px 20px rgba($color-black, 0.15));
  height: 4rem;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: $z-index-fixed;
  backdrop-filter: blur(10px);
  @include border-radius(0);
  position: relative;

  // 公共区域样式
  .left-area,
  .title-area,
  .action-area {
    @include flex-center-y;
    height: 100%;
  }

  // 左侧区域
  .left-area {
    cursor: pointer;
    @include transition(
      all,
      $animation-duration-base,
      $transition-function
    );
    @include border-radius(30px);
    padding: $spacing-xs;
    flex-shrink: 0;

    .home-title {
      font-size: $font-size-lg;
      color: $color-white;
      font-weight: $font-weight-semibold;
      text-shadow: 0 2px 4px rgba($color-black, 0.2);
    }

    .home-icon {
      @include square(40px);
      @include transition(
        transform,
        $animation-duration-base,
        $transition-function
      );
      margin-right: $spacing-xs;

      &:hover {
        transform: scale(1.15);
      }
    }
  }

  // 中间标题
  .title-area {
    flex: 1;
    justify-content: center;
    position: relative;
    min-width: 0;

    .title-text {
      font-size: $font-size-xl;
      color: $color-white;
      font-weight: $font-weight-semibold;
      text-shadow: 0 2px 4px rgba($color-black, 0.2);
      @include text-ellipsis;
    }
  }

  // 右侧操作区
  .action-area {
    gap: $spacing-xs;
    flex-shrink: 0;

    .action-item {
      @include flex-center-y;
      padding: 0.6rem 1.2rem;
      @include border-radius(25px);
      @include transition(
        all,
        $animation-duration-base,
        $transition-function
      );
      color: rgba($color-white, 0.9) !important;
      font-weight: $font-weight-medium;
      background: rgba($color-white, 0.15);
      backdrop-filter: blur(5px);
      white-space: nowrap;

      &.active {
        background: rgba($color-white, 0.3);
        @include box-shadow(0 4px 12px rgba($color-black, 0.2));
        color: $color-white !important;
        font-weight: $font-weight-semibold;
      }

      &:hover:not(.active) {
        background: rgba($color-white, 0.25);
        transform: translateY(-2px);
        color: $color-white !important;
      }

      .action-icon-img {
        @include square(18px);
        margin-right: 8px;
      }

      .action-title {
        font-size: $font-size-base;
      }
    }
  }
}
</style>
