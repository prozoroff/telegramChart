import { shortMonths } from '../constants'
import { Axis, defaults } from './axis'

export class AxisX extends Axis {
    renderTicks (box) {
        if (this.isHidden) return

        const ticksGroup = this.getGroup()
        const metrics = this.tickMetrics(0)

        // adding background rect
        const axisHeight = AxisX.getSize(metrics)
        this.chart.renderer.rect({
            x: box.x,
            y: box.y + box.height - axisHeight,
            height: axisHeight,
            width: box.width,
            fill: 'none'
        }, ticksGroup)

        // adding ticks
        const ticksNumber = Math.min(6, 1 + Math.floor(box.width / (2 * metrics.width)))
        const posStep = 1 / ticksNumber
        const widthStep = box.width / ticksNumber
        for (let i = 0; i < ticksNumber; i++) {
            const tick = this.chart.renderer.text(
                this.valToText(this.posToVal(posStep * i)),
                {
                    x: box.x + widthStep * i + metrics.width / 2,
                    y: box.y + box.height - metrics.descent - defaults.padding
                },
                ticksGroup
            )
            this.ticks.push(tick)
            ticksGroup.appendChild(tick)
        }

        return ticksGroup
    }

    valToText (val) {
        const date = new Date(val)
        return shortMonths[date.getMonth()] + ' ' + (date.getDay() + 1)
    }

    static getSize (metrics) {
        return defaults.padding * 2 + metrics.height
    }
}
