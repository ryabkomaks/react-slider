import React from 'react'
import ReactDOM from 'react-dom'
import {styles} from './styles.scss'

const SELECTORS = {
    SLIDER_WRAP: '.slider-wrap',
    SLIDER: '.slider'
}

export class ReactSlider extends React.Component {

    constructor(props) {
        super(props)

        this.dragStarted = false
        this.lastTouch = null
        
        this.range = props.range || []
        this.state = { left: '0px' }
    }

    startDrag(event) {
        this.dragStarted = true
    }

    drag(event) {
        if (this.dragStarted) {
            this.setXPosDynamic(this.getXCoord(event))
        }
    }

    stopDrag(event) {
        if (this.dragStarted) {
            this.setXPos(this.getXCoord(event))
            this.dragStarted = false
        }
    }

    getXCoord(event) {
        this.lastTouch = event.touches && event.touches[0] || this.lastTouch
        return event.touches ? this.lastTouch.clientX : event.clientX
    }

    setXPos(pos) {
        const wrapWidth = this.sliderWrapper.offsetWidth        
        const areasCount = this.range.length - 1
        const areaWidth = wrapWidth/areasCount
        const areaIndex = parseInt(pos/areaWidth)        
        const midPoint = areaWidth*(0.5 + areaIndex)
        const target = pos < midPoint ? areaIndex*areaWidth : (areaIndex + 1) * areaWidth

        let offset = this.calculateOffset(target, this.slider.offsetWidth, wrapWidth)
        
        this.setState({left: `${target - offset}px`})
    }

    calculateOffset(targetPoint, sliderWidth, endPoint, startPoint = 0) {      
        let offset = 0
        
        if (targetPoint === startPoint) {
            offset = startPoint
        } else if (targetPoint === endPoint) {
            offset = sliderWidth
        } else {
            offset = sliderWidth/2
        }

        return offset
    }

    setXPosDynamic(pos) {
        const wrapWidth = this.sliderWrapper.offsetWidth      
        const possibleTarget = pos - this.slider.offsetWidth/2
        let target = 0
        
        if (possibleTarget > wrapWidth - this.slider.offsetWidth) {
            target = wrapWidth - this.slider.offsetWidth
        } else if (possibleTarget > 0) {
            target = pos - this.slider.offsetWidth/2
        }
        this.setState({left: `${target}px`})
    }

    renderRange() {
        return (
            <div className="slider-range">
                {this.range.map((item, idx) => {
                    const mod = item.enabled ? 'enabled' : 'disabled'
                    return (
                        <span className={`slider-range__elements slider-range__elements-${mod}`} key={idx}>
                            {item.value}
                        </span>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div className="slider-wrap"
                onClick={(e) => this.setXPos(e.clientX)}
                onMouseMove={(e) => this.drag(e)}
                onTouchMove={(e) => this.drag(e)}
                onMouseUp={(e) => this.stopDrag(e)}
                onTouchEnd={(e) => this.stopDrag(e)}
                ref={(sliderWrapper) => { this.sliderWrapper = sliderWrapper }}>
                <div className="slider"
                    style = { { left: this.state.left } }
                    onMouseDown={(e) => this.startDrag(e)}
                    onTouchStart={(e) => this.startDrag(e)}
                    ref={(slider) => { this.slider = slider }}>
                    <div className="slider__element"></div>
                </div>
                {this.renderRange()}
            </div>
        )
    }
}