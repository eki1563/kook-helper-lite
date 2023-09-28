import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const selector = '.channel-item.active'

function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useSetPin(enable: boolean | string, saveConfig = true) {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  init()
  if (!enable) {
    useResetPin(true)
    return void 0
  }
  useResetPin(false)
  CSSOM.insertRule(`${ selector } {position: sticky;top: 0;bottom: 4px;z-index: 9;background-color: var(--color-grey-bg);}`)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_PIN, `true`)
}

export function useGetPin() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === selector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('position')
      return content === 'sticky'
    }
  }
}

export function useResetPin(saveConfig = true) {
  init()
  removeRules(selector)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_PIN)
}
