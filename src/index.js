import { svg } from './renderer'
import { Series } from './series'
import { Axis } from './axis'

class Chart {
    constructor (parent, config) {
        this.parent = parent
        const xPoints = config.columns[0].slice(1)
        const xRange = [xPoints[0], xPoints[xPoints.length - 1]]
        const yRange = [Infinity, -Infinity]
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
        this.xAxis = new Axis('time', xRange)
        this.yAxis = new Axis('number', yRange)

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
        this.series.map(s => s.render(this.box))
    }
}

function setRange (array, range) {
    for (let i = 0, l = array.length; i < l; i++) {
        const val = array[i]
        val < range[0] && (range[0] = val)
        val > range[1] && (range[1] = val)
    }
}

window.tgc = { Chart }
