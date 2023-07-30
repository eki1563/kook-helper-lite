import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const selector = '.channel-item .newchannel-title .channel-content-info'
const sibling = '.channel-item .newchannel-title .channel-top-title'

function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useSetHidden(enable: boolean | string, saveConfig = true) {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  init()
  if (!enable) {
    useResetHide(true)
    return void 0
  }
  useResetHide(false)
  CSSOM.insertRule(`${ selector } {display: none;}`)
  CSSOM.insertRule(`${ sibling } {margin-bottom: 5px;}`)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_SIMPLE_TEXT_CHANNEL, `true`)
}

export function useGetHidden() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === selector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('display')
      return content === 'none'
    }
  }
}

export function useResetHide(saveConfig = true) {
  init()
  removeRules(selector)
  removeRules(sibling)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_SIMPLE_TEXT_CHANNEL)
}
