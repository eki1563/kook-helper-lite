<script setup lang="ts">

import { NSpace, NSwitch } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useGetPin, useSetPin } from '@/composables/optimizations/pinChannel'

const sticky = ref(false)

onMounted(() => {
  sticky.value = useGetPin() || false
})

function onPin(value: boolean) {
  useSetPin(value)
}
</script>

<template>
  <div class="intro-scroll">
    <n-space align="center" justify="space-between">
      <label>当前频道置顶/底显示</label>
      <n-switch v-model:value="sticky" @update:value="onPin"/>
    </n-space>
  </div>
</template>

<style scoped lang="less">

</style>
