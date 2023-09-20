<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { UpdateInfoApi, GetApi } from '@/api/user'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const loading = ref(true)
const form = ref({
  username: '',
  nickname: '',
  email: ''
})
const submitForm = async () => {
  await UpdateInfoApi(form.value)
  ElMessage.success('更新成功')
  userStore.getUser()
  getForm()
}
const getForm = async () => {
  const res = await GetApi()
  form.value = res.data.data
}
onMounted(() => {
  getForm()
  loading.value = false
})
</script>
<template>
  <page-container title="用户信息">
    <el-form :model="form" label-width="120px" v-loading="loading">
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
