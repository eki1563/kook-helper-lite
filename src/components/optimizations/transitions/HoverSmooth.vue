<script setup lang="ts">
import { NSpace, NSwitch } from 'naive-ui'
import TooltipsHelp from '@/components/TooltipsHelp.vue'
import { ref } from 'vue'
import { useGetSmooth, useSetSmooth } from '@/composables/optimizations/transitions/hoverSmooth'

const smooth = ref(false)
smooth.value = useGetSmooth()

function onSmooth(val: boolean) {
  useSetSmooth(val)
}
</script>

<template>
  <div class="hover-smooth">
    <n-space align="center" justify="space-between">
      <label>列表平滑高亮
        <TooltipsHelp message="鼠标在列表上划过的过渡效果。"/>
      </label>
      <n-switch v-model:value="smooth" @update:value="onSmooth"/>
    </n-space>
  </div>
</template>

<style scoped lang="less">

</style>
