
export const defaults = {
    padding: 5,
    lineColor: 'lightgray',
    tickLabelColor: 'gray'
}

export class Axis {
    constructor (chart, type, range, isHidden) {
        this.chart = chart
        this.type = type
        this.initialRange = range
        this.range = range
        this.isHidden = isHidden
        this.ticksLines = []
    }

    valToPos (val) {
        const range = this.range
        return (val - range.min) / (range.max - range.min)
    }

    posToVal (pos) {
        const range = this.initialRange
        return pos * (range.max - range.min) + range.min
    }

    posToValCurrent (pos) {
        const range = this.range
        return pos * (range.max - range.min) + range.min
    }

    valToPosInitial (val) {
        const range = this.initialRange
        return (val - range.min) / (range.max - range.min)
    }

    render (box) {
        this.box = {
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height
        }
        if (this.isHidden) return
        const metrics = this.metrics = this.getMetrics()
        this.renderTicks(metrics)
        return this.ticksGroup
    }

    getMetrics () {}

    renderTicks () {}

    setRange (range) {
        const newRange = {
            min: this.posToVal(range.min),
            max: this.posToVal(range.max)
        }

        const dMin = newRange.min - this.range.min
        const dMax = newRange.max - this.range.max

        let direction
        let control
        if (dMin !== 0 && dMax !== 0) {
            direction = dMax > 0 ? 1 : -1
            control = 'c'
        } else if (dMin !== 0 || dMax !== 0) {
            const change = dMax || dMin
            direction = change > 0 ? 1 : -1
            control = dMax ? 'r' : 'l'
        } else {
            return
        }

        if (control && control !== 'c' && this.control !== control && this.control) {
            this.clearTicks()
        }

        this.direction = direction
        this.control = control

        this.range = newRange
        this.renderTicks()
    }

    clearTicks () {
        this.ticks.map(tick => {
            tick.el && tick.el.parentNode.removeChild(tick.el)
        })
        this.ticks = []
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
