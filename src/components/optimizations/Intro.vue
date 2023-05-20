<script setup lang="ts">
import { NSwitch, NSpace, NDivider } from 'naive-ui'
import TooltipsHelp from '@/components/TooltipsHelp.vue'
import { onMounted, ref } from 'vue'
import {
  useGetEnhance,
  useGetScroll,
  useSetEnhance,
  useSetScroll,
} from '@/composables/optimizations/intro'

const scroll = ref(false)
const enhance = ref(false)

onMounted(() => {
  scroll.value = useGetScroll()
  enhance.value = useGetEnhance()
})

function onScroll(val: boolean) {
  useSetScroll(val)
}

function onEnhance(val: boolean) {
  useSetEnhance(val)
}
</script>

<template>
  <div class="intro-scroll">
    <n-space align="center" justify="space-between">
      <label>个人信息卡片 - 个人简介滚动查看
        <TooltipsHelp message="右侧用户列表点击后打开的卡片~"/>
      </label>
      <n-switch v-model:value="scroll" @update:value="onScroll"/>
    </n-space>
    <n-divider/>
    <n-space align="center" justify="space-between">
      <label>个人信息详情 - 个人简介可读增强
        <TooltipsHelp message="点击头像后打开的弹窗~"/>
      </label>
      <n-switch v-model:value="enhance" @update:value="onEnhance"/>
    </n-space>
  </div>
</template>

<style scoped lang="less">

</style>
