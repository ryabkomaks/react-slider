import React from 'react'
import ReactDOM from 'react-dom'

import {ReactSlider} from './src'

ReactDOM.render(
  <ReactSlider range={[
    {
      value: 0,
      enabled: true
    },
    {
      value: 1,
      enabled: true
    },
    {
      value: 2,
      enabled: false
    }
  ]}/>,
  document.getElementById('demo_0')
)

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
  document.getElementById('demo_1')
)

ReactDOM.render(
  <ReactSlider range={[
    {
      value: 2,
      enabled: false
    },
    {
      value: 3,
      enabled: false
    },
    {
      value: 4,
      enabled: true
    },
    {
      value: 5,
      enabled: false
    },
    {
      value: 6,
      enabled: true
    }
  ]}/>,
  document.getElementById('demo_2')
)

ReactDOM.render(
  <ReactSlider range={[
    {
      value: 1,
      enabled: true
    },
    {
      value: 100,
      enabled: true
    }
  ]}/>,
  document.getElementById('demo_3')
)

ReactDOM.render(
  <ReactSlider stickToRange={false}/>,
  document.getElementById('demo_4')
)