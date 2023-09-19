<script setup>
import { getArticleCate, deleteArticleCate } from '@/api/article'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { InfoFilled } from '@element-plus/icons-vue'
const dialog = ref()
const categories = ref([])
const getList = async () => {
  const res = await getArticleCate()
  categories.value = res.data.data
}
getList()
const add = () => {
  dialog.value.open({})
}
const edit = (row) => {
  dialog.value.open({ ...row })
}
const deleteCate = async (row) => {
  await deleteArticleCate({ ...row }.id)
  ElMessage.success('删除成功')
  getList()
}
const onSuccess = () => {
  getList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="add">添加分类</el-button>
    </template>
    <div class="container">
      <el-table :data="categories" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
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
              @confirm="deleteCate(row)"
            >
              <template #reference>
                <el-button type="danger" plain round>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </page-container>
  <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
</template>
