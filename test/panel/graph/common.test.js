import {
  parseMarkings,
  COLOR_WARN_LINE,
  COLOR_WARN_FILL,
  COLOR_OK_LINE,
  COLOR_OK_FILL,
  COLOR_CRITICAL_LINE,
} from '../../../src/panel/graph/common'

describe('Panel graph common', () => {
  it('Parse thresholds to markings 1', () => {
    const thresholds = [
      {gt: 0.5, color: 'warn', fill: true, line: true},
    ]
    const res = parseMarkings(thresholds)
    const data = [
      {yaxis: {from: 0.5, to: 0.5}, color: COLOR_WARN_LINE},
      {yaxis: {from: 0.5}, color: COLOR_WARN_FILL},
    ]
    expect(res.length).toBe(data.length)
    res.map((a, idx) => {
      const b = data[idx]
      expect(a).toMatchObject(b)
    })
  })

  it('Parse thresholds to markings 2', () => {
    const thresholds = [
      {gt: 0.2, lt: 0.5, color: 'ok', fill: true, line: true},
    ]
    const res = parseMarkings(thresholds)
    const data = [
      {yaxis: {from: 0.2, to: 0.2}, color: COLOR_OK_LINE},
      {yaxis: {from: 0.5, to: 0.5}, color: COLOR_OK_LINE},
      {yaxis: {from: 0.2, to: 0.5}, color: COLOR_OK_FILL},
    ]
    expect(res.length).toBe(data.length)
    res.map((a, idx) => {
      const b = data[idx]
      expect(a).toMatchObject(b)
    })
  })

  it('Parse thresholds to markings 3', () => {
    const thresholds = [
      {gt: 0.9, color: 'critical', fill: false, line: true},
    ]
    const res = parseMarkings(thresholds)
    const data = [
      {yaxis: {from: 0.9, to: 0.9}, color: COLOR_CRITICAL_LINE},
    ]
    expect(res.length).toBe(data.length)
    res.map((a, idx) => {
      const b = data[idx]
      expect(a).toMatchObject(b)
    })
  })

  it('Parse thresholds to markings 4', () => {
    const thresholds = [
      {lt: 0.5, color: 'ok', fill: false, line: true},
    ]
    const res = parseMarkings(thresholds)
    const data = [
      {yaxis: {from: 0.5, to: 0.5}, color: COLOR_OK_LINE},
    ]
    expect(res.length).toBe(data.length)
    res.map((a, idx) => {
      const b = data[idx]
      expect(a).toMatchObject(b)
    })
  })
})
