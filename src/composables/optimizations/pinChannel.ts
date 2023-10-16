import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const wrapperSelector = '.channel-item.active.type-text'
const backgroundSelector = '.channel-item.active .newchannel-title::after'

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(() => {
    setTimeout(() => {
      useSetPin(true, true)
    })
  })
})

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
  const customThemeEl = document.querySelector('.app-mask-layer')!
  const customTheme = window.getComputedStyle(customThemeEl)
  let afterBackground
  if (customTheme.backgroundImage !== 'none') {
    afterBackground = `background-image: ${ customTheme.backgroundImage };`
  } else {
    afterBackground = `background-color: ${ customTheme.backgroundColor };`
  }
  if (!enable) {
    useResetPin(true)
    return void 0
  }
  useResetPin(false)
  CSSOM.insertRule(`${ wrapperSelector } {position: sticky;top: 0;bottom: 4px;z-index: 9;}`)
  CSSOM.insertRule(`${ backgroundSelector } {content: '';display: block;width: 100%;height: 100%;${ afterBackground }position: absolute;top: 0;left: 0;z-index: -1;border-radius: inherit;}`)
  observer.disconnect()
  observer.observe(customThemeEl, { attributes: true, attributeFilter: ['style'] })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_PIN, `true`)
}

export function useGetPin() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === wrapperSelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('position')
      return content === 'sticky'
    }
  }
}

export function useResetPin(saveConfig = true) {
  init()
  removeRules(wrapperSelector)
  removeRules(backgroundSelector)
  observer.disconnect()
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_PIN)
}
