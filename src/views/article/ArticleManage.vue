<script setup>
import { onMounted, ref } from 'vue'
import { getArticle, getArticleCate, getArticleDetail, delArticleDetail } from '@/api/article'
import { dayjs } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import ManageEdit from './components/ManageEdit.vue'
import pageEdit from './components/PageEdit.vue'

import '@vueup/vue-quill/dist/vue-quill.snow.css'
const category = ref()
const stateValue = ref()
const articleList = ref()
const articleCateList = ref()
const dialog = ref()
const total = ref(10)
const state = ref(['已发布', '草稿'])
const pagenum = ref(1)
const pagesize = ref(5)

const formatTime = (time) => {
  return dayjs(time).format('YYYY年MM月DD日')
}
const onChange = async (page) => {
  pagenum.value = page
  await getArticleList()
}
const getArticleList = async () => {
  const res = await getArticle({
    pagenum: pagenum.value,
    pagesize: pagesize.value
  })
  total.value = Number(res.data.total)
  articleList.value = res.data.data
}
const onFind = async () => {
  const res = await getArticle({
    pagenum: 1,
    pagesize: 10,
    state: stateValue.value,
    cate_id: category.value
  })
  articleList.value = res.data.data
}
const reset = () => {
  stateValue.value = ''
  category.value = ''
  getArticleList()
}
const getCateList = async () => {
  const res = await getArticleCate()
  articleCateList.value = res.data.data
}
const add = () => {
  dialog.value.open({})
}
const edit = async (row) => {
  const res = await getArtDetail(row.id)
  dialog.value.open({ ...res.data.data })
}
const getArtDetail = async (id) => {
  return await getArticleDetail(id)
}

const delArt = async (id) => {
  await delArticleDetail(id)
  ElMessage.success('删除成功')
  getArticleList()
}
getArticleList()
getCateList()
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="add">发布文章</el-button>
    </template>
    <el-container class="search">
      <p>文章分类:</p>
      <el-select v-model="category" class="m-2" placeholder="请选择文章分类">
        <el-option
          v-for="item in articleCateList"
          :key="item.id"
          :label="item.cate_name"
          :value="item.id"
        />
      </el-select>
      <p>发布状态:</p>
      <el-select v-model="stateValue" class="m-2" placeholder="请选择文章状态">
        <el-option v-for="(item, index) in state" :key="index" :label="item" :value="item" />
      </el-select>
      <el-button type="primary" @click="onFind">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </el-container>
    <el-container>
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="title" label="文章标题"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="pub_date" label="发布时间">
          <template #default="{ row }">
            {{ formatTime(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="发布状态"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="edit(row)" plain round>编辑</el-button>
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="确认删除吗"
              @confirm="delArt(row.id)"
            >
              <template #reference>
                <el-button type="danger" plain round>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <manage-edit
      ref="dialog"
      :articleCateList="articleCateList"
      @success="getArticleList"
    ></manage-edit>
    <page-edit :total="total" @change="onChange"></page-edit>
  </page-container>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  align-items: center;
}

.search p {
  margin-right: 10px;
  font-size: 14px;
  font-weight: 200;
}

.search .m-2 {
  margin-right: 10px;
}

.search .el-button {
  margin-left: 10px;
}
</style>
