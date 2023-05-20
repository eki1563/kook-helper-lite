import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const selector = '.setting-page-mask, .dialog-guild-boost, .feedback-mask'

function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useSetSettingsTransition(enable: boolean | string, saveConfig = true) {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  init()
  if (!enable) {
    useResetSettingsTransition(true)
    return void 0
  }
  useResetSettingsTransition(false)
  CSSOM.insertRule(`@keyframes append-animate {from {transform: scale(0); opacity: 0; } to {transform: scale(1); opacity: 1;}}`)
  CSSOM.insertRule(`${ selector } {animation: append-animate .3s ease; transform-origin: center center;}`)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_SETTINGS_TRANSITION, `true`)
}

export function useGetSettingsTransition() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === selector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('animation')
      return content.includes('append-animate')
    }
  }
  return false
}

export function useResetSettingsTransition(saveConfig = true) {
  init()
  removeRules(selector)
  removeRules('@keyframes append-animate')
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_SETTINGS_TRANSITION, `true`)
}
