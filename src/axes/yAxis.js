import { Axis, defaults } from './axis'
import { AxisX } from './xAxis'

export class AxisY extends Axis {
    init () {
        this.range.min = 0
    }

    renderTicks (box) {
        if (this.isHidden) return

        const ticksGroup = this.getGroup()
        const metrics = this.tickMetrics(1)
        const xAxisHeight = AxisX.getSize(metrics)
        const yAxisHeight = box.height - xAxisHeight

        // adding background rect
        const axisWidth = defaults.padding * 2 + metrics.width
        this.chart.renderer.rect({
            x: box.x,
            y: 0,
            height: box.height,
            width: axisWidth,
            fill: 'none'
        }, ticksGroup)

        // adding ticks
        const ticksNumber = 6 // predefined
        const posStep = 1 / ticksNumber
        const heightStep = yAxisHeight / ticksNumber
        for (let i = 0; i < ticksNumber; i++) {
            const tick = this.chart.renderer.text(
                this.valToText(this.posToVal(posStep * i)),
                {
                    x: box.x + defaults.padding,
                    y: box.y + yAxisHeight - heightStep * i - metrics.descent
                },
                ticksGroup
            )
            this.ticks.push(tick)
        }

        // adding grid lines
        for (let i = 0; i < ticksNumber; i++) {
            const tickLine = this.chart.renderer.path(
                {
                    d: 'M' + box.x + ' ' + (box.y + yAxisHeight - heightStep * i) + ' h' + box.width,
                    fill: 'none',
                    stroke: defaults.lineColor
                }
            )
            this.ticksLines.push(tickLine)
        }

        return ticksGroup
    }

    valToText (val) {
        return Math.round(val).toString()
    }
}
