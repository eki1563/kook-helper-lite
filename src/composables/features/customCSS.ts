import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import storageHelper from '@/utils/storageHelper'


export function useSetCustomCSS(css: string, saveConfig = true) {
  let styleNode = document.querySelector('style[data-title="kook-helper-lite__custom-css"]')
  if (!styleNode) {
    styleNode = document.createElement('style') as HTMLStyleElement
    styleNode.setAttribute('data-title', 'kook-helper-lite__custom-css')
  }
  document.head.appendChild(styleNode)
  styleNode.appendChild(document.createTextNode(css))
  saveConfig && storageHelper.setKey(STORAGE_KEYS.CUSTOM_CSS, css)
}

export function useGetCustomCSS() {
  return storageHelper.getKey(STORAGE_KEYS.CUSTOM_CSS) || ''
}
