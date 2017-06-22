export const PANEL_HEIGHT = 300
export const PANEL_WIDTH = '100%'
export const SINGLESTAT_TITLE = 'SingleStat Title'
export const COLOR_THRESHOLDS = '50,80'
// Here we specify three color for thresholders
// and must be three
export const COLOR_COLORS = '#01aa32,#df762b,#eb3035'
export const GAUGE_MIN = 0
export const GAUGE_MAX = 100
export const GAUGE_WIDTH = 50

export function parseValue (data = []) {
  const [list = []] = data
  const [elem = []] = list
  // eslint-disable-next-line
  const [_ = '', value = ''] = elem
  return value
}

export function parseGaugeWrapperStyle (showGauge, height = PANEL_HEIGHT) {
  let width = '100%'
  height = `${height}px`
  if (showGauge) {
    width = height
  }
  return {
    width,
    height,
    display: 'inline-block',
    color: '#fff',
    textAlign: 'center',
  }
}

export function generateThresholdValues (thresholds = COLOR_THRESHOLDS,
                                         colors = COLOR_COLORS,
                                         splitDelim = ',') {
  thresholds = thresholds.split(splitDelim)
  if (thresholds.length <= 0) {
    return []
  }

  let isThresholdValid = true
  thresholds = thresholds.map(threshold => {
    threshold = Number.parseFloat(threshold)
    if (isNaN(threshold)) {
      isThresholdValid = false
    }
    return threshold
  })
  if (!isThresholdValid) {
    return []
  }

  colors = colors.split(splitDelim)
  const colorMaxIndex = colors.length - 1
  return thresholds.map((value, i) => {
    const color = i > colorMaxIndex ? colors[colorMaxIndex] : colors[i]
    return {value, color}
  })
}
