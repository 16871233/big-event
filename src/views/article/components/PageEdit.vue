<script setup>
import { ref, defineProps, defineEmits } from 'vue'
const handleCurrentChange = (value) => {
  pagenum.value = value
  emit('change', value)
}
const emit = defineEmits(['change'])
const props = defineProps({
  total: { type: Number }
})
const pagesize = ref(5)
const pagenum = ref(1)
</script>
<template>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="pagenum"
      v-model:page-size="pagesize"
      :small="false"
      :background="true"
      layout="prev, pager, next, jumper"
      :total="props.total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style scoped lang="scss">
.demo-pagination-block {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
