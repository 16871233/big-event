<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { defineEmits, defineExpose, defineProps } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import { baseURL } from '@/utils/request'
const imageUrl = ref()
import { updataArticleDetail, addArticle } from '@/api/article'
const formRef = ref()
const isEdit = ref()
const isShow = ref()
const emit = defineEmits(['success'])
const props = defineProps({ articleCateList: Array })
const formModel = ref({
  title: '',
  content: '',
  cover_img: '',
  cate_id: ''
})
const open = (res) => {
  if (res.id) {
    isEdit.value = true
    formModel.value = res
    imageUrl.value = formModel.value.cover_img
    formModel.value.cover_img = baseURL + formModel.value.cover_img
    imageUrl.value = formModel.value.cover_img
  } else {
    isEdit.value = false
  }
  isShow.value = true
}
defineExpose({ open })
const onSelect = (file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
  formModel.value.cover_img = file.raw
}
async function downloadImage(url) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer'
  })

  const data = new Uint8Array(response.data)
  const blob = new Blob([data], { type: 'image/jpeg' })
  const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

  return file
}
const addArt = async (state) => {
  formModel.value.state = state
  const file = await downloadImage(imageUrl.value)
  formModel.value.cover_img = file
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (isEdit.value) {
    await updataArticleDetail(fd)
    ElMessage.success('编辑成功')
  } else {
    await addArticle(fd)
    ElMessage.success('添加成功')
  }
  emit('success')
  isShow.value = false
}
</script>

<template>
  <el-drawer v-model="isShow" size="50%">
    <el-form ref="formRef">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="formModel.cate_id" placeholder="请选择文章分类" class="drawSelect">
          <el-option
            v-for="item in props.articleCateList"
            :key="item.id"
            :label="item.cate_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="首页图片">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelect"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content" class="editor">
        <div>
          <quill-editor
            class="text"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="addArt('已发布')">发布</el-button>
        <el-button @click="addArt('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scope lang="scss">
.drawSelect {
  width: 100%;
}
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
// .editor {
//   width: 100%;
// }
.editor .text {
  display: flex;
  flex-direction: column;
  height: 150px;
}
.btn {
  margin: 0 0 0 10vh;
}
</style>
