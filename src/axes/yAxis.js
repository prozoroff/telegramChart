import { text, path, rect } from '../renderer'
import { Axis, defaults } from './axis'
import { AxisX } from './xAxis'

export class AxisY extends Axis {
    init () {
        this.range.min = 0
    }

    renderTicks (box) {
        const ticksGroup = this.getGroup()
        const metrics = this.tickMetrics(1)
        const xAxisHeight = AxisX.getSize(metrics)
        const yAxisHeight = box.height - xAxisHeight

        // adding background rect
        const axisWidth = defaults.padding * 2 + metrics.width
        ticksGroup.appendChild(rect({
            x: box.x,
            y: 0,
            height: box.height,
            width: axisWidth,
            fill: 'none'
        }))

        // adding ticks
        const ticksNumber = 6 // predefined
        const posStep = 1 / ticksNumber
        const heightStep = yAxisHeight / ticksNumber
        for (let i = 0; i < ticksNumber; i++) {
            const tick = text(
                this.valToText(this.posToVal(posStep * i)),
                {
                    x: box.x + defaults.padding,
                    y: box.y + yAxisHeight - heightStep * i - metrics.descent
                }
            )
            this.ticks.push(tick)
            ticksGroup.appendChild(tick)
        }

        // adding grid lines
        for (let i = 0; i < ticksNumber; i++) {
            const tickLine = path(
                {
                    d: 'M' + box.x + ' ' + (box.y + yAxisHeight - heightStep * i) + ' h' + box.width,
                    fill: 'none',
                    stroke: defaults.lineColor
                }
            )
            this.ticksLines.push(tickLine)
            ticksGroup.appendChild(tickLine)
        }

        this.chart.svg.appendChild(ticksGroup)
        return ticksGroup
    }

    valToText (val) {
        return Math.round(val).toString()
    }
}
