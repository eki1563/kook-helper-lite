<script setup lang="ts">
import TooltipsHelp from '@/components/TooltipsHelp.vue'
import { NSpace, NSwitch } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useGetContrast, useSetContrast } from '@/composables/optimizations/roleListContrast'

const contrast = ref()

function onContrast(val: boolean) {
  useSetContrast(val)
}

onMounted(() => {
  contrast.value = useGetContrast()
})

</script>

<template>
  <div class="intro-scroll">
    <n-space align="center" justify="space-between">
      <label>角色列表 - 增强可读性
        <TooltipsHelp message="终于可以看清和 MEME 卡片叠在一起的角色了~"/>
      </label>
      <n-switch v-model:value="contrast" @update:value="onContrast"/>
    </n-space>
  </div>
</template>

<style scoped lang="less">

</style>
