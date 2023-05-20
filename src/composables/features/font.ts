import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const selector = 'body, .len-text, body, button, input, keygen, legend, select, textarea'
const fallBackFonts = `PingFang SC, Microsoft YaHei New, 微软雅黑, Microsoft Yahei, Microsoft JhengHei, 宋体, SimSun, Helvetica Neue, Helvetica, Arial, sans-serif`

function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useSetFont(fontFamily: string, saveConfig = true) {
  init()
  const appendCSSContent = `${ selector } {font-family: ${ fontFamily.trim().replace(/,$/, '') }, ${ fallBackFonts } !important;}`
  useResetFont(false)
  CSSOM.insertRule(appendCSSContent)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_PARAGRAPH_FONT, fontFamily)
}

export function useGetSetCustomFontFamily() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === selector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('font-family')
      return content.replaceAll('"', '').replaceAll(fallBackFonts, '').trim().replace(/,$/, '')
    }
  }
  return void 0
}

export function useResetFont(saveConfig = true) {
  init()
  removeRules(selector)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_PARAGRAPH_FONT)
}
