<template>
  <div class="main-layout">
    <HeaderBar :actionItem="actionItems" />
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import HeaderBar from '@/components/Header/HeaderBar.vue'
import { ref } from 'vue'

// 默认导航项（可在具体页面覆盖）
const actionItems = ref([
  {
    icon: '/img/search.svg',
    title: null,
    url: null
  },
  {
    icon: null,
    title: '文章',
    url: '/article'
  },
  {
    icon: null,
    title: '收藏',
    url: '/favorite'
  },
  {
    icon: null,
    title: '更多',
    url: '/more'
  },
  {
    icon: null,
    title: '我的',
    url: '/my'
  },
  {
    icon: null,
    title: '关于',
    url: '/about'
  }
])

// 允许父组件覆盖导航项
defineExpose({ actionItems })
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .content-container {
    flex: 1;
    @include particle-background;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    > * {
      background: rgba(255, 255, 255, 0.92);
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      flex: 1;
    }
  }

  @media (max-width: 768px) {
    .content-container {
      padding: 0.5rem;

      > * {
        padding: 1rem;
      }
    }
  }
}
</style>
