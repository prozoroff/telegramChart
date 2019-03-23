import { shortMonths } from '../constants'
import { Axis, defaults } from './axis'
import { animateXTicks } from '../animation'

export class AxisX extends Axis {
    renderTicks () {
        if (animateXTicks.busy) return
        !this.ticksGroup && this.createNewTicks()
        // animateXTicks(
        //     this.ticksGroupOut,
        //     this.ticksGroup,
        //     this.ticksGap * this.direction)
    }

    valToText (val) {
        const date = new Date(val)
        return shortMonths[date.getMonth()] + ' ' + date.getDate()
    }

    getMetrics () {
        return this.tickMetrics(0)
    }

    createNewTicks () {
        const box = this.box
        const metrics = this.metrics
        const ticksNumber = Math.min(6, 1 + Math.floor(box.width / (2 * metrics.width)))
        const posStep = 1 / ticksNumber
        const widthStep = box.width / ticksNumber
        this.ticksGroupOut = this.ticksGroup

        const ticksGroup = this.ticksGroup = this.getGroup()
        const axisHeight = AxisX.getSize(metrics)
        this.chart.renderer.rect({
            x: box.x,
            y: box.y + box.height - axisHeight,
            height: axisHeight,
            width: box.width,
            fill: 'none'
        }, ticksGroup)

        const yCoord = box.y + box.height - metrics.descent - defaults.padding

        let ticksCount = 0
        for (let i = 0; i < ticksNumber; i++) {
            const value = this.posToValCurrent(posStep * i)
            this.chart.renderer.text(
                this.valToText(value),
                {
                    x: box.x + widthStep * i + metrics.width / 2,
                    y: yCoord
                },
                ticksGroup
            )
            ticksCount++
        }
        this.ticksGap = box.width / ticksCount
    }

    static getSize (metrics) {
        return defaults.padding * 2 + metrics.height
    }
}
