import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo = ref({
      username: ''
    })

    function setUserInfo(obj) {
      userInfo.value = obj
    }

    function setToken(data) {
      token.value = data.toString()
    }

    return {
      token,
      userInfo,
      setUserInfo,
      setToken
    }
  },
  {
    persist: true
  }
)
