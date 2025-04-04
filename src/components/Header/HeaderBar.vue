<template>
  <div class="font-mix">
    <div class="header-bar">
      <div class="left-item" @click="goHomePage()">
        <img src="/img/default.svg" alt="" />
      </div>
      <div class="middle-item">
        <p>{{ getPageMetaTitle }}</p>
      </div>
      <div class="right-item">
        <div
          v-for="item in actionItem"
          class="action-item"
          :key="item"
        >
          <img
            class="action-icon"
            v-if="item.icon"
            :src="item.icon"
            alt=""
          />
          <router-link
            class="action-title"
            v-if="item.title"
            :to="item.url"
            >{{ item.title }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const goHomePage = () => {
  router.push('/')
}
defineProps({
  actionItem: {
    type: Array,
    required: true
  }
})

const getPageMetaTitle = computed(() => {
  return route.meta.title
})
</script>

<style scoped>
div.action-item,
div.left-item {
  transition: transform 0.3s ease;
  cursor: pointer;
}

div.left-item:hover,
div.action-item:hover {
  transform: scale(1.15);
  transition-duration: 0.2s;
}

a.action-title {
  color: #fff;
}

div.header-bar {
  background: linear-gradient(135deg, #74c2f9 0%, #63ce8f 100%);
  box-shadow: 0 0 1rem #00000040;
  width: 100%;
  height: 3rem;
  display: flex;
  position: relative;
  align-items: center;
  color: #ffffff;
  text-shadow: #000000 0 0 2px;
}

div.left-item {
  width: 60px;
  display: flex;
  justify-content: center;
}

div.left-item img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

div.middle-item {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: x-large;
}

div.right-item {
  margin-left: auto;
  display: flex;
  gap: 12px;
  padding-right: 1rem;
  align-items: center;
}

img.action-icon {
  padding-top: 4px;
}
</style>
