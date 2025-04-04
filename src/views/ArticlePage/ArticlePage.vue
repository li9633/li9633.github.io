<template>
  <div class="container">
    <HeaderTitle>
      <template #primary> 文章列表 </template>
    </HeaderTitle>
    <p v-if="userStore.userInfo.username">你好！{{ userStore.userInfo.username }}</p>
    <button @click="router.push('/login')" v-else>去登陆</button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user'
import HeaderTitle from '@/components/Header/HeaderTitle.vue'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
</script>

<style scoped></style>
