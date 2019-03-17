import { text, rect } from '../renderer'
import { shortMonths } from '../constants'
import { Axis, defaults } from './axis'

export class AxisX extends Axis {
    renderTicks (box) {
        const ticksGroup = this.getGroup()
        const metrics = this.tickMetrics(0)

        // adding background rect
        const axisHeight = AxisX.getSize(metrics)
        ticksGroup.appendChild(rect({
            x: box.x,
            y: box.y + box.height - axisHeight,
            height: axisHeight,
            width: box.width,
            fill: 'none'
        }))

        // adding ticks
        const ticksNumber = 1 + Math.floor(box.width / (2 * metrics.width))
        const posStep = 1 / ticksNumber
        const widthStep = box.width / ticksNumber
        for (let i = 0; i < ticksNumber; i++) {
            const tick = text(
                this.valToText(this.posToVal(posStep * i)),
                {
                    x: box.x + widthStep * i + metrics.width / 2,
                    y: box.y + box.height - metrics.descent - defaults.padding
                }
            )
            this.ticks.push(tick)
            ticksGroup.appendChild(tick)
        }

        this.chart.svg.appendChild(ticksGroup)
        return ticksGroup
    }

    valToText (val) {
        const date = new Date(val)
        return shortMonths[date.getMonth()] + ' ' + date.getDay()
    }

    static getSize (metrics) {
        return defaults.padding * 2 + metrics.height
    }
}
