import React, {Component} from 'react'
import './App.css'
import ConfigGraph from './dashboard/graph'
import ConfigSingleStat from './dashboard/singlestat'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <ConfigGraph />
        <ConfigSingleStat />
      </div>
    )
  }
}

export default App
