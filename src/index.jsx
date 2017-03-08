import React from 'react'
import ReactDOM from 'react-dom'
import {styles} from './styles.scss'

const SELECTORS = {
    SLIDER_WRAP: '.slider-wrap',
    SLIDER: '.slider'
}

const DEFAULT_RANGE = [{
    value: 0,
    enabled: true
}, {
    value: 1,
    enabled: true
}]

export class ReactSlider extends React.Component {

    constructor(props) {
        super(props)

        this.dragStarted = false
        this.lastTouch = null
        
        this.stick = props.stickToRange === undefined ? true : props.stickToRange
        this.range = (props.range || DEFAULT_RANGE).sort((a, b) => a.value - b.value)
        this.state = {
            value: 0,
            left: '0px'
        }
    }

    componentDidMount() {
        this.areaWidth = this.wrapperWidth/(this.range.length - 1)
    }

    get wrapperWidth() {
        return this.sliderWrapper.getBoundingClientRect().width
    }

    get sliderWidth() {
        return this.slider.getBoundingClientRect().width
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
            if (this.stick) {
                this.setXPos(this.getXCoord(event))
            }
            this.dragStarted = false
        }
    }

    getXCoord(event) {
        this.lastTouch = event.touches && event.touches[0] || this.lastTouch
        return (event.touches ? this.lastTouch.clientX : event.clientX) - this.sliderWrapper.getBoundingClientRect().left
    }

    handleClick(event) {
        if (this.stick) {
            this.setXPos(this.getXCoord(event))
        } else {
            this.setXPosDynamic(this.getXCoord(event))
        }
    }

    handleRangeItemClick(event, value, idx) {
        event.stopPropagation()
        
        const target = idx * this.areaWidth
        const offset = this.calculateOffset(target, this.sliderWidth, this.wrapperWidth)
        
        this.setState({
            value,
            left: `${target - offset}px`
        })
    }

    setXPos(pos) {
        const areaIndex = parseInt(pos/this.areaWidth)
        const midPoint = this.areaWidth*(0.5 + areaIndex)
        const target = pos < midPoint ? areaIndex*this.areaWidth : (areaIndex + 1) * this.areaWidth
        const offset = this.calculateOffset(target, this.sliderWidth, this.wrapperWidth)
        
        this.setState({
            value: this.range[target/this.areaWidth].value,
            left: `${target - offset}px`
        })
    }

    setXPosDynamic(pos) {
        const possibleTarget = pos - this.sliderWidth/2
        const rangeMax = this.range[this.range.length - 1].value
        const rangeMin = this.range[0].value
        let target = 0
        
        if (possibleTarget > this.wrapperWidth - this.sliderWidth) {
            target = this.wrapperWidth - this.sliderWidth
        } else if (possibleTarget > 0) {
            target = pos - this.sliderWidth/2
        }

        this.setState({
            value: +((pos/this.wrapperWidth*(rangeMax - rangeMin) + rangeMin).toFixed(2)),
            left: `${target}px`
        })
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

    renderRange() {
        return (
            <div className="slider-range">
                {this.range.map((item, idx) => {
                    const mod = item.enabled ? 'enabled' : 'disabled'
                    return (
                        <span key={idx}
                            className={`slider-range__elements slider-range__elements-${mod}`}
                            onClick={(e) => this.handleRangeItemClick(e, item.value, idx)}>
                            {item.value}
                        </span>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                <h3>{this.state.value}</h3>
                <div className="slider-wrap"
                    onClick={(e) => this.handleClick(e)}
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
            </div>
            
        )
    }
}