import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

export enum FONT_TYPES {
  AUTO = 2,
  MANUAL
}

let CSSOM: CSSStyleSheet
const selector = 'body, .len-text, body, button, input, keygen, legend, select, textarea'
export const fallBackFonts = `PingFang SC, Microsoft YaHei New, 微软雅黑, Microsoft Yahei, Microsoft JhengHei, 宋体, SimSun, Helvetica Neue, Helvetica, Arial, sans-serif`

function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

function setFontFace(regularName: string, boldName: string) {
  document.fonts.forEach(font => {
    if (font.family === 'CustomFont') {
      document.fonts.delete(font)
    }
  })
  const regular = new FontFace('CustomFont', `local('${ regularName }')`, { weight: 'normal' })
  const bold = new FontFace('CustomFont Bold', `local('${ boldName }')`, { weight: 'bold' })
  Promise.all([regular.load(), bold.load()])
    .then(res => {
      res.forEach(font => {
        document.fonts.add(font)
      })
    })
    .catch(e => {
      console.error('加载字体失败', e)
    })
}

export function useSetFont(type: FONT_TYPES, fontConfig: {
  fontFamily?: string
  fontNameRegular?: string
  fontNameBold?: string
}, saveConfig = true) {
  init()
  let appendCSSContent = ''
  if (type === FONT_TYPES.AUTO) {
    appendCSSContent = `${ selector } {font-family: ${ fontConfig.fontFamily!.trim().replace(/,$/, '') }, ${ fallBackFonts } !important;}`
  } else if (type === FONT_TYPES.MANUAL) {
    setFontFace(fontConfig.fontNameRegular!, fontConfig.fontNameBold!)
    appendCSSContent = `${ selector } {font-family: 'CustomFont', ${ fallBackFonts } !important;}`
  }
  useResetFont(false)
  CSSOM.insertRule(appendCSSContent)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_PARAGRAPH_FONT, JSON.stringify({ type, ...fontConfig }))
}

export function useGetSetCustomFontFamily() {
  init()
  let regularName = ''
  let boldName = ''
  document.fonts.forEach(font => {
    if (font.family === 'CustomFont') {
      const config = JSON.parse(storageHelper.getKey(STORAGE_KEYS.KOOK_HELPER_LITE_PARAGRAPH_FONT))
      regularName = config.fontNameRegular
      boldName = config.fontNameBold
    }
  })
  if (regularName && boldName) {
    return {
      type: FONT_TYPES.MANUAL,
      regularName,
      boldName
    }
  }
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === selector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('font-family')
      const fontFamily = content.replaceAll('"', '').replaceAll(fallBackFonts, '').trim().replace(/,$/, '')
      return {
        type: FONT_TYPES.AUTO,
        fontFamily,
      }
    }
  }
  return void 0
}

export function useResetFont(saveConfig = true) {
  init()
  document.fonts.forEach(font => {
    if (font.family === 'CustomFont') {
      document.fonts.delete(font)
    }
  })
  removeRules(selector)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_PARAGRAPH_FONT)
}
