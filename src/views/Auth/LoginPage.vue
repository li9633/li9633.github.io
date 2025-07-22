<template>
  <div class="auth-page">
    <div class="auth-container">
      <el-card class="auth-card" shadow="hover">
        <div class="auth-header">
          <el-text class="title" tag="b" size="large">登录</el-text>
          <el-text class="subtitle" size="small"
            >欢迎回来，请登录您的账户</el-text
          >
        </div>

        <el-form
          :model="form"
          :rules="rules"
          ref="loginForm"
          class="auth-form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="用户名"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              @click="login"
              :loading="loading"
              class="auth-button"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>

        <div class="auth-footer">
          <el-text> 还没有账户？ </el-text>
          <el-link type="primary" @click="goToRegister"
            >立即注册</el-link
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/api'
import { useUserStore } from '@/store/modules/user'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const loginForm = ref(null)

const form = ref({
  username: '',
  password: ''
})

const loading = ref(false)

const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 4,
      message: '用户名长度不能小于4位',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      message: '密码长度不能小于6位',
      trigger: 'blur'
    }
  ]
})

const login = async () => {
  try {
    await loginForm.value.validate()

    loading.value = true
    const response = await auth.login(form.value)

    userStore.setUserInfo({ username: response.username })
    ElMessage.success(response.msg)
    router.push('/')
  } catch (error) {
    ElMessage.error(`登录失败: ${error.message || '未知错误'}`)
  } finally {
    loading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style lang="scss" scoped>
.auth-page {
  @include particle-background;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.auth-container {
  width: 100%;
  max-width: 450px;
}

.auth-card {
  border-radius: 15px;
  @include card-hover-effect;
  padding: 1.5rem;

  .auth-header {
    text-align: center;
    margin-bottom: 2rem;

    .title {
      color: var(--el-color-primary);
      margin-bottom: 0.5rem;
      display: block;
    }

    .subtitle {
      color: var(--el-text-color-secondary);
    }
  }

  .auth-form {
    .el-form-item {
      margin-bottom: 1.5rem;
    }

    .auth-button {
      width: 100%;
      margin-top: 1rem;
      font-size: 1rem;
      height: 48px;
    }
  }

  .auth-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--el-border-color-light);
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .auth-card {
    padding: 1.5rem;
  }
}
</style>
