<script setup lang="ts">
import { createElementVNode, ref } from 'vue'
import { NButton, NCard, NSpace, NInput, useDialog } from 'naive-ui'
import { useGetCustomCSS, useSetCustomCSS } from '@/composables/features/customCSS'

const cssContentRef = ref(``)
const dialog = useDialog()
cssContentRef.value = useGetCustomCSS()

function onSave() {
  if (/(import)|<\/?/gis.test(cssContentRef.value)) {
    dialog.warning({
      title: '发现可能存在的危险内容',
      content: () => createElementVNode('div', undefined, [
        createElementVNode('div', undefined, '此操作会直接将输入的内容插入到页面内容中，请自行判别输入内容的安全性！'),
        createElementVNode('div', undefined, '小助手不承担因输入不安全内容而造成各种损失的相关责任！'),
      ]),
      positiveText: '确定',
      negativeText: '算了算了',
      onPositiveClick: () => {
        useSetCustomCSS(cssContentRef.value)
      },
      onNegativeClick: () => {
      },
    })
  } else {
    useSetCustomCSS(cssContentRef.value)
  }
}

function onClear() {
  useSetCustomCSS('')
  cssContentRef.value = ''
}

</script>
<template>
  <n-card embedded class="custom-css">
    <n-input
        v-model:value="cssContentRef"
        :maxlength="3 * 1024"
        type="textarea"
        placeholder="仅支持 CSS 内容，不支持 less、Sass。"
        show-count
    />
    <template #action>
      <n-space justify="end">
        <n-button text type="error" size="small" @click="onSave">保存</n-button>
        <n-button text type="default" size="small" @click="onClear">清空</n-button>
      </n-space>
    </template>
  </n-card>
</template>

<style scoped lang="less">
</style>
