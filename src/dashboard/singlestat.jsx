import React, {Component} from 'react'
import SingleStat from '../panel/singlestat'
import {generateSingleData} from '../util'

class ConfigSingleStat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      panel: {
        title: '测试速度',
        showGauge: true,
        height: 300,
        value: {
          prefix: 'Speed: ',
          postfix: ' km/h',
          decimals: 2,
        },
        gauge: {
          width: 30,
          min: 0,
          max: 100,
          showThresholdLabel: true,
          showThresholdMarker: false,
        },
        color: {
          // There must be 2 elements in thresholds
          thresholds: '70,70',
          colors: '#01aa32,#df762b,#eb303'
        }
      }
    }
  }

  populateNewData = () => {
    const data = this.parseRawData()
    this.setState({data})
  }

  parseRawData = () => {
    const data = [generateSingleData(0, 100)]
    return [data]
  }

  componentDidMount () {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.populateNewData()
      }, 5000)
    }
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  render () {
    const {panel, data} = this.state
    return (
      <div className='App'>
        <SingleStat
          panel={panel}
          data={data}
        />
      </div>
    )
  }
}

export default ConfigSingleStat
