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
        this.range = props.range || []
    }

    startDrag(event) {
        this.dragStarted = true
    }

    drag(event) {
        if (this.dragStarted) {
            this.setXPosDynamic(event.clientX)
        }
    }

    stopDrag(event) {
        if (this.dragStarted) {
            this.setXPos(event.clientX)
            this.dragStarted = false
        }
    }

    setXPos(pos) {
        const wrapWidth = this.sliderWrapper.offsetWidth        
        const areasCount = this.range.length - 1
        const areaWidth = wrapWidth/areasCount
        const areaIndex = parseInt(pos/areaWidth)        
        const midPoint = areaWidth*(0.5 + areaIndex)
        const target = pos < midPoint ? areaIndex*areaWidth : (areaIndex + 1) * areaWidth

        let offset = this.calculateOffset(target, this.slider.offsetWidth, wrapWidth)
        
        this.slider.style.left = `${target - offset}px`;
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
        this.slider.style.left = `${pos - this.slider.offsetWidth/2}px`;
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