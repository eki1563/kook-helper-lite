let CSSOM: CSSStyleSheet

export function initCSSOM() {
  const CSSNode = document.createElement('style')
  CSSNode.setAttribute('title', `kook-helper-lite`)
  document.head.appendChild(CSSNode)
  const res = Object.values(document.styleSheets).filter(s => s.title === `kook-helper-lite`)
  if (res.length) {
    CSSOM = res[0]
  }
}

export function getCSSOM() {
  if (!CSSOM) {
    initCSSOM()
  }
  return CSSOM
}

export function removeRules(selector: string) {
  let index: number[] = []
  for (let i = 0; i < CSSOM.cssRules.length; i++) {
    // @ts-ignore
    if (CSSOM.cssRules[i].cssText.startsWith(selector)) {
      index.push(i)
    }
  }
  index = index.sort((a, b) => b - a)
  index.forEach((i) => {
    CSSOM.deleteRule(i)
  })
}

export function versionCompare(a: string, b: string): string {
  const aVersionArray = a.replace(/^app-/, '').split('.')
  const bVersionArray = b.replace(/^app-/, '').split('.')
  for (let i = 0; i < Math.max(aVersionArray.length, bVersionArray.length); i++) {
    if (+aVersionArray[i] === +bVersionArray[i]) {
      if (i === Math.max(aVersionArray.length, bVersionArray.length) - 1) {
        return a
      }
      continue
    }
    if (+aVersionArray[i] > +bVersionArray[i]) {
      return a
    } else {
      return b
    }
  }
  return ''
}

export function hasNewFeature(newVersion: string, previousVersion: string) {
  const aVersionArray = newVersion.split('.')
  const bVersionArray = previousVersion.split('.')
  for (let i = 0; i < 2; i++) {
    if (+aVersionArray[i] === +bVersionArray[i]) {
      if (i === 1) {
        return false
      }
      continue
    }
    return +aVersionArray[i] > +bVersionArray[i]
  }
  return false
}
