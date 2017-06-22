import moment from 'moment'

export function generateData ({size = 0, min = 0, max = 1}) {
  const data = []
  size = parseInt(size)
  min = parseInt(min)
  max = parseInt(max)
  if (isNaN(size) || size <= 0) {
    return []
  }
  if (isNaN(min) || isNaN(max)) {
    return []
  }
  if (min >= max) {
    return []
  }
  for (let i = 0; i < size; i++) {
    data.push(generateRandom(min, max))
  }
  const res = generateDataWithDate({data})
  return [res]
}

export function generateSingleData (min = 0, max = 1) {
  const now = moment()
  const value = generateRandom(min, max)
  return [now.unix() * 1000, value]
}

function generateRandom (min = 0, max = 1) {
  const {random: mathRandom, floor: mathFloor} = Math
  const randomNum = mathRandom()
  if (min === 0 && max === 1) {
    return randomNum
  }
  const gap = max - min
  return mathFloor(gap * randomNum + 1) + min
}

function generateDataWithDate ({data = [], step = 5, unit = 'second'}) {
  const length = data.length
  if (length <= 0) {
    return []
  }
  const res = []
  const now = moment()
  for (let i = 0; i < length; i++) {
    const timestamp = now.add(-5, unit).clone().unix() * 1000
    const value = Math.random()
    res.unshift([timestamp, value])
  }
  return res
}
