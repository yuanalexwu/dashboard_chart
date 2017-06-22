import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
  PANEL_HEIGHT,
  PANEL_WIDTH,
  GRAPH_TITLE,
  BAR_SHOW,
  LINE_SHOW,
  LINE_WIDTH,
  LINE_FILL,
  POINT_SHOW,
  POINT_RADIUS,
  XAXIS_SHOW,
  AXIS_LABEL_COLOR,
  AXIS_TICK_COLOR,
  YAXIS_SHOW,
  parsePanelWidth,
  parseYaxisLabel,
  parseLineFill,
  parseMarkings,
} from './common'
const $ = window.$

class Graph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      placeholder: null,
      panel: {},
    }
  }

  componentWillReceiveProps (nextProps, nextState) {
    const {panel = {}} = nextProps
    this.setState({panel})
  }

  rerender = () => {
    const {data} = this.props
    const {placeholder, panel = {}} = this.state
    const {
      bars = {},
      lines = {},
      points = {},
      xaxis = {},
      yaxis = {},
      thresholds = [],
    } = panel
    const {show: showBars = BAR_SHOW} = bars
    let {
      show: showLines = LINE_SHOW,
      width: lineWidth = LINE_WIDTH,
      fill: lineFill = LINE_FILL,
    } = lines
    lineFill = parseLineFill(lineFill)

    let {
      show: pointShow = POINT_SHOW,
      radius: pointRadius = POINT_RADIUS
    } = points

    const {show: xaxisShow = XAXIS_SHOW} = xaxis

    const {
      show: yaxisShow = YAXIS_SHOW,
      prefix: yaxisLabelPrefix = '',
      postfix: yaxisLabelPostfix = '',
    } = yaxis

    const markings = parseMarkings(thresholds)

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
        markings
      },
      series: {
        lines: {
          show: showLines,
          lineWidth,
          fill: lineFill,
          // fillColor: 'rgba(255, 255, 0, 0.2)',
          steps: false,
        },
        points: {
          show: pointShow,
          radius: pointRadius,
          // fillColor: '#ff0',
          // symbol: function cross (ctx, x, y, radius, shadow) {
          //   const size = radius
          //   ctx.moveTo(x - size, y - size)
          //   ctx.lineTo(x + size, y + size)
          //   ctx.moveTo(x - size, y + size)
          //   ctx.lineTo(x + size, y - size)
          // },
        },
        bars: {
          show: showBars,
          lineWidth: 30,
          align: 'left',
          horizontal: false,
        }
      },
      // colors: ['rgba(255, 0, 0, 0.7)'], // series line color
      xaxes: [{
        show: xaxisShow,
        mode: 'time',
        timeformat: '%H:%M:%S',
        color: AXIS_LABEL_COLOR,
        // minTickSize: [10, 'second'],
        tickDecimals: 2,
        tickColor: AXIS_TICK_COLOR,
        // tickFormatter: function (val, axis) {
        //   return val.toFixed(axis.tickDecimals)
        // },
        autoscaleMargin: 0.02,
      }],
      yaxes: [{
        show: yaxisShow,
        color: AXIS_LABEL_COLOR,
        tickColor: AXIS_TICK_COLOR,
        tickFormatter: (val, axis) => {
          val = val.toFixed(axis.tickDecimals)
          return parseYaxisLabel(val, yaxisLabelPrefix, yaxisLabelPostfix)
        }
      }]
    }
    $.plot(placeholder, data, option)
  }

  componentDidMount () {
    if (!this.state.placeholder) {
      const placeholder = $(ReactDOM.findDOMNode(this.placeholder))
      // Save jquery element
      this.setState({placeholder})

      // Bind event for plotclick
      placeholder.bind('plotclick', function (event, pos, item) {
        console.log('plotclick() ', event, pos, item)
      })
      // Bind event for plothover
      placeholder.bind('plothover', function (event, pos, item) {
        console.log('plothover() ', event, pos, item)
      })
    }
  }

  componentDidUpdate () {
    this.rerender()
  }

  render () {
    const {panel} = this.state
    let {
      height: panelHeight = PANEL_HEIGHT,
      width: panelWidth = PANEL_WIDTH,
      title: graphTitle = GRAPH_TITLE,
    } = panel
    const graphStyle = {
      width: parsePanelWidth(panelWidth),
      height: panelHeight + 'px'
    }
    return (
      <div
        ref={panel => {
          this.panel = panel
        }}
        style={{width: '100%'}}
        className='graph-wrapper'
      >
        <div className='graph-title'>{graphTitle}</div>
        <div style={graphStyle} ref={placeholder => {
          this.placeholder = placeholder
        }} />
      </div>
    )
  }
}

export default Graph
