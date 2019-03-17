import { svg } from './renderer'
import { Series } from './series'
import { Axis } from './axis'

class Chart {
    constructor (parent, config) {
        this.parent = parent
        const xPoints = config.columns[0].slice(1)
        const xRange = { min: xPoints[0], max: xPoints[xPoints.length - 1] }
        const yRange = { min: Infinity, max: -Infinity }
        this.series = config.columns.slice(1).map(obj => {
            const key = obj[0]
            const yPoints = obj.slice(1)
            setRange(yPoints, yRange)
            return new Series(
                this,
                xPoints,
                yPoints,
                config.names[key],
                config.colors[key]
            )
        })
        this.xAxis = new Axis(this, 'x', xRange)
        this.yAxis = new Axis(this, 'y', yRange)

        this.box = {
            x: 0,
            y: 0,
            width: 600,
            height: 300
        }
    }

    render () {
        this.svg = svg({
            width: this.box.width,
            height: this.box.height
        })
        this.parent.appendChild(this.svg)

        const box = Object.assign(this.box)

        const xAxisEl = this.xAxis.render(box)
        box.height -= xAxisEl.getBBox().height

        this.series.map(s => s.render(box))
    }
}

function setRange (array, range) {
    for (let i = 0, l = array.length; i < l; i++) {
        const val = array[i]
        val < range.min && (range.min = val)
        val > range.max && (range.max = val)
    }
}

window.tgc = { Chart }
