import React, {Component} from 'react'
import './title.css'

class Title extends Component {
  parseTitle = () => {
    let {value = 0, prefix = '', postfix = '', decimals = 0} = this.props
    value = parseInt(value)
    if (isNaN(value)) {
      value = 0
    }
    decimals = parseInt(decimals)
    if (decimals) {
      value = value.toFixed(decimals)
    }
    if (prefix) {
      value = `${prefix}${value}`
    }
    if (postfix) {
      value = `${value}${postfix}`
    }
    return value
  }

  render () {
    const title = this.parseTitle()
    return (
      <div className='singlestat-value'>{title}</div>
    )
  }
}

export default Title
