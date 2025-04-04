<template>
  <div class="container font-mix">
    <div class="error-code"></div>
    <div class="error-title">页面迷路了...</div>
    <div class="error-message" v-if="message">{{ message }}</div>
    <div class="error-message" v-else>
      您访问的页面可能已被移走或暂时不可用<br />
      请检查URL地址或返回首页
    </div>

    <router-link to="/" class="back-button">
      返回首页
      {{ '>' }}
    </router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const message = ref('')

onMounted(() => {
  if (route.query.message) {
    message.value = route.query.message
  }
})
</script>

<style scoped>
div.container {
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes pulseScale {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

div.error-code {
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

div.error-code::before {
  content: '404';
  font-size: 200px;
  font-weight: 700;
  background: linear-gradient(135deg, #63b3ed 0%, #48bb78 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  position: absolute;
  animation: pulseScale 4s ease-in-out infinite;
  z-index: -1;
}

div.error-title {
  font-size: 25px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

div.error-message {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
}

a.back-button {
  font-size: 20px;
  color: #fff;
  text-align: center;
  border: 1px solid #b3b3b3;
  border-radius: 20px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #63b3ed 0%, #48bb78 100%);
  cursor: pointer;
  transition: transform 0.2s ease;
}

a.back-button:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transform: scale(1.03);
  transition-duration: 0.3s;
  color: #000000;
}
</style>
