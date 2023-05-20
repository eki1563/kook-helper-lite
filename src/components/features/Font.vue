<template>
  <n-card embedded class="font">
    <n-space vertical>
      <n-space align="center" justify="start">
        <label>正文字体：</label>
        <n-input v-model:value="fontFamily" style="width: 250px;" type="text" size="small"
                 placeholder="更纱黑体 UI SC, Sarasa UI SC" @keydown.enter="onSubmit"/>
      </n-space>
      <n-blockquote>
        1、字体全称可在「系统设置-字体」中的「字体详情」中找到。
        <br>
        2、记得检查「元数据」中的字重哦，一般为 Regular。
        <br>
        3、如果全称不能使用，也可以试试字体文件名本身（不要带上 .ttf 或 .otf 后缀）。
      </n-blockquote>
      <div class="preview">
        <h2 style="font-size: 20px;">预览</h2>
        <div :style="`font-family: ${fontFamily}`">
          <p>汉体书写信息技术标准相容</p>
          <p>档案下载使用界面简单</p>
          <p>支援服务他测资讯专业制作</p>
          <p>创意空间快速无线上网</p>
          <p>(一)(二)(三)(四)(五)(六)(七)(八)(九)(十)</p>
          <p>AaBbCc A a B b C c</p>
        </div>
      </div>
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
import { NInput, NButton, NSpace, NCard, NDivider, NBlockquote } from 'naive-ui'
import { ref } from 'vue'
import { useGetSetCustomFontFamily, useResetFont, useSetFont } from '@/composables/features/font'
import TooltipsHelp from '@/components/TooltipsHelp.vue'

const fontFamily = ref('')
fontFamily.value = useGetSetCustomFontFamily()

function onSubmit() {
  if (fontFamily.value && fontFamily.value.trim().length) {
    useSetFont(fontFamily.value)
  } else {
    useResetFont()
  }
}

function onReset() {
  fontFamily.value = ''
  useResetFont()
}

</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Font',
})
</script>

<style lang="less" scoped>
.font {

}
</style>

