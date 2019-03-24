import { Series } from './series'
import { AxisX } from './axes/xAxis'
import { AxisY } from './axes/yAxis'
import { padBox, throttle } from './utils'

const defaults = {
    padding: 5
}

export class Chart {
    constructor (renderer, config, mode) {
        const xPoints = config.columns[0].slice(1)
        const xRange = { min: xPoints[0], max: xPoints[xPoints.length - 1] }
        this.renderer = renderer
        this.series = config.columns.slice(1).map(obj => {
            const key = obj[0]
            const yPoints = obj.slice(1)
            return new Series(
                this,
                xPoints,
                yPoints,
                {
                    name: config.names[key],
                    color: config.colors[key],
                    strokeWidth: config.strokeWidth
                }
            )
        })
        this.mode = mode || 'day'
        this.xAxis = new AxisX(this, 'x', xRange, config.xAxisHidden)
        this.yAxis = new AxisY(this, 'y', this.getYRange(), config.yAxisHidden)

        this.setRangeY = throttle(() => {
            const yRangeVal = this.getYRange()
            const yRange = {
                min: this.yAxis.valToPosInitial(yRangeVal.min),
                max: this.yAxis.valToPosInitial(yRangeVal.max)
            }
            this.series.map(ser => {
                ser.scalePathY(yRange)
            })
            this.yAxis.setRange(yRange)
        }, 300)
    }

    getYRange () {
        const yRangeVal = { min: Infinity, max: -Infinity }

        this.series.map((ser, i) => {
            if (ser.visible || i === this.series.length - 1) {
                const yRangeSer = ser.getYRange(this.xAxis.range)
                yRangeVal.min > yRangeSer.min && (yRangeVal.min = yRangeSer.min)
                yRangeVal.max < yRangeSer.max && (yRangeVal.max = yRangeSer.max)
            }
        })

        return {
            min: 0,
            max: yRangeVal.max
        }
    }

    render (box) {
        const chartBox = padBox(box, defaults.padding)

        this.yAxis.render(chartBox)
        const xAxisEl = this.xAxis.render(chartBox)
        xAxisEl && (chartBox.height -= xAxisEl.getBBox().height)

        this.series.map(s => s.render(chartBox))
    }

    setRange (xRange) {
        this.series.map(ser => {
            ser.scalePathX(xRange)
        })
        this.setRangeY()
        this.xAxis.setRange(xRange)
    }
}
