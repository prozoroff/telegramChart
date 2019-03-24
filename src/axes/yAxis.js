import { Axis, defaults } from './axis'
import { AxisX } from './xAxis'
import { snap } from '../utils'
import { animateYTicks } from '../animation'

export class AxisY extends Axis {
    renderTicks () {
        this.ticks = []
        // if (animateYTicks.busy) return
        // this.createNewTicks()
        // animateYTicks(
        //     this.ticksGroupOut,
        //     this.ticksGroup,
        //     this.ticksGap * this.direction)
    }

    getMetrics () {
        return this.tickMetrics(1)
    }

    createNewTicks () {
        const box = this.box
        const metrics = this.metrics
        this.ticksGroupOut = this.ticksGroup

        this.ticks = this.ticks || []

        const ticksGroup = this.ticksGroup = this.getGroup()
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
            if (i === 0 && this.ticksGroupOut) continue
            const value = this.posToValCurrent(posStep * i)
            const tick = this.chart.renderer.text(
                this.valToText(value),
                {
                    x: box.x + defaults.padding,
                    y: box.y + yAxisHeight - heightStep * i - metrics.descent,
                    fill: defaults.tickLabelColor
                },
                i === 0 ? undefined : ticksGroup
            )
            this.ticks.push(tick)
        }

        // adding grid lines
        for (let i = 0; i < ticksNumber; i++) {
            if (i === 0 && this.ticksGroupOut) continue
            const yCoord = snap(box.y + yAxisHeight - heightStep * i, 0.5)
            this.chart.renderer.path(
                {
                    d: 'M' + box.x + ' ' + yCoord + ' h' + box.width,
                    fill: 'none',
                    stroke: defaults.lineColor
                },
                i === 0 ? undefined : ticksGroup
            )
        }

        this.ticksGap = this.changeRatio * box.height / ticksNumber
    }

    valToText (val) {
        return Math.round(val).toString()
    }
}
