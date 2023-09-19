import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GetApi } from '../../api/user'
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const user = ref({
      id: '',
      username: '',
      nickname: '',
      email: '',
      user_pic: ''
    })
    const setToken = (newToken) => {
      token.value = newToken
    }
    const getUser = async () => {
      const res = await GetApi()
      user.value = res.data.data
    }
    const setUser = (newUser) => {
      user.value = newUser
    }
    return {
      token,
      user,
      setToken,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
