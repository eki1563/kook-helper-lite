<script setup lang="ts">
import { NCard, NDivider, NSpace, NSwitch } from 'naive-ui'
import { ref } from 'vue'
import {
  useGetActivityVisible,
  useGetBoosterVisible,
  useGetBUFFIconVisible,
  useGetFrameVisible,
  useGetNamePlateVisible,
  useGetUserListIntimacyVisible,
  useSetActivityVisible,
  useSetBoosterVisible,
  useSetBUFFIconVisible,
  useSetFrameVisible,
  useSetNamePlateVisible,
  useSetUserListIntimacyVisible,
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

const booster = ref(false)
booster.value = useGetBoosterVisible()

function onBoosterChange(value: boolean) {
  useSetBoosterVisible(value)
  booster.value = value
}

const intimacy = ref(false)
intimacy.value = useGetUserListIntimacyVisible()

function onIntimacyChange(value: boolean) {
  useSetUserListIntimacyVisible(value)
  intimacy.value = value
}

const activity = ref(false)
activity.value = useGetActivityVisible()

function onActivityChange(value: boolean) {
  useSetActivityVisible(value)
  activity.value = value
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
    <n-divider/>
    <n-space justify="space-between" align="center">
      <label>KOOK 加速器：</label>
      <n-switch v-model:value="booster" @update:value="onBoosterChange"/>
    </n-space>
    <n-divider/>
    <n-space justify="space-between" align="center">
      <label>用户列表亲密关系背景：</label>
      <n-switch v-model:value="intimacy" @update:value="onIntimacyChange"/>
    </n-space>
    <n-divider/>
    <n-space justify="space-between" align="center">
      <label>服务器列表活动与福利：</label>
      <n-switch v-model:value="activity" @update:value="onActivityChange"/>
    </n-space>
  </n-card>
</template>

<style scoped lang="less">

</style>
