<template>
  <n-card embedded class="font">
    <n-space vertical>
      <n-tabs type="line" animated placement="left" size="small" v-model:value="fontType">
        <n-tab-pane :name="FONT_TYPES.AUTO" tab="自动识别" style="padding: 0 0 0 10px;">
          <n-space align="center" justify="space-between">
            <label>字体全称：</label>
            <n-input v-model:value="fontFamily" style="width: 210px;" type="text" size="small"
                     placeholder="更纱黑体 UI SC, Sarasa UI SC" @keydown.enter="onSubmit"/>
          </n-space>
          <n-alert type="success" :show-icon="false" style="margin-top: 10px;">
            1、字体全称可在「系统设置-字体」中的「字体详情」中找到。
            <br>
            2、记得检查「元数据」中的字重哦，一般为 Regular。
            <br>
            3、如果粗体文本不能正常显示，请点击
            <n-button text type="primary" size="small" @click="fontType = FONT_TYPES.MANUAL">手动设置</n-button>
            字体。
          </n-alert>
        </n-tab-pane>
        <n-tab-pane :name="FONT_TYPES.MANUAL" tab="手动设置" style="padding: 0 0 0 10px;">
          <n-space align="center" justify="start">
            <n-space justify="space-between" align="stretch">
              <label>常规字体：</label>
              <div>
                <n-input v-model:value="fontNameRegular" style="width: 210px;" type="text" size="small"
                         placeholder="HYQIHEI_60S" @keydown.enter="onSubmit"/>
                <n-text type="error" style="display:block; height: 20px;">
                  {{ regularError }}
                </n-text>
              </div>
            </n-space>
            <n-space justify="space-between" align="stretch">
              <label>加粗字体：</label>
              <div>
                <n-input v-model:value="fontNameBold" style="width: 210px;" type="text" size="small"
                         placeholder="HYQIHEI_85S" @keydown.enter="onSubmit"/>
                <n-text type="error" style="display:block; height: 20px;">
                  {{ boldError }}
                </n-text>
              </div>
            </n-space>
          </n-space>
          <n-alert type="success" :show-icon="false" style="margin-top: 10px;">
            1、请输入已安装的字体文件名本身（不用带上 .ttf 或 .otf 后缀）。
            <br>
            2、字体文件名称可在「系统设置 - 字体 - 字体详情」的「字体文件」一栏中找到。
          </n-alert>
        </n-tab-pane>
      </n-tabs>
      <n-space align="center" justify="space-between">
        <div>
          <h2 style="font-size: 20px;">常规体预览</h2>
          <div :style="previewStyle">
            <p>汉体书写信息技术标准相容</p>
            <p>档案下载使用界面简单</p>
            <p>支援服务他测资讯专业制作</p>
            <p>创意空间快速无线上网</p>
            <p>一二三四五六七八九十</p>
            <p>AaBbCc A a B b C c</p>
          </div>
        </div>
        <div>
          <h2 style="font-size: 20px;">粗体预览</h2>
          <div :style="`${previewStyle} font-weight: bold;`">
            <p>汉体书写信息技术标准相容</p>
            <p>档案下载使用界面简单</p>
            <p>支援服务他测资讯专业制作</p>
            <p>创意空间快速无线上网</p>
            <p>一二三四五六七八九十</p>
            <p>AaBbCc A a B b C c</p>
          </div>
        </div>
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
import { NAlert, NButton, NCard, NDivider, NInput, NSpace, NTabPane, NTabs, NText } from 'naive-ui'
import { computed, ref, watch } from 'vue'
import {
  fallBackFonts,
  FONT_TYPES,
  useGetSetCustomFontFamily,
  useResetFont,
  useSetFont,
} from '@/composables/features/font'

const fontFamily = ref('')
const fontNameRegular = ref('')
const fontNameBold = ref('')
const regularError = ref('')
const boldError = ref('')
const fontType = ref<FONT_TYPES>(FONT_TYPES.AUTO)
const fontStatus = useGetSetCustomFontFamily()

if (fontStatus?.type === FONT_TYPES.AUTO) {
  fontFamily.value = fontStatus.fontFamily
  fontType.value = fontStatus.type
} else if (fontStatus?.type === FONT_TYPES.MANUAL) {
  fontNameRegular.value = fontStatus.regularName
  fontNameBold.value = fontStatus.boldName
  fontType.value = fontStatus.type
}

const previewStyle = computed(() => {
  if (fontType.value === FONT_TYPES.AUTO) {
    if (fontFamily.value) {
      return `font-family: ${ fontFamily.value };`
    } else {
      return `font-family: ${ fallBackFonts };`
    }
  } else if (fontType.value === FONT_TYPES.MANUAL) {
    return `font-family: CustomFontPreview;`
  }
})

let previewStyleDOM: HTMLStyleElement | null
previewStyleDOM = document.querySelector(`style[title='kook-helper-lite-preview']`)
if (!previewStyleDOM) {
  const CSSNode = document.createElement('style')
  CSSNode.setAttribute('title', `kook-helper-lite-preview`)
  document.head.appendChild(CSSNode)
  previewStyleDOM = CSSNode
}
watch(fontNameRegular, newRegular => {
  if (!newRegular) {
    regularError.value = ''
    return
  }
  if (previewStyleDOM) {
    const regular = new FontFace('CustomFontPreview', `local('${ newRegular }')`, { weight: 'normal' })
    regular
        .load()
        .then(res => {
          document.fonts.add(res)
          regularError.value = ''
        })
        .catch(e => {
          regularError.value = '常规字体加载失败！'
        })
  }
})

watch(fontNameBold, newBold => {
  if (!newBold) {
    boldError.value = ''
    return
  }
  if (previewStyleDOM) {
    const regular = new FontFace('CustomFontPreview', `local('${ newBold }')`, { weight: 'bold' })
    regular
        .load()
        .then(res => {
          document.fonts.add(res)
          boldError.value = ''
        })
        .catch(e => {
          boldError.value = '加精字体加载失败！'
        })
  }
})

function onSubmit() {
  if (fontType.value === FONT_TYPES.AUTO) {
    if (fontFamily.value.trim().length) {
      useSetFont(fontType.value, { fontFamily: fontFamily.value })
    }
  } else if (fontType.value === FONT_TYPES.MANUAL) {
    if (fontNameRegular.value.trim().length && fontNameBold.value.trim().length) {
      useSetFont(fontType.value, { fontNameRegular: fontNameRegular.value, fontNameBold: fontNameBold.value })
    }
  }
}

function onReset() {
  fontFamily.value = ''
  fontNameRegular.value = ''
  fontNameBold.value = ''
  document.fonts.forEach(font => {
    if (font.family.startsWith('CustomFontPreview')) {
      document.fonts.delete(font)
    }
  })
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

