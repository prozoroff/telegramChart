
export const defaults = {
    padding: 5,
    lineColor: 'lightgray',
    tickLabelColor: 'gray'
}

export class Axis {
    constructor (chart, type, range, isHidden) {
        this.chart = chart
        this.type = type
        this.range = range
        this.isHidden = isHidden
        this.ticks = []
        this.ticksLines = []
        this.init()
    }

    init () {}

    valToPos (val) {
        const range = this.range
        return (val - range.min) / (range.max - range.min)
    }

    posToVal (pos) {
        const range = this.range
        return pos * (range.max - range.min) + range.min
    }

    render (box) {
        return this.renderTicks(box)
    }

    getGroup () {
        return this.chart.renderer.g({
            fill: defaults.tickLabelColor
        })
    }

    tickMetrics (pos) {
        const firstTick = this.chart.renderer.text(
            this.valToText(this.posToVal(pos)),
            {
                x: 0,
                y: 0
            }
        )
        const bbox = firstTick.getBBox()
        firstTick.parentNode.removeChild(firstTick)
        return {
            ascent: -bbox.y,
            descent: bbox.height + bbox.y,
            height: bbox.height,
            width: bbox.width
        }
    }
}
