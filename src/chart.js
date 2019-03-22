import { Series } from './series'
import { AxisX } from './axes/xAxis'
import { AxisY } from './axes/yAxis'
import { padBox } from './utils'

const defaults = {
    padding: 5
}

export class Chart {
    constructor (renderer, config) {
        const xPoints = config.columns[0].slice(1)
        const xRange = { min: xPoints[0], max: xPoints[xPoints.length - 1] }
        const yRange = { min: Infinity, max: -Infinity }
        this.renderer = renderer
        this.series = config.columns.slice(1).map(obj => {
            const key = obj[0]
            const yPoints = obj.slice(1)
            fullRange(yPoints, yRange)
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
        this.xAxis = new AxisX(this, 'x', xRange, config.xAxisHidden)
        this.yAxis = new AxisY(this, 'y', yRange, config.yAxisHidden)
    }

    render (box) {
        const chartBox = padBox(box, defaults.padding)

        // rendering y axis
        this.yAxis.render(chartBox)

        // rendering x axis
        const xAxisEl = this.xAxis.render(chartBox)
        xAxisEl && (chartBox.height -= xAxisEl.getBBox().height)

        // rendering series
        this.series.map(s => s.render(chartBox))
    }

    setRange (range) {
        this.series.map(ser => {
            ser.scalePath(range)
        })
    }
}

function fullRange (array, range) {
    for (let i = 0, l = array.length; i < l; i++) {
        const val = array[i]
        val < range.min && (range.min = val)
        val > range.max && (range.max = val)
    }
}
