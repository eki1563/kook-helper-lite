/**
 * 初始化保存的配置
 */
import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import STORAGE_KEYS_OLD from '@/config/STORAGE_KEYS_OLD'
import storageHelper from '@/utils/storageHelper'

import { FONT_TYPES, useSetFont } from '@/composables/features/font'
import { useSetAvatarRadius } from '@/composables/features/squareAvatar'
import { useSetDynamicAvatar } from '@/composables/features/dynamicAvatar'
import { initCSSOM } from '@/utils'
import { useSetEnhance, useSetScroll } from '@/composables/optimizations/intro'
import { useSetSmooth } from '@/composables/optimizations/transitions/hoverSmooth'
import { useSetSettingsTransition } from '@/composables/optimizations/transitions/settingsPanel'
import { useSetBUFFIconVisible, useSetFrameVisible } from '@/composables/features/concise'
import { useSetBlur } from '@/composables/features/userListBlur'
import { useSetContrast } from '@/composables/optimizations/roleListContrast'

function updateToNewString() {
  let oldConfig = localStorage.getItem(STORAGE_KEYS_OLD.KOOK_KIT_CONFIG)
  if (oldConfig) {
    try {
      const config = JSON.parse(oldConfig)
      Object.keys(config).forEach(key => {
        switch (key) {
          case STORAGE_KEYS_OLD.KOOK_KIT_PARAGRAPH_FONT:
            storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_PARAGRAPH_FONT, config[key])
            break
          case STORAGE_KEYS_OLD.KOOK_KIT_AVATAR_RADIUS:
            storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_AVATAR_RADIUS, config[key])
            break
          case STORAGE_KEYS_OLD.KOOK_KIT_AVATAR_DYNAMIC:
            storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_AVATAR_DYNAMIC, config[key])
            break
          default:
            break
        }
      })
      localStorage.removeItem(STORAGE_KEYS_OLD.KOOK_KIT_CONFIG)
    } catch (e) {
      console.error(e)
      throw new Error('读取旧配置失败')
    }
  }
}

export default function () {
  updateToNewString()
  initCSSOM()
  try {
    const config = JSON.parse(localStorage.getItem(STORAGE_KEYS.KOOK_HELPER_LITE_CONFIG)!)
    Object.keys(config).forEach(key => {
      switch (key) {
        case STORAGE_KEYS.KOOK_HELPER_LITE_PARAGRAPH_FONT:
          try {
            const value = JSON.parse(config[key])
            useSetFont(value.type, value, false)
          } catch {
            useSetFont(FONT_TYPES.AUTO, { fontFamily: config[key] }, true)
          }
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_AVATAR_RADIUS:
          useSetAvatarRadius(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_AVATAR_DYNAMIC:
          useSetDynamicAvatar(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_INTRO_SCROLL:
          useSetScroll(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_INTRO_ENHANCE:
          useSetEnhance(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_HOVER_SMOOTH:
          useSetSmooth(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_SETTINGS_TRANSITION:
          useSetSettingsTransition(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_CONCISE_AVATAR_FRAME:
          useSetFrameVisible(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_CONCISE_BUFF_ICON:
          useSetBUFFIconVisible(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_USER_LIST_BLUR:
          useSetBlur(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_ROLE_LIST_CONTRAST:
          useSetContrast(config[key], false)
          break
        default:
          break
      }
    })
  } catch (e) {
    console.error(e)
    throw new Error('读取配置失败')
  }
}
