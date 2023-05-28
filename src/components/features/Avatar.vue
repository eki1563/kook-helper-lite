<template>
  <n-card embedded class="avatar">
    <n-space vertical>
      <div>
        <label>头像圆角：</label>
        <n-input v-model:value="radius" style="width: 250px;" type="text" size="small"
                 placeholder="支持百分比、像素。eg: 50% 或 4px" @keydown.enter="onSubmit"/>
      </div>
      <div class="preview">
        <h2 style="font-size: 20px;">预览</h2>
        <n-space>
          <img :src="previewUrl"
               :style="`border-radius: ${radius || '50%'}`" alt=""/>
          <n-alert type="default" :show-icon="false">
            与「去除头像框」搭配食用效果更佳~
          </n-alert>
        </n-space>
      </div>
      <n-divider/>
      <n-space justify="space-between">
        <label>左下动态头像优先</label>
        <n-switch v-model:value="dynamic"/>
      </n-space>
      <n-divider/>
      <n-space>
        <n-button size="small" type="primary" @click="onSubmit">
          保存
        </n-button>
        <n-button size="small" @click="onReset">
          重置
        </n-button>
      </n-space>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NButton, NInput, NSwitch, NSpace, NDivider, NAlert } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useGetSetAvatarRadius, useResetAvatarRadius, useSetAvatarRadius } from '@/composables/features/squareAvatar'
import {
  useGetSetAvatarDynamic,
  useResetAvatarDynamic,
  useSetDynamicAvatar,
} from '@/composables/features/dynamicAvatar'

const radius = ref('')
const dynamic = ref(false)
radius.value = useGetSetAvatarRadius() || '50%'
dynamic.value = useGetSetAvatarDynamic() || false
const previewUrl = ref('')

onMounted(() => {
  getAvatarUrl()
})

function getAvatarUrl() {
  let img = document.querySelector('.app-left .bottom .kook-avatar-picture-animate')
  if (!img) {
    img = document.querySelector('.app-left .bottom .kook-avatar-picture-static')
  }
  if (!img) {
    return
  }
  previewUrl.value = img.getAttribute('src') || ''
}

function onSubmit() {
  if (radius.value && radius.value.trim().length) {
    useSetAvatarRadius(radius.value)
  }
  useSetDynamicAvatar(dynamic.value)
}

function onReset() {
  radius.value = '50%'
  dynamic.value = false
  useResetAvatarRadius()
  useResetAvatarDynamic()
}

</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Avatar',
})
</script>

<style lang="less" scoped>
.avatar {
  .preview {
    img {
      display: block;
      width: 48px;
      height: 48px;
      background-color: #66ccff;
      border: 0;
      overflow: hidden;
    }
  }
}
</style>

