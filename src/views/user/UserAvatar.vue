<script setup>
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { UpdateAvatarApi } from '@/api/user'
const userStore = useUserStore()
const imageUrl = ref(userStore.user.data.user_pic)
const onChange = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
const upLoad = async () => {
  await UpdateAvatarApi(imageUrl.value)
  ElMessage.success('上传成功')
  userStore.getUser()
}
const uploadRef = ref()
</script>

<template>
  <page-container title="更新头像">
    <div>
      <el-upload
        ref="uploadRef"
        class="avatar-uploader"
        :auto-upload="false"
        :on-change="onChange"
        :show-file-list="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-button type="primary" @click="uploadRef.$el.querySelector('input').click()"
        >选择图片</el-button
      >
      <el-button type="success" @click="upLoad">上传图片</el-button>
    </div>
  </page-container>
</template>
<style scoped>
.avatar {
  width: 25vh;
  height: 25vh;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 25vh;
  height: 25vh;
  text-align: center;
  border: 1px dotted #dcdfe6;
}
</style>
