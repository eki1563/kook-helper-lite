import storageHelper from '@/utils/storageHelper'
import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet

const radiusSelector: string = '.kook-avatar .kook-avatar-picture-animate, .kook-avatar .kook-avatar-picture-static, .user-info-card .user-avatar-panel .user-avatar-img, .conversation-list .user-avatar-inner, .friend-user-avatar-inner'

export function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useGetSetAvatarRadius() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === radiusSelector) {
      // @ts-ignore
      return CSSOM.cssRules[i].style.getPropertyValue('border-radius')
    }
  }
  return void 0
}

export function useSetAvatarRadius(radius: string, saveConfig = true) {
  init()
  const appendCSSContent = `${ radiusSelector } {border-radius: ${ radius.trim() } !important;}`
  removeRules(radiusSelector)
  CSSOM.insertRule(appendCSSContent)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_AVATAR_RADIUS, radius)
}

export function useResetAvatarRadius(saveConfig = true) {
  init()
  removeRules(radiusSelector)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_AVATAR_RADIUS)
}
