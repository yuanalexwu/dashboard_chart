import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
  PANEL_HEIGHT,
  PANEL_WIDTH,
  SINGLESTAT_TITLE,
  COLOR_THRESHOLDS,
  COLOR_COLORS,
  GAUGE_MAX,
  GAUGE_MIN,
  GAUGE_WIDTH,
  parseValue,
  parseGaugeWrapperStyle,
  generateThresholdValues,
} from './common'
import Title from './title'
const $ = window.$

class SingleStat extends Component {
  constructor (props) {
    super(props)
    const {panel = {}} = this.props
    this.state = {
      placeholder: null,
      data: [],
      panel
    }
  }

  rerender = () => {
    const {panel = {}} = this.props
    const {
      showGauge = false,
    } = panel
    if (showGauge) {
      this.renderGauge()
    }
  }

  /**
   * render as gauge
   */
  renderGauge = () => {
    const {placeholder, data, panel = {}} = this.state
    const {
      color = {},
      gauge = {},
    } = panel
    const {
      thresholds = COLOR_THRESHOLDS,
      colors = COLOR_COLORS,
    } = color
    const {
      min: gaugeMin = GAUGE_MIN,
      max: gaugeMax = GAUGE_MAX,
      width: gaugeWidth = GAUGE_WIDTH,
      showThresholdMarker = false,
      showThresholdLabel = false,
    } = gauge
    const thresholdValues = generateThresholdValues(thresholds, colors)

    const option = {
      series: {
        gauges: {
          show: true,
          label: {
            show: false,
            margin: null,
            color: null,
          },
          threshold: {
            show: showThresholdMarker,
            width: 5,
            label: {
              show: showThresholdLabel,
              margin: 0,
              background: {
                color: null,
                opacity: 0,
              },
              font: {
                size: 16
              },
              color: '',
            },
            values: thresholdValues,
          },
          gauge: {
            width: gaugeWidth,
            min: gaugeMin,
            max: gaugeMax,
            border: {
              width: 0,
              color: null
            },
            background: {
              color: '#262626',
            },
          },
          value: {
            show: false,
          },
          frame: {show: false},
          cell: {
            background: {
              color: '',
            },
            border: {
              show: true,
              color: 'red',
              width: 0,
            }
          },
        }
      }
    }
    $.plot(placeholder, data, option)
  }

  componentDidMount () {
    if (!this.state.placeholder) {
      this.setState({
        placeholder: $(ReactDOM.findDOMNode(this.placeholder))
      })
    }
  }

  componentDidUpdate () {
    this.rerender()
  }

  componentWillReceiveProps (nextProps, nextState) {
    const {panel = {}, data = []} = nextProps
    this.setState({panel, data})
  }

  render () {
    const {panel = {}} = this.state
    const {
      height: panelHeight = PANEL_HEIGHT,
      width: panelWidth = PANEL_WIDTH,
      title = SINGLESTAT_TITLE,
      showGauge = false,
      value = {},
    } = panel
    const {
      prefix = '',
      postfix = '',
      decimals = 0,
    } = value

    const panelStyle = {width: panelWidth}
    const gaugeWrapperStyle = parseGaugeWrapperStyle(showGauge, panelHeight)
    const data = parseValue(this.state.data)

    return (
      <div
        ref={panel => { this.panel = panel }}
        style={panelStyle}
        className='singlestat-wrapper'
      >
        <div className='signlestat-title'>{title}</div>
        <Title
          value={data}
          prefix={prefix}
          postfix={postfix}
          decimals={decimals}
        />
        <div style={gaugeWrapperStyle} ref={placeholder => {
          this.placeholder = placeholder
        }} />
      </div>
    )
  }
}

export default SingleStat
