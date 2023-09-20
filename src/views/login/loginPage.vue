<script setup>
import { ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { RegisterApi, LoginApi } from '@/api/login'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { ElMessage, ElLoading } from 'element-plus'
const form = ref()
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
const islogin = ref(true)
const rules = {
  username: [
    { require: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '请输入5-16位字符', trigger: 'blur' }
  ],
  password: [
    { require: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,16}$/, message: '必须是6-16位非空字符', trigger: 'blur' }
  ],
  repassword: [
    { require: true, message: '请确认密码', trigger: 'blur' },
    { pattern: /^\S{6,16}$/, message: '必须是6-16位非空字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value != formModel.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const register = async () => {
  await form.value.validate()
  await RegisterApi(formModel.value)
  ElMessage.success('注册成功')
  islogin.value = true
}
const router = useRouter()
const userStore = useUserStore()
const login = async () => {
  const loadingInstance = ElLoading.service({ fullscreen: true })
  await form.value.validate()
  const res = await LoginApi(formModel.value)
  await userStore.setToken(res.data.token)
  await userStore.getUser()
  ElMessage.success('登录成功')
  router.push('/')
  loadingInstance.close()
}
watch(islogin, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>
<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form"
      ><el-form ref="form" :model="formModel" :rules="rules" size="large" v-if="islogin">
        <el-form-item><h1>登录</h1></el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formModel.username" placeholder="Username" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password" label="密码&nbsp&nbsp&nbsp">
          <el-input
            v-model="formModel.password"
            type="password"
            autocomplete="off"
            placeholder="Password"
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="button">登录</el-button>
        </el-form-item>
        <el-link :underline="false" @click="islogin = false">注册</el-link>
        <!-- --------------------------------------------------------------------------------- -->
      </el-form>
      <el-form ref="form" :model="formModel" :rules="rules" size="large" v-else>
        <el-form-item><h1>注册</h1></el-form-item>
        <el-form-item prop="username" label="用户名&nbsp&nbsp&nbsp&nbsp">
          <el-input v-model="formModel.username" placeholder="Username" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password" label="密码&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp">
          <el-input
            v-model="formModel.password"
            type="password"
            autocomplete="off"
            placeholder="Password"
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input
            v-model="formModel.repassword"
            type="password"
            autocomplete="off"
            placeholder="Confirm"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register" class="button">注册</el-button>
        </el-form-item>
        <el-link :underline="false" @click="islogin = true">返回</el-link>
      </el-form>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
}
.bg {
  background:
    url('@/assets/logo2.png') no-repeat center,
    url('@/assets/login_bg.jpg') no-repeat center;
  border-radius: 0 20px 20px 0;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
}
.button {
  width: 100%;
}
</style>
