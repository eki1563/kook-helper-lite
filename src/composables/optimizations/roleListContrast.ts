import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'
import { getCSSOM, removeRules } from '@/utils'

let CSSOM: CSSStyleSheet
const selector = '.user-info-card-content .kaihei-role-tag'


function init() {
  if (!CSSOM) {
    CSSOM = getCSSOM()
  }
}

export function useSetContrast(enable: boolean | string, saveConfig = true): void {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  init()
  if (enable) {
    CSSOM.insertRule(`${ selector } {pointer-events: all; transition: all .3s;}`)
    document.addEventListener('mouseout', onMoveOut)
    saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_ROLE_LIST_CONTRAST, 'true')
  } else {
    reset()
  }
}

export function useGetContrast() {
  init()
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].selectorText === selector) {
      // @ts-ignore
      const content = CSSOM.cssRules[i].style.getPropertyPriority('pointer-events')
      return content === 'auto'
    }
  }
}

function reset(saveConfig = true): void {
  init()
  removeRules(selector)
  document.removeEventListener('mouseout', onMoveOut)
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_ROLE_LIST_CONTRAST)
}

function onMoveOut(e: any) {
  const fromEl = e.fromElement as HTMLElement
  const toEl = e.toElement as HTMLElement
  let container = toEl?.closest('.kaihei-role-tag') as HTMLDivElement | undefined | null
  if (container) {
    const roleColor = container.style.backgroundColor
    const red = +roleColor.replace(/rgba\((\d+).*/, '$1')
    const green = +roleColor.replace(/rgba\(\d+,\s?(\d+).*/, '$1')
    const blue = +roleColor.replace(/rgba\(\d+,\s?\d+,\s?(\d+).*/, '$1')
    const transform = roleColor.replace(/(rgba\(\d+,\s?\d+,\s?\d+,)\s?\d\.\d+\)/, '$1 0.75)')
    container.style.backgroundColor = transform
    // 渐变角色没有匹配，文字颜色不用处理
    if (!transform) {
      return void 0
    }
    if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
      (container.querySelector('.role-name span') as HTMLSpanElement).style.color = '#2e303a'
    } else {
      (container.querySelector('.role-name span') as HTMLSpanElement).style.color = '#fff'
    }
  } else {
    container = fromEl?.closest('.kaihei-role-tag') as any
    if (container) {
      const roleColor = fromEl.style.backgroundColor
      const transform = roleColor.replace(/(rgba\(\d+,\s?\d+,\s?\d+,)\s?\d\.\d+\)/, '$1 0.15)')
      container.style.backgroundColor = transform
      if (transform) {
        (container.querySelector('.role-name span') as HTMLSpanElement).style['color'] = '#fff'
      }
    }
  }
}
