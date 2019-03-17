
import { text, g } from './renderer'
import { shortMonths } from './constants'

export class Axis {
    constructor (chart, type, range) {
        this.chart = chart
        this.type = type
        this.range = range
    }

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

    renderTicks (box) {
        this.ticks = []
        const ticksGroup = g()
        const metrics = this.tickMetrics()
        const ticksNumber = 1 + Math.floor(box.width / (2 * metrics.width))
        const posStep = 1 / ticksNumber
        const widthStep = box.width / ticksNumber
        for (let i = 0; i < ticksNumber; i++) {
            const tick = text(
                this.valToText(this.posToVal(posStep * i)),
                {
                    x: widthStep * i + metrics.width / 2,
                    y: box.height - metrics.descent
                }
            )
            this.ticks.push(tick)
            ticksGroup.appendChild(tick)
        }
        this.chart.svg.appendChild(ticksGroup)
        return ticksGroup
    }

    tickMetrics () {
        const firstTick = text(
            this.valToText(this.posToVal(0)),
            {
                x: 0,
                y: 0
            }
        )
        this.chart.svg.appendChild(firstTick)
        const bbox = firstTick.getBBox()
        firstTick.parentNode.removeChild(firstTick)
        return {
            ascent: -bbox.y,
            descent: bbox.height + bbox.y,
            height: bbox.height,
            width: bbox.width
        }
    }

    valToText (val) {
        if (this.type === 'y') {
            return Math.round(val).toString()
        } else {
            const date = new Date(val)
            return shortMonths[date.getMonth()] + ' ' + date.getDay()
        }
    }
}
