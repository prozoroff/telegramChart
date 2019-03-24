import { Axis, defaults } from './axis'
import { AxisX } from './xAxis'
import { snap } from '../utils'
import { animateYTicks } from '../animation'

const ticksNumber = 6

export class AxisY extends Axis {
    renderTicks () {
        if (animateYTicks.busy) return
        this.createNewTicks()
        this.ticksGap && animateYTicks(
            this.ticksGroupOut,
            this.ticksGroup,
            this.ticksGap * this.direction * -1)
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

        const axisWidth = defaults.padding * 2 + metrics.width
        this.chart.renderer.rect({
            x: box.x,
            y: 0,
            height: box.height,
            width: axisWidth,
            fill: 'none'
        }, ticksGroup)

        let valStep = this.range.max / ticksNumber
        const valStepPower = Math.round(valStep).toString().length - 1
        const factor = Math.pow(10, valStepPower)
        valStep = Math.round(valStep / factor) * factor

        const heightStep = yAxisHeight / ticksNumber
        for (let i = 0; i < ticksNumber; i++) {
            if (i === 0 && this.ticksGroupOut) continue
            const value = valStep * i
            const tick = this.chart.renderer.text(
                this.valToText(value),
                {
                    x: box.x + defaults.padding,
                    y: box.y + yAxisHeight - heightStep * i - metrics.descent,
                    fill: defaults.tickLabelColor[this.chart.mode]
                },
                i === 0 ? undefined : ticksGroup
            )
            this.ticks.push(tick)
        }

        for (let i = 0; i < ticksNumber; i++) {
            if (i === 0 && this.ticksGroupOut) continue
            const yCoord = snap(box.y + yAxisHeight - heightStep * i, 0.5)
            this.chart.renderer.path(
                {
                    d: 'M' + box.x + ' ' + yCoord + ' h' + box.width,
                    fill: 'none',
                    stroke: defaults.lineColor[this.chart.mode]
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
