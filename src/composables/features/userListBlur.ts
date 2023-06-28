import storageHelper from '@/utils/storageHelper'
import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet

const selector: string = '.room-layout .room-content-right .right-slide-animate'

export function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useSetBlur(blurValue: number | string, saveConfig = true) {
  init()
  if (+blurValue === 0) {
    resetBlur(saveConfig)
  } else {
    resetBlur(false)
    CSSOM.insertRule(`${ selector } {backdrop-filter: blur(${ blurValue }px);}`)
  }
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_USER_LIST_BLUR, `${ blurValue }`)
}

export function useGetBlurValue() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === selector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('backdrop-filter')
      let value = content.replace(/blur\((\d+)px\)/, '$1')
      return value
    }
  }
}

function resetBlur(saveConfig = true) {
  init()
  removeRules(selector)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_USER_LIST_BLUR)
}
