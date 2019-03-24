import { shortMonths } from '../constants'
import { Axis, defaults } from './axis'

const ticksNumber = 6

export class AxisX extends Axis {
    renderTicks () {
        const metrics = this.metrics
        const range = this.range
        const box = this.box

        const delta = (range.max - range.min) / (ticksNumber - 1)
        const inRange = val => val >= range.min - delta && val <= range.max + delta
        const fillNewTicks = () => {
            const result = []
            for (let i = 0; i < ticksNumber; i++) {
                result.push({
                    val: range.min + i * delta
                })
            }
            return result
        }

        if (!this.ticks) {
            this.ticks = fillNewTicks()
            this.ticksGroup = this.getGroup()
            const axisHeight = AxisX.getSize(metrics)
            this.chart.renderer.rect({
                x: box.x,
                y: box.y + box.height - axisHeight,
                height: axisHeight,
                width: box.width,
                fill: 'none'
            }, this.ticksGroup)
        } else {
            const filteredTicks = this.filterTicks(this.ticks, delta, inRange)
            if (filteredTicks.length) {
                let tickIndex = filteredTicks.length
                const valDelta = filteredTicks[1]
                    ? filteredTicks[1].val - filteredTicks[0].val
                    : delta

                if ((this.direction < 0 && this.control === 'c') || this.control === 'l') {
                    let val = filteredTicks[0].val - valDelta
                    while (tickIndex < ticksNumber) {
                        filteredTicks.unshift({ val })
                        tickIndex++
                        val -= valDelta
                    }
                } else if ((this.direction > 0 && this.control === 'c') || this.control === 'r') {
                    let val = filteredTicks[filteredTicks.length - 1].val + valDelta
                    while (tickIndex < ticksNumber) {
                        filteredTicks.push({ val })
                        tickIndex++
                        val += valDelta
                    }
                }
                this.ticks = filteredTicks
            } else {
                this.ticks = fillNewTicks()
            }
        }

        const yCoord = box.y + box.height - metrics.descent - defaults.padding
        for (let i = 0, l = this.ticks.length; i < l; i++) {
            const tick = this.ticks[i]
            const val = tick.val
            const attrs = {
                x: box.x + this.valToPos(val) * box.width + metrics.width * (0.5 - 2 * i / l),
                y: yCoord
            }
            const text = this.valToText(val)
            if (tick.el) {
                this.chart.renderer.attr(tick.el, attrs)
            } else {
                tick.el = this.chart.renderer.text(
                    text,
                    attrs,
                    this.ticksGroup
                )
            }
        }
    }

    filterTicks (ticks, delta, inRange) {
        if (!ticks.length) return ticks
        const result = []

        const inDelta = d => (d < delta * 1.2 && d > delta / 1.2)
        const remove = el => el.parentNode.removeChild(el)

        if ((this.direction < 0 && this.control === 'c') || this.control === 'r') {
            result.push(ticks[0])
            for (let i = 1; i < ticks.length; i++) {
                const tick = ticks[i]
                if (inRange(tick.val) && inDelta(tick.val - ticks[i - 1].val)) {
                    result.push(tick)
                } else {
                    remove(tick.el)
                }
            }
        } else if ((this.direction > 0 && this.control === 'c') || this.control === 'l') {
            result.push(ticks[ticks.length - 1])
            for (let i = ticks.length - 2; i >= 0; i--) {
                const tick = ticks[i]
                if (inRange(tick.val) && inDelta(ticks[i + 1].val - tick.val)) {
                    result.unshift(tick)
                } else {
                    remove(tick.el)
                }
            }
        } else {
            return ticks
        }
        return result
    }

    valToText (val) {
        const date = new Date(val)
        return shortMonths[date.getMonth()] + ' ' + date.getDate()
    }

    getMetrics () {
        return this.tickMetrics(0)
    }

    static getSize (metrics) {
        return defaults.padding * 2 + metrics.height
    }
}
