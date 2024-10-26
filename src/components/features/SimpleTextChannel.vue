<script setup lang="ts">

import { NSpace, NSwitch } from 'naive-ui'
import TooltipsHelp from '@/components/TooltipsHelp.vue'
import { onMounted, ref } from 'vue'
import {
  useGetHidden,
  useGetShowLatestMessage,
  useSetHidden,
  useSetShowLatestMessageOnNew,
} from '@/composables/features/simpleTextChannel'

const hide = ref(false)
const showWhenHasNew = ref(false)

function onHide(val: boolean) {
  useSetHidden(val)
  if (!val) {
    showWhenHasNew.value = false
  }
}

function onShowWhenHasNew(val: boolean) {
  useSetShowLatestMessageOnNew(val)
}

onMounted(() => {
  hide.value = useGetHidden() || false
  showWhenHasNew.value = useGetShowLatestMessage() || false
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
    <n-space style="margin-top: 12px;padding-left: 12px;" align="center" justify="space-between" v-show="hide">
      <label>当有新消息时显示</label>
      <n-switch v-model:value="showWhenHasNew" @update:value="onShowWhenHasNew"/>
    </n-space>
  </div>
</template>

<style scoped lang="less">

</style>
