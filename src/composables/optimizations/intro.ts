import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const selector = '.user-info-card-content .user-desc .content'
const scrollBar = '::-webkit-scrollbar'
const scrollBarThumb = '::-webkit-scrollbar-thumb'

function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useSetScroll(enable: boolean | string, saveConfig = true) {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  init()
  if (!enable) {
    useResetScroll(true)
    return void 0
  }
  useResetScroll(false)
  CSSOM.insertRule(`${ selector } {overflow-y: auto; display: block; -webkit-box-orient: unset; -webkit-line-clamp: unset; position: relative;}`)
  CSSOM.insertRule(`${ selector }${ scrollBar } {width: .3em;}`)
  CSSOM.insertRule(`${ selector }${ scrollBar }, ${ selector }${ scrollBarThumb } {border-radius: 4px;}`)
  CSSOM.insertRule(`${ selector }${ scrollBarThumb } {background: rgba(0, 0, 0, .2);}`)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_INTRO_SCROLL, `true`)
}

export function useGetScroll() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === selector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('overflow-y')
      return content === 'auto'
    }
  }
}

export function useResetScroll(saveConfig = true) {
  init()
  removeRules(selector)
  removeRules(`${ selector }${ scrollBar }`)
  removeRules(`${ selector }${ scrollBarThumb }`)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_INTRO_SCROLL)
}

const enhanceSelector = '.dialog-user-profile .profile-text'

export function useSetEnhance(enable: boolean | string, saveConfig = true) {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  init()
  if (!enable) {
    useResetEnhance(true)
    return void 0
  }
  useResetEnhance(false)
  CSSOM.insertRule(`${ enhanceSelector } {color: var(--text-color) !important;}`)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_INTRO_ENHANCE, `true`)
}

export function useGetEnhance() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === enhanceSelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyPriority('color')
      return content === 'important'
    }
  }
}

export function useResetEnhance(saveConfig = true) {
  init()
  removeRules(enhanceSelector)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_INTRO_ENHANCE)
}
