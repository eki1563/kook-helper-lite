<script setup lang="ts">
import { NSpace, NSwitch } from 'naive-ui'
import TooltipsHelp from '@/components/TooltipsHelp.vue'
import { ref } from 'vue'
import {
  useGetSettingsTransition,
  useSetSettingsTransition,
} from '@/composables/optimizations/transitions/settingsPanel'

const enable = ref(false)
enable.value = useGetSettingsTransition()

function onChange(val: boolean) {
  useSetSettingsTransition(val)
}
</script>

<template>
  <div class="hover-smooth">
    <n-space align="center" justify="space-between">
      <label>设置面板
        <TooltipsHelp message="打开设置面板的过渡效果。"/>
      </label>
      <n-switch v-model:value="enable" @update:value="onChange"/>
    </n-space>
  </div>
</template>

<style scoped lang="less">

</style>
