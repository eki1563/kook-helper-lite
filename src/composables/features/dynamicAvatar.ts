import storageHelper from '@/utils/storageHelper'
import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const staticAvatarSelector: string = '.app-left .bottom .kook-avatar-picture-static'
const staticFrameSelector: string = '.app-left .bottom .kook-avatar-frame-static'
const dynamicAvatarSelector: string = '.app-left .bottom .kook-avatar-picture-animate'
const dynamicFrameSelector: string = '.app-left .bottom .kook-avatar-frame-animate'
const allDynamicAvatarSelector: string = '.kook-avatar img.kook-avatar-picture-animate'
const needHideStaticAvatarSelector: string = '.kook-avatar:has(img.kook-avatar-picture-animate) img.kook-avatar-picture-static'
const allDynamicFrameSelector: string = '.kook-avatar .kook-avatar-frame-animate'
const allStaticFrameSelector: string = '.kook-avatar .kook-avatar-frame-static'

export function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useGetSetAvatarDynamic() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === dynamicAvatarSelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('display')
      return content === 'block'
    }
  }
  return void 0
}

export function useSetDynamicAvatar(dynamic: boolean | string, saveConfig = true, repeatTimes = 0) {
  if (repeatTimes > 10) {
    return
  }
  init()
  if (typeof dynamic === 'string') {
    try {
      dynamic = JSON.parse(dynamic)
    } catch (err) {
      dynamic = false
    }
  }
  const staticAvatar = document.querySelector(staticAvatarSelector)
  // 根据静态头像判断页面是否已经加载完成，静态头像需要隐藏掉，以防透明动态头像产生重影
  if (staticAvatar) {
    if (dynamic) {
      useResetAvatarDynamic(false)
      if (document.querySelector(dynamicAvatarSelector)) {
        CSSOM.insertRule(`${ dynamicAvatarSelector } {display: block !important;}`)
        CSSOM.insertRule(`${ staticAvatarSelector } {display: none !important;}`)
      }
      if (document.querySelector(dynamicFrameSelector)) {
        CSSOM.insertRule(`${ dynamicFrameSelector } {display: block !important;}`)
        CSSOM.insertRule(`${ staticFrameSelector } {display: none !important;}`)
      }
    } else {
      useResetAvatarDynamic()
    }
    saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_AVATAR_DYNAMIC, `${ dynamic }`)
  } else {
    dynamic && setTimeout(() => {
      useSetDynamicAvatar(dynamic, true, repeatTimes + 1)
    }, 1000)
  }
}

export function useResetAvatarDynamic(saveConfig = true) {
  init()
  ;[staticAvatarSelector, staticFrameSelector, dynamicAvatarSelector, dynamicFrameSelector].forEach(s => {
    removeRules(s)
  })
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_AVATAR_DYNAMIC)
}


export function useSetAllDynamicAvatar(enable: boolean | string, saveConfig = true) {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  init()
  if (!enable) {
    useResetAllDynamicAvatar(true)
    return void 0
  }
  useResetAllDynamicAvatar(false)
  CSSOM.insertRule(`${ allDynamicAvatarSelector } {display: block !important;}`)
  CSSOM.insertRule(`${ needHideStaticAvatarSelector } {display: none !important;}`)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_ALL_DYNAMIC_AVATAR, `${ enable }`)
}

export function useResetAllDynamicAvatar(saveConfig = true) {
  init()
  removeRules(allDynamicAvatarSelector)
  removeRules(needHideStaticAvatarSelector)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_ALL_DYNAMIC_AVATAR)
}

export function useGetAllDynamicAvatar() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === allDynamicAvatarSelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('display')
      // @ts-ignore
      const priority = CSSOM.cssRules[i].style.getPropertyPriority('display')
      return content === 'block' && priority === 'important'
    }
  }
  return false
}


export function useSetAllDynamicFrame(enable: boolean | string, saveConfig = true) {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  init()
  if (!enable) {
    useResetAllDynamicFrame(true)
    return void 0
  }
  useResetAllDynamicFrame(false)
  CSSOM.insertRule(`${ allDynamicFrameSelector } {display: block !important;}`)
  CSSOM.insertRule(`${ allStaticFrameSelector } {display: none !important;}`)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_ALL_DYNAMIC_FRAME, `${ enable }`)
}

export function useResetAllDynamicFrame(saveConfig = true) {
  init()
  removeRules(allDynamicFrameSelector)
  removeRules(allStaticFrameSelector)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_ALL_DYNAMIC_FRAME)
}

export function useGetAllDynamicFrame() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === allDynamicFrameSelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('display')
      // @ts-ignore
      const priority = CSSOM.cssRules[i].style.getPropertyPriority('display')
      return content === 'block' && priority === 'important'
    }
  }
  return false
}
