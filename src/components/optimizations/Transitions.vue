<script setup lang="ts">
import HoverSmooth from '@/components/optimizations/transitions/HoverSmooth.vue'
import SettingsPanel from '@/components/optimizations/transitions/SettingsPanel.vue'
import { NCard, NDivider, NSpace } from 'naive-ui'
</script>

<template>
  <n-card embedded class="avatar">
    <n-space vertical>
      <HoverSmooth/>
      <n-divider/>
      <SettingsPanel />
    </n-space>
  </n-card>
</template>

<style scoped lang="less">

</style>
