<script setup lang="ts">
import { NCard, NDivider, NSpace, NSwitch } from 'naive-ui'
import { ref } from 'vue'
import {
  useGetBUFFIconVisible,
  useGetFrameVisible,
  useGetNamePlateVisible,
  useSetBUFFIconVisible,
  useSetFrameVisible,
  useSetNamePlateVisible,
} from '@/composables/features/concise'

const avatarFrame = ref(false)
avatarFrame.value = useGetFrameVisible()

function onFrameChange(value: boolean) {
  useSetFrameVisible(value)
  avatarFrame.value = value
}

const buff = ref(false)
buff.value = useGetBUFFIconVisible()

function onBuffChange(value: boolean) {
  useSetBUFFIconVisible(value)
  buff.value = value
}

const namePlate = ref(false)
namePlate.value = useGetNamePlateVisible()

function onNamePlateChange(value: boolean) {
  useSetNamePlateVisible(value)
  namePlate.value = value
}
</script>

<template>
  <n-card embedded class="concise">
    <n-space justify="space-between" align="center">
      <label>头像框：</label>
      <n-switch v-model:value="avatarFrame" @update:value="onFrameChange"/>
    </n-space>
    <n-divider/>
    <n-space justify="space-between" align="center">
      <label>铭牌：</label>
      <n-switch v-model:value="namePlate" @update:value="onNamePlateChange"/>
    </n-space>
    <n-divider/>
    <n-space justify="space-between" align="center">
      <label>用户列表 BUFF 图标：</label>
      <n-switch v-model:value="buff" @update:value="onBuffChange"/>
    </n-space>
  </n-card>
</template>

<style scoped lang="less">

</style>
