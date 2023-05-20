import pangu from 'pangu'
import storageHelper from '@/utils/storageHelper'
import STORAGE_KEYS from '@/config/STORAGE_KEYS'

let oldHref = document.location.href
let bodyList = document.querySelector('body')!

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (oldHref != document.location.href) {
      oldHref = document.location.href
      pangu.spacingElementByClassName('text-message-box')
    }
  })
})

export function useSetPangu(enable: boolean | string, saveConfig = true) {
  if (typeof enable === 'string') {
    try {
      enable = JSON.parse(enable)
    } catch (err) {
      enable = false
    }
  }
  if (enable) {
    enablePangu(saveConfig)
  } else {
    disablePangu(saveConfig)
  }
}

export function useGetPangu() {
  let status = storageHelper.getKey(STORAGE_KEYS.KOOK_HELPER_LITE_PANGU_SPACE)
  if (status) {
    try {
      status = JSON.parse(status)
      return !!status
    } catch (err) {
      return false
    }
  }
  return false
}

function enablePangu(saveConfig: boolean) {
  observer.disconnect()
  pangu.autoSpacingPage()
  observer.observe(bodyList, {
    childList: true,
    subtree: true,
  })
  saveConfig && storageHelper.setKey(STORAGE_KEYS.KOOK_HELPER_LITE_PANGU_SPACE, `true`)
}

function disablePangu(saveConfig: boolean) {
  observer.disconnect()
  saveConfig && storageHelper.removeKey(STORAGE_KEYS.KOOK_HELPER_LITE_PANGU_SPACE)
}
