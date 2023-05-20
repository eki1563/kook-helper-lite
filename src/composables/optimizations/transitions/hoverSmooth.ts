import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const selector = '.sort-item .newchannel-title::before, .sort-item .new-audio-channel-title::before, .user-item::before, .home-nav-container .nav-item::before, .home-nav-container .nav-top-list .friend-nav-item::before'

function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useSetSmooth(enable: boolean | string, saveConfig = true) {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  init()
  if (!enable) {
    useResetSmooth(true)
    return void 0
  }
  useResetSmooth(false)
  CSSOM.insertRule(`.user-item-content:hover {background-color: transparent !important;}`)
  CSSOM.insertRule(`.sort-item .newchannel-title, .user-item, .home-nav-container .nav-item, .home-nav-container .nav-top-list .friend-nav-item {position: relative;}`)
  CSSOM.insertRule(`${ selector } {content: ""; position: absolute; top: 100%; left: 0; width: 100%; height: 0; background: var(--menu-hover); transition: 0.05s all linear; border-radius: 6px; pointer-events: none;}`)
  CSSOM.insertRule(`.sort-item:hover .newchannel-title::before, .sort-item:hover .new-audio-channel-title::before, .user-item:hover::before, .nav-item:hover::before, .friend-nav-item:hover::before {top: 0 !important; height: 100% !important; transition-delay: 0s !important;}`)
  CSSOM.insertRule(`.sort-item:hover ~ .sort-item .newchannel-title::before, .sort-item:hover ~ .sort-item .new-audio-channel-title::before, .user-item:hover ~ .user-item::before, .nav-item:hover ~ .nav-item::before, .friend-nav-item:hover ~ .friend-nav-item::before {top: 0; height: 0;}`)
  CSSOM.insertRule(`.channel-item .newchannel-title:hover, .channel-item .new-audio-channel-title:hover, .user-list-container .user-item:hover, .home-nav-container .nav-item:hover {background: none;}`)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_HOVER_SMOOTH, `true`)
}

export function useGetSmooth() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === selector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyValue('transition')
      return !!content.length
    }
  }
  return false
}

export function useResetSmooth(saveConfig = true) {
  init()
  removeRules(`.user-item-content:hover`)
  removeRules(`.sort-item .newchannel-title, .user-item, .home-nav-container .nav-item, .home-nav-container .nav-top-list .friend-nav-item`)
  removeRules(selector)
  removeRules(`.sort-item:hover .newchannel-title::before, .sort-item:hover .new-audio-channel-title::before, .user-item:hover::before, .nav-item:hover::before, .friend-nav-item:hover::before`)
  removeRules(`.sort-item:hover ~ .sort-item .newchannel-title::before, .sort-item:hover ~ .sort-item .new-audio-channel-title::before, .user-item:hover ~ .user-item::before, .nav-item:hover ~ .nav-item::before, .friend-nav-item:hover ~ .friend-nav-item::before`)
  removeRules(`.channel-item .newchannel-title:hover, .channel-item .new-audio-channel-title:hover, .user-list-container .user-item:hover, .home-nav-container .nav-item:hover`)
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_HOVER_SMOOTH, `true`)
}
