<template>
  <div class="auth-page">
    <div class="auth-container">
      <el-card class="auth-card" shadow="hover">
        <div class="auth-header">
          <el-text class="title" tag="b" size="large">注册</el-text>
          <el-text class="subtitle" size="small"
            >创建新账户，开启您的旅程</el-text
          >
        </div>

        <el-form
          :model="form"
          :rules="rules"
          ref="registerForm"
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

          <el-form-item prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="确认密码"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              @click="register"
              :loading="loading"
              class="auth-button"
            >
              注册
            </el-button>
          </el-form-item>
        </el-form>

        <div class="auth-footer">
          <el-text> 已有账户？ </el-text>
          <el-link type="primary" @click="goToLogin"
            >立即登录</el-link
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { auth } from '@/api'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const registerForm = ref(null)

const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, message: '用户名长度不能小于4位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const loading = ref(false)

const register = async () => {
  try {
    await registerForm.value.validate()

    loading.value = true
    const response = await auth.register(form.value)

    ElMessage.success(response.msg)
    router.push('/login')
  } catch (error) {
    // 验证失败不处理
    console.error(error)
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
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
  padding: 2rem;

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
