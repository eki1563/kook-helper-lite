/**
 * 初始化保存的配置
 */
import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import { FONT_TYPES, useSetFont } from '@/composables/features/font'
import { useSetAvatarRadius } from '@/composables/features/squareAvatar'
import {
  useSetAllDynamicAvatar,
  useSetAllDynamicFrame,
  useSetDynamicAvatar,
} from '@/composables/features/dynamicAvatar'
import { initCSSOM } from '@/utils'
import { useSetEnhance, useSetScroll } from '@/composables/optimizations/intro'
import { useSetSmooth } from '@/composables/optimizations/transitions/hoverSmooth'
import { useSetSettingsTransition } from '@/composables/optimizations/transitions/settingsPanel'
import {
  useSetActivityVisible,
  useSetBoosterVisible,
  useSetBUFFIconVisible,
  useSetFrameVisible,
  useSetNamePlateVisible,
  useSetUserListIntimacyVisible,
} from '@/composables/features/concise'
import { useSetBlur } from '@/composables/features/userListBlur'
import { useSetContrast } from '@/composables/optimizations/roleListContrast'
import { useSetHidden, useSetShowLatestMessageOnNew } from '@/composables/features/simpleTextChannel'
import { useSetPin } from '@/composables/optimizations/pinChannel'
import { useSetCustomCSS } from '@/composables/features/customCSS'


export default function () {
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
        case STORAGE_KEYS.KOOK_HELPER_LITE_ALL_DYNAMIC_AVATAR:
          useSetAllDynamicAvatar(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_ALL_DYNAMIC_FRAME:
          useSetAllDynamicFrame(config[key], false)
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
        case STORAGE_KEYS.KOOK_HELPER_LITE_SIMPLE_TEXT_CHANNEL:
          useSetHidden(config[key], false)
          break
        case STORAGE_KEYS.SHOW_LATEST_MESSAGE_ON_NEW:
          useSetShowLatestMessageOnNew(config[key], false)
          break
        case STORAGE_KEYS.KOOK_HELPER_LITE_PIN:
          useSetPin(config[key], false)
          break
        case STORAGE_KEYS.NAME_PLATE:
          useSetNamePlateVisible(config[key], false)
          break
        case STORAGE_KEYS.BOOSTER:
          useSetBoosterVisible(config[key], false)
          break
        case STORAGE_KEYS.INTIMACY:
          useSetUserListIntimacyVisible(config[key], false)
          break
        case STORAGE_KEYS.ACTIVITY:
          useSetActivityVisible(config[key], false)
          break
        case STORAGE_KEYS.CUSTOM_CSS:
          useSetCustomCSS(config[key], false)
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
