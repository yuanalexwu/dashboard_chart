export const PANEL_HEIGHT = 300
export const PANEL_WIDTH = '100%'
export const GRAPH_TITLE = 'Graph Title'

export const BAR_SHOW = false

export const LINE_SHOW = false
export const LINE_WIDTH = 1
export const LINE_FILL = 0.4

export const POINT_SHOW = false
export const POINT_RADIUS = 5

export const AXIS_LABEL_COLOR = '#D8D9DA'
export const AXIS_TICK_COLOR = 'gray'
export const XAXIS_SHOW = true
export const YAXIS_SHOW = true

const PANEL_WIDTH_PERCENT_REG = /^\d{1,3}%/
const PANEL_WIDTH_PIXEL_REG = /^\d+/

export const COLOR_OK_FILL = 'rgba(48,135,86, 0.4)'
export const COLOR_OK_LINE = 'rgba(48,135,86, 1)'
export const COLOR_WARN_FILL = 'rgba(247,149,32, 0.4)'
export const COLOR_WARN_LINE = 'rgba(247,149,32, 1)'
export const COLOR_CRITICAL_FILL = 'rgba(237,46,24, 0.4)'
export const COLOR_CRITICAL_LINE = 'rgba(237,46,24, 1)'

export function parsePanelWidth (width = PANEL_WIDTH) {
  if (PANEL_WIDTH_PERCENT_REG.test(width)) {
    return width
  } else if (PANEL_WIDTH_PIXEL_REG.test(width)) {
    return width + 'px'
  }
  return PANEL_WIDTH
}

export function parseLineFill (fill = LINE_FILL) {
  fill = parseInt(fill)
  if (isNaN(fill)) {
    return LINE_FILL
  }
  if (fill < 0 || fill > 10) {
    return LINE_FILL
  }
  return fill / 10
}

export function parseYaxisLabel (label = '', prefix = '', postfix = '') {
  return `${prefix}${label}${postfix}`
}

/**
 thresholds: [
 {gt: 0.2, lt: 0.5, color: 'ok', fill: true, line: true},
 {gt: 0.5, color: 'warn', fill: true, line: true},
 {gt: 0.9, color: 'critical', fill: true, line: true},
 ],
 */
export function parseMarkings (thresholds = []) {
  let res = []
  thresholds.map(threshold => {
    const {
      gt,
      lt,
      color,
      line = false,
      fill = false,
    } = threshold
    if (line) {
      const markings = parseThresholdLine(gt, lt, getLineColor(color))
      res = res.concat(markings)
    }
    if (fill) {
      const markings = parseThresholdFillRange(gt, lt, getFillColor(color))
      res = res.concat(markings)
    }
  })
  return res
}

function parseThresholdLine (gt, lt, color) {
  const res = []
  if (gt || gt === 0) {
    const yaxis = {}
    yaxis.from = gt
    yaxis.to = gt
    res.push({yaxis, color})
  }
  if (lt || lt === 0) {
    const yaxis = {}
    yaxis.from = lt
    yaxis.to = lt
    res.push({yaxis, color})
  }
  return res
}

function parseThresholdFillRange (gt, lt, color) {
  const yaxis = {}
  if (gt || gt === 0) {
    yaxis.from = gt
  }
  if (lt || lt === 0) {
    yaxis.to = lt
  }
  return [{yaxis, color}]
}

function getLineColor (color) {
  let rgba = COLOR_OK_LINE
  switch (color) {
    case 'ok': {
      rgba = COLOR_OK_LINE
      break
    }
    case 'warn': {
      rgba = COLOR_WARN_LINE
      break
    }
    case 'critical': {
      rgba = COLOR_CRITICAL_LINE
      break
    }
    default: {
    }
  }
  return rgba
}

function getFillColor (color) {
  let rgba = COLOR_OK_FILL
  switch (color) {
    case 'ok': {
      rgba = COLOR_OK_FILL
      break
    }
    case 'warn': {
      rgba = COLOR_WARN_FILL
      break
    }
    case 'critical': {
      rgba = COLOR_CRITICAL_FILL
      break
    }
    default: {
    }
  }
  return rgba
}
