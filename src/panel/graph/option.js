const option = {
  grid: {
    backgroundColor: null,
    color: null,
    margin: 0,
    labelMargin: 10,
    borderColor: 'white',
    borderWidth: 0, // 指定边框宽度color或者borderColor不能为null
    clickable: true,
    hoverable: false,
    autoHighlight: true,
    mouseActiveRadius: 10, // 鼠标触发事件的半径范围
    markings: [
      {yaxis: {from: 0.5}, color: 'rgba(48,135,86, 0.4)'}, // ok
      {yaxis: {from: 0.5, to: 0.5}, color: 'rgba(48,135,86, 1)'}, // ok
      {yaxis: {from: 0.8}, color: 'rgba(247,149,32, 0.4)'}, // warn
      {yaxis: {from: 0.8, to: 0.8}, color: 'rgba(247,149,32, 1)'}, // warn
      {yaxis: {from: 0.9}, color: 'rgba(237,46,24, 0.4)'}, // critical
      {yaxis: {from: 0.9, to: 0.9}, color: 'rgba(237,46,24, 1)'}, // critical
    ]
  },
  series: {
    lines: {
      show: true,
      lineWidth: 1,
      fill: true,
      fillColor: 'rgba(255, 255, 0, 0.2)',
      steps: false,
    },
    points: {
      show: false,
      fillColor: '#ff0',
      // symbol: function cross (ctx, x, y, radius, shadow) {
      //   const size = radius
      //   ctx.moveTo(x - size, y - size)
      //   ctx.lineTo(x + size, y + size)
      //   ctx.moveTo(x - size, y + size)
      //   ctx.lineTo(x + size, y - size)
      // },
    },
    bars: {
      show: true,
      lineWidth: 30,
      align: 'left',
      horizontal: false,
    }
  },
  colors: ['rgba(255, 0, 0, 0.7)'], // series line color
  xaxes: [{
    show: true,
    mode: 'time',
    timeformat: '%H:%M:%S',
    color: 'red',
    minTickSize: [10, 'second'],
    tickDecimals: 2,
    tickColor: 'green',
    // tickFormatter: function (val, axis) {
    //   return val.toFixed(axis.tickDecimals)
    // },
    autoscaleMargin: 0.02,
  }],
  yaxes: [{
    color: '#D8D9DA',
    tickColor: 'gray',
  }]
}

export default option
