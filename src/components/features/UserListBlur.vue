<script setup lang="ts">
import { NSpace, NSlider } from 'naive-ui'
import TooltipsHelp from '@/components/TooltipsHelp.vue'
import { onMounted, ref } from 'vue'
import { debounce } from 'lodash-es'
import { useGetBlurValue, useSetBlur } from '@/composables/features/userListBlur'

const blurValue = ref(0)

const onChange: (val: number) => void = debounce(val => {
  useSetBlur(val)
}, 50)


function start() {
  document.querySelector('.n-drawer')!.addEventListener('mouseup', done)
  document.querySelector<HTMLDivElement>('.n-drawer')!.style.opacity = '0.05'
  document.querySelector<HTMLDivElement>('.n-drawer-mask')!.style.backgroundColor = 'transparent'
}

function done() {
  document.querySelector<HTMLDivElement>('.n-drawer')!.style.opacity = 'unset'
  document.querySelector<HTMLDivElement>('.n-drawer-mask')!.style.backgroundColor = 'rgba(0, 0, 0, .3)'
  document.querySelector('.n-drawer')!.removeEventListener('mouseup', done)
}

onMounted(() => {
  blurValue.value = +useGetBlurValue() || 0
})
</script>

<template>
  <div class="user-list-blur">
    <n-space align="center" justify="space-between">
      <label>用户列表背景模糊
        <TooltipsHelp message="整个背景模糊在「自定义背景」中设置~"/>
      </label>
      <n-slider :default-value="0"
                style="width: 220px;"
                :step="1" :min="0" :max="100"
                v-model:value="blurValue"
                @update:value="onChange"
                :format-tooltip="val => `${val} px`"
                @mousedown="start"
                @mouseup="done"
      />
    </n-space>
  </div>
</template>

<style scoped lang="less">

</style>
