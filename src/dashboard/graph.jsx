import React, {Component} from 'react'
import Graph from '../panel/graph'
import {generateData, generateSingleData} from '../util'

class ConfigGraph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: generateData({size: 20}),
      panel: {
        height: 300,
        width: '100%',
        title: '数据测试',
        bars: {
          show: false
        },
        lines: {
          show: true,
          width: 2,
          fill: 2
        },
        points: {
          show: true,
          radius: 5,
        },
        xaxis: {
          show: true
        },
        yaxis: {
          show: true,
          prefix: '',
          postfix: ' percent',
        },
        thresholds: [
          {gt: 0.5, to: 0.9, color: 'warn', fill: true, line: true},
          {gt: 0.9, color: 'critical', fill: true, line: true},
        ],
      }
    }
  }

  populateNewData = () => {
    const {data = []} = this.state
    const [dataList] = data
    dataList.shift()
    dataList.push(generateSingleData())
    this.setState({
      data: [dataList]
    })
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
        <Graph
          panel={panel}
          data={data}
        />
      </div>
    )
  }
}

export default ConfigGraph
