import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const avatarFrameSelector = '.win-wapper .kook-avatar-frame-static, .win-wapper .kook-avatar-frame-animate, .user-info-card .kook-avatar-frame-static, .user-info-card .kook-avatar-frame-animate, .dialog-user-profile-content .kook-avatar-frame-animate, .dialog-user-profile-content .kook-avatar-frame-static'

function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useSetFrameVisible(visible: boolean | string, saveConfig = true) {
  if (typeof visible === 'string') {
    try {
      visible = JSON.parse(visible)
    } catch (err) {
      visible = false
    }
  }
  init()
  if (visible) {
    removeRules(avatarFrameSelector)
    CSSOM.insertRule(`${ avatarFrameSelector } {display: none !important;}`)
  } else {
    removeRules(avatarFrameSelector)
  }
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_CONCISE_AVATAR_FRAME, `${ visible }`)
}

export function useGetFrameVisible() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === avatarFrameSelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('display')
      return content === 'none'
    }
  }
  return false
}

const buffIconSelector = '.user-list-container .user-item .user-name .vip-tag'

export function useSetBUFFIconVisible(visible: boolean | string, saveConfig = true) {
  if (typeof visible === 'string') {
    try {
      visible = JSON.parse(visible)
    } catch (err) {
      visible = false
    }
  }
  init()
  if (visible) {
    removeRules(buffIconSelector)
    CSSOM.insertRule(`${ buffIconSelector } {display: none !important;}`)
  } else {
    removeRules(buffIconSelector)
  }
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_CONCISE_BUFF_ICON, `${ visible }`)
}

export function useGetBUFFIconVisible() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === buffIconSelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('display')
      return content === 'none'
    }
  }
  return false
}
