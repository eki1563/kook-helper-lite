import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const avatarFrameSelector = '.win-wapper .kook-avatar-frame-static, .win-wapper .kook-avatar-frame-animate.kook-avatar-frame-animate, .user-info-card .kook-avatar-frame-static, .user-info-card .kook-avatar-frame-animate, .dialog-user-profile-content .kook-avatar-frame-animate, .dialog-user-profile-content .kook-avatar-frame-static'

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

const namePlateSelector = '.user-name-info > img'

export function useSetNamePlateVisible(visible: boolean | string, saveConfig = true) {
  if (typeof visible === 'string') {
    try {
      visible = JSON.parse(visible)
    } catch (err) {
      visible = false
    }
  }
  init()
  if (visible) {
    removeRules(namePlateSelector)
    CSSOM.insertRule(`${ namePlateSelector } {display: none !important;}`)
  } else {
    removeRules(namePlateSelector)
  }
  saveConfig && storageHelper.setKey(STORAGE_KEYS.NAME_PLATE, `${ visible }`)
}

export function useGetNamePlateVisible() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === namePlateSelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('display')
      return content === 'none'
    }
  }
  return false
}

const boosterSelector = `.win-title-bar-icon-group .win-title-bar-tag`

export function useSetBoosterVisible(visible: boolean | string, saveConfig = true) {
  if (typeof visible === 'string') {
    try {
      visible = JSON.parse(visible)
    } catch (err) {
      visible = false
    }
  }
  init()
  if (visible) {
    removeRules(boosterSelector)
    CSSOM.insertRule(`${ boosterSelector } {display: none !important;}`)
  } else {
    removeRules(boosterSelector)
  }
  saveConfig && storageHelper.setKey(STORAGE_KEYS.BOOSTER, `${ visible }`)
}

export function useGetBoosterVisible() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === boosterSelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('display')
      return content === 'none'
    }
  }
  return false
}

const intimacySelector = `.user-list-container .user-item .user-info-right.intimacy`

export function useSetUserListIntimacyVisible(visible: boolean | string, saveConfig = true) {
  if (typeof visible === 'string') {
    try {
      visible = JSON.parse(visible)
    } catch (err) {
      visible = false
    }
  }
  init()
  if (visible) {
    removeRules(intimacySelector)
    CSSOM.insertRule(`${ intimacySelector } {background-image: none !important;}`)
  } else {
    removeRules(intimacySelector)
  }
  saveConfig && storageHelper.setKey(STORAGE_KEYS.INTIMACY, `${ visible }`)
}

export function useGetUserListIntimacyVisible() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === intimacySelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('background-image')
      return content === 'none'
    }
  }
  return false
}

const activitySelector = `.app-left .menu-icon-item#app-eventcenter`

export function useSetActivityVisible(hidden: boolean | string, saveConfig = true) {
  if (typeof hidden === 'string') {
    try {
      hidden = JSON.parse(hidden)
    } catch (err) {
      hidden = false
    }
  }
  init()
  if (hidden) {
    removeRules(activitySelector)
    CSSOM.insertRule(`${activitySelector} {display: none !important;}`)
  } else {
    removeRules(activitySelector)
  }
  saveConfig && storageHelper.setKey(STORAGE_KEYS.ACTIVITY, `${ hidden }`)
}

export function useGetActivityVisible() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === activitySelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('display')
      return content === 'none'
    }
  }
}
