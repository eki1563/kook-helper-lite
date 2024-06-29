// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  window._useConsole && window._useConsole()
}

import { createApp } from 'vue'
import App from './App.vue'
import STORAGE_KEYS from '@/config/STORAGE_KEYS'
import initialConfig from '@/composables/initialConfig'

const app = createApp(App)

const config = localStorage.getItem(STORAGE_KEYS.KOOK_HELPER_LITE_CONFIG)
if (!config) {
  localStorage.setItem(STORAGE_KEYS.KOOK_HELPER_LITE_CONFIG, '{}')
}
let times = 0
let interval = setInterval(() => {
  const KOOKHeader = document.querySelector('div.win-wapper > div.win-title-bar > div.win-title-inner .win-title-bar-icon-group')
  if (KOOKHeader) {
    clearInterval(interval)
    const rootContainer = document.createElement('div')
    rootContainer.classList.add('kook-kit', 'win-title-bar-icon', 'animate-button')
    KOOKHeader.insertBefore(rootContainer, KOOKHeader.firstChild)
    setTimeout(() => {
      app.mount(rootContainer)
      initialConfig()
    })
  } else {
    if (times >= 5) {
      clearInterval(interval)
    }
    times += 1
  }
}, 2000)

// const kookKit = document.createElement('script')
// kookKit.type = 'module'
// kookKit.src = 'http://localhost:5173/src/main.ts'
//
// document.body.appendChild(kookKit)
