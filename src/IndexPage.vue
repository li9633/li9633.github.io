<template>
  <HeaderBar :actionItem="actionItem" />
  <div class="container">
    <router-view> </router-view>
  </div>
</template>

<script setup>
import HeaderBar from '@/components/Header/HeaderBar.vue'
import { ref } from 'vue'

const actionItem = ref([
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
</script>

<style scoped>
div.container {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
