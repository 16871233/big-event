<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { UpdatePassApi } from '@/api/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const router = useRouter()
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const form = ref()
const rules = ref({
  new_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.new_pwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
const submitForm = async () => {
  await UpdatePassApi(formModel.value)
  ElMessage.success('修改成功')
  await router.push('/login')
  await userStore.setToken({})
  await userStore.setUser({})
}
const resetForm = () => {
  formModel.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  }
}
</script>
<template>
  <page-container title="重置密码">
    <el-form :model="formModel" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="原密码" prop="old_pwd" type="password">
        <el-input v-model="formModel.old_pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="formModel.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input v-model="formModel.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改密码</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
