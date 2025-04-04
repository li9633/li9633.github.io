<template>
  <transition name="fade-slide" appear>
    <div class="container">
      <div class="loginPanel">
        <div class="title">
          <span>{{ title }}</span>
        </div>
        <div class="content">
          <input
            v-model="username"
            placeholder="输入用户名"
            type="text"
          />
          <input
            v-model="password"
            placeholder="输入密码"
            type="password"
          />
        </div>
        <div class="button">
          <button
            v-if="!isRegister"
            @click="login()"
            :disabled="false"
          >
            登录
          </button>
          <button v-else @click="register()" :disabled="isProcess">
            注册
          </button>
          <button
            :disabled="isProcess"
            @click="goingTo(isRegister ? 'login' : 'register')"
          >
            去{{ isRegister ? '登录' : '注册' }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userLoginServices, userRegisterServices } from '@/api/login'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const title = ref('登录')
const isRegister = ref(false)

const username = ref('')
const password = ref('')
const isProcess = ref(false)

const login = async () => {
  if (!username.value || !password.value) {
    return alert('请输入用户名或密码')
  }

  if (username.value.length < 4 || password.value.length < 4) {
    return alert('用户名或密码长度不能小于4位')
  }
  if (username.value && password.value) {
    isProcess.value = true

    const user = await userLoginServices(
      username.value,
      password.value
    )
    if (user.data.code === 200) {
      userStore.setToken(user.data.token)
      userStore.setUserInfo({ username: user.data.username })
      alert('登录成功')
      router.push('/')
    } else {
      alert('登录失败:code:' + user.data.code)
    }

    isProcess.value = false
  }
}
const register = async () => {
  if (!username.value || !password.value) {
    return alert('请输入用户名或密码')
  }

  if (username.value.length < 4 || password.value.length < 4) {
    return alert('用户名或密码长度不能小于4位')
  }

  if (username.value && password.value) {
    isProcess.value = true
    const result = await userRegisterServices(
      username.value,
      password.value
    )
    if (result.data.code === 200) {
      alert('注册成功')
    } else if (result.data.code === 440) {
      alert(result.data.msg)
    }
    isProcess.value = false
  }
}

const goingTo = (path) => {
  const routeConfig =
    path === 'login'
      ? { path: '/login' }
      : { path: '/login', query: { mode: 'register' } }

  router.push(routeConfig).then(() => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  })
}

onMounted(() => {
  if (route.query.mode === 'register') {
    title.value = '注册'
    isRegister.value = true
  } else {
    title.value = '登录'
    isRegister.value = false
  }
})
</script>

<style scoped>
div.container {
  animation: bgFadeIn 1.2s ease;
}

@keyframes bgFadeIn {
  from {
    opacity: 0;
    background-position: 120% 80%;
  }
  to {
    opacity: 1;
    background-position: 0% 0%;
  }
}

div.loginPanel {
  animation: panelEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: 0.5s;
}

@keyframes panelEnter {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1.3);
  }
}

div.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-family: FontMixer;
  background: linear-gradient(135deg, #9ed6fffd 0%, #a6fec8 100%);
}

div.title {
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  padding: 2% 0 4% 0;
}

div.content {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  align-self: center;
  min-height: 130px;
  margin: 0 70px;
}

div.content input {
  margin: 10px;
  border: 1px solid #ccc;
  outline: none;
  height: inherit;
}

div.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
}

div.button button:hover {
  background: linear-gradient(135deg, #66d895 0%, #74c2f9 100%);
  transform: scale(1.15);
  transition-duration: 0.2s;
  color: rgb(255, 241, 171);
  text-shadow: none;
  font-weight: normal;
}

div.button button {
  width: 100px;
  height: 30px;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  text-shadow: 0.5px 1.2px 0 rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  background: linear-gradient(135deg, #74c2f9 0%, #66d895 100%);
  cursor: pointer;
  transition: transform 0.3s ease;
}

div.title,
div.content,
button,
input {
  font-family: FontMixer;
}

div.loginPanel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  /* width: 600px;
    height: 400px; */
  transform: scale(1.3);
  transform-origin: center;
}

input {
  width: 300px;
  height: 30px;
  border: none;
}
</style>
