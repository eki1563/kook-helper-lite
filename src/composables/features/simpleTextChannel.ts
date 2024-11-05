import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const scroller = '.virtual-scroller-contet'
const selector = '.channel-item .newchannel-title .channel-content-info'
const sibling = '.channel-item .newchannel-title .channel-top-title:not(.thread-channel-top-title)'

const notPostsChannelSelector = '.channel-item.type-text:not(:has(.thread-channel-top-title))'
const unreadSelector = '.channel-item.type-text.has-unread.has-unread:not(:has(.thread-channel-top-title))'

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
  CSSOM.insertRule(`${ scroller } {height: unset !important;}`)
  CSSOM.insertRule(`${ selector } {display: none;}`)
  CSSOM.insertRule(`${ sibling } {margin-bottom: 5px;}`)
  CSSOM.insertRule(`${ notPostsChannelSelector } {height: 34px;}`)
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
  removeRules(scroller)
  removeRules(selector)
  removeRules(sibling)
  removeRules(notPostsChannelSelector)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_SIMPLE_TEXT_CHANNEL)
}

export function useSetShowLatestMessageOnNew(enable: boolean | string, saveConfig = true) {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  init()
  if (!enable) {
    useResetShowLatestMessage(true)
    return void 0
  }
  useResetShowLatestMessage(false)
  CSSOM.insertRule(`${ unreadSelector } {height: 60px;}`)
  CSSOM.insertRule(`${ unreadSelector } .channel-content-info {display: block;}`)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.SHOW_LATEST_MESSAGE_ON_NEW, `true`)
}

export function useGetShowLatestMessage() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === unreadSelector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('height')
      return content === '60px'
    }
  }
}

export function useResetShowLatestMessage(saveConfig = true) {
  init()
  removeRules(unreadSelector)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.SHOW_LATEST_MESSAGE_ON_NEW, `false`)
}
