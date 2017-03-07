import React from 'react'
import ReactDOM from 'react-dom'

import {ReactSlider} from './src'

ReactDOM.render(
  <ReactSlider range={[
    {
      value: 1,
      enabled: true
    },
    {
      value: 2,
      enabled: true
    },
    {
      value: 3,
      enabled: false
    },
    {
      value: 4,
      enabled: true
    }
  ]}/>,
  document.getElementById('root')
)