import STORAGE_KEYS from '@/config/STORAGE_KEYS'

export default {
  setKey(key: string, value: string) {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.KOOK_HELPER_LITE_CONFIG)!)
      const res = {
        ...current,
        [key]: value,
      }
      localStorage.setItem(STORAGE_KEYS.KOOK_HELPER_LITE_CONFIG, JSON.stringify(res))
    } catch (e) {
      console.error(e)
      throw new Error('保存配置失败')
    }
  },
  removeKey(key: string) {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.KOOK_HELPER_LITE_CONFIG)!)
      delete current[key]
      localStorage.setItem(STORAGE_KEYS.KOOK_HELPER_LITE_CONFIG, JSON.stringify(current))
    } catch (e) {
      console.error(e)
      throw new Error('保存配置失败')
    }
  },
  getKey(key: string) {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.KOOK_HELPER_LITE_CONFIG)!)
      return current[key]
    } catch (e) {
      console.error(e)
      throw new Error('读取配置失败')
    }
  },
}
