<script setup lang="ts">

import { NSpace, NSwitch } from 'naive-ui'
import TooltipsHelp from '@/components/TooltipsHelp.vue'
import { onMounted, ref } from 'vue'
import { useGetHidden, useSetHidden } from '@/composables/features/simpleTextChannel'

const hide = ref(false)

function onHide(val: boolean) {
  useSetHidden(val)
}

onMounted(() => {
  hide.value = useGetHidden() || false
})
</script>

<template>
  <div class="simple-text-channel">
    <n-space align="center" justify="space-between">
      <label>文字频道隐藏最新消息
        <TooltipsHelp message="启用后可能与语音频道不好区分~"/>
      </label>
      <n-switch v-model:value="hide" @update:value="onHide"/>
    </n-space>
  </div>
</template>

<style scoped lang="less">

</style>
